export function getFileExtension(filename: string) {
  const extension = filename.substring(filename.lastIndexOf('.') + 1, filename.length);
  return `${extension}`.toLowerCase();
}
