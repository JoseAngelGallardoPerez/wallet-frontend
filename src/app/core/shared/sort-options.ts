import { Params } from '@angular/router';

export enum Direction {
  Asc,
  Desc,
}

export class SortOption {
  public field: string;
  public direction: Direction;

  public constructor(field: string, direction: Direction) {
    this.field = field;
    this.direction = direction;
  }
}

export const DEFAULT_DIRECTION = Direction.Desc;

export class SortOptions {
  private options: SortOption[];

  public constructor(queryParams: Params) {
    if (!queryParams.sort) {
      this.options = [];
      return;
    }

    const sortStrings = queryParams.sort.split(',');
    this.options = sortStrings.map(e => {

      if (e[0] === '-') {
        return new SortOption(e.slice(1), Direction.Desc);
      } else {
        return new SortOption(e, Direction.Asc);
      }
    });
  }

  public addSingleDefaultOrInvertOption(field: string): void {
    const foundOption = this.options.find(e => e.field === field);
    if (foundOption) {
      foundOption.direction = foundOption.direction === Direction.Asc ? Direction.Desc : Direction.Asc;
    } else {
      this.clear();
      this.options.push(new SortOption(field, DEFAULT_DIRECTION));
    }
  }

  public addSortOption(field: string, direction: Direction): void {
    const foundOption = this.options.find(e => e.field === field);
    if (foundOption) {
      foundOption.direction = direction;
    } else {
      this.clear();
      this.options.push(new SortOption(field, direction));
    }
  }

  public clear() {
    this.options = [];
  }

  public isSorted(field: string, direction: Direction): boolean {
    const foundOption = this.options.find(e => e.field === field);
    if (foundOption) {
      return foundOption.direction === direction;
    }
    return false;
  }

  public isAnySorted(): boolean {
    return this.options.length > 0;
  }

  public getParams(): {} {
    if (this.options.length !== 0) {
      const fields = this.options.map(e => {
        if (e.direction === Direction.Desc) {
          return '-' + e.field;
        }
        return e.field;
      });

      return {
        sort: fields.join(','),
      };
    }

    return {};
  }

  public getOptions(): SortOption[] {
    return this.options;
  }
}
