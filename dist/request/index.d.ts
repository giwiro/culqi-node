/// <reference types="node" />
import { IncomingMessage } from 'http';
declare type RequestMethod = 'GET' | 'POST' | 'PATCH' | 'PUT' | 'DELETE';
export declare type HttpRequestOptions = {
    method?: RequestMethod;
    useSecureEndpoint?: true;
    headers?: {
        [key: string]: string;
    };
    queryParams?: {
        [key: string]: string;
    };
    body?: {
        [key: string]: any;
    };
    _httpProvider?: any;
};
declare function _httpResponseCallback<T>(res: IncomingMessage, resolve: (r: T) => void, reject: (e: Error | object) => void): void;
declare function request<T>(path: string, options?: HttpRequestOptions): Promise<T>;
declare function get<T>(path: string, queryParams?: {
    [key: string]: string;
}, options?: Partial<HttpRequestOptions>): Promise<T>;
declare function post<T>(path: string, body?: {
    [key: string]: any;
}, options?: Partial<HttpRequestOptions>): Promise<T>;
declare function delete_<T>(path: string, options?: Partial<HttpRequestOptions>): Promise<T>;
declare function patch<T>(path: string, body?: {
    [key: string]: any;
}, options?: Partial<HttpRequestOptions>): Promise<T>;
export { get, post, patch, delete_, request, _httpResponseCallback };
//# sourceMappingURL=index.d.ts.map