import {
  z_Tax_Transaction,
  z_Error,
  Tax_Transaction,
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

export const getTaxTransactionsTransactionEndpointSchema = {
  path: '/v1/tax/transactions/{transaction}',
  method: 'get',
  supportedSecuritySchemas: [],
  queryParamsZodSchema: z.object({
    expand: z.array(z.string()).optional(),
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
          zodSchema: z_Tax_Transaction,
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

export type GetTaxTransactionsTransactionRequest = RequestUnion<
  RequestBodyData<'application/x-www-form-urlencoded', {}>,
  {
    transaction: string;
  },
  {
    expand?: string[];
  }
>;

export type GetTaxTransactionsTransactionResponse =
  | ResponseUnion<200, ResponseBodyData<'application/json', Tax_Transaction>>
  | ResponseUnion<any, ResponseBodyData<'application/json', Error>>;

export type GetTaxTransactionsTransactionRequestResult = RequestResult<
  GetTaxTransactionsTransactionRequest,
  GetTaxTransactionsTransactionResponse
>;

export function getTaxTransactionsTransaction(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<
    GetTaxTransactionsTransactionRequest,
    'pathParams' | 'contentType' | 'body',
    'queryParams'
  >,
  config?: RequestHandlerExecutionConfig
): Promise<GetTaxTransactionsTransactionRequestResult> {
  return requestHandler.execute(
    createRequest(getTaxTransactionsTransactionEndpointSchema, payload),
    config
  );
}
