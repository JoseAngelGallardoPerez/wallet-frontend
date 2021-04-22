import { Action } from '@ngrx/store';

const typeCache: { [label: string]: boolean } = {};
export function checkToBeUniqueType<T>(label: T | ''): T {
  if (typeCache[<string>label]) {
    throw new Error(`Action type "${label}" is not unique"`);
  }

  typeCache[<string>label] = true;

  return <T>label;
}

export function buildReducer<T>( ...actionClasses: { type: string, reduce: (state: T, action: Action) => T }[]) {
  const handlers: {
    [key: string]: (state: T, action: Action) => T
  } = {};
  actionClasses.forEach((ac) => {
    handlers[ac.type] = ac.reduce;
  });
  return (state: T, action: Action): T => handlers[action.type] ? handlers[action.type](state, action) : state;
}
