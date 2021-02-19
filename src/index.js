import fs from 'fs';
import path from 'path';
import parse from './parsers.js';
import buildAst from './buildAst.js';
import format from './formatters/index.js';

const getFullPath = (pathString) => path.resolve(process.cwd(), pathString);

export const getData = (pathString) => {
  const data = fs.readFileSync(getFullPath(pathString), 'utf8');
  return parse(pathString, data);
};

const genDiff = (path1, path2, formateType) => {
  const data1 = getData(path1);
  const data2 = getData(path2);

  const ast = buildAst(data1, data2);
  return format(formateType, ast);
};

export default genDiff;
