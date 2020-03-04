// ref) https://github.com/python/cpython/blob/3.6/Lib/urllib/parse.py#L846
export const queryEncode: Function = (params: Record<string, any>) => {
  const param_list: any[] = [];
  for (const key in params) {
    let param: any = params[key];
    if (param === null) continue;
    if (Array.isArray(param)) param = param.join(',');
    else if (typeof param == 'object') param = JSON.stringify(param);
    param_list.push(`${key}=${param}`);
  }
  return param_list.join('&');
};

export const createPayload: Function = (params: Record<string, any>) => {
  const payload = { ...params };
  for (const key in payload) {
    const param: any = payload[key];
    if (param == null) delete payload[key];
    else if (typeof param !== 'string') payload[key] = JSON.stringify(param);
  }
  return payload;
};
