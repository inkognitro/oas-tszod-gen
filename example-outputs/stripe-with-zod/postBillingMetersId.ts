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

export const postBillingMetersIdEndpointSchema = {
  path: '/v1/billing/meters/{id}',
  method: 'post',
  supportedSecuritySchemas: [],
  pathParamsZodSchema: z.object({
    id: z.string(),
  }),
  bodyByContentType: {
    'application/x-www-form-urlencoded': {
      zodSchema: z.object({
        display_name: z.string().optional(),
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

export type PostBillingMetersIdRequest = RequestUnion<
  RequestBodyData<
    'application/x-www-form-urlencoded',
    {
      display_name?: string;
      expand?: string[];
    }
  >,
  {
    id: string;
  }
>;

export type PostBillingMetersIdResponse =
  | ResponseUnion<200, ResponseBodyData<'application/json', Billing_Meter>>
  | ResponseUnion<any, ResponseBodyData<'application/json', Error>>;

export type PostBillingMetersIdRequestResult = RequestResult<
  PostBillingMetersIdRequest,
  PostBillingMetersIdResponse
>;

export function postBillingMetersId(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<
    PostBillingMetersIdRequest,
    'pathParams' | 'contentType' | 'body',
    never
  >,
  config?: RequestHandlerExecutionConfig
): Promise<PostBillingMetersIdRequestResult> {
  return requestHandler.execute(
    createRequest(postBillingMetersIdEndpointSchema, payload),
    config
  );
}
