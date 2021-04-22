import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, PRIMARY_OUTLET, Router } from '@angular/router';
import { filter } from 'rxjs/operators';

interface ICrumb {
  label: string;
  params: any;
  url: string;
}

@Component({
  selector: 'app-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styleUrls: ['./breadcrumbs.component.scss']
})
export class BreadcrumbsComponent implements OnInit {
  private crumbs: ICrumb[];

  constructor(
    private router: Router,
    private route: ActivatedRoute
  ) {
  }

  ngOnInit(): void {
    this.crumbs = this.getBreadcrumbs(this.route.root);

    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(event => {
        const root: ActivatedRoute = this.route.root;
        this.crumbs = this.getBreadcrumbs(root);
      });
  }

  public get breadcrumbs(): ICrumb[] {
    if (this.crumbs && this.crumbs.length === 1 && !this.crumbs[0].url) {
      return [{ ...this.crumbs[0], url: '../' }];
    }

    return this.crumbs ? this.crumbs.filter((crumb: ICrumb) => crumb.label) : [];
  }

  private getBreadcrumbs(route: ActivatedRoute, url: string = '', breadcrumbs: ICrumb[] = []): ICrumb[] {
    const children: ActivatedRoute[] = route.children;

    if (children.length === 0) {
      return breadcrumbs;
    }

    for (const child of children) {
      if (child.outlet !== PRIMARY_OUTLET) {
        continue;
      }

      if (!child.snapshot.data.hasOwnProperty('crumbs')) {
        return this.getBreadcrumbs(child, url, breadcrumbs);
      }

      const routeURL: string = child.snapshot.url.map(segment => segment.path).join('/');

      if (routeURL) {
        url += `/${routeURL}`;
      }

      breadcrumbs[0] = {
        label: child.snapshot.data.crumbs,
        params: child.snapshot.params,
        url: url
      };

      return this.getBreadcrumbs(child, url, breadcrumbs);
    }
  }
}
