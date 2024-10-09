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

export const getInvoicesInvoiceEndpointSchema = {
  path: '/v1/invoices/{invoice}',
  method: 'get',
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

export type GetInvoicesInvoiceRequest = RequestUnion<
  RequestBodyData<'application/x-www-form-urlencoded', {}>,
  {
    invoice: string;
  },
  {
    expand?: string[];
  }
>;

export type GetInvoicesInvoiceResponse =
  | ResponseUnion<200, ResponseBodyData<'application/json', Invoice>>
  | ResponseUnion<any, ResponseBodyData<'application/json', Error>>;

export type GetInvoicesInvoiceRequestResult = RequestResult<
  GetInvoicesInvoiceRequest,
  GetInvoicesInvoiceResponse
>;

export function getInvoicesInvoice(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<
    GetInvoicesInvoiceRequest,
    'pathParams' | 'contentType' | 'body',
    'queryParams'
  >,
  config?: RequestHandlerExecutionConfig
): Promise<GetInvoicesInvoiceRequestResult> {
  return requestHandler.execute(
    createRequest(getInvoicesInvoiceEndpointSchema, payload),
    config
  );
}
