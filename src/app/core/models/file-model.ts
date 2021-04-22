import { FileInterface } from '@interfaces/file-interface';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { FileService } from '@app/modules/shared/file-service/services/file.service';

export class FileModel implements FileInterface {
  id: number;
  fileId?: number;
  contentType: string;
  documentType?: string;
  filename: string;
  size: number;
  userId: string;
  isAdminOnly: boolean;
  isPrivate: boolean;
  createdAt: string;
  updatedAt: string;

  private $fileLocation: string;
  private blobFile: Blob;

  public constructor(params: any, private fileService: FileService) {
    Object.assign(this, params);
  }

  public get fileLocation(): Observable<string> {
    if (this.$fileLocation) {
      return of(this.$fileLocation);
    } else {
      return this.loadFileData().pipe(
        map((blob: Blob): string => {
          this.blobFile = blob;
          const URL = window.URL || (window as any).webkitURL;
          return this.$fileLocation = URL.createObjectURL(blob);
        })
      );
    }
  }

  public getBlobFile(): Observable<Blob> {
    if (this.blobFile) {
      return of(this.blobFile);
    } else {
      return this.loadFileData().pipe(
        map((blob: Blob): Blob => {
          this.blobFile = blob;
          const URL = window.URL || (window as any).webkitURL;
          this.$fileLocation = URL.createObjectURL(blob);
          return blob;
        })
      );
    }
  }

  public getPublicFileUrl(): string {
    return this.fileService.getPublicFileUrl(this.id);
  }

  private loadFileData(): Observable<Blob> {
    return this.fileService.localFileUrl(this.id).pipe(
      map((binary: ArrayBuffer): Blob => {
          return new Blob([binary], { type: this.contentType });
        }
      ));
  }
}
