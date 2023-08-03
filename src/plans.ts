import {get, post, patch, delete_, HttpRequestOptions} from './request';
import vars from './vars';

export type PlanInterval = 'Dias' | 'Semanas' | 'Meses' | 'Años';

export type Plan = {
  object: string;
  id: string;
  name: string;
  amount: number;
  currency_code: string;
  interval_count: number;
  interval: PlanInterval;
  limit: number;
  trial_days: number;
  total_subscriptions: number;
  metadata: Record<string, string>;
};

export type CreatePlanRequest = {
  name: string;
  amount: number;
  currency_code: string;
  interval: PlanInterval;
  interval_count: number;
  limit: number;
};

export type GetPlanRequest = {
  id: string;
};

export type GetPlansRequest = {
  amount?: string;
  min_amount?: string;
  max_amount?: string;
  creation_date_from?: string;
  creation_date_to?: string;
  limit?: string;
  before?: string;
  after?: string;
};

export type GetPlansResponse = {
  data: Plan[];
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

export type UpdatePlanRequest = {
  id: string;
  metadata?: Record<string, string>;
};

export type DeletePlanRequest = {
  id: string;
};

export type DeletePlanResponse = {
  id: string;
  deleted: boolean;
  merchant_message: string;
};

export const plans = {
  createPlan: (
    req: CreatePlanRequest,
    extraHttpOptions?: Partial<HttpRequestOptions>
  ) => post<Plan>(vars.basePaths.plans, req, extraHttpOptions),
  getPlan: (
    req: GetPlanRequest,
    extraHttpOptions?: Partial<HttpRequestOptions>
  ) =>
    get<Plan>(`${vars.basePaths.plans}/${req.id}`, undefined, extraHttpOptions),
  getPlans: (
    req?: GetPlansRequest,
    extraHttpOptions?: Partial<HttpRequestOptions>
  ) =>
    get<GetPlansResponse>(
      vars.basePaths.plans,
      req as Record<string, string>,
      extraHttpOptions
    ),
  updatePlan: (
    req: UpdatePlanRequest,
    extraHttpOptions?: Partial<HttpRequestOptions>
  ) => patch<Plan>(`${vars.basePaths.plans}/${req.id}`, req, extraHttpOptions),
  deletePlan: (
    req: DeletePlanRequest,
    extraHttpOptions?: Partial<HttpRequestOptions>
  ) =>
    delete_<DeletePlanResponse>(
      `${vars.basePaths.plans}/${req.id}`,
      extraHttpOptions
    ),
};
