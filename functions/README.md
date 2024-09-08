# Firebase Functions for OLO (Classified Ads Marketplace)

This directory contains the Firebase Cloud Functions for the OLO Classified Ads Marketplace application. These functions handle backend operations such as user creation, image resizing, ad management, and other serverless tasks.

## Table of Contents

- [Overview](#overview)
- [Project Structure](#project-structure)
- [Configuration](#configuration)
- [Available Functions](#available-functions)
- [Utility Functions](#utility-functions)
- [Image Processing](#image-processing)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Development](#development)
- [Deployment](#deployment)
- [Testing](#testing)
- [Troubleshooting](#troubleshooting)
- [Contributing](#contributing)

## Overview

The Firebase Functions in this project provide serverless backend functionality for the OLO app, including:

- Automatic user document creation upon sign-up
- Image resizing for uploaded photos
- Utility functions for path matching and metadata conversion
- Processing and validation of new ad listings
- Deletion of ads and associated resources

## Project Structure

```
functions/
├── src/
│   ├── config.ts
│   ├── filters.ts
│   ├── index.ts
│   ├── resize-image.ts
│   └── util.ts
├── package.json
├── tsconfig.json
├── tsconfig.dev.json
└── .gitignore
```

## Configuration

The `config.ts` file contains the configuration for image resizing and storage functions:

```typescript
export const config = {
  cacheControlHeader: 'public, max-age=70906',
  excludePathList: [],
  imageType: 'jpeg',
  sharpOptions: process.env.SHARP_OPTIONS || '{}',
  outputOptions: process.env.OUTPUT_OPTIONS,
  animated: false,
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
```

## Available Functions

### 1. createUserDocumentOnSignUp

Creates a user document in Firestore when a new user signs up.

```typescript
export const createUserDocumentOnSignUp = functions.auth.user().onCreate(async (user) => {
  // ... implementation details ...
});
```

### 2. generateResizedJpegOnUpload

Automatically resizes uploaded images based on predefined configurations.

```typescript
export const generateResizedJpegOnUpload = functions.storage.object().onFinalize(async (object) => {
  // ... implementation details ...
});
```

### 3. processNewAd

This function is triggered when a new ad document is created in Firestore. It performs several operations:

1. Increments the user's total ad count and updates the last posted ad timestamp
2. Initially marks the new ad as "pending"
3. Analyzes ad images using Vertex AI
4. Based on analysis results, either marks the ad as "active" or "rejected"
5. If marked as active, increments the user's active ad count

### 4. deleteAd

This function is triggered when an ad document is deleted from Firestore. It handles the following tasks:

1. Deletes all images and their variations associated with the ad from Firebase Storage
2. Decrements the totalAds count in the user's document in Firestore

```typescript
export const deleteAd = functions.firestore
  .document('Ads/{adId}')
  .onDelete(async (snapshot, context) => {
    // ... implementation details ...
  });
```

Key features of the deleteAd function:

- Handles multiple image variations (original, 1200x1200, 300x300)
- Robust error handling for image deletion
- Updates user statistics to maintain accurate ad counts

## Utility Functions

The `util.ts` file contains utility functions:

1. `startsWithArray`: Checks if a given image path starts with any of the provided user input paths.
2. `countNegativeTraversals`: Counts the number of negative directory traversals in a path.
3. `convertToObjectMetadata`: Converts a FileMetadata object to an ObjectMetadata object.

### analyzeImagesWithVertexAI

A placeholder function for integrating with Vertex AI to analyze ad images. This function should be replaced with actual Vertex AI implementation.

## Image Processing

The `resize-image.ts` file contains functions for image resizing and conversion:

1. `resize`: Resizes an image buffer to specified dimensions.
2. `convertType`: Converts an image buffer to a specified format.
3. `modifyImage`: Handles the entire process of resizing and converting an image.

## Prerequisites

- Node.js (v18 or later)
- Firebase CLI (`npm install -g firebase-tools`)
- A Firebase project set up in the Firebase Console

## Installation

1. Clone the repository:

   ```
   git clone git@github.com:kashaf12/OLO.git
   cd olo/functions
   ```

2. Install dependencies:
   ```
   npm install
   ```

## Development

To start development:

1. Run the TypeScript compiler in watch mode:

   ```
   npm run build:watch
   ```

2. In a separate terminal, start the Firebase emulators:
   ```
   npm run serve
   ```

## Deployment

To deploy the functions to Firebase:

1. Build the project:

   ```
   npm run build
   ```

2. Deploy to Firebase:
   ```
   npm run deploy
   ```

## Testing

Currently, there are no specific testing instructions provided in the project. It's recommended to add unit tests for the functions and utility methods.

## Troubleshooting

- If you encounter issues with Sharp.js, ensure you're using a compatible version with your Node.js version.
- For deployment issues, check the Firebase CLI output for detailed error messages.

## Contributing

Contributions to the OLO Firebase Functions are welcome. Please follow these steps:

1. Fork the repository
2. Create a new branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request
