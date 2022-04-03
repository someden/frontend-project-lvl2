import { linesSeparator, isObject, diffTypes } from '../utils.js';

const valueToString = (value) => {
  if (typeof value === 'string') {
    return `'${value}'`;
  }

  if (isObject(value)) {
    return '[complex value]';
  }

  return `${value}`;
};

const plain = (diffTree) => {
  const iter = (value, parents = []) =>
    value
      .flatMap(({ key, oldValue, newValue, type, children }) => {
        const pathToProperty = parents.concat(key);

        if (type === diffTypes.unchanged) {
          return children.length > 0 ? iter(children, pathToProperty) : [];
        }

        const firstPart = `Property '${pathToProperty.join('.')}' was ${type}`;

        switch (type) {
          case diffTypes.removed:
            return firstPart;
          case diffTypes.added:
            return `${firstPart} with value: ${valueToString(newValue)}`;
          default:
            return `${firstPart}. From ${valueToString(
              oldValue
            )} to ${valueToString(newValue)}`;
        }
      })
      .join(linesSeparator);

  return iter(diffTree);
};

export default plain;
