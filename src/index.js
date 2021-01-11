import { Command } from 'commander';
import fs from 'fs';
import path from 'path';

const program = new Command();

const generateDiff = (file1, file2) => {
  const mergeFiles = { ...file1, ...file2 };
  const sortedFile = Object.entries(mergeFiles).sort();

  const res = sortedFile.reduce((acc, [key, val]) => {
    if (key in file2 && key in file1) {
      if (file1[key] === file2[key]) {
        return `${acc}
        ${key}: ${val}`;
      }
    }

    if (key in file2 && !(key in file1)) {
      return `${acc}
      + ${key}: ${file2[key]}`;
    }

    if (key in file1 && !(key in file2)) {
      return `${acc}
      - ${key}: ${file1[key]}`;
    }

    return `${acc}
      - ${key}: ${file1[key]}
      + ${key}: ${file2[key]}`;
  }, '');

  return res;
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
      console.log(generateDiff(parseFile1, parseFile2));
    });

  program.parse(process.argv);
};
