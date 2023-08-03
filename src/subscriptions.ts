import {get, post, patch, delete_, HttpRequestOptions} from './request';
import vars from './vars';
import {Charge} from './charges';
import {Plan} from './plans';
import {Card} from './cards';

export type Subscription = {
  object: string;
  id: string;
  creation_date: number;
  status: string;
  current_period: number;
  total_period: number;
  current_period_start: number;
  current_period_end: number;
  cancel_at_period_end: boolean;
  cancel_at: number;
  ended_at: number;
  next_billing_date: number;
  trial_start: number;
  trial_end: number;
  charges: Charge[];
  plan: Plan;
  card: Card;
  metadata: Record<string, string>;
};

export type CreateSubscriptionRequest = {
  card_id: string;
  plan_id: string;
};

export type GetSubscriptionRequest = {
  id: string;
};

export type GetSubscriptionsRequest = {
  amount?: string;
  min_amount?: string;
  max_amount?: string;
  date?: string;
  date_from?: string;
  date_to?: string;
  interval?: string;
  status?: string;
  limit?: string;
  before?: string;
  after?: string;
};

export type GetSubscriptionsResponse = {
  data: Subscription[];
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

export type UpdateSubscriptionRequest = {
  id: string;
  metadata?: Record<string, string>;
};

export type DeleteSubscriptionRequest = {
  id: string;
};

export type DeleteSubscriptionResponse = {
  id: string;
  deleted: boolean;
  merchant_message: string;
};

export const subscriptions = {
  createSubscription: (
    req: CreateSubscriptionRequest,
    extraHttpOptions?: Partial<HttpRequestOptions>
  ) => post<Subscription>(vars.basePaths.subscriptions, req, extraHttpOptions),
  getSubscription: (
    req: GetSubscriptionRequest,
    extraHttpOptions?: Partial<HttpRequestOptions>
  ) =>
    get<Subscription>(
      `${vars.basePaths.subscriptions}/${req.id}`,
      undefined,
      extraHttpOptions
    ),
  getSubscriptions: (
    req?: GetSubscriptionsRequest,
    extraHttpOptions?: Partial<HttpRequestOptions>
  ) =>
    get<GetSubscriptionsResponse>(
      vars.basePaths.subscriptions,
      req as Record<string, string>,
      extraHttpOptions
    ),
  updateSubscription: (
    req: UpdateSubscriptionRequest,
    extraHttpOptions?: Partial<HttpRequestOptions>
  ) =>
    patch<Subscription>(
      `${vars.basePaths.subscriptions}/${req.id}`,
      req,
      extraHttpOptions
    ),
  deleteSubscription: (
    req: DeleteSubscriptionRequest,
    extraHttpOptions?: Partial<HttpRequestOptions>
  ) =>
    delete_<DeleteSubscriptionResponse>(
      `${vars.basePaths.subscriptions}/${req.id}`,
      extraHttpOptions
    ),
};
