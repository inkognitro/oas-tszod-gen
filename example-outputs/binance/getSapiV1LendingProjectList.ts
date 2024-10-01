import {Error} from '@example-outputs/binance';
import {
  ResponseBodyData,
  ResponseUnion,
  RequestResult,
  Request,
  SimpleRequestHandler,
  createRequest,
  RequestHandlerExecutionConfig,
} from '@example-outputs/binance/core';

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

export type GetSapiV1LendingProjectListPayload = {
  queryParams: {
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
  };
};

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
  Request,
  GetSapiV1LendingProjectListResponse
>;

export function getSapiV1LendingProjectList(
  requestHandler: SimpleRequestHandler,
  payload: GetSapiV1LendingProjectListPayload,
  config?: RequestHandlerExecutionConfig
): Promise<GetSapiV1LendingProjectListRequestResult> {
  return requestHandler.execute(
    createRequest({
      ...payload,
      endpointSchema: getSapiV1LendingProjectListEndpointSchema,
    }),
    config
  );
}
