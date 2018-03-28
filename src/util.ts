export const extend = (obj1, obj2) => {
  const result = obj1;
  for (let key in obj2) {
    result[key] = obj2[key];
  }
  return result;
};

export const queryEncode = params => {
  // https://github.com/python/cpython/blob/3.6/Lib/urllib/parse.py
  const l = [];
  for (let key in params) {
    if (params[key] !== null) {
      let p = params[key];
      if (Array.isArray(p)) p = p.join(',');
      l.push(`${key}=${p}`);
    }
  }
  return l.join('&');
};
