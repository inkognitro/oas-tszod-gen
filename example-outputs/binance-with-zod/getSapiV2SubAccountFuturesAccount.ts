import {
  subAccountUSDTFuturesDetailsZodSchema,
  subAccountCOINFuturesDetailsZodSchema,
  errorZodSchema,
  SubAccountUSDTFuturesDetails,
  SubAccountCOINFuturesDetails,
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

export const getSapiV2SubAccountFuturesAccountEndpointSchema = {
  path: '/sapi/v2/sub-account/futures/account',
  method: 'get',
  supportedSecuritySchemas: [{name: 'ApiKeyAuth', requiredPermissions: []}],
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
            subAccountUSDTFuturesDetailsZodSchema,
            subAccountCOINFuturesDetailsZodSchema,
          ]),
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

export type GetSapiV2SubAccountFuturesAccountPayload = {
  queryParams: {
    email: string;
    futuresType: number; // int
    recvWindow?: number; // int
    timestamp: number; // int
    signature: string;
  };
};

export type GetSapiV2SubAccountFuturesAccountResponse =
  | Response<
      200,
      ResponseBodyData<
        'application/json',
        SubAccountUSDTFuturesDetails | SubAccountCOINFuturesDetails
      >
    >
  | Response<400, ResponseBodyData<'application/json', Error>>
  | Response<401, ResponseBodyData<'application/json', Error>>;

export type GetSapiV2SubAccountFuturesAccountRequestResult = RequestResult<
  Request,
  GetSapiV2SubAccountFuturesAccountResponse
>;

export function getSapiV2SubAccountFuturesAccount(
  requestHandler: SimpleRequestHandler,
  payload: GetSapiV2SubAccountFuturesAccountPayload,
  config?: RequestHandlerExecutionConfig
): Promise<GetSapiV2SubAccountFuturesAccountRequestResult> {
  return requestHandler.execute(
    createRequest({
      ...payload,
      endpointSchema: getSapiV2SubAccountFuturesAccountEndpointSchema,
    }),
    config
  );
}
