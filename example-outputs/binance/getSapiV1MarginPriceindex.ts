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

export const getSapiV1MarginPriceindexEndpointSchema = {
  path: '/sapi/v1/margin/priceIndex',
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
  },
};

export type GetSapiV1MarginPriceindexPayload = {
  queryParams: {
    symbol: string;
  };
};

export type GetSapiV1MarginPriceindexResponse =
  | Response<
      200,
      ResponseData<
        ResponseBodyData<
          'application/json',
          {
            calcTime: number; // int
            price: string;
            symbol: string;
          }
        >
      >
    >
  | Response<400, ResponseData<ResponseBodyData<'application/json', Error>>>;

export type GetSapiV1MarginPriceindexRequestResult = RequestResult<
  Request,
  GetSapiV1MarginPriceindexResponse
>;

export function getSapiV1MarginPriceindex(
  requestHandler: RequestHandler,
  payload: GetSapiV1MarginPriceindexPayload,
  config?: RequestHandlerExecutionConfig
): Promise<GetSapiV1MarginPriceindexRequestResult> {
  return requestHandler.execute(
    createRequest({
      ...payload,
      endpointSchema: getSapiV1MarginPriceindexEndpointSchema,
    }),
    config
  );
}
