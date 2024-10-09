import {
  z_Balance_transaction,
  z_Error,
  Balance_transaction,
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

export const getBalanceHistoryIdEndpointSchema = {
  path: '/v1/balance/history/{id}',
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

export type GetBalanceHistoryIdRequest = RequestUnion<
  RequestBodyData<'application/x-www-form-urlencoded', {}>,
  {
    id: string;
  },
  {
    expand?: string[];
  }
>;

export type GetBalanceHistoryIdResponse =
  | ResponseUnion<
      200,
      ResponseBodyData<'application/json', Balance_transaction>
    >
  | ResponseUnion<any, ResponseBodyData<'application/json', Error>>;

export type GetBalanceHistoryIdRequestResult = RequestResult<
  GetBalanceHistoryIdRequest,
  GetBalanceHistoryIdResponse
>;

export function getBalanceHistoryId(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<
    GetBalanceHistoryIdRequest,
    'pathParams' | 'contentType' | 'body',
    'queryParams'
  >,
  config?: RequestHandlerExecutionConfig
): Promise<GetBalanceHistoryIdRequestResult> {
  return requestHandler.execute(
    createRequest(getBalanceHistoryIdEndpointSchema, payload),
    config
  );
}
