import {errorZodSchema, Error} from '@example-outputs/binance-with-zod';
import {z} from 'zod';
import {
  ResponseBodyData,
  ResponseData,
  Response,
  RequestResult,
  Request,
  SimpleRequestHandler,
  createRequest,
  RequestHandlerExecutionConfig,
} from '@example-outputs/binance-with-zod/core';

export const getSapiV1AccountApirestrictionsEndpointSchema = {
  path: '/sapi/v1/account/apiRestrictions',
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
            ipRestrict: z.boolean(),
            createTime: z.number().int().safe().finite(),
            enableInternalTransfer: z.boolean(),
            enableFutures: z.boolean(),
            enablePortfolioMarginTrading: z.boolean().optional(),
            enableVanillaOptions: z.boolean(),
            permitsUniversalTransfer: z.boolean(),
            enableReading: z.boolean(),
            enableSpotAndMarginTrading: z.boolean(),
            enableWithdrawals: z.boolean(),
            enableMargin: z.boolean(),
            tradingAuthorityExpirationTime: z.number().int().safe().finite(),
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

export type GetSapiV1AccountApirestrictionsPayload = {
  queryParams: {
    recvWindow?: number; // int
    timestamp: number; // int
    signature: string;
  };
};

export type GetSapiV1AccountApirestrictionsResponse =
  | Response<
      200,
      ResponseData<
        ResponseBodyData<
          'application/json',
          {
            ipRestrict: boolean;
            createTime: number; // int
            enableInternalTransfer: boolean;
            enableFutures: boolean;
            enablePortfolioMarginTrading?: boolean;
            enableVanillaOptions: boolean;
            permitsUniversalTransfer: boolean;
            enableReading: boolean;
            enableSpotAndMarginTrading: boolean;
            enableWithdrawals: boolean;
            enableMargin: boolean;
            tradingAuthorityExpirationTime: number; // int
          }
        >
      >
    >
  | Response<400, ResponseData<ResponseBodyData<'application/json', Error>>>
  | Response<401, ResponseData<ResponseBodyData<'application/json', Error>>>;

export type GetSapiV1AccountApirestrictionsRequestResult = RequestResult<
  Request,
  GetSapiV1AccountApirestrictionsResponse
>;

export function getSapiV1AccountApirestrictions(
  requestHandler: SimpleRequestHandler,
  payload: GetSapiV1AccountApirestrictionsPayload,
  config?: RequestHandlerExecutionConfig
): Promise<GetSapiV1AccountApirestrictionsRequestResult> {
  return requestHandler.execute(
    createRequest({
      ...payload,
      endpointSchema: getSapiV1AccountApirestrictionsEndpointSchema,
    }),
    config
  );
}
