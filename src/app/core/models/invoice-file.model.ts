export interface InvoiceFileInterface {
  id: number;
  name: string;
  new: number;
  updated: number;
  error: number;
  source: string;
  userUID: string;
  errors: string[];
}

export class InvoiceFile {
  id: number;
  name: string;
  new: number;
  updated: number;
  error: number;
  source: string;
  userUID: string;
  errors: string[];

  constructor(data: InvoiceFileInterface) {
    this.id = data.id;
    this.name = data.name;
    this.new = data.new;
    this.updated = data.updated;
    this.error = data.error;
    this.source = data.source;
    this.userUID = data.userUID;
    this.errors = data.errors;
  }
}
