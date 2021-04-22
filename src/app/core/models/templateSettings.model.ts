export class TemplateSettingsModel {
  public id: number;
  public title: string;
  public legend: string;
  public subject: string;
  public content: string;
  public status: string;

  constructor(data: object) {
    Object.assign(this, data);
  }
}

export class StateTemplateSettingsModel {
  public path: string;
  templates: TemplateSettingsModel[];

  constructor(data: {path: string, templates: any[]}) {
    this.path = data.path;
    this.templates = data.templates.map((template) => new TemplateSettingsModel(template));
  }
}
