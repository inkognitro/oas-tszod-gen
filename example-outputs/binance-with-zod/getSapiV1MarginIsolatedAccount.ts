import {
  isolatedMarginAccountInfoZodSchema,
  errorZodSchema,
  IsolatedMarginAccountInfo,
  Error,
} from '@example-outputs/binance-with-zod';
import {z} from 'zod';
import {
  ResponseBodyData,
  Response,
  RequestResult,
  Request,
  SimpleRequestHandler,
  createRequest,
  RequestHandlerExecutionConfig,
} from '@example-outputs/binance-with-zod/core';

export const getSapiV1MarginIsolatedAccountEndpointSchema = {
  path: '/sapi/v1/margin/isolated/account',
  method: 'get',
  supportedSecuritySchemas: [{name: 'ApiKeyAuth', scopes: []}],
  queryParamsZodSchema: z.object({
    symbols: z.string().optional(),
    recvWindow: z.number().int().safe().finite().optional(),
    timestamp: z.number().int().safe().finite(),
    signature: z.string(),
  }),
  bodyByContentType: {},
  responseByStatus: {
    '200': {
      bodyByContentType: {
        'application/json': {
          zodSchema: isolatedMarginAccountInfoZodSchema,
        },
      },
    },
    '400': {
      bodyByContentType: {
        'application/json': {
          zodSchema: errorZodSchema,
        },
      },
    },
    '401': {
      bodyByContentType: {
        'application/json': {
          zodSchema: errorZodSchema,
        },
      },
    },
  },
};

export type GetSapiV1MarginIsolatedAccountPayload = {
  queryParams: {
    symbols?: string;
    recvWindow?: number; // int
    timestamp: number; // int
    signature: string;
  };
};

export type GetSapiV1MarginIsolatedAccountResponse =
  | Response<
      200,
      ResponseBodyData<'application/json', IsolatedMarginAccountInfo>
    >
  | Response<400, ResponseBodyData<'application/json', Error>>
  | Response<401, ResponseBodyData<'application/json', Error>>;

export type GetSapiV1MarginIsolatedAccountRequestResult = RequestResult<
  Request,
  GetSapiV1MarginIsolatedAccountResponse
>;

export function getSapiV1MarginIsolatedAccount(
  requestHandler: SimpleRequestHandler,
  payload: GetSapiV1MarginIsolatedAccountPayload,
  config?: RequestHandlerExecutionConfig
): Promise<GetSapiV1MarginIsolatedAccountRequestResult> {
  return requestHandler.execute(
    createRequest({
      ...payload,
      endpointSchema: getSapiV1MarginIsolatedAccountEndpointSchema,
    }),
    config
  );
}
