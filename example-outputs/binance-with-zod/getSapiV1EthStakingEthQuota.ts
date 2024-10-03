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

export const getSapiV1EthStakingEthQuotaEndpointSchema = {
  path: '/sapi/v1/eth-staking/eth/quota',
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
            leftStakingPersonalQuota: z.string(),
            leftRedemptionPersonalQuota: z.string(),
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

export type GetSapiV1EthStakingEthQuotaRequest = RequestUnion<
  any,
  any,
  {
    recvWindow?: number; // int
    timestamp: number; // int
    signature: string;
  }
>;

export type GetSapiV1EthStakingEthQuotaResponse =
  | ResponseUnion<
      200,
      ResponseBodyData<
        'application/json',
        {
          leftStakingPersonalQuota: string;
          leftRedemptionPersonalQuota: string;
        }
      >
    >
  | ResponseUnion<400, ResponseBodyData<'application/json', Error>>
  | ResponseUnion<401, ResponseBodyData<'application/json', Error>>;

export type GetSapiV1EthStakingEthQuotaRequestResult = RequestResult<
  GetSapiV1EthStakingEthQuotaRequest,
  GetSapiV1EthStakingEthQuotaResponse
>;

export function getSapiV1EthStakingEthQuota(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<GetSapiV1EthStakingEthQuotaRequest, 'queryParams'>,
  config?: RequestHandlerExecutionConfig
): Promise<GetSapiV1EthStakingEthQuotaRequestResult> {
  return requestHandler.execute(
    createRequest(getSapiV1EthStakingEthQuotaEndpointSchema, payload),
    config
  );
}
