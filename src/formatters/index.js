import plain from './plain.js';
import stylish from './stylish.js';

export const getFormatter = (name) => {
  switch (name) {
    case 'plain':
      return plain;
    default:
      return stylish;
  }
};

export default getFormatter;
