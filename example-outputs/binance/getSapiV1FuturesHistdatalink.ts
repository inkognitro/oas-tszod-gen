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

export const getSapiV1FuturesHistdatalinkEndpointSchema = {
  path: '/sapi/v1/futures/histDataLink',
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

export type GetSapiV1FuturesHistdatalinkPayload = {
  queryParams: {
    symbol: string;
    dataType: 'T_DEPTH' | 'S_DEPTH';
    startTime?: number; // int
    endTime?: number; // int
    recvWindow?: number; // int
    timestamp: number; // int
    signature: string;
  };
};

export type GetSapiV1FuturesHistdatalinkResponse =
  | Response<
      200,
      ResponseData<
        ResponseBodyData<
          'application/json',
          {
            data: {
              day: string;
              url: string;
            }[];
          }
        >
      >
    >
  | Response<400, ResponseData<ResponseBodyData<'application/json', Error>>>
  | Response<401, ResponseData<ResponseBodyData<'application/json', Error>>>;

export type GetSapiV1FuturesHistdatalinkRequestResult = RequestResult<
  Request,
  GetSapiV1FuturesHistdatalinkResponse
>;

export function getSapiV1FuturesHistdatalink(
  requestHandler: SimpleRequestHandler,
  payload: GetSapiV1FuturesHistdatalinkPayload,
  config?: RequestHandlerExecutionConfig
): Promise<GetSapiV1FuturesHistdatalinkRequestResult> {
  return requestHandler.execute(
    createRequest({
      ...payload,
      endpointSchema: getSapiV1FuturesHistdatalinkEndpointSchema,
    }),
    config
  );
}
