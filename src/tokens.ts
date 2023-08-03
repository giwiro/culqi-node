import {get, post, patch, HttpRequestOptions} from './request';
import vars from './vars';

export type Token = {
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
  metadata: Record<string, string>;
};

export type CreateTokenRequest = {
  card_number: string;
  cvv: string;
  expiration_month: string;
  expiration_year: string;
  email: string;
  metadata?: Record<string, string>;
};

export type GetTokenRequest = {
  id: string;
};

export type GetTokensRequest = {
  creation_date?: string;
  creation_date_to?: string;
  card_brand?: string;
  card_type?: string;
  device_type?: string;
  bin?: string;
  country_code?: string;
  limit?: string;
  before?: string;
  after?: string;
};

export type GetTokensResponse = {
  data: Token[];
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

export type UpdateTokenRequest = {
  id: string;
  metadata?: Record<string, string>;
};

export const tokens = {
  createToken: (
    req: CreateTokenRequest,
    extraHttpOptions?: Partial<HttpRequestOptions>
  ) =>
    post<Token>(vars.basePaths.tokens, req, {
      ...extraHttpOptions,
      useSecureEndpoint: true,
    }),
  getTokens: (
    req?: GetTokensRequest,
    extraHttpOptions?: Partial<HttpRequestOptions>
  ) =>
    get<GetTokensResponse>(
      vars.basePaths.tokens,
      req as Record<string, string>,
      extraHttpOptions
    ),
  getToken: (
    req: GetTokenRequest,
    extraHttpOptions?: Partial<HttpRequestOptions>
  ) =>
    get<Token>(
      `${vars.basePaths.tokens}/${req.id}`,
      undefined,
      extraHttpOptions
    ),
  updateToken: (
    req: UpdateTokenRequest,
    extraHttpOptions?: Partial<HttpRequestOptions>
  ) =>
    patch<Token>(`${vars.basePaths.tokens}/${req.id}`, req, extraHttpOptions),
};
