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
} from '@example-outputs/stripe/core';
import {Invoice, Error} from '@example-outputs/stripe';

export const postInvoicesInvoiceFinalizeEndpointSchema = {
  path: '/v1/invoices/{invoice}/finalize',
  method: 'post',
  supportedSecuritySchemas: [],
  bodyByContentType: {
    'application/x-www-form-urlencoded': {},
  },
  responseByStatus: {
    '200': {
      bodyByContentType: {
        'application/json': {},
      },
    },
    default: {
      bodyByContentType: {
        'application/json': {},
      },
    },
  },
};

export type PostInvoicesInvoiceFinalizeRequest = RequestUnion<
  RequestBodyData<
    'application/x-www-form-urlencoded',
    {
      auto_advance?: boolean;
      expand?: string[];
    }
  >,
  {
    invoice: string;
  }
>;

export type PostInvoicesInvoiceFinalizeResponse =
  | ResponseUnion<200, ResponseBodyData<'application/json', Invoice>>
  | ResponseUnion<any, ResponseBodyData<'application/json', Error>>;

export type PostInvoicesInvoiceFinalizeRequestResult = RequestResult<
  PostInvoicesInvoiceFinalizeRequest,
  PostInvoicesInvoiceFinalizeResponse
>;

export function postInvoicesInvoiceFinalize(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<
    PostInvoicesInvoiceFinalizeRequest,
    'pathParams' | 'contentType' | 'body',
    never
  >,
  config?: RequestHandlerExecutionConfig
): Promise<PostInvoicesInvoiceFinalizeRequestResult> {
  return requestHandler.execute(
    createRequest(postInvoicesInvoiceFinalizeEndpointSchema, payload),
    config
  );
}
