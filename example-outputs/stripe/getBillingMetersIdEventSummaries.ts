import {
  RequestUnion,
  RequestBodyData,
  ResponseBodyData,
  ResponseUnion,
  RequestResult,
  SimpleRequestHandler,
  createRequest,
  RequestHandlerExecutionConfig,
  RequestPayload,
} from '@example-outputs/stripe/core';
import {Billing_Meter_event_summary, Error} from '@example-outputs/stripe';

export const getBillingMetersIdEventSummariesEndpointSchema = {
  path: '/v1/billing/meters/{id}/event_summaries',
  method: 'get',
  supportedSecuritySchemas: [],
  bodyByContentType: {
    'application/x-www-form-urlencoded': {},
  },
  responseByStatus: {
    '200': {
      bodyByContentType: {
        'application/json': {},
      },
    },
    default: {
      bodyByContentType: {
        'application/json': {},
      },
    },
  },
};

export type GetBillingMetersIdEventSummariesRequest = RequestUnion<
  RequestBodyData<'application/x-www-form-urlencoded', {}>,
  {
    id: string;
  },
  {
    customer: string;
    end_time: number; // int
    ending_before?: string;
    expand?: string[];
    limit?: number; // int
    start_time: number; // int
    starting_after?: string;
    value_grouping_window?: 'day' | 'hour';
  }
>;

export type GetBillingMetersIdEventSummariesResponse =
  | ResponseUnion<
      200,
      ResponseBodyData<
        'application/json',
        {
          data: Billing_Meter_event_summary[];
          has_more: boolean;
          object: 'list';
          url: string;
        }
      >
    >
  | ResponseUnion<any, ResponseBodyData<'application/json', Error>>;

export type GetBillingMetersIdEventSummariesRequestResult = RequestResult<
  GetBillingMetersIdEventSummariesRequest,
  GetBillingMetersIdEventSummariesResponse
>;

export function getBillingMetersIdEventSummaries(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<
    GetBillingMetersIdEventSummariesRequest,
    'pathParams' | 'queryParams' | 'contentType' | 'body',
    never
  >,
  config?: RequestHandlerExecutionConfig
): Promise<GetBillingMetersIdEventSummariesRequestResult> {
  return requestHandler.execute(
    createRequest(getBillingMetersIdEventSummariesEndpointSchema, payload),
    config
  );
}
