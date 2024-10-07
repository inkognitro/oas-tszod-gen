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

export const getSapiV1LendingProjectListEndpointSchema = {
  path: '/sapi/v1/lending/project/list',
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

export type GetSapiV1LendingProjectListRequest = RequestUnion<
  any,
  any,
  {
    asset?: string;
    type: 'ACTIVITY' | 'CUSTOMIZED_FIXED';
    status?: 'ALL' | 'SUBSCRIBABLE' | 'UNSUBSCRIBABLE';
    isSortAsc?: boolean;
    sortBy?: 'START_TIME' | 'LOT_SIZE' | 'INTEREST_RATE' | 'DURATION';
    current?: number; // int
    size?: number; // int
    recvWindow?: number; // int
    timestamp: number; // int
    signature: string;
  }
>;

export type GetSapiV1LendingProjectListResponse =
  | ResponseUnion<
      200,
      ResponseBodyData<
        'application/json',
        {
          asset: string;
          displayPriority: number; // int
          duration: number; // int
          interestPerLot: string;
          interestRate: string;
          lotSize: string;
          lotsLowLimit: number; // int
          lotsPurchased: number; // int
          lotsUpLimit: number; // int
          maxLotsPerUser: number; // int
          needKyc: boolean;
          projectId: string;
          projectName: string;
          status: string;
          type: string;
          withAreaLimitation: boolean;
        }[]
      >
    >
  | ResponseUnion<400, ResponseBodyData<'application/json', Error>>
  | ResponseUnion<401, ResponseBodyData<'application/json', Error>>;

export type GetSapiV1LendingProjectListRequestResult = RequestResult<
  GetSapiV1LendingProjectListRequest,
  GetSapiV1LendingProjectListResponse
>;

export function getSapiV1LendingProjectList(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<
    GetSapiV1LendingProjectListRequest,
    'queryParams',
    never
  >,
  config?: RequestHandlerExecutionConfig
): Promise<GetSapiV1LendingProjectListRequestResult> {
  return requestHandler.execute(
    createRequest(getSapiV1LendingProjectListEndpointSchema, payload),
    config
  );
}
