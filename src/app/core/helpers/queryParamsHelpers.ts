import { camelCaseToSnakeCase, snakeToCamelCase } from '@helpers/stringHelpers';

const queryParamsStringify = function (queryObject: object, snakeCase = true): { [key: string]: string } {
  const reducer: { [key: string]: string } = {};
  encode(queryObject, reducer, snakeCase);
  return reducer;
};

const queryParamsParse = function (queryObject: object): { [key: string]: string | object } {
  const reducer: { [key: string]: string | object } = {};
  Object.keys(queryObject).forEach((key) => {
    const subKeys = key.match(/([a-zA-Z0-9\-_]+)|\[([[]]+?)\]/g);

    subKeys.map((snakeKey) => snakeToCamelCase(snakeKey))
      .reduce((accumulator, subKey, index): { [key: string]: string | object } => {

      if (index === subKeys.length - 1) {
        accumulator[subKey] = queryObject[key];
      } else {
        accumulator[subKey] = accumulator[subKey] || {};
      }

      return accumulator[subKey];
    }, reducer);
  });
  return reducer;
};

function encode(queryObject: object, reducer: object, snakeCase, nesting = ''): void {
  Object.keys(queryObject).forEach((key) => {
    const valueKey = nesting ?
      `${nesting}[${snakeCase ? camelCaseToSnakeCase(key) : key}]` : snakeCase ? camelCaseToSnakeCase(key) : key;
    if (typeof queryObject[key] === 'object' && queryObject[key] !== null) {
      encodeObject(queryObject, reducer, snakeCase, key, valueKey);
    } else {
      encodeValue(queryObject, reducer, key, valueKey);
    }
  });
}

function encodeObject(queryObject: object, reducer: object, snakeCase, key, valueKey) {
  if (queryObject[key] instanceof Array) {
    reducer[valueKey] = queryObject[key];
  } else {
    encode(queryObject[key], reducer, snakeCase, valueKey);
  }
}

function encodeValue(queryObject: object, reducer: object, key, valueKey) {
  if (queryObject[key] !== '') {
    reducer[valueKey] = queryObject[key];
  }
}

export {
  queryParamsStringify,
  queryParamsParse
};
