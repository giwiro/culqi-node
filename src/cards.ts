import {get, post, patch, delete_, HttpRequestOptions} from './request';
import vars from './vars';

export type Card = {
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
    issuer?: {
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

export type CreateCardRequest = {
  customer_id: string;
  token_id: string;
};

export type GetCardRequest = {
  id: string;
};

export type GetCardsRequest = {
  creation_date?: string;
  creation_date_to?: string;
  creation_date_from?: string;
  card_brand?: string;
  card_type?: string;
  device_type?: string;
  bin?: string;
  country_code?: string;
  limit?: string;
  before?: string;
  after?: string;
};

export type GetCardsResponse = {
  data: Card[];
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

export type UpdateCardRequest = {
  id: string;
  metadata?: Record<string, string>;
};

export type DeleteCardRequest = {
  id: string;
};

export type DeleteCardResponse = {
  id: string;
  deleted: boolean;
  merchant_message: string;
};

export const cards = {
  createCard: (
    req: CreateCardRequest,
    extraHttpOptions?: Partial<HttpRequestOptions>
  ) => post<Card>(vars.basePaths.cards, req, extraHttpOptions),
  getCard: (
    req: GetCardRequest,
    extraHttpOptions?: Partial<HttpRequestOptions>
  ) =>
    get<Card>(`${vars.basePaths.cards}/${req.id}`, undefined, extraHttpOptions),
  getCards: (
    req?: GetCardsRequest,
    extraHttpOptions?: Partial<HttpRequestOptions>
  ) =>
    get<GetCardsResponse>(
      vars.basePaths.cards,
      req as Record<string, string>,
      extraHttpOptions
    ),
  updateCard: (
    req: UpdateCardRequest,
    extraHttpOptions?: Partial<HttpRequestOptions>
  ) => patch<Card>(`${vars.basePaths.cards}/${req.id}`, req, extraHttpOptions),
  deleteCard: (
    req: DeleteCardRequest,
    extraHttpOptions?: Partial<HttpRequestOptions>
  ) =>
    delete_<DeleteCardResponse>(
      `${vars.basePaths.cards}/${req.id}`,
      extraHttpOptions
    ),
};
