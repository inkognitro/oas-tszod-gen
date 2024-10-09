import {
  z_Billing_Meter_event,
  z_Error,
  Billing_Meter_event,
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

export const postBillingMeterEventsEndpointSchema = {
  path: '/v1/billing/meter_events',
  method: 'post',
  supportedSecuritySchemas: [],
  bodyByContentType: {
    'application/x-www-form-urlencoded': {
      zodSchema: z.object({
        event_name: z.string(),
        expand: z.array(z.string()).optional(),
        identifier: z.string().optional(),
        payload: z.record(z.string()),
        timestamp: z.number().int().safe().finite().optional(),
      }),
    },
  },
  responseByStatus: {
    '200': {
      bodyByContentType: {
        'application/json': {
          zodSchema: z_Billing_Meter_event,
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

export type PostBillingMeterEventsRequest = RequestUnion<
  RequestBodyData<
    'application/x-www-form-urlencoded',
    {
      event_name: string;
      expand?: string[];
      identifier?: string;
      payload: {
        [key: string]: string;
      };
      timestamp?: number; // int
    }
  >
>;

export type PostBillingMeterEventsResponse =
  | ResponseUnion<
      200,
      ResponseBodyData<'application/json', Billing_Meter_event>
    >
  | ResponseUnion<any, ResponseBodyData<'application/json', Error>>;

export type PostBillingMeterEventsRequestResult = RequestResult<
  PostBillingMeterEventsRequest,
  PostBillingMeterEventsResponse
>;

export function postBillingMeterEvents(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<
    PostBillingMeterEventsRequest,
    'contentType' | 'body',
    never
  >,
  config?: RequestHandlerExecutionConfig
): Promise<PostBillingMeterEventsRequestResult> {
  return requestHandler.execute(
    createRequest(postBillingMeterEventsEndpointSchema, payload),
    config
  );
}
