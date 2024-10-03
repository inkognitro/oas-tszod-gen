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

export const getSapiV1SimpleEarnFlexibleHistoryCollateralrecordEndpointSchema =
  {
    path: '/sapi/v1/simple-earn/flexible/history/collateralRecord',
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

export type GetSapiV1SimpleEarnFlexibleHistoryCollateralrecordRequest =
  RequestUnion<
    any,
    any,
    {
      productId?: string;
      startTime?: number; // int
      endTime?: number; // int
      current?: number; // int
      size?: number; // int
      recvWindow?: number; // int
      timestamp: number; // int
      signature: string;
    }
  >;

export type GetSapiV1SimpleEarnFlexibleHistoryCollateralrecordResponse =
  | ResponseUnion<
      200,
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
  | ResponseUnion<400, ResponseBodyData<'application/json', Error>>
  | ResponseUnion<401, ResponseBodyData<'application/json', Error>>;

export type GetSapiV1SimpleEarnFlexibleHistoryCollateralrecordRequestResult =
  RequestResult<
    GetSapiV1SimpleEarnFlexibleHistoryCollateralrecordRequest,
    GetSapiV1SimpleEarnFlexibleHistoryCollateralrecordResponse
  >;

export function getSapiV1SimpleEarnFlexibleHistoryCollateralrecord(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<
    GetSapiV1SimpleEarnFlexibleHistoryCollateralrecordRequest,
    'queryParams'
  >,
  config?: RequestHandlerExecutionConfig
): Promise<GetSapiV1SimpleEarnFlexibleHistoryCollateralrecordRequestResult> {
  return requestHandler.execute(
    createRequest(
      getSapiV1SimpleEarnFlexibleHistoryCollateralrecordEndpointSchema,
      payload
    ),
    config
  );
}
