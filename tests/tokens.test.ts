import {tokens} from '../src/tokens';
import vars from '../src/vars';
import {httpMockFactory} from './utils/request';
import {generateCreateTokenRequest} from './utils/card';
import {HttpProvider} from '../src/request';
import {sleep} from './utils/time';

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
      tokens.createToken(generateCreateTokenRequest(), {
        _httpProvider: mockedHttps as unknown as HttpProvider,
      });
      const c = mockedHttps.request.mock.calls[0][0];
      expect(c.path).toMatchSnapshot();
    });

    it('should create token', async () => {
      await sleep(5000);
      const resp = await tokens.createToken(generateCreateTokenRequest());
      createdTokenId = resp.id;
      expect(resp.object).toMatchSnapshot();
      expect(resp.type).toMatchSnapshot();
    });
  });

  describe('getTokens', () => {
    it('should change path', () => {
      const mockedHttps = httpMockFactory();
      tokens.getTokens(undefined, {
        _httpProvider: mockedHttps as unknown as HttpProvider,
      });
      const c = mockedHttps.request.mock.calls[0][0];
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
          _httpProvider: mockedHttps as unknown as HttpProvider,
        }
      );
      const c = mockedHttps.request.mock.calls[0][0];
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
          _httpProvider: mockedHttps as unknown as HttpProvider,
        }
      );
      const c = mockedHttps.request.mock.calls[0][0];
      expect(c.path).toMatch(
        `${vars.baseEndpoint.basePath}${vars.basePaths.tokens}/${createdTokenId}`
      );
    });

    // 500 in Culqi dev
    // eslint-disable-next-line jest/no-commented-out-tests
    /*it('should update token', async () => {
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
    });*/
  });
});
