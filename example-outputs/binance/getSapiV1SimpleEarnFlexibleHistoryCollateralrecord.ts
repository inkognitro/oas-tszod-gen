import {Error} from '@example-outputs/binance';
import {
  ResponseBodyData,
  ResponseData,
  Response,
  RequestResult,
  Request,
  RequestHandler,
  createRequest,
  RequestHandlerExecutionConfig,
} from '@example-outputs/binance/core';

export const getSapiV1SimpleEarnFlexibleHistoryCollateralrecordEndpointSchema =
  {
    path: '/sapi/v1/simple-earn/flexible/history/collateralRecord',
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

export type GetSapiV1SimpleEarnFlexibleHistoryCollateralrecordPayload = {
  queryParams: {
    productId?: string;
    startTime?: number; // int
    endTime?: number; // int
    current?: number; // int
    size?: number; // int
    recvWindow?: number; // int
    timestamp: number; // int
    signature: string;
  };
};

export type GetSapiV1SimpleEarnFlexibleHistoryCollateralrecordResponse =
  | Response<
      200,
      ResponseData<
        ResponseBodyData<
          'application/json',
          {
            rows: {
              amount: string;
              productId: string;
              asset: string;
              createTime: number; // int
              type: string;
              productName: string;
              orderId: number; // int
            }[];
            total: number; // int
          }
        >
      >
    >
  | Response<400, ResponseData<ResponseBodyData<'application/json', Error>>>
  | Response<401, ResponseData<ResponseBodyData<'application/json', Error>>>;

export type GetSapiV1SimpleEarnFlexibleHistoryCollateralrecordRequestResult =
  RequestResult<
    Request,
    GetSapiV1SimpleEarnFlexibleHistoryCollateralrecordResponse
  >;

export function getSapiV1SimpleEarnFlexibleHistoryCollateralrecord(
  requestHandler: RequestHandler,
  payload: GetSapiV1SimpleEarnFlexibleHistoryCollateralrecordPayload,
  config?: RequestHandlerExecutionConfig
): Promise<GetSapiV1SimpleEarnFlexibleHistoryCollateralrecordRequestResult> {
  return requestHandler.execute(
    createRequest({
      ...payload,
      endpointSchema:
        getSapiV1SimpleEarnFlexibleHistoryCollateralrecordEndpointSchema,
    }),
    config
  );
}
