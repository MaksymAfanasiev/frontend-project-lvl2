import { test, expect } from '@jest/globals';
import fs from 'fs';
import { fileURLToPath } from 'url';
import path, { dirname } from 'path';
import generateDiff from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFile = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8');

const expected = readFile('expectedJSON.txt');

test('generateDiff JSON files', () => {
  expect(generateDiff(getFixturePath('file1.json'), getFixturePath('file2.json'))).toBe(expected);
});

test('generateDiff YAML files', () => {
  expect(generateDiff(getFixturePath('file1.yml'), getFixturePath('file2.yml'))).toBe(expected);
});
