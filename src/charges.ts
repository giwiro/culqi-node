import {get, post, patch, HttpRequestOptions} from './request';
import vars from './vars';

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
  source: {
    object: string;
    id: string;
    type: string;
    email: string;
    creation_date: number;
    card_number: string;
    last_four: string;
    active: boolean;
    iin: {
      object: string;
      bin: string;
      card_brand: string;
      card_type: string;
      card_category: string;
      issuer: {
        name: string;
        country: string;
        country_code: string;
        website: string;
        phone_number: string;
      };
      installments_allowed: number[];
    };
    client: {
      ip: string;
      ip_country: string;
      ip_country_code: string;
      browser: string;
      device_fingerprint: string;
      device_type: string;
    };
    outcome: {
      type: string;
      code: string;
      merchant_message: string;
      user_message: string;
    };
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
  metadata: {[key: string]: string};
  total_fee: number;
  fee_details: {
    fixed_fee: {};
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

type CreateChargeRequest = {
  amount: string;
  currency_code: string;
  email: string;
  source_id: string;
  capture?: boolean;
  description?: string;
  installments?: number;
  metadata?: {[key: string]: string};
  antifraud_details?: {
    first_name: string;
    last_name: string;
    address: string;
    address_city: string;
    country_code: string;
    phone: string;
  };
};

type GetChargeRequest = {
  id: string;
};

type GetChargesRequest = {
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

type GetChargesResponse = {
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

type UpdateChargeRequest = {
  id: string;
  metadata?: {[key: string]: string};
};

type CaptureChargeRequest = {
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
      req as {[key: string]: string},
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
