import {subscriptions} from '../src/subscriptions';
import {cards} from '../src/cards';
import {plans} from '../src/plans';
import {customers} from '../src/customers';
import vars from '../src/vars';
import {httpMockFactory} from './utils/request';
import {getToken} from './utils/token';
import {getCustomer} from './utils/customer';
import {HttpProvider} from '../src/request';

describe('subscriptions', () => {
  let publicKey: string;
  let privateKey: string;

  let createdTokenId: string;
  let createdCustomerId: string;
  let createdCardId: string;
  let createdPlanId: string;
  let createdSubscriptionId: string;

  beforeAll(async () => {
    privateKey = process.env.CULQI_PRIVATE_KEY || '';
    publicKey = process.env.CULQI_PUBLIC_KEY || '';
    vars.privateKey = privateKey;
    vars.publicKey = publicKey;

    const [token, customer] = [await getToken(), await getCustomer()];

    createdTokenId = token.id;
    createdCustomerId = customer.id;

    const [card, plan] = [
      await cards.createCard({
        token_id: createdTokenId,
        customer_id: createdCustomerId,
      }),
      await plans.createPlan({
        name: 'Subscription',
        amount: 2000,
        currency_code: 'PEN',
        interval: 'Meses',
        interval_count: 1,
        limit: 12,
      }),
    ];

    createdCardId = card.id;
    createdPlanId = plan.id;
  });

  afterAll(async () => {
    await cards.deleteCard({
      id: createdCardId,
    });
    await customers.deleteCustomer({
      id: createdCustomerId,
    });
    await plans.deletePlan({
      id: createdPlanId,
    });
  });

  beforeEach(() => {
    privateKey = process.env.CULQI_PRIVATE_KEY || '';
    publicKey = process.env.CULQI_PUBLIC_KEY || '';
    vars.privateKey = privateKey;
    vars.publicKey = publicKey;
    jest.clearAllMocks();
  });

  describe('createSubscription', () => {
    it('should change path', () => {
      const mockedHttps = httpMockFactory();
      subscriptions.createSubscription(
        {
          card_id: 'card_id',
          plan_id: 'plan_id',
        },
        {
          _httpProvider: mockedHttps as unknown as HttpProvider,
        }
      );
      const c = mockedHttps.request.mock.calls[0][0];
      expect(c.path).toMatchSnapshot();
    });

    it('should create subscription', async () => {
      const resp = await subscriptions.createSubscription({
        card_id: createdCardId,
        plan_id: createdPlanId,
      });
      createdSubscriptionId = resp.id;
      expect(resp.object).toMatchSnapshot();
    });
  });

  describe('getSubscription', () => {
    it('should change path', () => {
      const mockedHttps = httpMockFactory();
      subscriptions.getSubscription(
        {
          id: 'subscription_id',
        },
        {
          _httpProvider: mockedHttps as unknown as HttpProvider,
        }
      );
      const c = mockedHttps.request.mock.calls[0][0];
      expect(c.path).toMatch(
        `${vars.baseEndpoint.basePath}${vars.basePaths.subscriptions}/subscription_id`
      );
    });

    it('should get subscription', async () => {
      const resp = await subscriptions.getSubscription({
        id: createdSubscriptionId,
      });
      expect(resp.object).toMatchSnapshot();
    });
  });

  describe('getSubscriptions', () => {
    it('should change path', () => {
      const mockedHttps = httpMockFactory();
      subscriptions.getSubscriptions(
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

    it('should get subscriptions', async () => {
      const resp = await subscriptions.getSubscriptions({
        limit: '2',
      });
      expect(resp.data.length).toBeGreaterThan(0);
    });
  });

  describe('updateSubscription', () => {
    it('should change path', () => {
      const mockedHttps = httpMockFactory();
      subscriptions.updateSubscription(
        {
          id: 'subscription_id',
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
        `${vars.baseEndpoint.basePath}${vars.basePaths.subscriptions}/subscription_id`
      );
    });

    it('should update subscription', async () => {
      const resp = await subscriptions.updateSubscription({
        id: createdSubscriptionId,
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

  describe('deleteSubscription', () => {
    it('should change path', () => {
      const mockedHttps = httpMockFactory();
      subscriptions.deleteSubscription(
        {
          id: 'subscription_id',
        },
        {
          _httpProvider: mockedHttps as unknown as HttpProvider,
        }
      );
      const c = mockedHttps.request.mock.calls[0][0];
      expect(c.path).toMatch(
        `${vars.baseEndpoint.basePath}${vars.basePaths.subscriptions}/subscription_id`
      );
    });

    it('should delete subscription', async () => {
      const resp = await subscriptions.deleteSubscription({
        id: createdSubscriptionId,
      });
      expect(resp.deleted).toBeTruthy();
    });
  });
});
