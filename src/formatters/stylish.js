import _ from 'lodash';
import {
  linesSeparator, unchanged, removed, added, updated,
} from '../utils.js';

const makeMapper = (stringify) => ({
  key, oldValue, newValue, type, children,
}) => {
  switch (type) {
    case unchanged:
      return stringify(key, children.length > 0 ? children : oldValue);
    case removed:
      return stringify(key, oldValue, '-');
    case added:
      return stringify(key, newValue, '+');
    case updated:
      return [stringify(key, oldValue, '-'), stringify(key, newValue, '+')];
    default:
      throw new Error(`Unknown diff type: '${type}'!`);
  }
};

const stylish = (diffTree) => {
  const replacer = '  ';

  const iter = (tree, depth) => {
    if (!_.isObject(tree)) {
      return `${tree}`;
    }

    const indent = replacer.repeat(depth);
    const bracketIndent = replacer.repeat(depth - 1);
    const nextDepth = depth + 2;
    const stringify = (key, value, sign = ' ') => `${indent}${sign} ${key}: ${iter(value, nextDepth)}`;
    const diffBody = Array.isArray(tree)
      ? tree.flatMap(makeMapper(stringify))
      : Object.entries(tree).map(([key, value]) => stringify(key, value));

    return ['{', ...diffBody, `${bracketIndent}}`].join(linesSeparator);
  };

  return iter(diffTree, 1);
};

export default stylish;
