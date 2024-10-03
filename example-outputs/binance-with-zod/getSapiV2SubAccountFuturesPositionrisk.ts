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
  RequestUnion,
  ResponseBodyData,
  ResponseUnion,
  RequestResult,
  SimpleRequestHandler,
  createRequest,
  RequestHandlerExecutionConfig,
  RequestPayload,
} from '@example-outputs/binance-with-zod/core';

export const getSapiV2SubAccountFuturesPositionriskEndpointSchema = {
  path: '/sapi/v2/sub-account/futures/positionRisk',
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

export type GetSapiV2SubAccountFuturesPositionriskRequest = RequestUnion<
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

export type GetSapiV2SubAccountFuturesPositionriskResponse =
  | ResponseUnion<
      200,
      ResponseBodyData<
        'application/json',
        SubAccountUSDTFuturesPositionRisk | SubAccountCOINFuturesPositionRisk
      >
    >
  | ResponseUnion<400, ResponseBodyData<'application/json', Error>>
  | ResponseUnion<401, ResponseBodyData<'application/json', Error>>;

export type GetSapiV2SubAccountFuturesPositionriskRequestResult = RequestResult<
  GetSapiV2SubAccountFuturesPositionriskRequest,
  GetSapiV2SubAccountFuturesPositionriskResponse
>;

export function getSapiV2SubAccountFuturesPositionrisk(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<
    GetSapiV2SubAccountFuturesPositionriskRequest,
    'queryParams'
  >,
  config?: RequestHandlerExecutionConfig
): Promise<GetSapiV2SubAccountFuturesPositionriskRequestResult> {
  return requestHandler.execute(
    createRequest(
      getSapiV2SubAccountFuturesPositionriskEndpointSchema,
      payload
    ),
    config
  );
}
