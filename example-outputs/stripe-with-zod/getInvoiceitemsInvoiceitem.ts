import {
  z_Invoiceitem,
  z_Error,
  Invoiceitem,
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

export const getInvoiceitemsInvoiceitemEndpointSchema = {
  path: '/v1/invoiceitems/{invoiceitem}',
  method: 'get',
  supportedSecuritySchemas: [],
  queryParamsZodSchema: z.object({
    expand: z.array(z.string()).optional(),
  }),
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
          zodSchema: z_Invoiceitem,
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
