export interface FeeParameterInterface {
  currencyCode: string;
  delete?: boolean;
  base?: string;
  max?: string;
  min?: string;
  percent?: string;
}

export class FeeParameterRequest implements FeeParameterInterface {
  public currencyCode: string;
  public delete?: boolean;
  public base?: string;
  public max?: string;
  public min?: string;
  public percent?: string;

  constructor(data: object) {
    Object.keys(data).forEach((key) => {
      if (data[key] !== null && data[key] !== '') {
        this[key] = (typeof data[key] === 'boolean') ? data[key] : data[key].toString();
      }
    });
  }
}

export class FeeRequest {
  public name: string;
  public id?: number;
  public requestSubject?: string;
  public userGroupIds: number[];
  parameters: FeeParameterRequest[];
  relations: { userGroupId: number, attached: boolean }[];

  constructor(fee: any, parameters: object[], relations?: { userGroupId: number, attached: boolean }[]) {
    this.name = fee.name;
    if (fee.id) {
      this.id = fee.id;
    }
    if (fee.requestSubject) {
      this.requestSubject = fee.requestSubject;
    }
    if (fee.userGroupIds) {
      this.userGroupIds = fee.userGroupIds;
    }
    this.parameters = parameters.map((p) => new FeeParameterRequest(p));
    if (relations) {
      this.relations = relations;
    }

  }
}
