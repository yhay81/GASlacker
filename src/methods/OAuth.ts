import { queryEncode } from '../util';
import BaseAPI from './BaseAPI';

export default class OAuth extends BaseAPI {
  public access(
    client_id: string,
    client_secret: string,
    code,
    redirect_uri: string = null,
    single_channel = false,
    extraArgs: Record<string, any> = {}
  ) {
    const args: Record<string, any> = {
      client_id,
      client_secret,
      code,
      redirect_uri,
      single_channel,
      ...extraArgs
    };
    const encodedParams: string = queryEncode(args);
    const url = `${BaseAPI.API_ENDPOINT}oauth.access?${encodedParams}`;
    return this._fetch(url, { method: 'POST' });
  }

  public token(
    client_id: string,
    client_secret: string,
    code: string,
    redirect_uri: string = null,
    single_channel = false,
    extraArgs: Record<string, any> = {}
  ) {
    const args: Record<string, any> = {
      client_id,
      client_secret,
      code,
      redirect_uri,
      single_channel,
      ...extraArgs
    };
    return this._get('oauth.token', args);
  }
}
