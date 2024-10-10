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
import {Deleted_invoice, Error} from './schemas';

export const deleteInvoicesInvoiceEndpointSchema = {
  path: '/v1/invoices/{invoice}',
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

export type DeleteInvoicesInvoiceRequest = RequestUnion<
  RequestBodyData<'application/x-www-form-urlencoded', {}>,
  {
    invoice: string;
  }
>;

export type DeleteInvoicesInvoiceResponse =
  | ResponseUnion<200, ResponseBodyData<'application/json', Deleted_invoice>>
  | ResponseUnion<any, ResponseBodyData<'application/json', Error>>;

export type DeleteInvoicesInvoiceRequestResult = RequestResult<
  DeleteInvoicesInvoiceRequest,
  DeleteInvoicesInvoiceResponse
>;

export function deleteInvoicesInvoice(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<
    DeleteInvoicesInvoiceRequest,
    'pathParams' | 'contentType' | 'body',
    never
  >,
  config?: RequestHandlerExecutionConfig
): Promise<DeleteInvoicesInvoiceRequestResult> {
  return requestHandler.execute(
    createRequest(deleteInvoicesInvoiceEndpointSchema, payload),
    config
  );
}
