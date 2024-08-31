import { logger } from 'firebase-functions';
import { ObjectMetadata } from 'firebase-functions/v1/storage';
import * as path from 'path';

import { config } from './config';
import { supportedContentTypes } from './resize-image';
import { startsWithArray } from './util';

/**
 * Determines whether an image should be resized based on various criteria.
 *
 * @param object - The ObjectMetadata of the uploaded file
 * @returns boolean - True if the image should be resized, false otherwise
 */
export function shouldResize(object: ObjectMetadata): boolean {
  logger.log('Object information', object);
  const { contentType } = object; // This is the image MIME type

  if (!object.name) {
    logger.log('File has no name, no processing is required');
    return false;
  }

  if (!contentType) {
    logger.log('File has no Content-Type, no processing is required');
    return false;
  }

  if (!contentType.startsWith('image/')) {
    logger.log(`File of type '${contentType}' is not an image, no processing is required`);
    return false;
  }

  if (object.contentEncoding === 'gzip') {
    logger.log("Images encoded with 'gzip' are not supported.");
    return false;
  }

  if (!supportedContentTypes.includes(contentType)) {
    logger.log(
      `Image type '${contentType}' is not supported, here are the supported file types: ${supportedContentTypes.join(
        ', '
      )}`
    );
    return false;
  }

  const tmpFilePath = path.resolve('/', path.dirname(object.name)); // Absolute path to dirname

  const includePathList = config.imagePathAndSizeMapping.map(({ path }) => path);

  if (includePathList && !startsWithArray(includePathList, tmpFilePath)) {
    logger.log(
      `Image path '${tmpFilePath}' is not supported, these are the supported absolute paths: ${includePathList.join(
        ', '
      )}`
    );
    return false;
  }

  if (config.excludePathList && startsWithArray(config.excludePathList, tmpFilePath)) {
    logger.log(
      `Image path '${tmpFilePath}' is not supported, these are the not supported absolute paths: ${config.excludePathList.join(
        ', '
      )}`
    );
    return false;
  }

  if (object.metadata && object.metadata.resizedImage === 'true') {
    logger.log('File is already a resized image, no processing is required');
    return false;
  }

  if (object.metadata && object.metadata.resizeFailed) {
    logger.log('File is a copy of an image which failed to resize, no processing is required');
    return false;
  }

  return true;
}
