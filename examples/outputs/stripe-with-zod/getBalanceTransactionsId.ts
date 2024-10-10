import {
  z_Balance_transaction,
  z_Error,
  Balance_transaction,
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

export const getBalanceTransactionsIdEndpointSchema = {
  path: '/v1/balance_transactions/{id}',
  method: 'get',
  supportedSecuritySchemas: [],
  queryParamsZodSchema: z.object({
    expand: z.array(z.string()).optional(),
  }),
  pathParamsZodSchema: z.object({
    id: z.string(),
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
          zodSchema: z_Balance_transaction,
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

export type GetBalanceTransactionsIdRequest = RequestUnion<
  RequestBodyData<'application/x-www-form-urlencoded', {}>,
  {
    id: string;
  },
  {
    expand?: string[];
  }
>;

export type GetBalanceTransactionsIdResponse =
  | ResponseUnion<
      200,
      ResponseBodyData<'application/json', Balance_transaction>
    >
  | ResponseUnion<any, ResponseBodyData<'application/json', Error>>;

export type GetBalanceTransactionsIdRequestResult = RequestResult<
  GetBalanceTransactionsIdRequest,
  GetBalanceTransactionsIdResponse
>;

export function getBalanceTransactionsId(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<
    GetBalanceTransactionsIdRequest,
    'pathParams' | 'contentType' | 'body',
    'queryParams'
  >,
  config?: RequestHandlerExecutionConfig
): Promise<GetBalanceTransactionsIdRequestResult> {
  return requestHandler.execute(
    createRequest(getBalanceTransactionsIdEndpointSchema, payload),
    config
  );
}
