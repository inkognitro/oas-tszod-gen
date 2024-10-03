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

export const postSapiV1PortfolioRepayFuturesSwitchEndpointSchema = {
  path: '/sapi/v1/portfolio/repay-futures-switch',
  method: 'post',
  supportedSecuritySchemas: [{name: 'ApiKeyAuth', scopes: []}],
  queryParamsZodSchema: z.object({
    autoRepay: z.boolean(),
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

export type PostSapiV1PortfolioRepayFuturesSwitchRequest = RequestUnion<
  any,
  any,
  {
    autoRepay: boolean;
    recvWindow?: number; // int
    timestamp: number; // int
    signature: string;
  }
>;

export type PostSapiV1PortfolioRepayFuturesSwitchResponse =
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

export type PostSapiV1PortfolioRepayFuturesSwitchRequestResult = RequestResult<
  PostSapiV1PortfolioRepayFuturesSwitchRequest,
  PostSapiV1PortfolioRepayFuturesSwitchResponse
>;

export function postSapiV1PortfolioRepayFuturesSwitch(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<
    PostSapiV1PortfolioRepayFuturesSwitchRequest,
    'queryParams'
  >,
  config?: RequestHandlerExecutionConfig
): Promise<PostSapiV1PortfolioRepayFuturesSwitchRequestResult> {
  return requestHandler.execute(
    createRequest(postSapiV1PortfolioRepayFuturesSwitchEndpointSchema, payload),
    config
  );
}
