import { Params } from '@angular/router';

export class IncludesOption {
  private readonly fields: string[];

  public constructor(queryParams: Params) {
    const filteredKeys = Object.keys(queryParams).filter(e => e === 'include');
    this.fields = [];
    filteredKeys.forEach(e => {
      const options = queryParams[e].split(',');
      this.fields.push(...options);
    });
  }

  public addIncludes(field: string) {
    const foundItem = this.fields.find(e => e === field);
    if (!foundItem) {
      this.fields.push(field);
    }
  }

  public getParams(): {} {
    if (this.fields.length < 1) {
      return {};
    }

    return {
      include: this.fields.join(','),
    };
  }
}
