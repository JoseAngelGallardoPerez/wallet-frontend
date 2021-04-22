import { Directive, Input, Renderer2, ElementRef, ViewChildren } from '@angular/core';

export interface CheckEmptyTableParamsInterface {
  dataExists: boolean | number;
  message?: string;
}

@Directive({
  selector: '[checkEmptyTable]'
})
export class CheckEmptyTableDirective {
  public message = 'No results available';
  constructor(private elementRef: ElementRef, private _renderer: Renderer2) {
  }

  @ViewChildren('.no-search-results') _elem: ElementRef;
  emptyElement = this._renderer.createElement('tr');

  @Input() set checkEmptyTable(params: CheckEmptyTableParamsInterface) {
    if (params.message) {
      this.message = params.message;
    }
    this.initSomthing(params);
  }

  private initSomthing(params: CheckEmptyTableParamsInterface) {
    const parent = this.elementRef.nativeElement;
    if (!params.dataExists) {
      this.emptyElement.classList.add('no-search-results');
      this.emptyElement.innerHTML = `<td colspan="50">` +
        `<div class="no-search-icon">${this.message}</div></td>`;
      this._renderer.appendChild(parent, this.emptyElement);
    } else if (this.emptyElement) {
      this.emptyElement.innerHTML = '';
      this.emptyElement.classList.remove('no-search-results');
    }
  }
}
