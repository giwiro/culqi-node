import {get, post, patch, HttpRequestOptions} from './request';
import vars from './vars';

export type Refund = {
  object: string;
  id: string;
  charge_id: string;
  creation_date: number;
  amount: number;
  reason: string;
  metadata: {[key: string]: string};
};

export type CreateRefundRequest = {
  amount: number;
  charge_id: string;
  reason: string;
};

export type GetRefundRequest = {
  id: string;
};

export type GetRefundsRequest = {
  creation_date?: string;
  creation_date_from?: string;
  creation_date_to?: string;
  reason?: string;
  limit?: string;
  before?: string;
  after?: string;
};

export type GetRefundsResponse = {
  data: Refund[];
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

export type UpdateRefundRequest = {
  id: string;
  metadata?: {[key: string]: string};
};

export const refunds = {
  createRefund: (
    req: CreateRefundRequest,
    extraHttpOptions?: Partial<HttpRequestOptions>
  ) => post<Refund>(vars.basePaths.refunds, req, extraHttpOptions),
  getRefund: (
    req: GetRefundRequest,
    extraHttpOptions?: Partial<HttpRequestOptions>
  ) =>
    get<Refund>(
      `${vars.basePaths.refunds}/${req.id}`,
      undefined,
      extraHttpOptions
    ),
  getRefunds: (
    req?: GetRefundsRequest,
    extraHttpOptions?: Partial<HttpRequestOptions>
  ) =>
    get<GetRefundsResponse>(
      vars.basePaths.refunds,
      req as {[key: string]: string},
      extraHttpOptions
    ),
  updateRefunds: (
    req: UpdateRefundRequest,
    extraHttpOptions?: Partial<HttpRequestOptions>
  ) =>
    patch<Refund>(`${vars.basePaths.refunds}/${req.id}`, req, extraHttpOptions),
};
