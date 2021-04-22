export class FeeParameter {
  public id: number;
  public base: string;
  public currencyCode: string;
  public max: string;
  public min: string;
  public percent: string;
  public transferFeeId: number;

  constructor(data: object) {
    Object.assign(this, data);
  }
}

export class StoreFeeParameters {
  public id: number;
  public parameters: FeeParameter[];

  constructor(id: number, parameters: FeeParameter[]) {
    this.id = id;
    this.parameters = parameters;
  }
}
