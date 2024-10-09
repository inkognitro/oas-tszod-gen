import {
  z_Deleted_apple_pay_domain,
  z_Error,
  Deleted_apple_pay_domain,
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

export const deleteApplePayDomainsDomainEndpointSchema = {
  path: '/v1/apple_pay/domains/{domain}',
  method: 'delete',
  supportedSecuritySchemas: [],
  pathParamsZodSchema: z.object({
    domain: z.string(),
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
          zodSchema: z_Deleted_apple_pay_domain,
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

export type DeleteApplePayDomainsDomainRequest = RequestUnion<
  RequestBodyData<'application/x-www-form-urlencoded', {}>,
  {
    domain: string;
  }
>;

export type DeleteApplePayDomainsDomainResponse =
  | ResponseUnion<
      200,
      ResponseBodyData<'application/json', Deleted_apple_pay_domain>
    >
  | ResponseUnion<any, ResponseBodyData<'application/json', Error>>;

export type DeleteApplePayDomainsDomainRequestResult = RequestResult<
  DeleteApplePayDomainsDomainRequest,
  DeleteApplePayDomainsDomainResponse
>;

export function deleteApplePayDomainsDomain(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<
    DeleteApplePayDomainsDomainRequest,
    'pathParams' | 'contentType' | 'body',
    never
  >,
  config?: RequestHandlerExecutionConfig
): Promise<DeleteApplePayDomainsDomainRequestResult> {
  return requestHandler.execute(
    createRequest(deleteApplePayDomainsDomainEndpointSchema, payload),
    config
  );
}
