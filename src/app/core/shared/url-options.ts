import { PaginationOptions } from '@app/core/shared/pagination-options';
import { Direction, SortOptions } from '@app/core/shared/sort-options';
import { FilterOptions } from '@app/core/shared/filter-options';
import { Params } from '@angular/router';
import { Subject } from 'rxjs';
import { IncludesOption } from '@app/core/shared/includes-options';

export class UrlOptions {
  private pagination: PaginationOptions;
  private sortOptions: SortOptions;
  private filterOptions: FilterOptions;
  private includesOptions: IncludesOption;
  public onChange: Subject<UrlOptions>;

  public constructor(params: Params) {
    this.pagination = new PaginationOptions(params);
    this.sortOptions = new SortOptions(params);
    this.filterOptions = new FilterOptions(params);
    this.includesOptions = new IncludesOption(params);
    this.onChange = new Subject<UrlOptions>();
  }

  public applyNewFilter(field: string, values: string[]): void {
    this.filterOptions.addFilter(field, values);
    this.pagination.resetPageNumber();
    this.callOnChange();
  }

  public removeFilter(field: string): void {
    this.filterOptions.removeFilter(field);
    this.pagination.resetPageNumber();
    this.callOnChange();
  }

  public getFilterValues(field: string): string[] {
    return this.filterOptions.getFilterValues(field);
  }

  public addSingleDefaultOrInvertSorting(field: string): void {
    this.sortOptions.addSingleDefaultOrInvertOption(field);
    this.callOnChange();
  }

  public addSortOption(field: string, direction: Direction): void {
    this.sortOptions.addSortOption(field, direction);
    this.callOnChange();
  }

  public isSorted(field: string, direction: Direction): boolean {
    return this.sortOptions.isSorted(field, direction);
  }

  public isAnySorted(): boolean {
    return this.sortOptions.isAnySorted();
  }

  public getPageNumber(): string {
    return this.pagination.getPage();
  }

  public setPageSize(pageSize: string) {
    this.pagination.setPageSize(pageSize);
    this.callOnChange();
  }

  public getPageSize(): string {
    return this.pagination.getPageSize();
  }

  public setPageNumber(pageNumber: string) {
    this.pagination.setPage(pageNumber);
    this.callOnChange();
  }

  public addIncludes(field: string) {
    this.includesOptions.addIncludes(field);
    this.callOnChange();
  }

  public getParams(): {} {
    return {
      ...this.pagination.getParams(),
      ...this.sortOptions.getParams(),
      ...this.filterOptions.getParams(),
      ...this.includesOptions.getParams(),
    };
  }

  public getExportParams(): {} {
    return {
      ...this.sortOptions.getParams(),
      ...this.filterOptions.getParams(),
      ...this.includesOptions.getParams(),
    };
  }

  public getSortOptions(): SortOptions {
    return this.sortOptions;
  }

  private callOnChange() {
    this.onChange.next(this);
  }
}
