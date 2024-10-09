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
import {Invoiceitem, Error} from '@example-outputs/stripe';

export const getInvoiceitemsInvoiceitemEndpointSchema = {
  path: '/v1/invoiceitems/{invoiceitem}',
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

export type GetInvoiceitemsInvoiceitemRequest = RequestUnion<
  RequestBodyData<'application/x-www-form-urlencoded', {}>,
  {
    invoiceitem: string;
  },
  {
    expand?: string[];
  }
>;

export type GetInvoiceitemsInvoiceitemResponse =
  | ResponseUnion<200, ResponseBodyData<'application/json', Invoiceitem>>
  | ResponseUnion<any, ResponseBodyData<'application/json', Error>>;

export type GetInvoiceitemsInvoiceitemRequestResult = RequestResult<
  GetInvoiceitemsInvoiceitemRequest,
  GetInvoiceitemsInvoiceitemResponse
>;

export function getInvoiceitemsInvoiceitem(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<
    GetInvoiceitemsInvoiceitemRequest,
    'pathParams' | 'contentType' | 'body',
    'queryParams'
  >,
  config?: RequestHandlerExecutionConfig
): Promise<GetInvoiceitemsInvoiceitemRequestResult> {
  return requestHandler.execute(
    createRequest(getInvoiceitemsInvoiceitemEndpointSchema, payload),
    config
  );
}
