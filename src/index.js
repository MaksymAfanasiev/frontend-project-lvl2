import { Command } from 'commander';
const program = new Command();

export default () => {
  program
  .version('0.1.0')
  .arguments('<filepath1> <filepath2>')
  .description('Compares two configuration files and shows a difference.')
  .option('-f, --format [type]', 'output format')

  program.parse(process.argv);
}