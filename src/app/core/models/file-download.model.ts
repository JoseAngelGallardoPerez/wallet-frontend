export class FileDownloadModel {
  public blob: Blob;
  public filename: string;

  public constructor(blob: Blob, filename: string) {
    this.blob = blob;
    this.filename = filename;
  }
}
