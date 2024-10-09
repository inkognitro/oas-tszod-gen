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

export const postBillingAlertsIdActivateEndpointSchema = {
  path: '/v1/billing/alerts/{id}/activate',
  method: 'post',
  supportedSecuritySchemas: [],
  pathParamsZodSchema: z.object({
    id: z.string(),
  }),
  bodyByContentType: {
    'application/x-www-form-urlencoded': {
      zodSchema: z.object({
        expand: z.array(z.string()).optional(),
      }),
    },
  },
  responseByStatus: {
    '200': {
      bodyByContentType: {
        'application/json': {
          zodSchema: z_Billing_Alert,
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

export type PostBillingAlertsIdActivateRequest = RequestUnion<
  RequestBodyData<
    'application/x-www-form-urlencoded',
    {
      expand?: string[];
    }
  >,
  {
    id: string;
  }
>;

export type PostBillingAlertsIdActivateResponse =
  | ResponseUnion<200, ResponseBodyData<'application/json', Billing_Alert>>
  | ResponseUnion<any, ResponseBodyData<'application/json', Error>>;

export type PostBillingAlertsIdActivateRequestResult = RequestResult<
  PostBillingAlertsIdActivateRequest,
  PostBillingAlertsIdActivateResponse
>;

export function postBillingAlertsIdActivate(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<
    PostBillingAlertsIdActivateRequest,
    'pathParams' | 'contentType' | 'body',
    never
  >,
  config?: RequestHandlerExecutionConfig
): Promise<PostBillingAlertsIdActivateRequestResult> {
  return requestHandler.execute(
    createRequest(postBillingAlertsIdActivateEndpointSchema, payload),
    config
  );
}
