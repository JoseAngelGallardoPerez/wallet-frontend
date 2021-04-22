import { Directive, HostListener, Input } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';

@Directive({
  selector: '[previousRoute]'
})
export class PreviousRouteDirective {
  constructor(
    private location: Location,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  @Input() deep: number;
  @HostListener('click')
  onClick() {
    if (this.deep) {
      window.history.go(this.deep);
    }
    this.location.back();
  }
}
