import https, {RequestOptions} from 'https';

type HttpRequest = typeof https.request;

const httpMockFactory = () => {
  return {
    request: jest.fn<Partial<HttpRequest>, RequestOptions[]>(() => ({
      write: jest.fn(),
      end: jest.fn(),
    })),
  };
};

export {httpMockFactory};
