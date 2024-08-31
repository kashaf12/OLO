import { Bucket } from '@google-cloud/storage';
import { logger } from 'firebase-functions/v1';
import { ObjectMetadata } from 'firebase-functions/v1/storage';
import * as fs from 'fs';
import * as os from 'os';
import * as path from 'path';
import * as sharp from 'sharp';
import { v4 as uuid } from 'uuid';

import { config } from './config';

export interface ResizedImageResult {
  size: string;
  outputFilePath: string;
  success: boolean;
}

/**
 * Resizes an image to the specified dimensions.
 *
 * @param file - The input image file (various types supported)
 * @param size - The target size in the format "WIDTHxHEIGHT" or "WIDTH,HEIGHT"
 * @returns A Buffer containing the resized image
 * @throws Error if the size format is invalid
 */
export function resize(
  file:
    | Buffer
    | ArrayBuffer
    | Uint8Array
    | Uint8ClampedArray
    | Int8Array
    | Uint16Array
    | Int16Array
    | Uint32Array
    | Int32Array
    | Float32Array
    | Float64Array
    | string,
  size: string
) {
  let height, width;
  if (size.indexOf(',') !== -1) {
    [width, height] = size.split(',');
  } else if (size.indexOf('x') !== -1) {
    [width, height] = size.split('x');
  } else {
    throw new Error("height and width are not delimited by a ',' or a 'x'");
  }

  let sharpOptions = {};
  try {
    sharpOptions = JSON.parse(config.sharpResizeOptions);
  } catch (e) {
    logger.warn(`Error while parsing "Constructor options". Parameter will be ignored`, e);
  }

  const ops = {
    failOnError: false,
    ...(sharpOptions || {}),
    animated: config.preserveAnimation,
  };

  return sharp(file, ops)
    .rotate()
    .resize(parseInt(width, 10), parseInt(height, 10), {
      withoutEnlargement: true,
      ...sharpOptions,
    })
    .toBuffer();
}

/**
 * Converts an image buffer to the specified format.
 *
 * @param buffer - The input image buffer
 * @param format - The target image format (e.g., 'jpeg', 'png', 'webp')
 * @returns A Buffer containing the converted image
 */
export function convertType(buffer: Buffer, format: string) {
  let outputOptions = {
    jpeg: {},
    jpg: {},
    png: {},
    webp: {},
    tiff: {},
    tif: {},
    avif: {},
  };
  if (config.sharpOutputOptions) {
    try {
      outputOptions = JSON.parse(config.sharpOutputOptions);
    } catch (e) {
      logger.error(
        `Error while parsing "Output options for selected format". Parameter will be ignored`,
        e
      );
    }
  }
  const { jpeg, jpg, png, webp, tiff, tif, avif } = outputOptions;

  if (format === 'jpeg') {
    return sharp(buffer).jpeg(jpeg).toBuffer();
  }

  if (format === 'jpg') {
    return sharp(buffer).jpeg(jpg).toBuffer();
  }

  if (format === 'png') {
    return sharp(buffer).png(png).toBuffer();
  }

  if (format === 'webp') {
    return sharp(buffer, { animated: config.preserveAnimation }).webp(webp).toBuffer();
  }

  if (format === 'tif') {
    return sharp(buffer).tiff(tif).toBuffer();
  }

  if (format === 'tiff') {
    return sharp(buffer).tiff(tiff).toBuffer();
  }

  if (format === 'gif') {
    return sharp(buffer, { animated: config.preserveAnimation }).gif().toBuffer();
  }

  if (format === 'avif') {
    return sharp(buffer).avif(avif).toBuffer();
  }

  return buffer;
}

/**
 * List of supported image content types
 */
export const supportedContentTypes = [
  'image/jpg',
  'image/jpeg',
  'image/png',
  'image/tiff',
  'image/webp',
  'image/gif',
  'image/avif',
];

/**
 * Mapping of image extensions to their corresponding MIME types
 */
export const supportedImageContentTypeMap = {
  jpg: 'image/jpeg',
  jpeg: 'image/jpeg',
  png: 'image/png',
  tif: 'image/tif',
  tiff: 'image/tiff',
  webp: 'image/webp',
  gif: 'image/gif',
  avif: 'image/avif',
  jfif: 'image/jpeg',
};

const supportedExtensions = Object.keys(supportedImageContentTypeMap).map((type) => `.${type}`);

/**
 * Modifies an image by resizing and optionally converting its format.
 *
 * @param params - Object containing parameters for image modification
 * @returns A Promise resolving to a ResizedImageResult object
 */
