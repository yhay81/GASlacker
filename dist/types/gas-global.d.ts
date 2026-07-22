import type { Methods } from './index';
declare global {
    const GASlacker: {
        methods(token: string | null, retries_limit?: number): Methods;
    };
    function methods(token: string | null, retries_limit?: number): Methods;
}
export {};
