import {_httpResponseCallback} from '../src/request';
import {IncomingMessage} from 'http';

describe('request', () => {
  describe('_httpResponseCallback', () => {
    it('should execute correctly httpResponseCallback', () => {
      const expectedBody = {foo: 'bar'};
      const resolve = jest.fn();
      const reject = jest.fn();

      let onData: (chunk: string) => void;
      let onEnd: () => void;

      const res = {
        statusCode: 200,
        on: (event: string, listener: () => void) => {
          if (event === 'data') onData = listener;
          if (event === 'end') onEnd = listener;
        },
      } as unknown as IncomingMessage;

      _httpResponseCallback(res, resolve, reject);

      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      if (typeof onData === 'function') onData(JSON.stringify(expectedBody));
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      if (typeof onEnd === 'function') onEnd();

      expect(resolve).toHaveBeenCalledWith(expectedBody);
    });

    it('should execute correctly httpResponseCallback with empty body', () => {
      const resolve = jest.fn();
      const reject = jest.fn();

      // let onData: (chunk: string) => void;
      let onEnd: () => void;

      const res = {
        statusCode: 200,
        on: (event: string, listener: () => void) => {
          // if (event === 'data') onData = listener;
          if (event === 'end') onEnd = listener;
        },
      } as unknown as IncomingMessage;

      _httpResponseCallback(res, resolve, reject);

      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      // if (typeof onData === 'function') onData();
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      if (typeof onEnd === 'function') onEnd();

      expect(resolve).toHaveBeenCalledWith('');
    });

    it('should reject due to malformed statuCode', () => {
      const resolve = jest.fn();
      const reject = jest.fn();

      // let onData: (chunk: string) => void;
      let onEnd: () => void;

      const res = {
        on: (event: string, listener: () => void) => {
          // if (event === 'data') onData = listener;
          if (event === 'end') onEnd = listener;
        },
      } as unknown as IncomingMessage;

      _httpResponseCallback(res, resolve, reject);

      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      // if (typeof onData === 'function') onData(JSON.stringify(expectedBody));
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      if (typeof onEnd === 'function') onEnd();

      expect(reject).toHaveBeenCalled();
    });

    it('should reject due to not success statuCode', () => {
      const resolve = jest.fn();
      const reject = jest.fn();

      // let onData: (chunk: string) => void;
      let onEnd: () => void;

      const res = {
        statusCode: 400,
        on: (event: string, listener: () => void) => {
          // if (event === 'data') onData = listener;
          if (event === 'end') onEnd = listener;
        },
      } as unknown as IncomingMessage;

      _httpResponseCallback(res, resolve, reject);

      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      // if (typeof onData === 'function') onData(JSON.stringify(expectedBody));
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      if (typeof onEnd === 'function') onEnd();

      expect(reject).toHaveBeenCalled();
    });
  });
});
