import {Error} from '@example-outputs/binance';
import {
  ResponseBodyData,
  ResponseData,
  Response,
  RequestResult,
  Request,
  SimpleRequestHandler,
  createRequest,
  RequestHandlerExecutionConfig,
} from '@example-outputs/binance/core';

export const getSapiV1LendingProjectPositionListEndpointSchema = {
  path: '/sapi/v1/lending/project/position/list',
  method: 'get',
  supportedSecuritySchemas: [{name: 'ApiKeyAuth', requiredPermissions: []}],
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

export type GetSapiV1LendingProjectPositionListPayload = {
  queryParams: {
    asset: string;
    projectId?: string;
    status?: 'ALL' | 'SUBSCRIBABLE' | 'UNSUBSCRIBABLE';
    recvWindow?: number; // int
    timestamp: number; // int
    signature: string;
  };
};

export type GetSapiV1LendingProjectPositionListResponse =
  | Response<
      200,
      ResponseData<
        ResponseBodyData<
          'application/json',
          {
            asset: string;
            canTransfer: boolean;
            createTimestamp: number; // int
            duration: number; // int
            endTime: number; // int
            interest: string;
            interestRate: string;
            lot: number; // int
            positionId: number; // int
            principal: string;
            projectId: string;
            projectName: string;
            purchaseTime: number; // int
            redeemDate: string; // date
            startTime: number; // int
            status: string;
            type: string;
          }[]
        >
      >
    >
  | Response<400, ResponseData<ResponseBodyData<'application/json', Error>>>
  | Response<401, ResponseData<ResponseBodyData<'application/json', Error>>>;

export type GetSapiV1LendingProjectPositionListRequestResult = RequestResult<
  Request,
  GetSapiV1LendingProjectPositionListResponse
>;

export function getSapiV1LendingProjectPositionList(
  requestHandler: SimpleRequestHandler,
  payload: GetSapiV1LendingProjectPositionListPayload,
  config?: RequestHandlerExecutionConfig
): Promise<GetSapiV1LendingProjectPositionListRequestResult> {
  return requestHandler.execute(
    createRequest({
      ...payload,
      endpointSchema: getSapiV1LendingProjectPositionListEndpointSchema,
    }),
    config
  );
}
