import { Command } from 'commander';
import fs from 'fs';
import path from 'path';

const program = new Command();

export const generateDiff = (file1, file2) => {
  const mergeFiles = { ...file1, ...file2 };
  const sortedFile = Object.entries(mergeFiles).sort();
  const keysFile1 = Object.keys(file1);
  const keysFile2 = Object.keys(file2);

  const res = sortedFile.reduce((acc, [key, val]) => {
    if (keysFile2.includes(key) && keysFile1.includes(key)) {
      if (file1[key] === file2[key]) {
        return `${acc}\n    ${key}: ${val}`;
      }
    }

    if (keysFile2.includes(key) && !(keysFile1.includes(key))) {
      return `${acc}\n  + ${key}: ${file2[key]}`;
    }

    if (keysFile1.includes(key) && !(keysFile2.includes(key))) {
      return `${acc}\n  - ${key}: ${file1[key]}`;
    }

    return `${acc}\n  - ${key}: ${file1[key]}\n  + ${key}: ${file2[key]}`;
  }, '');

  return `{${res}\n}`;
};

export default () => {
  program
    .version('0.1.0')
    .arguments('<filepath1> <filepath2>')
    .description('Compares two configuration files and shows a difference.')
    .option('-f, --format [type]', 'output format')
    .action((src1, src2) => {
      const resolvPath1 = path.resolve(process.cwd(), src1);
      const resolvPath2 = path.resolve(process.cwd(), src2);
      const file1 = fs.readFileSync(resolvPath1, 'utf-8');
      const file2 = fs.readFileSync(resolvPath2, 'utf-8');
      const parseFile1 = JSON.parse(file1);
      const parseFile2 = JSON.parse(file2);
      generateDiff(parseFile1, parseFile2);
    });

  program.parse(process.argv);
};
