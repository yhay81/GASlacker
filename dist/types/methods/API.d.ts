import BaseAPI, { SlackResponse } from './BaseAPI';
export default class API extends BaseAPI {
    get(api: string, params?: Record<string, any>): SlackResponse;
    post(api: string, params?: Record<string, any>): SlackResponse;
    call(api: string, params?: Record<string, any>, method?: 'get' | 'post' | 'form'): SlackResponse;
    paginate(api: string, params?: Record<string, any>, method?: 'get' | 'post', max_pages?: number): SlackResponse[];
    test(params?: Record<string, any>): SlackResponse;
}
