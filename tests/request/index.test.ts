import {
  request,
  get,
  delete_,
  patch,
  post,
  _httpResponseCallback,
} from '../../src/request';
import vars from '../../src/vars';
import {RequestOptions} from 'https';
import {httpMockFactory} from './__mocks__';

describe('request', () => {
  it('should throw error if public key was not provided but need', () => {
    try {
      request('/', {
        useSecureEndpoint: true,
      });
    } catch (e) {
      expect(e).toMatchSnapshot();
    }
  });

  it('no options', () => {
    request('/');
    expect(true).toBeTruthy();
  });

  it('should include default headers', () => {
    const mockedHttps = httpMockFactory();
    request('/', {
      _httpProvider: mockedHttps,
    });
    const c = mockedHttps.request.mock.calls[0][0] as RequestOptions;
    expect(c.headers).toMatchSnapshot();
  });

  it('should include query parameters', () => {
    const mockedHttps = httpMockFactory();
    request('/path', {
      _httpProvider: mockedHttps,
      queryParams: {
        fizz: 'buzz',
        foo: 'bar',
      },
    });
    const c = mockedHttps.request.mock.calls[0][0] as RequestOptions;
    expect(c.path).toBe(`${vars.baseEndpoint.basePath}/path?fizz=buzz&foo=bar`);
  });

  it('should add headers', () => {
    const mockedHttps = httpMockFactory();
    request('/', {
      headers: {
        foo: 'bar',
      },
      _httpProvider: mockedHttps,
    });
    const c = mockedHttps.request.mock.calls[0][0] as RequestOptions;
    expect(c.headers).toMatchSnapshot();
  });

  it('should change method', () => {
    const mockedHttps = httpMockFactory();
    request('/', {
      method: 'PATCH',
      _httpProvider: mockedHttps,
    });
    const c = mockedHttps.request.mock.calls[0][0] as RequestOptions;
    expect(c.method).toBe('PATCH');
  });

  it('should change publicKey', () => {
    vars.publicKey = 'public-key-sample';
    const mockedHttps = httpMockFactory();
    request('/', {
      useSecureEndpoint: true,
      _httpProvider: mockedHttps,
    });
    const c = mockedHttps.request.mock.calls[0][0] as RequestOptions;
    expect(c.headers).toMatchSnapshot();
  });

  it('should create get fn with get method', () => {
    const mockedHttps = httpMockFactory();
    get('/route', undefined, {
      _httpProvider: mockedHttps,
    });
    const c = mockedHttps.request.mock.calls[0][0] as RequestOptions;
    expect(c.method).toMatchSnapshot('GET');
  });

  it('should create delete_ fn', () => {
    const mockedHttps = httpMockFactory();
    delete_('/route', {
      _httpProvider: mockedHttps,
    });
    const c = mockedHttps.request.mock.calls[0][0] as RequestOptions;
    expect(c.method).toMatchSnapshot('DELETE');
  });

  it('should create post fn', () => {
    const mockedHttps = httpMockFactory();
    post('/route', undefined, {
      _httpProvider: mockedHttps,
    });
    const c = mockedHttps.request.mock.calls[0][0] as RequestOptions;
    expect(c.method).toMatchSnapshot('POST');
  });

  it('should create patch fn', () => {
    const mockedHttps = httpMockFactory();
    patch('/route', undefined, {
      _httpProvider: mockedHttps,
    });
    const c = mockedHttps.request.mock.calls[0][0] as RequestOptions;
    expect(c.method).toMatchSnapshot('PATCH');
  });

  it('should call end when finishes http request', () => {
    const mockedHttps = httpMockFactory();
    request('/', {
      _httpProvider: mockedHttps,
    });
    const r = mockedHttps.request.mock.results[0].value as any;
    expect(r.end.mock.calls.length).toBe(1);
  });

  it('should call write when body is provided', () => {
    const mockedHttps = httpMockFactory();
    request('/', {
      _httpProvider: mockedHttps,
      method: 'POST',
      body: {
        foo: 'bar',
      },
    });
    const r = mockedHttps.request.mock.results[0].value as any;
    expect(r.write.mock.calls.length).toBe(1);
  });

  describe('_httpResponseCallback', () => {
    const resolve = jest.fn();
    const reject = jest.fn();
    let savedCbs: {[key: string]: (chunk?: string) => void} = {};
    const res = {
      on: (event: string, cb: (chunk?: string) => void) => {
        savedCbs[event] = cb;
      },
      statusCode: 200,
    };

    beforeEach(() => {
      resolve.mockReset();
      reject.mockReset();
      savedCbs = {};
      res.statusCode = 200;
    });

    it('should reject because no valid JSON response', () => {
      res.statusCode = 401;
      _httpResponseCallback(res as any, resolve, reject);
      savedCbs.data('<html lang="en"><title>Hi</title></html>');
      savedCbs.end();
      expect(reject.mock.calls[0][0] as any).toMatchSnapshot();
    });

    it('should reject because statusCode is not number', () => {
      // @ts-ignore
      res.statusCode = 'abc';
      _httpResponseCallback(res as any, resolve, reject);
      savedCbs.end();
      expect(reject.mock.calls[0][0] as any).toMatchSnapshot();
    });

    it('should reject because statusCode is not 2xx family', () => {
      res.statusCode = 401;
      _httpResponseCallback(res as any, resolve, reject);
      savedCbs.data('{"foo": "bar"}');
      savedCbs.end();
      expect(reject.mock.calls[0][0] as any).toMatchSnapshot();
    });
  });
});
