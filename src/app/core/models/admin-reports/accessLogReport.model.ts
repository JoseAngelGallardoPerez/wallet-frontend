import { UserReportInterface } from '@interfaces/admin-reports/userReportInterface';

export class AccessLogReportModel {
  public alid: number;
  public ip: string;
  public createdAt: string;
  user: UserReportInterface;

  constructor(data: any) {
    Object.assign(this, data);
  }
}
