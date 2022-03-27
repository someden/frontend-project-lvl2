import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
import { test, expect } from '@jest/globals';
import genDiff from '../index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const getFixturePath = (filename) =>
  path.join(__dirname, '..', '__fixtures__', filename);

const filepathJson1 = getFixturePath('file1.json');
const filepathJson2 = getFixturePath('file2.json');
const filepathYml1 = getFixturePath('file1.yml');
const filepathYml2 = getFixturePath('file2.yml');
const diff = [
  '{',
  '  - follow: false',
  '    host: hexlet.io',
  '  - proxy: 123.234.53.22',
  '  - timeout: 50',
  '  + timeout: 20',
  '  + verbose: true',
  '}',
].join('\n');

test('genDiff JSON', () => {
  expect(genDiff(filepathJson1, filepathJson2)).toBe(diff);
});

test('genDiff YAML', () => {
  expect(genDiff(filepathYml1, filepathYml2)).toBe(diff);
});
