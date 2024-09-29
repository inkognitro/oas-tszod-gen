import {errorZodSchema, Error} from '@example-outputs/binance-with-zod';
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

export const getSapiV1SimpleEarnAccountEndpointSchema = {
  path: '/sapi/v1/simple-earn/account',
  method: 'get',
  supportedSecuritySchemas: [{name: 'ApiKeyAuth', requiredPermissions: []}],
  queryParamsZodSchema: z.object({
    recvWindow: z.number().int().safe().finite().optional(),
    timestamp: z.number().int().safe().finite(),
    signature: z.string(),
  }),
  bodyByContentType: {},
  responseByStatus: {
    '200': {
      bodyByContentType: {
        'application/json': {
          zodSchema: z.object({
            totalAmountInBTC: z.string(),
            totalAmountInUSDT: z.string(),
            totalFlexibleAmountInBTC: z.string(),
            totalFlexibleAmountInUSDT: z.string(),
            totalLockedInBTC: z.string(),
            totalLockedInUSDT: z.string(),
          }),
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

export type GetSapiV1SimpleEarnAccountPayload = {
  queryParams: {
    recvWindow?: number; // int
    timestamp: number; // int
    signature: string;
  };
};

export type GetSapiV1SimpleEarnAccountResponse =
  | Response<
      200,
      ResponseBodyData<
        'application/json',
        {
          totalAmountInBTC: string;
          totalAmountInUSDT: string;
          totalFlexibleAmountInBTC: string;
          totalFlexibleAmountInUSDT: string;
          totalLockedInBTC: string;
          totalLockedInUSDT: string;
        }
      >
    >
  | Response<400, ResponseBodyData<'application/json', Error>>
  | Response<401, ResponseBodyData<'application/json', Error>>;

export type GetSapiV1SimpleEarnAccountRequestResult = RequestResult<
  Request,
  GetSapiV1SimpleEarnAccountResponse
>;

export function getSapiV1SimpleEarnAccount(
  requestHandler: SimpleRequestHandler,
  payload: GetSapiV1SimpleEarnAccountPayload,
  config?: RequestHandlerExecutionConfig
): Promise<GetSapiV1SimpleEarnAccountRequestResult> {
  return requestHandler.execute(
    createRequest({
      ...payload,
      endpointSchema: getSapiV1SimpleEarnAccountEndpointSchema,
    }),
    config
  );
}
