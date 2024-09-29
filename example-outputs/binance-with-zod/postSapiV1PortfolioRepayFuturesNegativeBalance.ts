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

export type PostSapiV1PortfolioRepayFuturesNegativeBalancePayload = {
  queryParams: {
    recvWindow?: number; // int
    timestamp: number; // int
    signature: string;
  };
};

export type PostSapiV1PortfolioRepayFuturesNegativeBalanceResponse =
  | Response<
      200,
      ResponseBodyData<
        'application/json',
        {
          msg: string;
        }
      >
    >
  | Response<400, ResponseBodyData<'application/json', Error>>
  | Response<401, ResponseBodyData<'application/json', Error>>;

export type PostSapiV1PortfolioRepayFuturesNegativeBalanceRequestResult =
  RequestResult<
    Request,
    PostSapiV1PortfolioRepayFuturesNegativeBalanceResponse
  >;

export function postSapiV1PortfolioRepayFuturesNegativeBalance(
  requestHandler: SimpleRequestHandler,
  payload: PostSapiV1PortfolioRepayFuturesNegativeBalancePayload,
  config?: RequestHandlerExecutionConfig
): Promise<PostSapiV1PortfolioRepayFuturesNegativeBalanceRequestResult> {
  return requestHandler.execute(
    createRequest({
      ...payload,
      endpointSchema:
        postSapiV1PortfolioRepayFuturesNegativeBalanceEndpointSchema,
    }),
    config
  );
}
