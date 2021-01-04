import { Command } from 'commander';
import fs from 'fs';
import path from 'path';

const program = new Command();

export default () => {
  program
  .version('0.1.0')
  .arguments('<filepath1> <filepath2>')
  .description('Compares two configuration files and shows a difference.')
  .option('-f, --format [type]', 'output format')
  .action(function (src1, src2) {
    const resolvPath1 = path.resolve(process.cwd(), src1)
    const resolvPath2 = path.resolve(process.cwd(), src2)
    const file1 = fs.readFileSync(resolvPath1, 'utf-8');
    const file2 = fs.readFileSync(resolvPath2, 'utf-8');
    console.log(resolvPath1, resolvPath2);
  });

  program.parse(process.argv);
}