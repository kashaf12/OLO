/**
 * Configuration for image resizing and storage functions.
 */
export const config = {
  /** Cache-Control header for resized images */
  cacheControlHeader: 'public, max-age=70906',

  /** List of paths to exclude from image processing */
  excludePathList: [],

  /** Default image format for resized images */
  defaultImageFormat: 'jpeg',

  /** Sharp resize options in JSON format */
  sharpResizeOptions: process.env.SHARP_OPTIONS || '{}',

  /** Sharp output options for different formats */
  sharpOutputOptions: process.env.OUTPUT_OPTIONS,

  /** Whether to preserve animation in GIFs and WebP */
  preserveAnimation: false,

  /**
   * Mapping of image paths to their respective resize configurations
   * path: The directory path pattern to match
   * sizes: Array of sizes to generate (format: 'WIDTHxHEIGHT')
   */
  imagePathAndSizeMapping: [
    {
      path: '/profile_photos/*',
      sizes: ['200x200'],
    },
    {
      path: '/ads/*',
      sizes: ['300x300', '1200x1200'],
    },
  ],
};
