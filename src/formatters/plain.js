import _ from 'lodash';
import {
  linesSeparator, unchanged, removed, added, updated,
} from '../utils.js';

const stringify = (value) => {
  if (_.isObject(value)) {
    return '[complex value]';
  }

  if (typeof value === 'string') {
    return `'${value}'`;
  }

  return `${value}`;
};

const makeMapper = (iter, parents = '') => ({
  key, oldValue, newValue, type, children,
}) => {
  const property = parents ? `${parents}.${key}` : key;

  switch (type) {
    case unchanged:
      return children.length > 0 ? iter(children, property) : [];
    case removed:
      return `Property '${property}' was ${removed}`;
    case added:
      return `Property '${property}' was ${added} with value: ${stringify(newValue)}`;
    case updated:
      return `Property '${property}' was ${updated}. From ${stringify(oldValue)} to ${stringify(newValue)}`;
    default:
      throw new Error(`Unknown diff type: '${type}'!`);
  }
};

const plain = (diffTree) => {
  const iter = (tree, parents) => tree.flatMap(makeMapper(iter, parents)).join(linesSeparator);

  return iter(diffTree);
};

export default plain;
