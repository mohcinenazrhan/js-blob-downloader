# js-blob-downloader

> JS blob downloader for any web-based project.

## Overview

The `js-blob-downloader` library simplifies Blob downloads in web-based projects by providing convenient functions for handling different scenarios. Whether you need to download Blobs with or without a Content-Disposition header, this library has you covered.


<div align="center">
    <img src="https://badgen.net/npm/v/js-blob-downloader" alt="NPM Version" />
    <img src="https://badgen.net/bundlephobia/min/js-blob-downloader" alt="min size"/>
    <img src="https://github.com/mohcinenazrhan/js-blob-downloader/actions/workflows/tests.yml/badge.svg" alt="Build Status" />
</div>

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
