import stylish from './stylish.js';

const formaters = {
  json: JSON.stringify,
  stylish,
};

const format = (formatType = 'stylish', ast) => {
  const formater = formaters[formatType];
  if (formater) {
    return formater(ast);
  }

  throw new Error('неверное имя форматера');
};

export default format;
