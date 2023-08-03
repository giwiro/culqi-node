import {plans} from '../src/plans';
import vars from '../src/vars';
import {httpMockFactory} from './utils/request';
import {HttpProvider} from '../src/request';

describe('plans', () => {
  let publicKey: string;
  let privateKey: string;

  let createdPlanId: string;

  beforeEach(() => {
    privateKey = process.env.CULQI_PRIVATE_KEY || '';
    publicKey = process.env.CULQI_PUBLIC_KEY || '';
    vars.privateKey = privateKey;
    vars.publicKey = publicKey;
    jest.clearAllMocks();
  });

  describe('createPlan', () => {
    it('should change path', () => {
      const mockedHttps = httpMockFactory();
      plans.createPlan(
        {
          name: 'Subscription',
          amount: 2000,
          currency_code: 'PEN',
          interval: 'Meses',
          interval_count: 1,
          limit: 12,
        },
        {
          _httpProvider: mockedHttps as unknown as HttpProvider,
        }
      );
      const c = mockedHttps.request.mock.calls[0][0];
      expect(c.path).toMatchSnapshot();
    });

    it('should create plan', async () => {
      const plan = await plans.createPlan({
        name: 'Subscription',
        amount: 2000,
        currency_code: 'PEN',
        interval: 'Meses',
        interval_count: 1,
        limit: 12,
      });
      createdPlanId = plan.id;
      expect(plan.object).toMatchSnapshot();
    });
  });

  describe('getPlan', () => {
    it('should change path', () => {
      const mockedHttps = httpMockFactory();
      plans.getPlan(
        {
          id: createdPlanId,
        },
        {
          _httpProvider: mockedHttps as unknown as HttpProvider,
        }
      );
      const c = mockedHttps.request.mock.calls[0][0];
      expect(c.path).toMatch(
        `${vars.baseEndpoint.basePath}${vars.basePaths.plans}/${createdPlanId}`
      );
    });

    it('should get plan', async () => {
      const resp = await plans.getPlan({
        id: createdPlanId,
      });
      expect(resp.object).toMatchSnapshot();
    });
  });

  describe('getPlans', () => {
    it('should change path', () => {
      const mockedHttps = httpMockFactory();
      plans.getPlans(
        {
          limit: '2',
        },
        {
          _httpProvider: mockedHttps as unknown as HttpProvider,
        }
      );
      const c = mockedHttps.request.mock.calls[0][0];
      expect(c.path).toMatchSnapshot();
    });

    it('should get plans', async () => {
      const resp = await plans.getPlans({
        limit: '2',
      });
      expect(resp.data.length).toBeGreaterThan(0);
    });
  });

  describe('updatePlan', () => {
    it('should change path', () => {
      const mockedHttps = httpMockFactory();
      plans.updatePlan(
        {
          id: createdPlanId,
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
        `${vars.baseEndpoint.basePath}${vars.basePaths.plans}/${createdPlanId}`
      );
    });

    it('should update plan', async () => {
      const resp = await plans.updatePlan({
        id: createdPlanId,
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

  describe('deletePlan', () => {
    it('should change path', () => {
      const mockedHttps = httpMockFactory();
      plans.deletePlan(
        {
          id: createdPlanId,
        },
        {
          _httpProvider: mockedHttps as unknown as HttpProvider,
        }
      );
      const c = mockedHttps.request.mock.calls[0][0];
      expect(c.path).toMatch(
        `${vars.baseEndpoint.basePath}${vars.basePaths.plans}/${createdPlanId}`
      );
    });

    it('should delete plan', async () => {
      const resp = await plans.deletePlan({
        id: createdPlanId,
      });
      expect(resp.deleted).toBeTruthy();
    });
  });
});
