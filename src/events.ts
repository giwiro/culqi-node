import {get, HttpRequestOptions} from './request';
import vars from './vars';

export type Event = {
  object: string;
  type: string;
  data: {[key: string]: any};
};

export type GetEventRequest = {
  id: string;
};

export type GetEventsRequest = {
  type?: string;
  creation_date?: string;
  creation_date_from?: string;
  creation_date_to?: string;
  limit?: string;
  before?: string;
  after?: string;
};

export type GetEventsResponse = {
  data: Event[];
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

export const events = {
  getEvent: (
    req: GetEventRequest,
    extraHttpOptions?: Partial<HttpRequestOptions>
  ) =>
    get<Event>(
      `${vars.basePaths.events}/${req.id}`,
      undefined,
      extraHttpOptions
    ),
  getEvents: (
    req?: GetEventsRequest,
    extraHttpOptions?: Partial<HttpRequestOptions>
  ) =>
    get<GetEventsResponse>(
      vars.basePaths.events,
      req as {[key: string]: string},
      extraHttpOptions
    ),
};
