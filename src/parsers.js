import yaml from 'js-yaml';
import path from 'path';

const getParcer = (file) => {
  const format = path.extname(file);

  if (format === '.json') {
    return JSON.parse;
  }

  return yaml.load;
};

export default (file, data) => {
  const parser = getParcer(file);

  return parser(data);
};
