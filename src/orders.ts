import {get, post, patch, delete_, HttpRequestOptions} from './request';
import vars from './vars';

export type Order = {
  object: string;
  id: string;
  amount: number;
  payment_code: string;
  currency_code: string;
  description: string;
  order_number: string;
  state: string;
  total_fee: number;
  net_amount: number;
  fee_details: string;
  creation_date: number;
  expiration_date: number;
  updated_at: number;
  paid_at: number;
  available_on: null;
  metadata: {[key: string]: string};
};

export type CreateOrderRequest = {
  amount: number;
  currency_code: string;
  description: string;
  order_number: string;
  client_details: {
    first_name: string;
    last_name: string;
    email: string;
    phone_number: string;
  };
  expiration_date: number;
};

export type ConfirmOrderRequest = {
  id: string;
};

export type GetOrderRequest = {
  id: string;
};

export type GetOrdersRequest = {
  amount?: string;
  min_amount?: string;
  max_amount?: string;
  creation_date?: string;
  creation_date_from?: string;
  creation_date_to?: string;
  state?: string;
  limit?: string;
  before?: string;
  after?: string;
};

export type GetOrdersResponse = {
  data: Order[];
  paging: {
    previous: string;
    next: string;
    cursors: {
      before: string;
      after: string;
    };
    remaining_items: number;
  };
};

export type UpdateOrderRequest = {
  id: string;
  expiration_date?: number;
  metadata?: {[key: string]: string};
};

export type DeleteOrderRequest = {
  id: string;
};

export type DeleteOrderResponse = {
  id: string;
  deleted: boolean;
  merchant_message: string;
};

export const orders = {
  createOrder: (
    req: CreateOrderRequest,
    extraHttpOptions?: Partial<HttpRequestOptions>
  ) => post<Order>(vars.basePaths.orders, req, extraHttpOptions),
  confirmOrder: (
    req: ConfirmOrderRequest,
    extraHttpOptions?: Partial<HttpRequestOptions>
  ) => post<Order>(`${vars.basePaths.orders}/${req.id}`, req, extraHttpOptions),
  getOrder: (
    req: GetOrderRequest,
    extraHttpOptions?: Partial<HttpRequestOptions>
  ) =>
    get<Order>(
      `${vars.basePaths.orders}/${req.id}`,
      undefined,
      extraHttpOptions
    ),
  getOrders: (
    req?: GetOrdersRequest,
    extraHttpOptions?: Partial<HttpRequestOptions>
  ) =>
    get<GetOrdersResponse>(
      vars.basePaths.orders,
      req as {[key: string]: string},
      extraHttpOptions
    ),
  updateOrder: (
    req: UpdateOrderRequest,
    extraHttpOptions?: Partial<HttpRequestOptions>
  ) =>
    patch<Order>(`${vars.basePaths.orders}/${req.id}`, req, extraHttpOptions),
  deletePlan: (
    req: DeleteOrderRequest,
    extraHttpOptions?: Partial<HttpRequestOptions>
  ) =>
    delete_<DeleteOrderResponse>(
      `${vars.basePaths.orders}/${req.id}`,
      extraHttpOptions
    ),
};
