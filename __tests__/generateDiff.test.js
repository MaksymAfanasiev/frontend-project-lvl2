import { test, expect } from '@jest/globals';
import yaml from 'js-yaml';
import fs from 'fs';
import { fileURLToPath } from 'url';
import path, { dirname } from 'path';
import { generateDiff } from '../src/index.js';
import getParcer from '../src/parsers.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFile = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8');

const file1JSON = JSON.parse(readFile('file1.json'));
const file2JSON = JSON.parse(readFile('file2.json'));
const expectedJSON = readFile('expectedJSON.txt');
const file1YAML = yaml.load(readFile('file1.yml'));
const file2YAML = yaml.load(readFile('file2.yml'));
const expectedYAML = readFile('expectedJSON.txt');

test('parsers test', () => {
  expect(getParcer(getFixturePath('file1.json'))).toBe(JSON.parse);
  expect(getParcer(getFixturePath('file1.yml'))).toBe(yaml.load);
});

test('generateDiff JSON files', () => {
  expect(generateDiff(file1JSON, file2JSON)).toBe(expectedJSON);
});

test('generateDiff YAML files', () => {
  expect(generateDiff(file1YAML, file2YAML)).toBe(expectedYAML);
});
