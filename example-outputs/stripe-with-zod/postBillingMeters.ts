import {
  z_Billing_Meter,
  z_Error,
  Billing_Meter,
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

export const postBillingMetersEndpointSchema = {
  path: '/v1/billing/meters',
  method: 'post',
  supportedSecuritySchemas: [],
  bodyByContentType: {
    'application/x-www-form-urlencoded': {
      zodSchema: z.object({
        customer_mapping: z
          .object({
            event_payload_key: z.string(),
            type: z.enum(['by_id']),
          })
          .optional(),
        default_aggregation: z.object({
          formula: z.enum(['count', 'sum']),
        }),
        display_name: z.string(),
        event_name: z.string(),
        event_time_window: z.enum(['day', 'hour']).optional(),
        expand: z.array(z.string()).optional(),
        value_settings: z
          .object({
            event_payload_key: z.string(),
          })
          .optional(),
      }),
    },
  },
  responseByStatus: {
    '200': {
      bodyByContentType: {
        'application/json': {
          zodSchema: z_Billing_Meter,
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

export type PostBillingMetersRequest = RequestUnion<
  RequestBodyData<
    'application/x-www-form-urlencoded',
    {
      customer_mapping?: {
        event_payload_key: string;
        type: 'by_id';
      };
      default_aggregation: {
        formula: 'count' | 'sum';
      };
      display_name: string;
      event_name: string;
      event_time_window?: 'day' | 'hour';
      expand?: string[];
      value_settings?: {
        event_payload_key: string;
      };
    }
  >
>;

export type PostBillingMetersResponse =
  | ResponseUnion<200, ResponseBodyData<'application/json', Billing_Meter>>
  | ResponseUnion<any, ResponseBodyData<'application/json', Error>>;

export type PostBillingMetersRequestResult = RequestResult<
  PostBillingMetersRequest,
  PostBillingMetersResponse
>;

export function postBillingMeters(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<
    PostBillingMetersRequest,
    'contentType' | 'body',
    never
  >,
  config?: RequestHandlerExecutionConfig
): Promise<PostBillingMetersRequestResult> {
  return requestHandler.execute(
    createRequest(postBillingMetersEndpointSchema, payload),
    config
  );
}
