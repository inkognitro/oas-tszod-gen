import {
  RequestUnion,
  ResponseBodyData,
  ResponseUnion,
  RequestResult,
  SimpleRequestHandler,
  createRequest,
  RequestHandlerExecutionConfig,
  RequestPayload,
} from '@example-outputs/binance/core';
import {Error} from '@example-outputs/binance';

export const getRewardsRecordEndpointSchema = {
  path: '/sapi/v1/simple-earn/flexible/history/rewardsRecord',
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

export type GetRewardsRecordRequest = RequestUnion<
  any,
  any,
  {
    productId?: string;
    asset?: string;
    startTime?: number; // int
    endTime?: number; // int
    type: string;
  }
>;

export type GetRewardsRecordResponse =
  | ResponseUnion<
      200,
      ResponseBodyData<
        'application/json',
        {
          rows: {
            asset: string;
            rewards: string;
            projectId: string;
            type: string;
            time: number; // int
          }[];
          total: number; // int
        }
      >
    >
  | ResponseUnion<400, ResponseBodyData<'application/json', Error>>
  | ResponseUnion<401, ResponseBodyData<'application/json', Error>>;

export type GetRewardsRecordRequestResult = RequestResult<
  GetRewardsRecordRequest,
  GetRewardsRecordResponse
>;

export function getRewardsRecord(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<GetRewardsRecordRequest, 'queryParams', never>,
  config?: RequestHandlerExecutionConfig
): Promise<GetRewardsRecordRequestResult> {
  return requestHandler.execute(
    createRequest(getRewardsRecordEndpointSchema, payload),
    config
  );
}
