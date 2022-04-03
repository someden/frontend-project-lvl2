import { linesSeparator, isObject, diffTypes } from '../utils.js';

const stylish = (diffTree) => {
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

            const removed = `${indent}- ${key}: ${iter(oldValue, nextDepth)}`;
            const added = `${indent}+ ${key}: ${iter(newValue, nextDepth)}`;

            switch (type) {
              case diffTypes.removed:
                return removed;
              case diffTypes.added:
                return added;
              default:
                return [removed, added];
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

export default stylish;
