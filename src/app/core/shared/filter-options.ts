import { Params } from '@angular/router';

class FilterOption {
  public field: string;
  public values: string[];

  public constructor(field: string, values: string[]) {
    this.field = field;
    this.values = values;
  }
}

export class FilterOptions {
  private readonly options: FilterOption[];
  private sort: string;

  public constructor(queryParams?: Params) {
    if (queryParams === undefined) {
      this.options = [];
      return;
    }

    const filteredKeys = Object.keys(queryParams).filter(e => e.startsWith('filter['));
    this.options = filteredKeys.map(e => {
      const regex = new RegExp(/filter\[(.*?)\]/);
      const matchObj = regex.exec(e);
      return new FilterOption(matchObj[1],  queryParams[e].split(','));
    });
  }

  public addFilter(field: string, values: string[]): void {
    const filter = this.options.find(e => e.field === field);
    if (filter) {
      filter.values = values;
      return;
    }
    this.options.push(new FilterOption(field, values));
  }

  public getFilterValues(field: string): string[] {
    const foundOption = this.options.find(e => e.field === field);
    if (!foundOption) {
      return [];
    }
    return foundOption.values;
  }

  public removeFilter(field: string): void {
    const index = this.options.findIndex(e => e.field === field);
    this.options.splice(index, 1);
  }

  public setSort(sort: string): void {
    this.sort = sort;
  }

  public getParams(): {} {
    const params = {};

    if (this.sort) {
      params['sort'] = this.sort;
    }

    if (!this.options) {
      return params;
    }

    this.options.forEach(e => {
      params[`filter[${e.field}]`] = e.values.join(',');
    });

    return params;
  }
}
