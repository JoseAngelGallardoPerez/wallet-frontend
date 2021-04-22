import { Route } from '@angular/router';

export function replaceRouteConfigSettings(baseRouting: Route[], path: string, substitute: Route): boolean {
  const destination: Route = depthSearch(baseRouting, path);
  if (destination) {
    Object.keys(substitute).forEach((key) => {
      destination[key] = substitute[key];
    });
    return true;
  }
  return false;
}

export function depthSearch(baseRouting: Route[], path: string): Route {
  const buffer: Route[] = [...baseRouting];
  for (let i = 0; i < buffer.length; i++) {
    if (buffer[i].path === path) {
      return buffer[i];
    } else if (buffer[i].children) {
      buffer.push(...buffer[i].children);
    }
  }
  return null;
}
