import {errorZodSchema, Error} from '@example-outputs/binance-with-zod';
import {z} from 'zod';
import {
  ResponseBodyData,
  ResponseUnion,
  RequestResult,
  Request,
  SimpleRequestHandler,
  createRequest,
  RequestHandlerExecutionConfig,
} from '@example-outputs/binance-with-zod/core';

export const postSapiV1EthStakingWbethWrapEndpointSchema = {
  path: '/sapi/v1/eth-staking/wbeth/wrap',
  method: 'post',
  supportedSecuritySchemas: [{name: 'ApiKeyAuth', scopes: []}],
  queryParamsZodSchema: z.object({
    amount: z.number().safe().finite(),
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
            success: z.boolean(),
            wbethAmount: z.string(),
            exchangeRate: z.string(),
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

export type PostSapiV1EthStakingWbethWrapPayload = {
  queryParams: {
    amount: number;
    recvWindow?: number; // int
    timestamp: number; // int
    signature: string;
  };
};

export type PostSapiV1EthStakingWbethWrapResponse =
  | ResponseUnion<
      200,
      ResponseBodyData<
        'application/json',
        {
          success: boolean;
          wbethAmount: string;
          exchangeRate: string;
        }
      >
    >
  | ResponseUnion<400, ResponseBodyData<'application/json', Error>>
  | ResponseUnion<401, ResponseBodyData<'application/json', Error>>;

export type PostSapiV1EthStakingWbethWrapRequestResult = RequestResult<
  Request,
  PostSapiV1EthStakingWbethWrapResponse
>;

export function postSapiV1EthStakingWbethWrap(
  requestHandler: SimpleRequestHandler,
  payload: PostSapiV1EthStakingWbethWrapPayload,
  config?: RequestHandlerExecutionConfig
): Promise<PostSapiV1EthStakingWbethWrapRequestResult> {
  return requestHandler.execute(
    createRequest({
      ...payload,
      endpointSchema: postSapiV1EthStakingWbethWrapEndpointSchema,
    }),
    config
  );
}
