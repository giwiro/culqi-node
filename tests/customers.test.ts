import {customers} from '../src/customers';
import vars from '../src/vars';
import {httpMockFactory} from './request/__mocks__';
import {RequestOptions} from 'https';

describe('customers', () => {
  let publicKey: string;
  let privateKey: string;

  let createdCustomerId: string;

  beforeEach(() => {
    privateKey = process.env.CULQI_PRIVATE_KEY || '';
    publicKey = process.env.CULQI_PUBLIC_KEY || '';
    vars.privateKey = privateKey;
    vars.publicKey = publicKey;
    jest.clearAllMocks();
  });

  describe('createCustomer', () => {
    it('should change path', () => {
      const mockedHttps = httpMockFactory();
      customers.createCustomer(
        {
          first_name: 'Richard',
          last_name: 'Hendricks',
          email: 'richard@piedpiper.com',
          address: 'San Francisco Bay Area',
          address_city: 'Palo Alto',
          country_code: 'US',
          phone_number: '6505434800',
        },
        {
          _httpProvider: mockedHttps,
        }
      );
      const c = mockedHttps.request.mock.calls[0][0] as RequestOptions;
      expect(c.path).toMatchSnapshot();
    });

    it('should create customer', async () => {
      const resp = await customers.createCustomer({
        first_name: 'Richard',
        last_name: 'Hendricks',
        email: 'richard@piedpiper.com',
        address: 'San Francisco Bay Area',
        address_city: 'Palo Alto',
        country_code: 'US',
        phone_number: '6505434800',
      });
      createdCustomerId = resp.id;
      expect(resp.object).toMatchSnapshot();
    });
  });

  describe('getCustomer', () => {
    it('should change path', () => {
      const mockedHttps = httpMockFactory();
      customers.getCustomer(
        {
          id: createdCustomerId,
        },
        {
          _httpProvider: mockedHttps,
        }
      );
      const c = mockedHttps.request.mock.calls[0][0] as RequestOptions;
      expect(c.path).toMatch(
        `${vars.baseEndpoint.basePath}${vars.basePaths.customers}/${createdCustomerId}`
      );
    });

    it('should get customer', async () => {
      const resp = await customers.getCustomer({
        id: createdCustomerId,
      });
      expect(resp.object).toMatchSnapshot();
    });
  });

  describe('getCustomers', () => {
    it('should change path', () => {
      const mockedHttps = httpMockFactory();
      customers.getCustomers(
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

    it('should get customers', async () => {
      const resp = await customers.getCustomers({
        limit: '2',
      });
      expect(resp.data.length).toBeGreaterThan(0);
    });
  });

  describe('updateCustomer', () => {
    it('should change path', () => {
      const mockedHttps = httpMockFactory();
      customers.updateCustomer(
        {
          id: createdCustomerId,
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
        `${vars.baseEndpoint.basePath}${vars.basePaths.customers}/${createdCustomerId}`
      );
    });

    it('should update customer', async () => {
      const resp = await customers.updateCustomer({
        id: createdCustomerId,
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

  describe('deleteCustomer', () => {
    it('should change path', () => {
      const mockedHttps = httpMockFactory();
      customers.deleteCustomer(
        {
          id: createdCustomerId,
        },
        {
          _httpProvider: mockedHttps,
        }
      );
      const c = mockedHttps.request.mock.calls[0][0] as RequestOptions;
      expect(c.path).toMatch(
        `${vars.baseEndpoint.basePath}${vars.basePaths.customers}/${createdCustomerId}`
      );
    });

    it('should delete customer', async () => {
      const resp = await customers.deleteCustomer({
        id: createdCustomerId,
      });
      expect(resp.deleted).toBeTruthy();
    });
  });
});
