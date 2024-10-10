import {
  z_Billing_Meter_event_adjustment,
  Billing_Meter_event_adjustment,
} from './billing';
import {z_Error, Error} from './schemas';
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
} from './core';

export const postBillingMeterEventAdjustmentsEndpointSchema = {
  path: '/v1/billing/meter_event_adjustments',
  method: 'post',
  supportedSecuritySchemas: [],
  bodyByContentType: {
    'application/x-www-form-urlencoded': {
      zodSchema: z.object({
        cancel: z
          .object({
            identifier: z.string().optional(),
          })
          .optional(),
        event_name: z.string(),
        expand: z.array(z.string()).optional(),
        type: z.enum(['cancel']),
      }),
    },
  },
  responseByStatus: {
    '200': {
      bodyByContentType: {
        'application/json': {
          zodSchema: z_Billing_Meter_event_adjustment,
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

export type PostBillingMeterEventAdjustmentsRequest = RequestUnion<
  RequestBodyData<
    'application/x-www-form-urlencoded',
    {
      cancel?: {
        identifier?: string;
      };
      event_name: string;
      expand?: string[];
      type: 'cancel';
    }
  >
>;

export type PostBillingMeterEventAdjustmentsResponse =
  | ResponseUnion<
      200,
      ResponseBodyData<'application/json', Billing_Meter_event_adjustment>
    >
  | ResponseUnion<any, ResponseBodyData<'application/json', Error>>;

export type PostBillingMeterEventAdjustmentsRequestResult = RequestResult<
  PostBillingMeterEventAdjustmentsRequest,
  PostBillingMeterEventAdjustmentsResponse
>;

export function postBillingMeterEventAdjustments(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<
    PostBillingMeterEventAdjustmentsRequest,
    'contentType' | 'body',
    never
  >,
  config?: RequestHandlerExecutionConfig
): Promise<PostBillingMeterEventAdjustmentsRequestResult> {
  return requestHandler.execute(
    createRequest(postBillingMeterEventAdjustmentsEndpointSchema, payload),
    config
  );
}
