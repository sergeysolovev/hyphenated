import defaults from './defaults';

export const hyphenateException = exception => {
  return {
    key: exception.replace(/\-/g, ''),
    value: exception.replace(/\-/g, defaults.joiner)
  };
};
