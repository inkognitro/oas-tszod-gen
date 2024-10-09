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

export const postBillingMetersIdDeactivateEndpointSchema = {
  path: '/v1/billing/meters/{id}/deactivate',
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

export type PostBillingMetersIdDeactivateRequest = RequestUnion<
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

export type PostBillingMetersIdDeactivateResponse =
  | ResponseUnion<200, ResponseBodyData<'application/json', Billing_Meter>>
  | ResponseUnion<any, ResponseBodyData<'application/json', Error>>;

export type PostBillingMetersIdDeactivateRequestResult = RequestResult<
  PostBillingMetersIdDeactivateRequest,
  PostBillingMetersIdDeactivateResponse
>;

export function postBillingMetersIdDeactivate(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<
    PostBillingMetersIdDeactivateRequest,
    'pathParams' | 'contentType' | 'body',
    never
  >,
  config?: RequestHandlerExecutionConfig
): Promise<PostBillingMetersIdDeactivateRequestResult> {
  return requestHandler.execute(
    createRequest(postBillingMetersIdDeactivateEndpointSchema, payload),
    config
  );
}
