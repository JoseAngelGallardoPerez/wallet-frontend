import { Observable } from 'rxjs';
import { FileModel } from '@models/file-model';
import { Verification } from '@constants/verification';

export class VerificationModel {
  id: number;
  status?: string;
  type: string;
  fileId?: number;
  size?: number;
  files?: FileModel[];
  documentType?: Verification;
  filename?: string;
  controlName?: string;
  createdAt: string;
  updatedAt?: string;
  fileLocation?: Observable<string>;
}
