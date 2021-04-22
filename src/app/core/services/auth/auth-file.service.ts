import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ApiError } from '@models/api-error.model';
import { FileModel } from '@models/file-model';
import { CallResponceInterface } from '@interfaces/callResponce.interface';
import { FileService } from '@app/modules/shared/file-service/services/file.service';
import { AuthFileApiService } from '@services/auth/auth-file-api.service';

@Injectable()
export class AuthFileService {

  public constructor(
    private apiService: AuthFileApiService,
    private fileService: FileService) {
  }

  public uploadFileToProfile(userId: string,
                             formData: FormData,
                             options: {isAdminOnly?: boolean, isPrivate?: boolean} = {}):
    Observable<{success: boolean, errors?: ApiError[], data?: FileModel}> {
    return this.apiService.apiUploadFileToProfileSignUp(userId, formData).pipe(
      map(
        ({ data, error }: CallResponceInterface)
          : {success: boolean, errors?: ApiError[], data?: FileModel} => {
          if (!error) {
            return { success: true, data: new FileModel(data, this.fileService) };
          }
          return { success: false, errors: <ApiError[]>data };
        }));
  }

  public deleteFileFromSignUp(fileId: string): Observable<{success: boolean, errors?: ApiError[], fileId?: string}> {
    return this.apiService.apiDeleteFileFromProfileSignUp(fileId).pipe(
      map(
        ({ data, error }: CallResponceInterface)
          : {success: boolean, errors?: ApiError[], fileId?: string} => {
          if (!error) {
            return { success: true, fileId };
          }
          return { success: false, errors: <ApiError[]>data };
        }));
  }
}
