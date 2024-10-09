import {
  z_Billing_Alert,
  z_Error,
  Billing_Alert,
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

export const getBillingAlertsEndpointSchema = {
  path: '/v1/billing/alerts',
  method: 'get',
  supportedSecuritySchemas: [],
  queryParamsZodSchema: z.object({
    alert_type: z.enum(['usage_threshold']).optional(),
    ending_before: z.string().optional(),
    expand: z.array(z.string()).optional(),
    limit: z.number().int().safe().finite().optional(),
    meter: z.string().optional(),
    starting_after: z.string().optional(),
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
            data: z.array(z_Billing_Alert),
            has_more: z.boolean(),
            object: z.enum(['list']),
            url: z.string().regex(/\^\/v1\/billing\/alerts/),
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

export type GetBillingAlertsRequest = RequestUnion<
  RequestBodyData<'application/x-www-form-urlencoded', {}>,
  any,
  {
    alert_type?: 'usage_threshold';
    ending_before?: string;
    expand?: string[];
    limit?: number; // int
    meter?: string;
    starting_after?: string;
  }
>;

export type GetBillingAlertsResponse =
  | ResponseUnion<
      200,
      ResponseBodyData<
        'application/json',
        {
          data: Billing_Alert[];
          has_more: boolean;
          object: 'list';
          url: string;
        }
      >
    >
  | ResponseUnion<any, ResponseBodyData<'application/json', Error>>;

export type GetBillingAlertsRequestResult = RequestResult<
  GetBillingAlertsRequest,
  GetBillingAlertsResponse
>;

export function getBillingAlerts(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<
    GetBillingAlertsRequest,
    'contentType' | 'body',
    'queryParams'
  >,
  config?: RequestHandlerExecutionConfig
): Promise<GetBillingAlertsRequestResult> {
  return requestHandler.execute(
    createRequest(getBillingAlertsEndpointSchema, payload),
    config
  );
}
