import json from './json.js';
import plain from './plain.js';
import stylish from './stylish.js';

export const getFormatter = (name) => {
  switch (name) {
    case 'json':
      return json;
    case 'plain':
      return plain;
    default:
      return stylish;
  }
};

export default getFormatter;
