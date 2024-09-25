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

export const getSapiV1MarginCrossmargindataEndpointSchema = {
  path: '/sapi/v1/margin/crossMarginData',
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

export type GetSapiV1MarginCrossmargindataPayload = {
  queryParams: {
    vipLevel?: number; // int
    coin?: string;
    recvWindow?: number; // int
    timestamp: number; // int
    signature: string;
  };
};

export type GetSapiV1MarginCrossmargindataResponse =
  | Response<
      200,
      ResponseData<
        ResponseBodyData<
          'application/json',
          {
            vipLevel: number; // int
            coin: string;
            transferIn: boolean;
            borrowable: boolean;
            dailyInterest: string;
            yearlyInterest: string;
            borrowLimit: string;
            marginablePairs: string[];
          }[]
        >
      >
    >
  | Response<400, ResponseData<ResponseBodyData<'application/json', Error>>>
  | Response<401, ResponseData<ResponseBodyData<'application/json', Error>>>;

export type GetSapiV1MarginCrossmargindataRequestResult = RequestResult<
  Request,
  GetSapiV1MarginCrossmargindataResponse
>;

export function getSapiV1MarginCrossmargindata(
  requestHandler: SimpleRequestHandler,
  payload: GetSapiV1MarginCrossmargindataPayload,
  config?: RequestHandlerExecutionConfig
): Promise<GetSapiV1MarginCrossmargindataRequestResult> {
  return requestHandler.execute(
    createRequest({
      ...payload,
      endpointSchema: getSapiV1MarginCrossmargindataEndpointSchema,
    }),
    config
  );
}
