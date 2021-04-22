export interface ExtensionsDataValidatorsInterface {
  name: string;
  dataType: string;
  validators: ExtensionsValidatorInterface[];
}

export interface ExtensionsValidatorInterface {
  name: string;
  options?: {
    value: number;
  };
  conditions?: any;
}
