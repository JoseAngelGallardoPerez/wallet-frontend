export class Invoice {
  public id: number;
  public userUID: string;
  public invoiceID: string;
  public buyerID: string;
  public companyName: string;
  public supplierID: string;
  public invoiceDate: Date;
  public creditMemo: boolean;
  public memoDate: Date;
  public currency: string;
  public maturityDate: Date;
  public amount: number;
  public status: string;
  public createdAt: Date;
  public isSelected: boolean;
  public updatedAt: Date;
  public memoAmount: string;
  public error: boolean;

  public constructor(params: any) {
    this.isSelected = false;
    Object.assign(this, params);
  }
}
