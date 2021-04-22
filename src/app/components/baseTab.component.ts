import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter, map, startWith } from 'rxjs/operators';
import { Observable } from 'rxjs';

export abstract class BaseTabComponent {

  public showTabs: Observable<boolean>;

  protected constructor(router: Router, activatedRoute: ActivatedRoute) {
    this.showTabs = router.events.pipe(
      filter(event => event instanceof NavigationEnd),
      startWith(null),
      map(() => activatedRoute.snapshot),
      map(route => {
        while (route.firstChild) {
          route = route.firstChild;
        }
        return route.data;
      }),
      map((data: any) => data[this.dataPropertyName()]));
  }

  public abstract dataPropertyName(): string;
}
