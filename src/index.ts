import { Methods } from './api';

declare const global: any;

global.methods = (token: string) => new Methods(token);
