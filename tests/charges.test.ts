import {charges} from '../src/charges';
import vars from '../src/vars';
import {httpMockFactory} from './request/__mocks__';
import {RequestOptions} from 'https';
import {generateCreateTokenRequest} from './utils/card';
import {getToken} from './utils/token';

describe('charges', () => {
  let publicKey: string;
  let privateKey: string;

  let createdTokenId: string;
  const email = generateCreateTokenRequest().email;
  let createdChargeId: string;

  beforeAll(async () => {
    privateKey = process.env.CULQI_PRIVATE_KEY || '';
    publicKey = process.env.CULQI_PUBLIC_KEY || '';
    vars.privateKey = privateKey;
    vars.publicKey = publicKey;

    const token = await getToken();
    createdTokenId = token.id;
  });

  beforeEach(() => {
    privateKey = process.env.CULQI_PRIVATE_KEY || '';
    publicKey = process.env.CULQI_PUBLIC_KEY || '';
    vars.privateKey = privateKey;
    vars.publicKey = publicKey;
    jest.clearAllMocks();
  });

  describe('createCharge', () => {
    it('should change path', () => {
      const mockedHttps = httpMockFactory();
      charges.createCharge(
        {
          amount: '10000',
          currency_code: 'PEN',
          email,
          source_id: createdTokenId,
        },
        {
          _httpProvider: mockedHttps,
        }
      );
      const c = mockedHttps.request.mock.calls[0][0] as RequestOptions;
      expect(c.path).toMatchSnapshot();
    });

    it('should create charge', async () => {
      const resp = await charges.createCharge({
        amount: '10000',
        currency_code: 'PEN',
        email,
        source_id: createdTokenId,
        capture: false,
      });
      createdChargeId = resp.id;
      expect(resp.object).toMatchSnapshot();
    });
  });

  describe('getCharge', () => {
    it('should change path', () => {
      const mockedHttps = httpMockFactory();
      charges.getCharge(
        {
          id: createdChargeId,
        },
        {
          _httpProvider: mockedHttps,
        }
      );
      const c = mockedHttps.request.mock.calls[0][0] as RequestOptions;
      expect(c.path).toBe(
        `${vars.baseEndpoint.basePath}${vars.basePaths.charges}/${createdChargeId}`
      );
    });

    it('should get the charge', async () => {
      const resp = await charges.getCharge({
        id: createdChargeId,
      });
      expect(resp.object).toMatchSnapshot();
    });
  });

  describe('getCharges', () => {
    it('should change path', () => {
      const mockedHttps = httpMockFactory();
      charges.getCharges(
        {
          limit: '2',
        },
        {
          _httpProvider: mockedHttps,
        }
      );
      const c = mockedHttps.request.mock.calls[0][0] as RequestOptions;
      expect(c.path).toMatchSnapshot();
    });

    it('should get charges', async () => {
      const resp = await charges.getCharges({
        limit: '2',
      });
      expect(resp.data.length).toBeGreaterThan(0);
    });
  });

  describe('updateCharge', () => {
    it('should change path', () => {
      const mockedHttps = httpMockFactory();
      charges.updateCharge(
        {
          id: createdChargeId,
          metadata: {
            foo: 'barbarbarbarbarbarbarbarbar',
          },
        },
        {
          _httpProvider: mockedHttps,
        }
      );
      const c = mockedHttps.request.mock.calls[0][0] as RequestOptions;
      expect(c.path).toMatch(
        `${vars.baseEndpoint.basePath}${vars.basePaths.charges}/${createdChargeId}`
      );
    });

    it('should update charge', async () => {
      const resp = await charges.updateCharge({
        id: createdChargeId,
        metadata: {
          foo: 'bar',
        },
      });
      expect(resp.object).toMatchSnapshot();
      expect(resp.metadata).toEqual({
        foo: 'bar',
      });
    });
  });

  describe('captureCharge', () => {
    it('should change path', () => {
      const mockedHttps = httpMockFactory();
      charges.captureCharge(
        {
          id: createdChargeId,
        },
        {
          _httpProvider: mockedHttps,
        }
      );
      const c = mockedHttps.request.mock.calls[0][0] as RequestOptions;
      expect(c.path).toMatch(
        `${vars.baseEndpoint.basePath}${vars.basePaths.charges}/${createdChargeId}/capture`
      );
    });

    it('should capture the charge', async () => {
      const resp = await charges.captureCharge({
        id: createdChargeId,
      });
      expect(resp.capture).toBeTruthy();
    });
  });
});
