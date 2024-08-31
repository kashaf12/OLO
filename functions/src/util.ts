import { FileMetadata } from '@google-cloud/storage';
import { ObjectMetadata } from 'firebase-functions/v1/storage';

/**
 * Checks if a given image path starts with any of the provided user input paths.
 * Supports wildcard (*) matching in user input paths.
 *
 * @param userInputPaths - Array of user-defined path patterns to match against
 * @param imagePath - The actual image path to check
 * @returns True if the imagePath starts with any of the userInputPaths, false otherwise
 */
export const startsWithArray = (userInputPaths: string[], imagePath: string): boolean => {
  for (const userPath of userInputPaths) {
    const trimmedUserPath = userPath.trim().replace(/\*/g, '([a-zA-Z0-9_\\-.\\s\\/]*)?');
    const regex = new RegExp('^' + trimmedUserPath + '(?:/.*|$)');
    if (regex.test(imagePath)) {
      return true;
    }
  }
  return false;
};

/**
 * Counts the number of negative directory traversals (../) in a given path.
 *
 * @param path - The file path to analyze
 * @returns The number of "../" occurrences in the path
 */
export function countNegativeTraversals(path: string): number {
  return (path.match(/\/\.\.\//g) || []).length;
}

/**
 * Converts a FileMetadata object to an ObjectMetadata object.
 * This function is useful when working with different metadata formats in Google Cloud Storage.
 *
 * @param fileMetadata - The FileMetadata object to convert
 * @returns An ObjectMetadata object with equivalent properties
 */
export function convertToObjectMetadata(fileMetadata: FileMetadata): ObjectMetadata {
  const { acl, ...rest } = fileMetadata;

  const convertedAcl =
    acl?.map((aclEntry) => ({
      kind: aclEntry.kind,
      id: aclEntry.id,
      selfLink: aclEntry.selfLink,
      bucket: aclEntry.bucket,
      object: aclEntry.object,
      generation: aclEntry.generation,
      entity: aclEntry.entity,
      role: aclEntry.role,
      entityId: aclEntry.entityId,
      domain: aclEntry.domain,
      projectTeam: aclEntry.projectTeam
        ? {
            projectNumber: aclEntry.projectTeam.projectNumber,
            team: aclEntry.projectTeam.team,
          }
        : undefined,
      etag: aclEntry.etag,
    }))[0] || undefined;

  return {
    kind: 'storage#object',
    id: rest.id as string,
    bucket: rest.bucket as string,
    storageClass: rest.storageClass as string,
    size: rest.size?.toString() as string,
    timeCreated: rest.timeCreated as string,
    updated: rest.updated as string,
    selfLink: rest.selfLink,
    name: rest.name,
    generation: rest.generation?.toString(),
    contentType: rest.contentType,
    metageneration: rest.metageneration?.toString(),
    timeDeleted: rest.timeDeleted,
    timeStorageClassUpdated: rest.timeStorageClassUpdated,
    md5Hash: rest.md5Hash,
    mediaLink: rest.mediaLink,
    contentEncoding: rest.contentEncoding,
    contentDisposition: rest.contentDisposition,
    contentLanguage: rest.contentLanguage,
    cacheControl: rest.cacheControl,
    metadata: rest.metadata as { [key: string]: string },
    owner: rest.owner,
    crc32c: rest.crc32c,
    componentCount: rest.componentCount?.toString(),
    etag: rest.etag,
    customerEncryption: rest.customerEncryption,
    acl: convertedAcl ? [convertedAcl] : undefined,
  };
}
