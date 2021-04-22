const snakeToCamelCase = (str) => str.replace(/[-_]+([a-z0-9])/g, (g) => g[1].toUpperCase())
  .replace(/^\w/, (g) => g[0].toLowerCase());

const camelCaseToSnakeCase = (str) => {
  return str.replace(/(?:^|\.?)([A-Z0-9])/g, (e, t) => {
    return '_' + t.toLowerCase();
  }).replace(/^_/, '');
};

const mergeSnackKeysProperties = <T>(target: T, source: object): T => {
  Object.keys(source).forEach((key) => {
    if (typeof source[key] === 'object' && source[key] !== null && !(source[key] instanceof Array)) {
      target[snakeToCamelCase(key)] = target[snakeToCamelCase(key)] || {};
      mergeSnackKeysProperties(target[snakeToCamelCase(key)], source[key]);
    } else {
      target[snakeToCamelCase(key)] = source[key];
    }
  });
  return target;
};

const transferToCamelCaseObject = <T>(target: T): object => {
  const responce: object = {};
  Object.keys(target).forEach((key) => {
    if (typeof target[key] === 'object' && target[key] !== null && !(target[key] instanceof Array)) {
      responce[snakeToCamelCase(key)] = transferToCamelCaseObject(target[key]);
    } else {
      responce[snakeToCamelCase(key)] = target[key];
    }
  });
  return responce;
};

// const transferToSnakeCaseObject = <T>(target: T): object => {
//   const responce: object = {};
//   Object.keys(target).forEach((key) => {
//     if (typeof target[key] === 'object' && target[key] !== null &&  !(target[key] instanceof Array)) {
//       responce[camelCaseToSnakeCase(key)] = transferToSnakeCaseObject(target[key]);
//     } else {
//       responce[camelCaseToSnakeCase(key)] = target[key];
//     }
//   });
//   return responce;
// };

const convertToIso2 = <T>(target: T): object => {
  const response: object = {};
  Object.keys(target).forEach((key) => {
    response[key.replace('iso_2', 'iso2')] = target[key];
  });
  return response;
};

const convertStringToIso2 = (value: string): string => {
  return value.replace('iso_2', 'iso2');
};

const camelCaseSeparate = <T>(value: string): string => {
  return value.replace(/([a-z])([A-Z])/g, '$1 $2');
};

export {
  convertToIso2,
  convertStringToIso2,
  snakeToCamelCase,
  camelCaseToSnakeCase,
  mergeSnackKeysProperties,
  transferToCamelCaseObject,
  camelCaseSeparate
};
