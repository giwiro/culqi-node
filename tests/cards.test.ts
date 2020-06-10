import {customers} from '../src/customers';
import {tokens} from '../src/tokens';
import {cards} from '../src/cards';
import vars from '../src/vars';
import {httpMockFactory} from './request/__mocks__';
import {RequestOptions} from 'https';

const uniqueEmail =
  Math.random().toString(36).substring(2, 15) +
  Math.random().toString(36).substring(2, 15) +
  '@domain.com';

describe('cards', () => {
  let publicKey: string;
  let privateKey: string;

  /*let createdTokenId: string;
  let createdCustomerId: string;
  let createdCardId: string;*/

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
    createdCustomerId = customer.id;*/
  });

  /*afterAll(async () => {
    await customers.deleteCustomer({
      id: createdCustomerId,
    });
  });*/

  beforeEach(() => {
    privateKey = process.env.CULQI_PRIVATE_KEY || '';
    publicKey = process.env.CULQI_PUBLIC_KEY || '';
    vars.privateKey = privateKey;
    vars.publicKey = publicKey;
    jest.clearAllMocks();
  });

  describe('createCard', () => {
    it('should change path', () => {
      const mockedHttps = httpMockFactory();
      cards.createCard(
        {
          customer_id: 'customer_id_sample',
          token_id: 'token_id_sample',
        },
        {
          _httpProvider: mockedHttps,
        }
      );
      const c = mockedHttps.request.mock.calls[0][0] as RequestOptions;
      expect(c.path).toMatchSnapshot();
    });

    /*it.only('should create card', async () => {
      const resp = await cards.createCard({
        customer_id: createdCustomerId,
        token_id: createdTokenId,
      });
      createdCardId = resp.id;
      expect(resp.object).toMatchSnapshot();
    });*/
  });

  describe('getCard', () => {
    it('should change path', () => {
      const mockedHttps = httpMockFactory();
      cards.getCard(
        {
          id: 'createdCardId',
        },
        {
          _httpProvider: mockedHttps,
        }
      );
      const c = mockedHttps.request.mock.calls[0][0] as RequestOptions;
      expect(c.path).toMatch(
        `${vars.baseEndpoint.basePath}${vars.basePaths.cards}/createdCardId`
      );
    });

    /*it('should get card', async () => {
      const resp = await cards.getCard({
        id: createdCardId,
      });
      expect(resp.object).toMatchSnapshot();
    });*/
  });

  describe('getCards', () => {
    it('should change path', () => {
      const mockedHttps = httpMockFactory();
      cards.getCards(
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

    /*it('should get cards', async () => {
      const resp = await cards.getCards({
        limit: '2',
      });
      expect(resp.data.length).toBeGreaterThan(0);
    });*/
  });

  describe('updateCard', () => {
    it('should change path', () => {
      const mockedHttps = httpMockFactory();
      cards.updateCard(
        {
          id: 'createdCardId',
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
        `${vars.baseEndpoint.basePath}${vars.basePaths.cards}/createdCardId`
      );
    });

    /*it('should update card', async () => {
      const resp = await cards.updateCard({
        id: createdCardId,
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

  describe('deleteCard', () => {
    it('should change path', () => {
      const mockedHttps = httpMockFactory();
      cards.deleteCard(
        {
          id: 'createdCardId',
        },
        {
          _httpProvider: mockedHttps,
        }
      );
      const c = mockedHttps.request.mock.calls[0][0] as RequestOptions;
      expect(c.path).toMatch(
        `${vars.baseEndpoint.basePath}${vars.basePaths.cards}/createdCardId`
      );
    });

    /*it('should delete card', async () => {
      const resp = await cards.deleteCard({
        id: createdCardId,
      });
      expect(resp.deleted).toBeTruthy();
    });*/
  });
});
