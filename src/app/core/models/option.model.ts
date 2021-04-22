export class OptionModel {
  public path: string;
  public value: string;

  constructor(data: any) {
    this.path = data.path;
    this.value = data.value;
  }
}

export class StoreOptionsModel {
  public path: string;
  public options: OptionModel[];

  constructor({ path, options }: { path: string, options: any[] }) {
    this.path = path;
    this.options = options.map((option) => (option instanceof OptionModel) ? option : new OptionModel(option));
  }
}
