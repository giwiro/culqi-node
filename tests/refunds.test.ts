import vars from '../src/vars';
import {charges} from '../src/charges';
import {refunds} from '../src/refunds';
import {httpMockFactory} from './request/__mocks__';
import {RequestOptions} from 'https';
import {generateCreateTokenRequest} from './utils/card';
import {getToken} from './utils/token';

describe('refunds', () => {
  let publicKey: string;
  let privateKey: string;

  let createdTokenId: string;
  let createdChargeId: string;
  let createdRefundId: string;

  beforeAll(async () => {
    privateKey = process.env.CULQI_PRIVATE_KEY || '';
    publicKey = process.env.CULQI_PUBLIC_KEY || '';
    vars.privateKey = privateKey;
    vars.publicKey = publicKey;

    const token = await getToken();
    const charge = await charges.createCharge({
      amount: '10000',
      currency_code: 'PEN',
      email: generateCreateTokenRequest().email,
      source_id: token.id,
    });
    createdTokenId = token.id;
    createdChargeId = charge.id;
  });

  beforeEach(() => {
    privateKey = process.env.CULQI_PRIVATE_KEY || '';
    publicKey = process.env.CULQI_PUBLIC_KEY || '';
    vars.privateKey = privateKey;
    vars.publicKey = publicKey;
    jest.clearAllMocks();
  });

  describe('createRefund', () => {
    it('should change path', () => {
      const mockedHttps = httpMockFactory();
      refunds.createRefund(
        {
          amount: 2000,
          charge_id: createdChargeId,
          reason: 'fraudulento',
        },
        {
          _httpProvider: mockedHttps,
        }
      );
      const c = mockedHttps.request.mock.calls[0][0] as RequestOptions;
      expect(c.path).toMatchSnapshot();
    });

    it('should create refund', async () => {
      const resp = await refunds.createRefund({
        amount: 2000,
        charge_id: createdChargeId,
        reason: 'fraudulento',
      });
      createdRefundId = resp.id;
      expect(resp.object).toMatchSnapshot();
    });
  });

  describe('getRefund', () => {
    it('should change path', () => {
      const mockedHttps = httpMockFactory();
      refunds.getRefund(
        {
          id: createdRefundId,
        },
        {
          _httpProvider: mockedHttps,
        }
      );
      const c = mockedHttps.request.mock.calls[0][0] as RequestOptions;
      expect(c.path).toBe(
        `${vars.baseEndpoint.basePath}${vars.basePaths.refunds}/${createdRefundId}`
      );
    });

    it('should get the refund', async () => {
      const resp = await refunds.getRefund({
        id: createdRefundId,
      });
      expect(resp.object).toMatchSnapshot();
    });
  });

  describe('getRefunds', () => {
    it('should change path', () => {
      const mockedHttps = httpMockFactory();
      refunds.getRefunds(
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

    it('should get refunds', async () => {
      const resp = await refunds.getRefunds({
        limit: '2',
      });
      expect(resp.data.length).toBeGreaterThan(0);
    });
  });

  describe('updateRefunds', () => {
    it('should change path', () => {
      const mockedHttps = httpMockFactory();
      refunds.updateRefunds(
        {
          id: createdRefundId,
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
        `${vars.baseEndpoint.basePath}${vars.basePaths.refunds}/${createdRefundId}`
      );
    });

    it('should update charge', async () => {
      const resp = await refunds.updateRefunds({
        id: createdRefundId,
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
});
