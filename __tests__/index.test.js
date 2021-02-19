import { test, expect } from '@jest/globals';
import fs from 'fs';
import { fileURLToPath } from 'url';
import path, { dirname } from 'path';
import generateDiff from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFile = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8');

const expectedStylish = readFile('expectedStylish.txt');
const expectedPlain = readFile('expectedPlain.txt');
const expectedJSON = readFile('expectedJSON.json');

test('generateDiff JSON files stylish format', () => {
  expect(generateDiff(getFixturePath('file1.json'), getFixturePath('file2.json'), 'stylish')).toBe(expectedStylish);
});

test('generateDiff YAML files stylish format', () => {
  expect(generateDiff(getFixturePath('file1.yml'), getFixturePath('file2.yml'), 'stylish')).toBe(expectedStylish);
});

test('generateDiff JSON files plain format', () => {
  expect(generateDiff(getFixturePath('file1.json'), getFixturePath('file2.json'), 'plain')).toBe(expectedPlain);
});

test('generateDiff YAML files plain format', () => {
  expect(generateDiff(getFixturePath('file1.yml'), getFixturePath('file2.yml'), 'plain')).toBe(expectedPlain);
});

test('generateDiff JSON files JSON format', () => {
  expect(generateDiff(getFixturePath('file1.json'), getFixturePath('file2.json'), 'json')).toBe(expectedJSON);
});

test('generateDiff YAML files JSON format', () => {
  expect(generateDiff(getFixturePath('file1.yml'), getFixturePath('file2.yml'), 'json')).toBe(expectedJSON);
});
