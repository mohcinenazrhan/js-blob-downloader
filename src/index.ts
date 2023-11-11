/**
 * Get FileName from Disposition header
 * @param disposition string
 * @param fallbackFileName string
 */
export function getFileNameDisposition(
  disposition: string,
  fallbackFileName: string,
): string {
  const fileNameRegex: RegExp = /filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/;
  const matches: RegExpExecArray | null = fileNameRegex.exec(disposition);
  const fileName: string =
    matches !== null && matches[1]
      ? matches[1].replace(/['"]/g, '')
      : fallbackFileName;

  return fileName;
}

interface Responses {
  notFileName: string;
  download: string;
}

const responses: Responses = {
  notFileName: 'no file name provided',
  download: 'download',
};

/**
 * Download Blob
 * @param data Blob
 * @param fileName string
 */
export function downloadBlob(data: Blob, fileName: string): string {
  if (fileName.trim() === '') return responses.notFileName;

  const blob: Blob = new Blob([data]);
  const downloadUrl: string = window.URL.createObjectURL(blob);

  const link: HTMLAnchorElement = document.createElement('a');
  link.href = downloadUrl;
  link.setAttribute('download', fileName);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);

  return responses.download;
}

/**
 * Download Blob by Disposition header
 * @param data Blob
 * @param disposition string
 * @param fallbackFileName string
 */
export default function downloadBlobDisposition(
  data: Blob,
  disposition: string,
  fallbackFileName: string,
): string {
  const fileName = getFileNameDisposition(disposition, fallbackFileName);
  return downloadBlob(data, fileName);
}
