export interface StatusInvoice {
  status: string;
  invoiceIDs: number[];
  successIDs?: number[];
  errorIDs?: number[];
  errors?: string[];
}
