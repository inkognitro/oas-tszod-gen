import {z_Tax_Transaction_line_item, Tax_Transaction_line_item} from './tax';
import {z_Error, Error} from './schemas';
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

export const getTaxTransactionsTransactionLineItemsEndpointSchema = {
  path: '/v1/tax/transactions/{transaction}/line_items',
  method: 'get',
  supportedSecuritySchemas: [],
  queryParamsZodSchema: z.object({
    ending_before: z.string().optional(),
    expand: z.array(z.string()).optional(),
    limit: z.number().int().safe().finite().optional(),
    starting_after: z.string().optional(),
  }),
  pathParamsZodSchema: z.object({
    transaction: z.string(),
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
            data: z.array(z_Tax_Transaction_line_item),
            has_more: z.boolean(),
            object: z.enum(['list']),
            url: z
              .string()
              .regex(/\^\/v1\/tax\/transactions\/\[\^\/\]\+\/line_items/),
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

export type GetTaxTransactionsTransactionLineItemsRequest = RequestUnion<
  RequestBodyData<'application/x-www-form-urlencoded', {}>,
  {
    transaction: string;
  },
  {
    ending_before?: string;
    expand?: string[];
    limit?: number; // int
    starting_after?: string;
  }
>;

export type GetTaxTransactionsTransactionLineItemsResponse =
  | ResponseUnion<
      200,
      ResponseBodyData<
        'application/json',
        {
          data: Tax_Transaction_line_item[];
          has_more: boolean;
          object: 'list';
          url: string;
        }
      >
    >
  | ResponseUnion<any, ResponseBodyData<'application/json', Error>>;

export type GetTaxTransactionsTransactionLineItemsRequestResult = RequestResult<
  GetTaxTransactionsTransactionLineItemsRequest,
  GetTaxTransactionsTransactionLineItemsResponse
>;

export function getTaxTransactionsTransactionLineItems(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<
    GetTaxTransactionsTransactionLineItemsRequest,
    'pathParams' | 'contentType' | 'body',
    'queryParams'
  >,
  config?: RequestHandlerExecutionConfig
): Promise<GetTaxTransactionsTransactionLineItemsRequestResult> {
  return requestHandler.execute(
    createRequest(
      getTaxTransactionsTransactionLineItemsEndpointSchema,
      payload
    ),
    config
  );
}
