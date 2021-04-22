import { Action } from '@ngrx/store';

type Type<T> = new (...args: any[]) => T;

export function staticImplementsDecorator <T>() {
  return (constructor: T) => {
  };
}

export interface CustomActionInterface<T, S> extends Type<Action> {
  type: string;

  reduce(state: S, action: T): S;
}
