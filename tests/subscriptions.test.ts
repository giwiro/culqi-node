import {subscriptions} from '../src/subscriptions';
/*import {tokens} from '../src/tokens';
import {cards} from '../src/cards';
import {plans} from '../src/plans';
import {customers} from '../src/customers';*/
import vars from '../src/vars';
import {httpMockFactory} from './request/__mocks__';
import {RequestOptions} from 'https';

const uniqueEmail =
  Math.random().toString(36).substring(2, 15) +
  Math.random().toString(36).substring(2, 15) +
  '@domain.com';

describe('subscriptions', () => {
  let publicKey: string;
  let privateKey: string;

  /*let createdTokenId: string;
  let createdCustomerId: string;
  let createdCardId: string;
  let createdPlanId: string;
  let createdSubscriptionId: string;*/

  beforeAll(async () => {
    privateKey = process.env.CULQI_PRIVATE_KEY || '';
    publicKey = process.env.CULQI_PUBLIC_KEY || '';
    vars.privateKey = privateKey;
    vars.publicKey = publicKey;

    /*const [token, customer] = [
      await tokens.createToken({
        card_number: '4111111111111111',
        cvv: '123',
        expiration_month: '09',
        expiration_year: '2025',
        email: 'richard@piedpiper.com',
      }),
      await customers.createCustomer({
        first_name: 'Richard',
        last_name: 'Hendricks',
        email: uniqueEmail,
        address: 'San Francisco Bay Area',
        address_city: 'Palo Alto',
        country_code: 'US',
        phone_number: '6505434800',
      }),
    ];

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
    createdPlanId = plan.id;*/
  });

  /*afterAll(async () => {
    await cards.deleteCard({
      id: createdCardId,
    });
    const [r, r2] = [
      await customers.deleteCustomer({
        id: createdCustomerId,
      }),
      await plans.deletePlan({
        id: createdPlanId,
      }),
    ];
  });*/

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
          card_id: 'carg_id',
          plan_id: 'plan_id',
        },
        {
          _httpProvider: mockedHttps,
        }
      );
      const c = mockedHttps.request.mock.calls[0][0] as RequestOptions;
      expect(c.path).toMatchSnapshot();
    });

    /*it.only('should create subscription', async () => {
      const resp = await subscriptions.createSubscription({
        card_id: createdCardId,
        plan_id: createdPlanId,
      });
      createdSubscriptionId = resp.id;
      expect(resp.object).toMatchSnapshot();
    });*/
  });

  describe('getSubscription', () => {
    it('should change path', () => {
      const mockedHttps = httpMockFactory();
      subscriptions.getSubscription(
        {
          id: 'subscription_id',
        },
        {
          _httpProvider: mockedHttps,
        }
      );
      const c = mockedHttps.request.mock.calls[0][0] as RequestOptions;
      expect(c.path).toMatch(
        `${vars.baseEndpoint.basePath}${vars.basePaths.subscriptions}/subscription_id`
      );
    });

    /*it('should get subscription', async () => {
      const resp = await subscriptions.getSubscription({
        id: createdSubscriptionId,
      });
      expect(resp.object).toMatchSnapshot();
    });*/
  });

  describe('getSubscriptions', () => {
    it('should change path', () => {
      const mockedHttps = httpMockFactory();
      subscriptions.getSubscriptions(
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

    /*it('should get subscriptions', async () => {
      const resp = await subscriptions.getSubscriptions({
        limit: '2',
      });
      expect(resp.data.length).toBeGreaterThan(0);
    });*/
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
          _httpProvider: mockedHttps,
        }
      );
      const c = mockedHttps.request.mock.calls[0][0] as RequestOptions;
      expect(c.path).toMatch(
        `${vars.baseEndpoint.basePath}${vars.basePaths.subscriptions}/subscription_id`
      );
    });

    /*it('should update subscription', async () => {
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
    });*/
  });

  describe('deleteSubscription', () => {
    it('should change path', () => {
      const mockedHttps = httpMockFactory();
      subscriptions.deleteSubscription(
        {
          id: 'subscription_id',
        },
        {
          _httpProvider: mockedHttps,
        }
      );
      const c = mockedHttps.request.mock.calls[0][0] as RequestOptions;
      expect(c.path).toMatch(
        `${vars.baseEndpoint.basePath}${vars.basePaths.subscriptions}/subscription_id`
      );
    });

    /*it('should delete subscription', async () => {
      const resp = await subscriptions.deleteSubscription({
        id: createdSubscriptionId,
      });
      expect(resp.deleted).toBeTruthy();
    });*/
  });
});
