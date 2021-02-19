#!/usr/bin/env node
import commander from 'commander';
import generateDiff from '../src/index.js';

const program = new commander.Command();

program
  .version('0.1.0')
  .arguments('<filepath1> <filepath2>')
  .description('Compares two configuration files and shows a difference.')
  .option('-f, --format [type]', 'output format', 'stylish')
  .action((src1, src2) => {
    console.log(generateDiff(src1, src2, program.format));
  });

program.parse(process.argv);
