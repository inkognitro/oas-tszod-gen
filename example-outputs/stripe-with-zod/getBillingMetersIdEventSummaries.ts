import {
  z_Billing_Meter_event_summary,
  z_Error,
  Billing_Meter_event_summary,
  Error,
} from '@example-outputs/stripe-with-zod';
import {z} from 'zod';
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
} from '@example-outputs/stripe-with-zod/core';

export const getBillingMetersIdEventSummariesEndpointSchema = {
  path: '/v1/billing/meters/{id}/event_summaries',
  method: 'get',
  supportedSecuritySchemas: [],
  queryParamsZodSchema: z.object({
    customer: z.string(),
    end_time: z.number().int().safe().finite(),
    ending_before: z.string().optional(),
    expand: z.array(z.string()).optional(),
    limit: z.number().int().safe().finite().optional(),
    start_time: z.number().int().safe().finite(),
    starting_after: z.string().optional(),
    value_grouping_window: z.enum(['day', 'hour']).optional(),
  }),
  pathParamsZodSchema: z.object({
    id: z.string(),
  }),
  bodyByContentType: {
    'application/x-www-form-urlencoded': {
      zodSchema: z.object({}),
    },
  },
  responseByStatus: {
    '200': {
      bodyByContentType: {
        'application/json': {
          zodSchema: z.object({
            data: z.array(z_Billing_Meter_event_summary),
            has_more: z.boolean(),
            object: z.enum(['list']),
            url: z
              .string()
              .regex(/\^\/v1\/billing\/meters\/\[\^\/\]\+\/event_summaries/),
          }),
        },
      },
    },
    default: {
      bodyByContentType: {
        'application/json': {
          zodSchema: z_Error,
        },
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
