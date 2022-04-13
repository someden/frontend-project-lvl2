import { load } from 'js-yaml';

export const isJson = (ext) => ext.toLowerCase() === '.json';

export const isYaml = (ext) => ext.toLowerCase() === '.yml' || ext.toLowerCase() === '.yaml';

export const getParser = (ext) => {
  if (isJson(ext)) {
    return JSON.parse;
  }

  if (isYaml(ext)) {
    return load;
  }

  throw new Error('Unknown file extension.');
};

export const parse = (data, ext) => getParser(ext)(data);
