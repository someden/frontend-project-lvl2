import { parseFile } from './parsers.js';
import { getFormatter } from './formatters/index.js';
import { getDiffTree } from './utils.js';

const genDiff = (filepath1, filepath2, formatName) => {
  const obj1 = parseFile(filepath1);
  const obj2 = parseFile(filepath2);
  const format = getFormatter(formatName);
  const diffTree = getDiffTree(obj1, obj2);
  const formatedDiff = format(diffTree);

  return formatedDiff;
};

export default genDiff;
