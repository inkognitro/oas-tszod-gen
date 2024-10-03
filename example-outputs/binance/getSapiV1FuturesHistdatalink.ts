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

export const getSapiV1FuturesHistdatalinkEndpointSchema = {
  path: '/sapi/v1/futures/histDataLink',
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

export type GetSapiV1FuturesHistdatalinkRequest = RequestUnion<
  any,
  any,
  {
    symbol: string;
    dataType: 'T_DEPTH' | 'S_DEPTH';
    startTime?: number; // int
    endTime?: number; // int
    recvWindow?: number; // int
    timestamp: number; // int
    signature: string;
  }
>;

export type GetSapiV1FuturesHistdatalinkResponse =
  | ResponseUnion<
      200,
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
  | ResponseUnion<400, ResponseBodyData<'application/json', Error>>
  | ResponseUnion<401, ResponseBodyData<'application/json', Error>>;

export type GetSapiV1FuturesHistdatalinkRequestResult = RequestResult<
  GetSapiV1FuturesHistdatalinkRequest,
  GetSapiV1FuturesHistdatalinkResponse
>;

export function getSapiV1FuturesHistdatalink(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<GetSapiV1FuturesHistdatalinkRequest, 'queryParams'>,
  config?: RequestHandlerExecutionConfig
): Promise<GetSapiV1FuturesHistdatalinkRequestResult> {
  return requestHandler.execute(
    createRequest(getSapiV1FuturesHistdatalinkEndpointSchema, payload),
    config
  );
}
