// ref) https://github.com/python/cpython/blob/3.6/Lib/urllib/parse.py#L846
export const queryEncode: Function = (params: Object) => {
  const param_list: any[] = [];
  for (let key in params) {
    let param: any = params[key];
    if (param === null) continue;
    if (Array.isArray(param)) param = param.join(',');
    else if (typeof param == 'object') param = JSON.stringify(param);
    param_list.push(`${key}=${param}`);
  }
  return param_list.join('&');
};

export const createPayload: Function = (params: Object) => {
  const payload = { ...params };
  for (let key in payload) {
    const param: any = payload[key];
    if (param == null) delete payload[key];
    else if (typeof param !== 'string') payload[key] = JSON.stringify(param);
  }
  return payload;
};
