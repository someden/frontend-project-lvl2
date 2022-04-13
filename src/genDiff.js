import path from 'path';
import { readFileSync } from 'fs';
import { parse } from './parsers.js';
import { getFormatter } from './formatters/index.js';
import { getDiffTree } from './utils.js';

const getAbsolutePath = (filepath) => path.resolve(process.cwd(), filepath);

const getExtname = (filepath) => path.extname(filepath);

const getData = (filepath) => parse(readFileSync(getAbsolutePath(filepath)), getExtname(filepath));

const genDiff = (filepath1, filepath2, formatName) => {
  const data1 = getData(filepath1);
  const data2 = getData(filepath2);
  const format = getFormatter(formatName);
  const diffTree = getDiffTree(data1, data2);
  const formatedDiff = format(diffTree);

  return formatedDiff;
};

export default genDiff;
