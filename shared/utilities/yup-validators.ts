export const maxFileSizeInMB = 10; // 10MB
export const supportedFileTypeMessage = 'pdf, jpeg, png, heic, bmp, webp';
const supportedFileTypes = [
  'application/pdf', 
  'image/jpeg', 
  'image/png', 
  'image/heic', 
  'image/bmp', 
  'image/webp'
];

/**
 * Checks if the file size is under the maximum supported
 * 
 * @param files file upload. It is an any type because of yup validation.
 * @returns validation if file size is supported
 * @remark returns true if null or undefined
 */
export function checkFileSize(files: any | null | undefined): boolean {
  const file = getFile(files as File[]);
  if (!file) {
    return true;
  }

  const fileSizeInBytes = file.size;
  const fileSizeInMB = Math.round(fileSizeInBytes / 1024 / 1024); 
  return (fileSizeInMB <= maxFileSizeInMB);
}

/**
 * Checks if the file type is supported. Files should only be
 * medical documents so pdfs, and images should suffice.
 * 
 * @param files file upload. It is an any type because of yup validation.
 * @returns validation if file type is supported
 * @remark returns true if null or undefined
 */
export function checkFileType(files: any | null | undefined): boolean {
  const file = getFile(files as File[]);
  if (!file) {
    return true;
  }

  return supportedFileTypes.includes(file.type);
}

function getFile(files: File[] | null | undefined): File | null {
  if (!files || files.length === 0) {
    return null;
  }
  return files[0];
}