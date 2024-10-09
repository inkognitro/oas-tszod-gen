import {
  z_Payment_method,
  z_Error,
  Payment_method,
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

export const postPaymentMethodsPaymentMethodDetachEndpointSchema = {
  path: '/v1/payment_methods/{payment_method}/detach',
  method: 'post',
  supportedSecuritySchemas: [],
  pathParamsZodSchema: z.object({
    payment_method: z.string(),
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
          zodSchema: z_Payment_method,
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

export type PostPaymentMethodsPaymentMethodDetachRequest = RequestUnion<
  RequestBodyData<
    'application/x-www-form-urlencoded',
    {
      expand?: string[];
    }
  >,
  {
    payment_method: string;
  }
>;

export type PostPaymentMethodsPaymentMethodDetachResponse =
  | ResponseUnion<200, ResponseBodyData<'application/json', Payment_method>>
  | ResponseUnion<any, ResponseBodyData<'application/json', Error>>;

export type PostPaymentMethodsPaymentMethodDetachRequestResult = RequestResult<
  PostPaymentMethodsPaymentMethodDetachRequest,
  PostPaymentMethodsPaymentMethodDetachResponse
>;

export function postPaymentMethodsPaymentMethodDetach(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<
    PostPaymentMethodsPaymentMethodDetachRequest,
    'pathParams' | 'contentType' | 'body',
    never
  >,
  config?: RequestHandlerExecutionConfig
): Promise<PostPaymentMethodsPaymentMethodDetachRequestResult> {
  return requestHandler.execute(
    createRequest(postPaymentMethodsPaymentMethodDetachEndpointSchema, payload),
    config
  );
}
