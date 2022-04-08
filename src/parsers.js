import path from 'path';
import { readFileSync } from 'fs';
import { load } from 'js-yaml';

export const getAbsolutePath = (filepath) => path.resolve(process.cwd(), filepath);

export const isJson = (ext) => ext === '.json';

export const isYaml = (ext) => ext === '.yml' || ext === '.yaml';

export const getParser = (filepath) => {
  const ext = path.extname(filepath).toLowerCase();

  if (isJson(ext)) {
    return JSON.parse;
  }

  if (isYaml(ext)) {
    return load;
  }

  throw new Error('Unknown file extension.');
};

export const parseFile = (filepath) => {
  const file = readFileSync(getAbsolutePath(filepath));
  const parse = getParser(filepath);

  return parse(file);
};
