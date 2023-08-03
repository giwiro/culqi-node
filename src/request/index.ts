import https from 'https';
import querystring from 'querystring';
import {RequestOptions, IncomingMessage} from 'http';
import vars from '../vars';

export type RequestMethod = 'GET' | 'POST' | 'PATCH' | 'PUT' | 'DELETE';

export type HttpProvider = typeof https;

export type HttpRequestOptions = {
  method?: RequestMethod;
  useSecureEndpoint?: true;
  headers?: Record<string, string>;
  queryParams?: Record<string, string>;
  body?: Record<string, unknown>;
  // This is for testing purposes only
  _httpProvider?: HttpProvider;
};

function _httpResponseCallback<T>(
  res: IncomingMessage,
  resolve: (r: T) => void,
  reject: (e: Error | object) => void
) {
  let buffer = '';
  const statusCode = res.statusCode;

  res.on('data', (chunk) => (buffer += chunk));

  res.on('end', () => {
    let r;
    if (buffer && buffer.length) {
      try {
        r = JSON.parse(buffer);
      } catch (e) {
        return reject(
          new Error(`Response was not a valid JSON. Response: ${buffer}`)
        );
      }
    }
    if (typeof statusCode !== 'number')
      return reject(new Error('Status code is undefined'));

    if (Math.round(statusCode / 100) !== 2) return reject(r);

    return resolve(r);
  });
}

function request<T>(path: string, options?: HttpRequestOptions): Promise<T> {
  const body = options && options.body ? JSON.stringify(options.body) : '';
  const httpProvider =
    options && options._httpProvider ? options._httpProvider : https;

  const defaultHeaders = {
    'Content-Type': 'application/json',
    'Content-Length': body.length,
    'User-Agent': 'culqi-node',
    Authorization: `Bearer ${vars.privateKey}`,
  };

  const opts: RequestOptions = {
    host: vars.baseEndpoint.domain,
    path: `${vars.baseEndpoint.basePath}${path}`,
    headers: {...defaultHeaders},
    method: 'GET',
  };

  if (options) {
    if (options.useSecureEndpoint) {
      if (!vars.publicKey) throw new Error("Provide 'publicKey' property");
      opts.host = vars.baseSecureEndpoint.domain;
      opts.path = `${vars.baseSecureEndpoint.basePath}${path}`;
      opts.headers = {
        ...opts.headers,
        Authorization: `Bearer ${vars.publicKey}`,
      };
    }
    if (options.headers) opts.headers = {...opts.headers, ...options.headers};
    if (options.method) opts.method = options.method;
    if (options.queryParams && Object.keys(options.queryParams).length > 0)
      opts.path = `${opts.path}?${querystring.stringify(options.queryParams)}`;
  }

  return new Promise<T>((resolve, reject) => {
    const req = httpProvider.request(opts, (res: IncomingMessage) => {
      _httpResponseCallback<T>(res, resolve, reject);
    });
    if (body) req.write(body);
    req.end();
  });
}

function get<T>(
  path: string,
  queryParams?: Record<string, string>,
  options?: Partial<HttpRequestOptions>
): Promise<T> {
  return request<T>(path, {...options, queryParams, method: 'GET'});
}

function post<T>(
  path: string,
  body?: Record<string, unknown>,
  options?: Partial<HttpRequestOptions>
): Promise<T> {
  return request<T>(path, {...options, body, method: 'POST'});
}

function delete_<T>(
  path: string,
  options?: Partial<HttpRequestOptions>
): Promise<T> {
  return request<T>(path, {...options, method: 'DELETE'});
}

function patch<T>(
  path: string,
  body?: Record<string, unknown>,
  options?: Partial<HttpRequestOptions>
): Promise<T> {
  return request<T>(path, {...options, body, method: 'PATCH'});
}

export {get, post, patch, delete_, request, _httpResponseCallback};
