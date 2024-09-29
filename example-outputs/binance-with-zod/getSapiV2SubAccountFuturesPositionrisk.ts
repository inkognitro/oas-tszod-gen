import {
  subAccountUSDTFuturesPositionRiskZodSchema,
  subAccountCOINFuturesPositionRiskZodSchema,
  errorZodSchema,
  SubAccountUSDTFuturesPositionRisk,
  SubAccountCOINFuturesPositionRisk,
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

export const getSapiV2SubAccountFuturesPositionriskEndpointSchema = {
  path: '/sapi/v2/sub-account/futures/positionRisk',
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
            subAccountUSDTFuturesPositionRiskZodSchema,
            subAccountCOINFuturesPositionRiskZodSchema,
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

export type GetSapiV2SubAccountFuturesPositionriskPayload = {
  queryParams: {
    email: string;
    futuresType: number; // int
    recvWindow?: number; // int
    timestamp: number; // int
    signature: string;
  };
};

export type GetSapiV2SubAccountFuturesPositionriskResponse =
  | Response<
      200,
      ResponseBodyData<
        'application/json',
        SubAccountUSDTFuturesPositionRisk | SubAccountCOINFuturesPositionRisk
      >
    >
  | Response<400, ResponseBodyData<'application/json', Error>>
  | Response<401, ResponseBodyData<'application/json', Error>>;

export type GetSapiV2SubAccountFuturesPositionriskRequestResult = RequestResult<
  Request,
  GetSapiV2SubAccountFuturesPositionriskResponse
>;

export function getSapiV2SubAccountFuturesPositionrisk(
  requestHandler: SimpleRequestHandler,
  payload: GetSapiV2SubAccountFuturesPositionriskPayload,
  config?: RequestHandlerExecutionConfig
): Promise<GetSapiV2SubAccountFuturesPositionriskRequestResult> {
  return requestHandler.execute(
    createRequest({
      ...payload,
      endpointSchema: getSapiV2SubAccountFuturesPositionriskEndpointSchema,
    }),
    config
  );
}
