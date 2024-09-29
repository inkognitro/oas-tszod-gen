import {Error} from '@example-outputs/binance';
import {
  ResponseBodyData,
  Response,
  RequestResult,
  Request,
  SimpleRequestHandler,
  createRequest,
  RequestHandlerExecutionConfig,
} from '@example-outputs/binance/core';

export const getSapiV1MarginIsolatedmargindataEndpointSchema = {
  path: '/sapi/v1/margin/isolatedMarginData',
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

export type GetSapiV1MarginIsolatedmargindataPayload = {
  queryParams: {
    vipLevel?: number; // int
    symbol?: string;
    recvWindow?: number; // int
    timestamp: number; // int
    signature: string;
  };
};

export type GetSapiV1MarginIsolatedmargindataResponse =
  | Response<
      200,
      ResponseBodyData<
        'application/json',
        {
          vipLevel?: number; // int
          symbol?: string;
          leverage?: string;
          data?: {
            coin?: string;
            dailyInterest?: string;
            borrowLimit?: string;
          }[];
        }[]
      >
    >
  | Response<400, ResponseBodyData<'application/json', Error>>
  | Response<401, ResponseBodyData<'application/json', Error>>;

export type GetSapiV1MarginIsolatedmargindataRequestResult = RequestResult<
  Request,
  GetSapiV1MarginIsolatedmargindataResponse
>;

export function getSapiV1MarginIsolatedmargindata(
  requestHandler: SimpleRequestHandler,
  payload: GetSapiV1MarginIsolatedmargindataPayload,
  config?: RequestHandlerExecutionConfig
): Promise<GetSapiV1MarginIsolatedmargindataRequestResult> {
  return requestHandler.execute(
    createRequest({
      ...payload,
      endpointSchema: getSapiV1MarginIsolatedmargindataEndpointSchema,
    }),
    config
  );
}
