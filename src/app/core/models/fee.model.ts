export class FeeModel {
  public id?: number;
  public name: string;
  public requestSubject: FeeRequestSubjects;
  public userGroups: number[];
  public createdAt: string;

  constructor(data: Object) {
    Object.assign(this, data);
  }
}

export enum FeeRequestSubjects {
  TBA = 'tba',
  TBU = 'tbu',
  CFT = 'cft',
  OWT = 'owt',
  IWT = 'iwt'
}
