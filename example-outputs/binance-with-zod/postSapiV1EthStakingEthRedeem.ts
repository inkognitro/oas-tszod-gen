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

export const postSapiV1EthStakingEthRedeemEndpointSchema = {
  path: '/sapi/v1/eth-staking/eth/redeem',
  method: 'post',
  supportedSecuritySchemas: [{name: 'ApiKeyAuth', scopes: []}],
  queryParamsZodSchema: z.object({
    asset: z.string().optional(),
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
            arrivalTime: z.number().int().safe().finite(),
            ethAmount: z.string(),
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

export type PostSapiV1EthStakingEthRedeemRequest = RequestUnion<
  any,
  any,
  {
    asset?: string;
    amount: number;
    recvWindow?: number; // int
    timestamp: number; // int
    signature: string;
  }
>;

export type PostSapiV1EthStakingEthRedeemResponse =
  | ResponseUnion<
      200,
      ResponseBodyData<
        'application/json',
        {
          success: boolean;
          arrivalTime: number; // int
          ethAmount: string;
          conversionRatio: string;
        }
      >
    >
  | ResponseUnion<400, ResponseBodyData<'application/json', Error>>
  | ResponseUnion<401, ResponseBodyData<'application/json', Error>>;

export type PostSapiV1EthStakingEthRedeemRequestResult = RequestResult<
  PostSapiV1EthStakingEthRedeemRequest,
  PostSapiV1EthStakingEthRedeemResponse
>;

export function postSapiV1EthStakingEthRedeem(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<PostSapiV1EthStakingEthRedeemRequest, 'queryParams'>,
  config?: RequestHandlerExecutionConfig
): Promise<PostSapiV1EthStakingEthRedeemRequestResult> {
  return requestHandler.execute(
    createRequest(postSapiV1EthStakingEthRedeemEndpointSchema, payload),
    config
  );
}
