import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
import { readFileSync } from 'fs';
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

const plainResult = readFileSync(getFixturePath('plainResult.txt'), 'utf-8');
const stylishResult = readFileSync(
  getFixturePath('stylishResult.txt'),
  'utf-8'
);

test('genDiff JSON', () => {
  expect(genDiff(filepathJson1, filepathJson2)).toBe(stylishResult);
});

test('genDiff YAML', () => {
  expect(genDiff(filepathYml1, filepathYml2)).toBe(stylishResult);
});

test('genDiff JSON with plain format', () => {
  expect(genDiff(filepathJson1, filepathJson2, 'plain')).toBe(plainResult);
});

test('genDiff YAML with plain format', () => {
  expect(genDiff(filepathYml1, filepathYml2, 'plain')).toBe(plainResult);
});
