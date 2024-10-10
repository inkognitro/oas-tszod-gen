import {z_Issuing_Transaction, Issuing_Transaction} from './issuing';
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

export const getIssuingTransactionsTransactionEndpointSchema = {
  path: '/v1/issuing/transactions/{transaction}',
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
          zodSchema: z_Issuing_Transaction,
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

export type GetIssuingTransactionsTransactionRequest = RequestUnion<
  RequestBodyData<'application/x-www-form-urlencoded', {}>,
  {
    transaction: string;
  },
  {
    expand?: string[];
  }
>;

export type GetIssuingTransactionsTransactionResponse =
  | ResponseUnion<
      200,
      ResponseBodyData<'application/json', Issuing_Transaction>
    >
  | ResponseUnion<any, ResponseBodyData<'application/json', Error>>;

export type GetIssuingTransactionsTransactionRequestResult = RequestResult<
  GetIssuingTransactionsTransactionRequest,
  GetIssuingTransactionsTransactionResponse
>;

export function getIssuingTransactionsTransaction(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<
    GetIssuingTransactionsTransactionRequest,
    'pathParams' | 'contentType' | 'body',
    'queryParams'
  >,
  config?: RequestHandlerExecutionConfig
): Promise<GetIssuingTransactionsTransactionRequestResult> {
  return requestHandler.execute(
    createRequest(getIssuingTransactionsTransactionEndpointSchema, payload),
    config
  );
}
