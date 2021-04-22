import { Params } from '@angular/router';

export class PaginationOptions {
  public pageSize: string;
  public pageNumber: string;

  public constructor(params: Params) {
    if (params['page[size]']) {
      this.pageSize = params['page[size]'];
    }

    if (params['page[number]']) {
      this.pageNumber = params['page[number]'];
    } else {
      this.pageNumber = '1';
    }
  }

  public setPageSize(pageSize: string) {
    this.pageNumber = '1';
    this.pageSize = pageSize;
  }

  public setPage(pageNumber: string) {
    this.pageNumber = pageNumber;
  }

  public resetPageNumber(): void {
    this.pageNumber = '1';
  }

  public getPage(): string {
    return this.pageNumber;
  }

  public getPageSize(): string {
    return this.pageSize;
  }

  public getParams(): Object {
    const params = {};
    if (this.pageSize) {
      params['page[size]'] = this.pageSize;
    }
    if (this.pageNumber) {
      params['page[number]'] = this.pageNumber;
    }
    return params;
  }
}
