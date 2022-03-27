import { parseFile } from './parsers.js';

const genDiff = (filepath1, filepath2) => {
  const obj1 = parseFile(filepath1);
  const obj2 = parseFile(filepath2);

  const tab = '  ';
  const sep = '\n';

  const diff = Object.keys({ ...obj1, ...obj2 })
    .sort()
    .reduce((acc, key) => {
      if (obj1[key] === obj2[key]) {
        return [...acc, `${tab}  ${key}: ${obj1[key]}`];
      }

      const obj1Entry = Object.hasOwn(obj1, key)
        ? [`${tab}- ${key}: ${obj1[key]}`]
        : [];
      const obj2Entry = Object.hasOwn(obj2, key)
        ? [`${tab}+ ${key}: ${obj2[key]}`]
        : [];

      return [...acc, ...obj1Entry, ...obj2Entry];
    }, []);

  return ['{', ...diff, '}'].join(sep);
};

export default genDiff;
