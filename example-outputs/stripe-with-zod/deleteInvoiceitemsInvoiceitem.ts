import {
  z_Deleted_invoiceitem,
  z_Error,
  Deleted_invoiceitem,
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

export const deleteInvoiceitemsInvoiceitemEndpointSchema = {
  path: '/v1/invoiceitems/{invoiceitem}',
  method: 'delete',
  supportedSecuritySchemas: [],
  pathParamsZodSchema: z.object({
    invoiceitem: z.string(),
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
          zodSchema: z_Deleted_invoiceitem,
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
