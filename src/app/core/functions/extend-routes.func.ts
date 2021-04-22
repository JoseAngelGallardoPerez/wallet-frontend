import { Route } from '@angular/router';

export function extendRoutes(defaultRoutes: Route[], extendWith: Route[]) {
  extendWith.forEach((extendRoute: Route) => {
    const defaultRoute = defaultRoutes.find(route => extendRoute.path === route.path);
    if (defaultRoute) {
      defaultRoutes[defaultRoutes.indexOf(defaultRoute)] = extendRoute;
    } else {
      defaultRoutes.push(extendRoute);
    }
  });
  return defaultRoutes;
}
