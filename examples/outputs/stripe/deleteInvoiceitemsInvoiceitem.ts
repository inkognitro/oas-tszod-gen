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
} from './core';
import {Deleted_invoiceitem, Error} from './schemas';

export const deleteInvoiceitemsInvoiceitemEndpointSchema = {
  path: '/v1/invoiceitems/{invoiceitem}',
  method: 'delete',
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

export type DeleteInvoiceitemsInvoiceitemRequest = RequestUnion<
  RequestBodyData<'application/x-www-form-urlencoded', {}>,
  {
    invoiceitem: string;
  }
>;

export type DeleteInvoiceitemsInvoiceitemResponse =
  | ResponseUnion<
      200,
      ResponseBodyData<'application/json', Deleted_invoiceitem>
    >
  | ResponseUnion<any, ResponseBodyData<'application/json', Error>>;

export type DeleteInvoiceitemsInvoiceitemRequestResult = RequestResult<
  DeleteInvoiceitemsInvoiceitemRequest,
  DeleteInvoiceitemsInvoiceitemResponse
>;

export function deleteInvoiceitemsInvoiceitem(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<
    DeleteInvoiceitemsInvoiceitemRequest,
    'pathParams' | 'contentType' | 'body',
    never
  >,
  config?: RequestHandlerExecutionConfig
): Promise<DeleteInvoiceitemsInvoiceitemRequestResult> {
  return requestHandler.execute(
    createRequest(deleteInvoiceitemsInvoiceitemEndpointSchema, payload),
    config
  );
}
