import {
  z_SubAccountUSDTFuturesPositionRisk,
  z_SubAccountCOINFuturesPositionRisk,
  z_Error,
  SubAccountUSDTFuturesPositionRisk,
  SubAccountCOINFuturesPositionRisk,
  Error,
} from '../../../../../';
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

export const getPositionRiskEndpointSchema = {
  path: '/sapi/v2/sub-account/futures/positionRisk',
  method: 'get',
  supportedSecuritySchemas: [{name: 'ApiKeyAuth', scopes: []}],
  queryParamsZodSchema: z.object({
    email: z.string(),
    futuresType: z.number().int().safe().finite(),
    recvWindow: z.number().int().safe().finite().optional(),
    timestamp: z.number().int().safe().finite(),
    signature: z.string(),
  }),
  bodyByContentType: {},
  responseByStatus: {
    '200': {
      bodyByContentType: {
        'application/json': {
          zodSchema: z.union([
            z_SubAccountUSDTFuturesPositionRisk,
            z_SubAccountCOINFuturesPositionRisk,
          ]),
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

export type GetPositionRiskRequest = RequestUnion<
  any,
  any,
  {
    email: string;
    futuresType: number; // int
    recvWindow?: number; // int
    timestamp: number; // int
    signature: string;
  }
>;

export type GetPositionRiskResponse =
  | ResponseUnion<
      200,
      ResponseBodyData<
        'application/json',
        SubAccountUSDTFuturesPositionRisk | SubAccountCOINFuturesPositionRisk
      >
    >
  | ResponseUnion<400, ResponseBodyData<'application/json', Error>>
  | ResponseUnion<401, ResponseBodyData<'application/json', Error>>;

export type GetPositionRiskRequestResult = RequestResult<
  GetPositionRiskRequest,
  GetPositionRiskResponse
>;

export function getPositionRisk(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<GetPositionRiskRequest, 'queryParams', never>,
  config?: RequestHandlerExecutionConfig
): Promise<GetPositionRiskRequestResult> {
  return requestHandler.execute(
    createRequest(getPositionRiskEndpointSchema, payload),
    config
  );
}
