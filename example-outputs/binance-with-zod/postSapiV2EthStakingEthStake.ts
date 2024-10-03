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

export const postSapiV2EthStakingEthStakeEndpointSchema = {
  path: '/sapi/v2/eth-staking/eth/stake',
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
            conversionRatio: z.string(),
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

export type PostSapiV2EthStakingEthStakeRequest = RequestUnion<
  any,
  any,
  {
    amount: number;
    recvWindow?: number; // int
    timestamp: number; // int
    signature: string;
  }
>;

export type PostSapiV2EthStakingEthStakeResponse =
  | ResponseUnion<
      200,
      ResponseBodyData<
        'application/json',
        {
          success: boolean;
          wbethAmount: string;
          conversionRatio: string;
        }
      >
    >
  | ResponseUnion<400, ResponseBodyData<'application/json', Error>>
  | ResponseUnion<401, ResponseBodyData<'application/json', Error>>;

export type PostSapiV2EthStakingEthStakeRequestResult = RequestResult<
  PostSapiV2EthStakingEthStakeRequest,
  PostSapiV2EthStakingEthStakeResponse
>;

export function postSapiV2EthStakingEthStake(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<PostSapiV2EthStakingEthStakeRequest, 'queryParams'>,
  config?: RequestHandlerExecutionConfig
): Promise<PostSapiV2EthStakingEthStakeRequestResult> {
  return requestHandler.execute(
    createRequest(postSapiV2EthStakingEthStakeEndpointSchema, payload),
    config
  );
}
