import {orders} from '../src/orders';
import vars from '../src/vars';
import {httpMockFactory} from './request/__mocks__';
import {RequestOptions} from 'https';

const d = new Date();
// add a day
d.setDate(d.getDate() + 3);

const expirationDate = d.getTime() / 100;

const uid = (new Date().getTime() + Math.round(Math.random() * 1e12)).toString(
  36
);

describe('orders', () => {
  let publicKey: string;
  let privateKey: string;

  let createdOrderId: string;

  beforeEach(() => {
    privateKey = process.env.CULQI_PRIVATE_KEY || '';
    publicKey = process.env.CULQI_PUBLIC_KEY || '';
    vars.privateKey = privateKey;
    vars.publicKey = publicKey;
    jest.clearAllMocks();
  });

  describe('createOrder', () => {
    it('should change path', () => {
      const mockedHttps = httpMockFactory();
      orders.createOrder(
        {
          amount: 1000,
          currency_code: 'PEN',
          description: 'Venta de prueba',
          order_number: `order-${uid}`,
          client_details: {
            first_name: 'Richard',
            last_name: 'Hendricks',
            email: 'richard@piedpiper.com',
            phone_number: '945145288',
          },
          expiration_date: expirationDate,
        },
        {
          _httpProvider: mockedHttps,
        }
      );
      const c = mockedHttps.request.mock.calls[0][0] as RequestOptions;
      expect(c.path).toMatchSnapshot();
    });

    it('should create order', async () => {
      const req = {
        amount: 1000,
        currency_code: 'PEN',
        description: 'Venta de prueba',
        order_number: `order-${uid}`,
        client_details: {
          first_name: 'Richard',
          last_name: 'Hendricks',
          email: 'richard@piedpiper.com',
          phone_number: '945145288',
        },
        expiration_date: expirationDate,
      };
      const order = await orders.createOrder(req);
      createdOrderId = order.id;
      expect(order.object).toMatchSnapshot();
    });
  });

  describe('confirmOrder', () => {
    it('should change path', () => {
      const mockedHttps = httpMockFactory();
      orders.confirmOrder(
        {
          id: 'order_id',
        },
        {
          _httpProvider: mockedHttps,
        }
      );
      const c = mockedHttps.request.mock.calls[0][0] as RequestOptions;
      expect(c.path).toBe(
        `${vars.baseEndpoint.basePath}${vars.basePaths.orders}/order_id/confirm`
      );
    });

    /*it('should confirm order', async () => {
      const order = await orders.confirmOrder({
        id: createdOrderId,
      });
      expect(order.state).toBe('confirmado');
    });*/
  });

  describe('getOrder', () => {
    it('should change path', () => {
      const mockedHttps = httpMockFactory();
      orders.getOrder(
        {
          id: 'order_id',
        },
        {
          _httpProvider: mockedHttps,
        }
      );
      const c = mockedHttps.request.mock.calls[0][0] as RequestOptions;
      expect(c.path).toMatch(
        `${vars.baseEndpoint.basePath}${vars.basePaths.orders}/order_id`
      );
    });

    it('should get order', async () => {
      const resp = await orders.getOrder({
        id: createdOrderId,
      });
      expect(resp.object).toMatchSnapshot();
    });
  });

  describe('getOrders', () => {
    it('should change path', () => {
      const mockedHttps = httpMockFactory();
      orders.getOrders(
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

    it('should get order', async () => {
      const resp = await orders.getOrders({
        limit: '2',
      });
      expect(resp.data.length).toBeGreaterThan(0);
    });
  });

  describe('updateOrder', () => {
    it('should change path', () => {
      const mockedHttps = httpMockFactory();
      orders.updateOrder(
        {
          id: 'order_id',
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
        `${vars.baseEndpoint.basePath}${vars.basePaths.orders}/order_id`
      );
    });

    it('should update order', async () => {
      const resp = await orders.updateOrder({
        id: createdOrderId,
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

  describe('deleteCOrder', () => {
    it('should change path', () => {
      const mockedHttps = httpMockFactory();
      orders.deleteOrder(
        {
          id: 'order_id',
        },
        {
          _httpProvider: mockedHttps,
        }
      );
      const c = mockedHttps.request.mock.calls[0][0] as RequestOptions;
      expect(c.path).toMatch(
        `${vars.baseEndpoint.basePath}${vars.basePaths.orders}/order_id`
      );
    });

    it('should delete order', async () => {
      await expect(
        orders.deleteOrder({
          id: createdOrderId,
        })
      ).resolves.toBe(undefined);
    });
  });
});
