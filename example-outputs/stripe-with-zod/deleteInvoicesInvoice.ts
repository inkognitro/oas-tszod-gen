import {
  z_Deleted_invoice,
  z_Error,
  Deleted_invoice,
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

export const deleteInvoicesInvoiceEndpointSchema = {
  path: '/v1/invoices/{invoice}',
  method: 'delete',
  supportedSecuritySchemas: [],
  pathParamsZodSchema: z.object({
    invoice: z.string(),
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
          zodSchema: z_Deleted_invoice,
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
