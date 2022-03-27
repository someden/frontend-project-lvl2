import path from 'path';
import { readFileSync } from 'fs';

export default function genDiff(filepath1, filepath2) {
  const absoluteFilepath1 = path.resolve(process.cwd(), filepath1);
  const absoluteFilepath2 = path.resolve(process.cwd(), filepath2);

  const file1 = readFileSync(absoluteFilepath1);
  const file2 = readFileSync(absoluteFilepath2);

  const json1 = JSON.parse(file1);
  const json2 = JSON.parse(file2);
  const tab = '  ';
  const sep = '\n';

  const diff = Object.keys({ ...json1, ...json2 })
    .sort()
    .reduce((acc, key) => {
      if (json1[key] === json2[key]) {
        return [...acc, `${tab}  ${key}: ${json1[key]}`];
      }

      const json1Part = Object.hasOwn(json1, key)
        ? [`${tab}- ${key}: ${json1[key]}`]
        : [];
      const json2Part = Object.hasOwn(json2, key)
        ? [`${tab}+ ${key}: ${json2[key]}`]
        : [];

      return [...acc, ...json1Part, ...json2Part];
    }, []);

  return ['{', ...diff, '}'].join(sep);
}
