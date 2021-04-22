export class SiteTextModel {
  key: string;
  label: string;
  value: string;

  constructor(data: any) {
    Object.assign(this, data);
  }
}
