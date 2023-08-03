import {get, post, patch, HttpRequestOptions} from './request';
import vars from './vars';
import {Card} from './cards';

export type Charge = {
  object: string;
  id: string;
  creation_date: number;
  amount: number;
  amount_refunded: number;
  current_amount: number;
  installments: number;
  installments_amount: number;
  currency: string;
  email: string;
  description: string;
  source: Card;
  outcome: {
    type: string;
    code: string;
    merchant_message: string;
    user_message: string;
  };
  fraud_score: number;
  antifraud_details: {
    first_name: string;
    last_name: string;
    address: string;
    address_city: string;
    country_code: string;
    phone: string;
    object: string;
  };
  dispute: boolean;
  capture: boolean;
  reference_code: string;
  metadata: Record<string, string>;
  total_fee: number;
  fee_details: {
    fixed_fee: Record<string, string | number>;
    variable_fee: {
      currency_code: string;
      commision: number;
      total: number;
    };
  };
  paid: boolean;
  statement_descriptor: string;
  total_fee_taxes: number;
  transfer_amount: number;
  duplicated: boolean;
};

export type CreateChargeRequest = {
  amount: string;
  currency_code: string;
  email: string;
  source_id: string;
  capture?: boolean;
  description?: string;
  installments?: number;
  metadata?: Record<string, string>;
  antifraud_details?: {
    first_name: string;
    last_name: string;
    address: string;
    address_city: string;
    country_code: string;
    phone: string;
  };
};

export type GetChargeRequest = {
  id: string;
};

export type GetChargesRequest = {
  amount?: string;
  min_amount?: string;
  max_amount?: string;
  installments?: string;
  min_installments?: string;
  max_installments?: string;
  currency_code?: string;
  code?: string;
  decline_code?: string;
  fraud_score?: string;
  min_fraud_score?: string;
  max_fraud_score?: string;
  first_name?: string;
  last_name?: string;
  email?: string;
  address?: string;
  address_city?: string;
  phone_number?: string;
  country_code?: string;
  dispute?: string;
  captured?: string;
  duplicated?: string;
  paid?: string;
  customer_id?: string;
  reference?: string;
  creation_date?: string;
  creation_date_from?: string;
  creation_date_to?: string;
  fee?: string;
  min_fee?: string;
  max_fee?: string;
  card_brand?: string;
  card_type?: string;
  device_type?: string;
  bin?: string;
  limit?: string;
  before?: string;
  after?: string;
};

export type GetChargesResponse = {
  data: Charge[];
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

export type UpdateChargeRequest = {
  id: string;
  metadata?: Record<string, string>;
};

export type CaptureChargeRequest = {
  id: string;
};

export const charges = {
  createCharge: (
    req: CreateChargeRequest,
    extraHttpOptions?: Partial<HttpRequestOptions>
  ) => post<Charge>(vars.basePaths.charges, req, extraHttpOptions),
  getCharge: (
    req: GetChargeRequest,
    extraHttpOptions?: Partial<HttpRequestOptions>
  ) =>
    get<Charge>(
      `${vars.basePaths.charges}/${req.id}`,
      undefined,
      extraHttpOptions
    ),
  getCharges: (
    req?: GetChargesRequest,
    extraHttpOptions?: Partial<HttpRequestOptions>
  ) =>
    get<GetChargesResponse>(
      vars.basePaths.charges,
      req as Record<string, string>,
      extraHttpOptions
    ),
  updateCharge: (
    req: UpdateChargeRequest,
    extraHttpOptions?: Partial<HttpRequestOptions>
  ) =>
    patch<Charge>(`${vars.basePaths.charges}/${req.id}`, req, extraHttpOptions),
  captureCharge: (
    req: CaptureChargeRequest,
    extraHttpOptions?: Partial<HttpRequestOptions>
  ) =>
    post<Charge>(
      `${vars.basePaths.charges}/${req.id}/capture`,
      req,
      extraHttpOptions
    ),
};
