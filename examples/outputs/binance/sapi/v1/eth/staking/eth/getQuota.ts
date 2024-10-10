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
import {Error} from '../../../../../';

export const getQuotaEndpointSchema = {
  path: '/sapi/v1/eth-staking/eth/quota',
  method: 'get',
  supportedSecuritySchemas: [{name: 'ApiKeyAuth', scopes: []}],
  bodyByContentType: {},
  responseByStatus: {
    '200': {
      bodyByContentType: {
        'application/json': {},
      },
    },
    '400': {
      bodyByContentType: {
        'application/json': {},
      },
    },
    '401': {
      bodyByContentType: {
        'application/json': {},
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
