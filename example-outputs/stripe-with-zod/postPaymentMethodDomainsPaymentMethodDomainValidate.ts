import {
  z_Payment_method_domain,
  z_Error,
  Payment_method_domain,
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

export const postPaymentMethodDomainsPaymentMethodDomainValidateEndpointSchema =
  {
    path: '/v1/payment_method_domains/{payment_method_domain}/validate',
    method: 'post',
    supportedSecuritySchemas: [],
    pathParamsZodSchema: z.object({
      payment_method_domain: z.string(),
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
            zodSchema: z_Payment_method_domain,
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

export type PostPaymentMethodDomainsPaymentMethodDomainValidateRequest =
  RequestUnion<
    RequestBodyData<
      'application/x-www-form-urlencoded',
      {
        expand?: string[];
      }
    >,
    {
      payment_method_domain: string;
    }
  >;

export type PostPaymentMethodDomainsPaymentMethodDomainValidateResponse =
  | ResponseUnion<
      200,
      ResponseBodyData<'application/json', Payment_method_domain>
    >
  | ResponseUnion<any, ResponseBodyData<'application/json', Error>>;

export type PostPaymentMethodDomainsPaymentMethodDomainValidateRequestResult =
  RequestResult<
    PostPaymentMethodDomainsPaymentMethodDomainValidateRequest,
    PostPaymentMethodDomainsPaymentMethodDomainValidateResponse
  >;

export function postPaymentMethodDomainsPaymentMethodDomainValidate(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<
    PostPaymentMethodDomainsPaymentMethodDomainValidateRequest,
    'pathParams' | 'contentType' | 'body',
    never
  >,
  config?: RequestHandlerExecutionConfig
): Promise<PostPaymentMethodDomainsPaymentMethodDomainValidateRequestResult> {
  return requestHandler.execute(
    createRequest(
      postPaymentMethodDomainsPaymentMethodDomainValidateEndpointSchema,
      payload
    ),
    config
  );
}
