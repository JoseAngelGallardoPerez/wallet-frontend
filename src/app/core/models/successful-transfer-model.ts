import { ISuccessfulTransfer } from '@interfaces/transfer-request-interface';

export class SuccessfulTransferModel implements ISuccessfulTransfer {

  id: number;
  userId: string;
  status: string;
  subject: string;
  rate: string;
  description: string;
  createdAt: string;

  constructor(params: any) {
    (<any>Object).assign(this, params);
  }

}
