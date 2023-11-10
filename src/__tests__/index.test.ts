import downloadBlobDisposition from '../index';

describe('downloadFileDisposition', () => {
  let anchorMocked: Pick<HTMLAnchorElement, 'innerHTML' | 'href' | 'click' | 'setAttribute'>;

  beforeEach(() => {
    anchorMocked = {
      innerHTML: '',
      href: '',
      click: jest.fn(),
      setAttribute: jest.fn(),
    };

    global.URL.createObjectURL = jest.fn(() => '');
    document.body.appendChild = jest.fn();
    document.body.removeChild = jest.fn();
    jest.spyOn(document, 'createElement').mockImplementation(() => (anchorMocked as any));
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  test('Download file with disposition file name', () => {
    const fileName = 'test.pdf';
    const disposition = `attachment; filename=${fileName}`;
    const fakeBlob = new Blob(['testing'], {
      type: 'application/pdf',
    });
    
    const res = downloadBlobDisposition(fakeBlob, disposition, 'file.pdf');
  
    expect(global.URL.createObjectURL).toHaveBeenCalledWith(fakeBlob);
    expect(anchorMocked.setAttribute).toHaveBeenCalledWith('download', fileName);
    expect(anchorMocked.click).toHaveBeenCalled();
    expect(res).toBe('download');
  });

  test('downloads file with fallback file name', () => {
    const fallbackFileName = 'file.pdf';
    const disposition = `attachment; filename=`;
    const fakeBlob = new Blob(['testing'], {
      type: 'application/pdf',
    });

    const res = downloadBlobDisposition(fakeBlob, disposition, fallbackFileName);

    expect(global.URL.createObjectURL).toHaveBeenCalledWith(fakeBlob);
    expect(anchorMocked.setAttribute).toHaveBeenCalledWith(
      'download',
      fallbackFileName,
    );
    expect(anchorMocked.click).toHaveBeenCalled();
    expect(res).toBe('download');
  });

  test('returns "no file name provided"', () => {
    const fallbackFileName = '';
    const disposition = `attachment; `;
    const fakeBlob = new Blob(['testing'], {
      type: 'application/pdf',
    });

    const res = downloadBlobDisposition(fakeBlob, disposition, fallbackFileName);

    expect(global.URL.createObjectURL).not.toHaveBeenCalled();
    expect(anchorMocked.setAttribute).not.toHaveBeenCalled();
    expect(anchorMocked.click).not.toHaveBeenCalled();
    expect(res).toBe('no file name provided');
  });
});
