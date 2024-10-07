import {
  z_SubAccountUSDTFuturesDetails,
  z_SubAccountCOINFuturesDetails,
  z_Error,
  SubAccountUSDTFuturesDetails,
  SubAccountCOINFuturesDetails,
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

export const getSapiV2SubAccountFuturesAccountEndpointSchema = {
  path: '/sapi/v2/sub-account/futures/account',
  method: 'get',
  supportedSecuritySchemas: [{name: 'ApiKeyAuth', scopes: []}],
  queryParamsZodSchema: z.object({
    email: z.string(),
    futuresType: z.number().int().safe().finite(),
    recvWindow: z.number().int().safe().finite().optional(),
    timestamp: z.number().int().safe().finite(),
    signature: z.string(),
  }),
  bodyByContentType: {},
  responseByStatus: {
    '200': {
      bodyByContentType: {
        'application/json': {
          zodSchema: z.union([
            z_SubAccountUSDTFuturesDetails,
            z_SubAccountCOINFuturesDetails,
          ]),
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

export type GetSapiV2SubAccountFuturesAccountRequest = RequestUnion<
  any,
  any,
  {
    email: string;
    futuresType: number; // int
    recvWindow?: number; // int
    timestamp: number; // int
    signature: string;
  }
>;

export type GetSapiV2SubAccountFuturesAccountResponse =
  | ResponseUnion<
      200,
      ResponseBodyData<
        'application/json',
        SubAccountUSDTFuturesDetails | SubAccountCOINFuturesDetails
      >
    >
  | ResponseUnion<400, ResponseBodyData<'application/json', Error>>
  | ResponseUnion<401, ResponseBodyData<'application/json', Error>>;

export type GetSapiV2SubAccountFuturesAccountRequestResult = RequestResult<
  GetSapiV2SubAccountFuturesAccountRequest,
  GetSapiV2SubAccountFuturesAccountResponse
>;

export function getSapiV2SubAccountFuturesAccount(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<
    GetSapiV2SubAccountFuturesAccountRequest,
    'queryParams',
    never
  >,
  config?: RequestHandlerExecutionConfig
): Promise<GetSapiV2SubAccountFuturesAccountRequestResult> {
  return requestHandler.execute(
    createRequest(getSapiV2SubAccountFuturesAccountEndpointSchema, payload),
    config
  );
}
