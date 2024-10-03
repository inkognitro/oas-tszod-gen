import {errorZodSchema, Error} from '@example-outputs/binance-with-zod';
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

export const getSapiV1PortfolioRepayFuturesSwitchEndpointSchema = {
  path: '/sapi/v1/portfolio/repay-futures-switch',
  method: 'get',
  supportedSecuritySchemas: [{name: 'ApiKeyAuth', scopes: []}],
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
            autoRepay: z.boolean(),
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

export type GetSapiV1PortfolioRepayFuturesSwitchRequest = RequestUnion<
  any,
  any,
  {
    recvWindow?: number; // int
    timestamp: number; // int
    signature: string;
  }
>;

export type GetSapiV1PortfolioRepayFuturesSwitchResponse =
  | ResponseUnion<
      200,
      ResponseBodyData<
        'application/json',
        {
          autoRepay: boolean;
        }
      >
    >
  | ResponseUnion<400, ResponseBodyData<'application/json', Error>>
  | ResponseUnion<401, ResponseBodyData<'application/json', Error>>;

export type GetSapiV1PortfolioRepayFuturesSwitchRequestResult = RequestResult<
  GetSapiV1PortfolioRepayFuturesSwitchRequest,
  GetSapiV1PortfolioRepayFuturesSwitchResponse
>;

export function getSapiV1PortfolioRepayFuturesSwitch(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<
    GetSapiV1PortfolioRepayFuturesSwitchRequest,
    'queryParams'
  >,
  config?: RequestHandlerExecutionConfig
): Promise<GetSapiV1PortfolioRepayFuturesSwitchRequestResult> {
  return requestHandler.execute(
    createRequest(getSapiV1PortfolioRepayFuturesSwitchEndpointSchema, payload),
    config
  );
}
