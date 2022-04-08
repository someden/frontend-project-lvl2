import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
import { readFileSync } from 'fs';
import { test, expect } from '@jest/globals';
import genDiff from '../index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);

const filepathJson1 = getFixturePath('file1.json');
const filepathYml2 = getFixturePath('file2.yml');

const plainResult = readFileSync(getFixturePath('plainResult.txt'), 'utf-8');
const stylishResult = readFileSync(
  getFixturePath('stylishResult.txt'),
  'utf-8',
);
const jsonResult = readFileSync(getFixturePath('jsonResult.txt'), 'utf-8');

test('genDiff', () => {
  expect(genDiff(filepathJson1, filepathYml2)).toBe(stylishResult);
});

test('genDiff with plain format', () => {
  expect(genDiff(filepathJson1, filepathYml2, 'plain')).toBe(plainResult);
});

test('genDiff with json format', () => {
  expect(genDiff(filepathJson1, filepathYml2, 'json')).toBe(jsonResult);
});
