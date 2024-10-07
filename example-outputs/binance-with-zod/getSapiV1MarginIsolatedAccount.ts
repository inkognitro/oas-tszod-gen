import {
  z_IsolatedMarginAccountInfo,
  z_Error,
  IsolatedMarginAccountInfo,
  Error,
} from '@example-outputs/binance-with-zod';
import {z} from 'zod';
import {
  RequestUnion,
  ResponseBodyData,
  ResponseUnion,
  RequestResult,
  SimpleRequestHandler,
  createRequest,
  RequestHandlerExecutionConfig,
  RequestPayload,
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
          zodSchema: z_IsolatedMarginAccountInfo,
        },
      },
    },
    '400': {
      bodyByContentType: {
        'application/json': {
          zodSchema: z_Error,
        },
      },
    },
    '401': {
      bodyByContentType: {
        'application/json': {
          zodSchema: z_Error,
        },
      },
    },
  },
};

export type GetSapiV1MarginIsolatedAccountRequest = RequestUnion<
  any,
  any,
  {
    symbols?: string;
    recvWindow?: number; // int
    timestamp: number; // int
    signature: string;
  }
>;

export type GetSapiV1MarginIsolatedAccountResponse =
  | ResponseUnion<
      200,
      ResponseBodyData<'application/json', IsolatedMarginAccountInfo>
    >
  | ResponseUnion<400, ResponseBodyData<'application/json', Error>>
  | ResponseUnion<401, ResponseBodyData<'application/json', Error>>;

export type GetSapiV1MarginIsolatedAccountRequestResult = RequestResult<
  GetSapiV1MarginIsolatedAccountRequest,
  GetSapiV1MarginIsolatedAccountResponse
>;

export function getSapiV1MarginIsolatedAccount(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<GetSapiV1MarginIsolatedAccountRequest, 'queryParams'>,
  config?: RequestHandlerExecutionConfig
): Promise<GetSapiV1MarginIsolatedAccountRequestResult> {
  return requestHandler.execute(
    createRequest(getSapiV1MarginIsolatedAccountEndpointSchema, payload),
    config
  );
}