export const modifyImage = async ({
  bucket,
  originalFile,
  parsedPath,
  contentType,
  size,
  objectMetadata,
  format,
}: {
  bucket: Bucket;
  originalFile: string;
  parsedPath: path.ParsedPath;
  contentType: string;
  size: string;
  objectMetadata: ObjectMetadata;
  format: string;
}): Promise<ResizedImageResult> => {
  const { ext: fileExtension, dir: fileDir, name: fileNameWithoutExtension } = parsedPath;
  const shouldFormatImage = format !== 'false';
  const imageContentType = shouldFormatImage
    ? supportedImageContentTypeMap[
        format as 'jpg' | 'jpeg' | 'png' | 'tif' | 'tiff' | 'webp' | 'gif' | 'avif' | 'jfif'
      ]
    : contentType;
  const modifiedExtensionName = fileExtension && shouldFormatImage ? `.${format}` : fileExtension;

  let modifiedFileName;

  if (supportedExtensions.includes(fileExtension.toLowerCase())) {
    modifiedFileName = `${fileNameWithoutExtension}_${size}${modifiedExtensionName}`;
  } else {
    modifiedFileName = `${fileNameWithoutExtension}${fileExtension}_${size}`;
  }

  const modifiedFilePath = getModifiedFilePath(fileDir, '', modifiedFileName);
  let modifiedFile: string | undefined;

  try {
    modifiedFile = path.join(os.tmpdir(), uuid());

    const metadata = constructMetadata(modifiedFileName, imageContentType, objectMetadata);

    logger.log(`Resizing image at path '${modifiedFile}' to size: ${size}`);
    let modifiedImageBuffer = await resize(originalFile, size);
    logger.log(`Resized image created at '${modifiedFile}'`);

    if (shouldFormatImage) {
      logger.log(`Converting image from type, ${fileExtension}, to type ${format}.`);
      modifiedImageBuffer = await convertType(modifiedImageBuffer, format);
      logger.log(`Converted image to ${format}`);
    }

    await sharp(modifiedImageBuffer, { animated: config.preserveAnimation }).toFile(modifiedFile);

    logger.log(`Uploading resized image to '${modifiedFilePath}'`);
    await bucket.upload(modifiedFile, {
      destination: modifiedFilePath,
      metadata,
    });
    logger.log(`Uploaded resized image to '${modifiedFilePath}'`);

    return { size, outputFilePath: modifiedFilePath, success: true };
  } catch (err) {
    logger.error('Error when resizing image', err);
    return { size, outputFilePath: modifiedFilePath, success: false };
  } finally {
    try {
      if (modifiedFile) {
        logger.log(`Deleting temporary resized file: '${modifiedFilePath}'`);
        fs.unlinkSync(modifiedFile);
        logger.log(`Deleted temporary resized file: '${modifiedFilePath}'`);
      }
    } catch (err) {
      logger.warn('Error when deleting files', err);
    }
  }
};

/**
 * Constructs metadata for the resized image.
 *
 * @param modifiedFileName - The filename of the resized image
 * @param imageContentType - The content type of the resized image
 * @param objectMetadata - The original metadata of the image
 * @returns Object containing the constructed metadata
 */
export const constructMetadata = (
  modifiedFileName: string,
  imageContentType: string,
  objectMetadata: ObjectMetadata
) => {
  const contentDisposition =
    objectMetadata && objectMetadata.contentDisposition
      ? objectMetadata.contentDisposition.replace(
          /(filename\*=utf-8''[^;\s]+)/,
          `filename*=utf-8''${modifiedFileName}`
        )
      : '';

  const metadata: { [key: string]: any } = {
    contentDisposition,
    contentEncoding: objectMetadata.contentEncoding,
    contentLanguage: objectMetadata.contentLanguage,
    contentType: imageContentType,
    metadata: objectMetadata.metadata ? { ...objectMetadata.metadata } : {},
  };
  metadata.metadata.resizedImage = true;
  if (config.cacheControlHeader) {
    metadata.cacheControl = config.cacheControlHeader;
  } else {
    metadata.cacheControl = objectMetadata.cacheControl;
  }

  return metadata;
};

/**
 * Converts a file path to POSIX format.
 *
 * @param filePath - The file path to convert
 * @param locale - Optional locale for path separator (default: current OS)
 * @returns The converted POSIX file path
 */
const convertToPosixPath = (filePath: string, locale?: 'win32' | 'posix') => {
  const sep = locale ? path[locale].sep : path.sep;
  return filePath.split(sep).join(path.posix.sep);
};

/**
 * Generates the modified file path for the resized image.
 *
 * @param fileDir - The directory of the original file
 * @param resizedImagesPath - The path for resized images
 * @param modifiedFileName - The filename of the resized image
 * @returns The full path for the resized image
 */
export const getModifiedFilePath = (
  fileDir: string,
  resizedImagesPath: string,
  modifiedFileName: string
) => {
  return convertToPosixPath(
    path.posix.normalize(
      resizedImagesPath
        ? path.posix.join(fileDir, resizedImagesPath, modifiedFileName)
        : path.posix.join(fileDir, modifiedFileName)
    )
  );
};
