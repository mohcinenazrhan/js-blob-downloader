# js-blob-downloader

> JS blob downloader for any web-based project.

## Install

```bash
npm install js-blob-downloader
```

or

```bash
yarn add js-blob-downloader
```

[See Example](https://github.com/mohcinenazrhan/js-blob-downloader/tree/main/example)

## Usage

### `downloadBlobDisposition`

This function will download the BLob using the disposition header to get the file name and extension.

`function downloadBlobDisposition(data: Blob, disposition: string, fallbackFileName: string): string;`

```javascript
import downloadBlobDisposition from 'js-blob-downloader';

const disposition = response.request.getResponseHeader('Content-Disposition');

if (disposition) {
  downloadBlobDisposition(response.data, disposition, 'file.pdf');
} else {
  throw new Error('Content-Disposition header is missing');
}
```

### `downloadBlob`

This function will download the Blob.

`function downloadBlob(data: Blob, fileName: string): string;`

```javascript
import { downloadBlob } from 'js-blob-downloader';

downloadBlob(blob, 'file.pdf');
```

## Built with

- TypeScript

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details
