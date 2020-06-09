import {tokens, Token} from '../src/tokens';
import vars from '../src/vars';
import {httpMockFactory} from './request/__mocks__';
import {RequestOptions} from 'https';

describe('tokens', () => {
  let publicKey: string;
  let privateKey: string;

  let createdTokenId: string;

  beforeEach(() => {
    privateKey = process.env.CULQI_PRIVATE_KEY || '';
    publicKey = process.env.CULQI_PUBLIC_KEY || '';
    vars.privateKey = privateKey;
    vars.publicKey = publicKey;
    jest.clearAllMocks();
  });

  describe('createToken', () => {
    it('should change path', () => {
      const mockedHttps = httpMockFactory();
      tokens.createToken(
        {
          card_number: '4111111111111111',
          cvv: '123',
          expiration_month: '09',
          expiration_year: '2020',
          email: 'richard@piedpiper.com',
        },
        {
          _httpProvider: mockedHttps,
        }
      );
      const c = mockedHttps.request.mock.calls[0][0] as RequestOptions;
      expect(c.path).toMatchSnapshot();
    });

    it('should create token', async () => {
      const resp = await tokens.createToken({
        card_number: '4111111111111111',
        cvv: '123',
        expiration_month: '09',
        expiration_year: '2020',
        email: 'richard@piedpiper.com',
      });
      createdTokenId = resp.id;
      expect(resp.object).toMatchSnapshot();
      expect(resp.type).toMatchSnapshot();
    });
  });

  describe('getTokens', () => {
    it('should change path', () => {
      const mockedHttps = httpMockFactory();
      tokens.getTokens(undefined, {
        _httpProvider: mockedHttps,
      });
      const c = mockedHttps.request.mock.calls[0][0] as RequestOptions;
      expect(c.path).toMatchSnapshot();
    });

    it('should get all tokens', async () => {
      const resp = await tokens.getTokens();
      expect(resp.data.length).toBeGreaterThan(0);
    });
  });

  describe('getToken', () => {
    it('should change path', () => {
      const mockedHttps = httpMockFactory();
      tokens.getToken(
        {
          id: createdTokenId,
        },
        {
          _httpProvider: mockedHttps,
        }
      );
      const c = mockedHttps.request.mock.calls[0][0] as RequestOptions;
      expect(c.path).toMatch(
        `${vars.baseEndpoint.basePath}${vars.basePaths.tokens}/${createdTokenId}`
      );
    });

    it('should get token', async () => {
      const resp = await tokens.getToken({
        id: createdTokenId,
      });
      expect(resp.object).toMatchSnapshot();
      expect(resp.type).toMatchSnapshot();
    });
  });

  describe('updateToken', () => {
    it('should change path', () => {
      const mockedHttps = httpMockFactory();
      tokens.updateToken(
        {
          id: createdTokenId,
          metadata: {
            foo: 'bar',
          },
        },
        {
          _httpProvider: mockedHttps,
        }
      );
      const c = mockedHttps.request.mock.calls[0][0] as RequestOptions;
      expect(c.path).toMatch(
        `${vars.baseEndpoint.basePath}${vars.basePaths.tokens}/${createdTokenId}`
      );
    });

    it('should update token', async () => {
      const resp = await tokens.updateToken({
        id: createdTokenId,
        metadata: {
          foo: 'bar',
        },
      });
      expect(resp.object).toMatchSnapshot();
      expect(resp.type).toMatchSnapshot();
      expect(resp.metadata).toEqual({
        foo: 'bar',
      });
    });
  });
});
