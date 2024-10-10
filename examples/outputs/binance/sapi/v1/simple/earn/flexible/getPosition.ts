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

export const getPositionEndpointSchema = {
  path: '/sapi/v1/simple-earn/flexible/position',
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

export type GetPositionRequest = RequestUnion<
  any,
  any,
  {
    asset?: string;
    productId?: string;
    current?: number; // int
    size?: number; // int
    recvWindow?: number; // int
    timestamp: number; // int
    signature: string;
  }
>;

export type GetPositionResponse =
  | ResponseUnion<
      200,
      ResponseBodyData<
        'application/json',
        {
          rows: {
            totalAmount: string;
            tierAnnualPercentageRate: {
              '0-5BTC': number;
              '5-10BTC': number;
            };
            latestAnnualPercentageRate: string;
            yesterdayAirdropPercentageRate: string;
            asset: string;
            airDropAsset: string;
            canRedeem: boolean;
            collateralAmount: string;
            productId: string;
            yesterdayRealTimeRewards: string;
            cumulativeBonusRewards: string;
            cumulativeRealTimeRewards: string;
            cumulativeTotalRewards: string;
            autoSubscribe: boolean;
          }[];
          total: number; // int
        }
      >
    >
  | ResponseUnion<400, ResponseBodyData<'application/json', Error>>
  | ResponseUnion<401, ResponseBodyData<'application/json', Error>>;

export type GetPositionRequestResult = RequestResult<
  GetPositionRequest,
  GetPositionResponse
>;

export function getPosition(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<GetPositionRequest, 'queryParams', never>,
  config?: RequestHandlerExecutionConfig
): Promise<GetPositionRequestResult> {
  return requestHandler.execute(
    createRequest(getPositionEndpointSchema, payload),
    config
  );
}
