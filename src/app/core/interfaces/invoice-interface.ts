import { Invoice } from '@lib/modules/invoices/import-invoices/invoice';

export interface InvoiceInterface {
  columnHeader: string;
  matched: boolean;
  items: string[];
  nameMatched: Invoice;
}
