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

export const getSapiV1SubAccountFuturesPositionriskEndpointSchema = {
  path: '/sapi/v1/sub-account/futures/positionRisk',
  method: 'get',
  supportedSecuritySchemas: [{name: 'ApiKeyAuth', requiredPermissions: []}],
  queryParamsZodSchema: z.object({
    email: z.string(),
    recvWindow: z.number().int().safe().finite().optional(),
    timestamp: z.number().int().safe().finite(),
    signature: z.string(),
  }),
  bodyByContentType: {},
  responseByStatus: {
    '200': {
      bodyByContentType: {
        'application/json': {
          zodSchema: z.array(
            z.object({
              entryPrice: z.string(),
              leverage: z.string(),
              maxNotional: z.string(),
              liquidationPrice: z.string(),
              markPrice: z.string(),
              positionAmount: z.string(),
              symbol: z.string(),
              unrealizedProfit: z.string(),
            })
          ),
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

export type GetSapiV1SubAccountFuturesPositionriskPayload = {
  queryParams: {
    email: string;
    recvWindow?: number; // int
    timestamp: number; // int
    signature: string;
  };
};

export type GetSapiV1SubAccountFuturesPositionriskResponse =
  | Response<
      200,
      ResponseBodyData<
        'application/json',
        {
          entryPrice: string;
          leverage: string;
          maxNotional: string;
          liquidationPrice: string;
          markPrice: string;
          positionAmount: string;
          symbol: string;
          unrealizedProfit: string;
        }[]
      >
    >
  | Response<400, ResponseBodyData<'application/json', Error>>
  | Response<401, ResponseBodyData<'application/json', Error>>;

export type GetSapiV1SubAccountFuturesPositionriskRequestResult = RequestResult<
  Request,
  GetSapiV1SubAccountFuturesPositionriskResponse
>;

export function getSapiV1SubAccountFuturesPositionrisk(
  requestHandler: SimpleRequestHandler,
  payload: GetSapiV1SubAccountFuturesPositionriskPayload,
  config?: RequestHandlerExecutionConfig
): Promise<GetSapiV1SubAccountFuturesPositionriskRequestResult> {
  return requestHandler.execute(
    createRequest({
      ...payload,
      endpointSchema: getSapiV1SubAccountFuturesPositionriskEndpointSchema,
    }),
    config
  );
}
