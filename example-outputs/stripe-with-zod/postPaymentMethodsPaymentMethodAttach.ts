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

export const postPaymentMethodsPaymentMethodAttachEndpointSchema = {
  path: '/v1/payment_methods/{payment_method}/attach',
  method: 'post',
  supportedSecuritySchemas: [],
  pathParamsZodSchema: z.object({
    payment_method: z.string(),
  }),
  bodyByContentType: {
    'application/x-www-form-urlencoded': {
      zodSchema: z.object({
        customer: z.string(),
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

export type PostPaymentMethodsPaymentMethodAttachRequest = RequestUnion<
  RequestBodyData<
    'application/x-www-form-urlencoded',
    {
      customer: string;
      expand?: string[];
    }
  >,
  {
    payment_method: string;
  }
>;

export type PostPaymentMethodsPaymentMethodAttachResponse =
  | ResponseUnion<200, ResponseBodyData<'application/json', Payment_method>>
  | ResponseUnion<any, ResponseBodyData<'application/json', Error>>;

export type PostPaymentMethodsPaymentMethodAttachRequestResult = RequestResult<
  PostPaymentMethodsPaymentMethodAttachRequest,
  PostPaymentMethodsPaymentMethodAttachResponse
>;

export function postPaymentMethodsPaymentMethodAttach(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<
    PostPaymentMethodsPaymentMethodAttachRequest,
    'pathParams' | 'contentType' | 'body',
    never
  >,
  config?: RequestHandlerExecutionConfig
): Promise<PostPaymentMethodsPaymentMethodAttachRequestResult> {
  return requestHandler.execute(
    createRequest(postPaymentMethodsPaymentMethodAttachEndpointSchema, payload),
    config
  );
}
