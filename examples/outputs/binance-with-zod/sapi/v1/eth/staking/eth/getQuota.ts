import {z_Error, Error} from '../../../../../';
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
} from '../../../../../core';

export const getQuotaEndpointSchema = {
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

export type GetQuotaRequest = RequestUnion<
  any,
  any,
  {
    recvWindow?: number; // int
    timestamp: number; // int
    signature: string;
  }
>;

export type GetQuotaResponse =
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

export type GetQuotaRequestResult = RequestResult<
  GetQuotaRequest,
  GetQuotaResponse
>;

export function getQuota(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<GetQuotaRequest, 'queryParams', never>,
  config?: RequestHandlerExecutionConfig
): Promise<GetQuotaRequestResult> {
  return requestHandler.execute(
    createRequest(getQuotaEndpointSchema, payload),
    config
  );
}
