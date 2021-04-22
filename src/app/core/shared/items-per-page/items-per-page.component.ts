import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-items-per-page',
  templateUrl: './items-per-page.component.html'
})
export class ItemsPerPageComponent {

  @Input() public perPage = 10;

  @Output() changePerPage: EventEmitter<number> = new EventEmitter<number>();

  public itemsCount = [10, 25, 50, 100];

  constructor() {
  }

  public selectCount(count: number): void {
    this.changePerPage.emit(count);
  }
}
