import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None
})
export class PaginationComponent {
  @Input() public maxSizeButtons = 5;
  @Input() public paginationId: string;
  @Output() pageChange: EventEmitter<number> = new EventEmitter<number>();
}
