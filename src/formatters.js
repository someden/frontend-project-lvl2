import { isObject, diffTypes } from './utils.js';

export const stylish = (diffTree) => {
  const linesSeparator = '\n';
  const replacer = '  ';

  const iter = (value, depth) => {
    if (!isObject(value)) {
      return `${value}`;
    }

    const indent = replacer.repeat(depth);
    const bracketIndent = replacer.repeat(depth - 1);
    const nextDepth = depth + 2;

    return [
      '{',
      ...(Array.isArray(value)
        ? value.flatMap(({ key, oldValue, newValue, type, children }) => {
            if (type === diffTypes.unchanged) {
              return `${indent}  ${key}: ${
                children.length > 0
                  ? iter(children, nextDepth)
                  : iter(oldValue, nextDepth)
              }`;
            }

            const deleted = `${indent}- ${key}: ${iter(oldValue, nextDepth)}`;
            const added = `${indent}+ ${key}: ${iter(newValue, nextDepth)}`;

            switch (type) {
              case diffTypes.deleted:
                return deleted;
              case diffTypes.added:
                return added;
              default:
                return [deleted, added];
            }
          })
        : Object.entries(value).map(
            ([key, val]) => `${indent}  ${key}: ${iter(val, nextDepth)}`
          )),
      `${bracketIndent}}`,
    ].join(linesSeparator);
  };

  return iter(diffTree, 1);
};

export const getFormatter = (type) => {
  switch (type) {
    default:
      return stylish;
  }
};
