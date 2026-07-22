import BaseAPI, { SlackParams, SlackResponse } from './BaseAPI';
export default class API extends BaseAPI {
    get(api: string, params?: SlackParams): SlackResponse;
    post(api: string, params?: SlackParams): SlackResponse;
    call(api: string, params?: SlackParams, method?: 'get' | 'post' | 'form'): SlackResponse;
    paginate(api: string, params?: SlackParams, method?: 'get' | 'post', max_pages?: number): SlackResponse[];
    test(params?: SlackParams): SlackResponse;
}
