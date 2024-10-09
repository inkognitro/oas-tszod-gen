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

export const getInvoiceitemsEndpointSchema = {
  path: '/v1/invoiceitems',
  method: 'get',
  supportedSecuritySchemas: [],
  queryParamsZodSchema: z.object({
    created: z
      .union([
        z.object({
          gt: z.number().int().safe().finite().optional(),
          gte: z.number().int().safe().finite().optional(),
          lt: z.number().int().safe().finite().optional(),
          lte: z.number().int().safe().finite().optional(),
        }),
        z.number().int().safe().finite(),
      ])
      .optional(),
    customer: z.string().optional(),
    ending_before: z.string().optional(),
    expand: z.array(z.string()).optional(),
    invoice: z.string().optional(),
    limit: z.number().int().safe().finite().optional(),
    pending: z.boolean().optional(),
    starting_after: z.string().optional(),
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
          zodSchema: z.object({
            data: z.array(z_Invoiceitem),
            has_more: z.boolean(),
            object: z.enum(['list']),
            url: z.string().regex(/\^\/v1\/invoiceitems/),
          }),
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

export type GetInvoiceitemsRequest = RequestUnion<
  RequestBodyData<'application/x-www-form-urlencoded', {}>,
  any,
  {
    created?: (
      | {
          gt?: number; // int
          gte?: number; // int
          lt?: number; // int
          lte?: number; // int
        }
      | number
    ) &
      Partial<{
        gt?: number; // int
        gte?: number; // int
        lt?: number; // int
        lte?: number; // int
      }>;
    customer?: string;
    ending_before?: string;
    expand?: string[];
    invoice?: string;
    limit?: number; // int
    pending?: boolean;
    starting_after?: string;
  }
>;

export type GetInvoiceitemsResponse =
  | ResponseUnion<
      200,
      ResponseBodyData<
        'application/json',
        {
          data: Invoiceitem[];
          has_more: boolean;
          object: 'list';
          url: string;
        }
      >
    >
  | ResponseUnion<any, ResponseBodyData<'application/json', Error>>;

export type GetInvoiceitemsRequestResult = RequestResult<
  GetInvoiceitemsRequest,
  GetInvoiceitemsResponse
>;

export function getInvoiceitems(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<
    GetInvoiceitemsRequest,
    'contentType' | 'body',
    'queryParams'
  >,
  config?: RequestHandlerExecutionConfig
): Promise<GetInvoiceitemsRequestResult> {
  return requestHandler.execute(
    createRequest(getInvoiceitemsEndpointSchema, payload),
    config
  );
}
