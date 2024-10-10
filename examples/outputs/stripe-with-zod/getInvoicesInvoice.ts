import {z_Invoice, z_Error, Invoice, Error} from './schemas';
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
} from './core';

export const getInvoicesInvoiceEndpointSchema = {
  path: '/v1/invoices/{invoice}',
  method: 'get',
  supportedSecuritySchemas: [],
  queryParamsZodSchema: z.object({
    expand: z.array(z.string()).optional(),
  }),
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
          zodSchema: z_Invoice,
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
