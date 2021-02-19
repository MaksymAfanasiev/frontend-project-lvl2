import yaml from 'js-yaml';
import path from 'path';

const getParcer = (file) => {
  const format = path.extname(file);
  let parser;

  if (format === '.json') {
    parser = JSON.parse;
  } else if (format === '.yml') {
    parser = yaml.load;
  }

  return parser;
};

export default (file, data) => {
  const parser = getParcer(file);

  return parser(data);
};
