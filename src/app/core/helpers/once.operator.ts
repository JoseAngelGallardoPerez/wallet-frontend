import { Observable } from 'rxjs';

export function once<T>(next?: (x: T) => void) {
  let init = false;
  return function mySimpleOperatorImplementation(source) {
    return Observable.create(subscriber => {
      return source.subscribe(value => {
          if (!init) {
            next(value);
            init = true;
          }
          subscriber.next(value);
        },
        err => subscriber.error(err),
        () => subscriber.complete());
    });
  };
}
