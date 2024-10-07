import {z_Error, Error} from '@example-outputs/binance-with-zod';
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

export const postSapiV1PortfolioRepayFuturesNegativeBalanceEndpointSchema = {
  path: '/sapi/v1/portfolio/repay-futures-negative-balance',
  method: 'post',
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
            msg: z.string(),
          }),
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

export type PostSapiV1PortfolioRepayFuturesNegativeBalanceRequest =
  RequestUnion<
    any,
    any,
    {
      recvWindow?: number; // int
      timestamp: number; // int
      signature: string;
    }
  >;

export type PostSapiV1PortfolioRepayFuturesNegativeBalanceResponse =
  | ResponseUnion<
      200,
      ResponseBodyData<
        'application/json',
        {
          msg: string;
        }
      >
    >
  | ResponseUnion<400, ResponseBodyData<'application/json', Error>>
  | ResponseUnion<401, ResponseBodyData<'application/json', Error>>;

export type PostSapiV1PortfolioRepayFuturesNegativeBalanceRequestResult =
  RequestResult<
    PostSapiV1PortfolioRepayFuturesNegativeBalanceRequest,
    PostSapiV1PortfolioRepayFuturesNegativeBalanceResponse
  >;

export function postSapiV1PortfolioRepayFuturesNegativeBalance(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<
    PostSapiV1PortfolioRepayFuturesNegativeBalanceRequest,
    'queryParams',
    never
  >,
  config?: RequestHandlerExecutionConfig
): Promise<PostSapiV1PortfolioRepayFuturesNegativeBalanceRequestResult> {
  return requestHandler.execute(
    createRequest(
      postSapiV1PortfolioRepayFuturesNegativeBalanceEndpointSchema,
      payload
    ),
    config
  );
}
