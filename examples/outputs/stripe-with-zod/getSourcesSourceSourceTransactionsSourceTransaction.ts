import {
  z_Source_transaction,
  z_Error,
  Source_transaction,
  Error,
} from './schemas';
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

export const getSourcesSourceSourceTransactionsSourceTransactionEndpointSchema =
  {
    path: '/v1/sources/{source}/source_transactions/{source_transaction}',
    method: 'get',
    supportedSecuritySchemas: [],
    queryParamsZodSchema: z.object({
      expand: z.array(z.string()).optional(),
    }),
    pathParamsZodSchema: z.object({
      source: z.string(),
      source_transaction: z.string(),
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
            zodSchema: z_Source_transaction,
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

export type GetSourcesSourceSourceTransactionsSourceTransactionRequest =
  RequestUnion<
    RequestBodyData<'application/x-www-form-urlencoded', {}>,
    {
      source: string;
      source_transaction: string;
    },
    {
      expand?: string[];
    }
  >;

export type GetSourcesSourceSourceTransactionsSourceTransactionResponse =
  | ResponseUnion<200, ResponseBodyData<'application/json', Source_transaction>>
  | ResponseUnion<any, ResponseBodyData<'application/json', Error>>;

export type GetSourcesSourceSourceTransactionsSourceTransactionRequestResult =
  RequestResult<
    GetSourcesSourceSourceTransactionsSourceTransactionRequest,
    GetSourcesSourceSourceTransactionsSourceTransactionResponse
  >;

export function getSourcesSourceSourceTransactionsSourceTransaction(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<
    GetSourcesSourceSourceTransactionsSourceTransactionRequest,
    'pathParams' | 'contentType' | 'body',
    'queryParams'
  >,
  config?: RequestHandlerExecutionConfig
): Promise<GetSourcesSourceSourceTransactionsSourceTransactionRequestResult> {
  return requestHandler.execute(
    createRequest(
      getSourcesSourceSourceTransactionsSourceTransactionEndpointSchema,
      payload
    ),
    config
  );
}
