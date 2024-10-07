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

export const getSapiV1MarginAllassetsEndpointSchema = {
  path: '/sapi/v1/margin/allAssets',
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
  },
};

export type GetSapiV1MarginAllassetsRequest = RequestUnion<
  any,
  any,
  {
    asset: string;
  }
>;

export type GetSapiV1MarginAllassetsResponse =
  | ResponseUnion<
      200,
      ResponseBodyData<
        'application/json',
        {
          assetFullName: string;
          assetName: string;
          isBorrowable: boolean;
          isMortgageable: boolean;
          userMinBorrow: string;
          userMinRepay: string;
        }[]
      >
    >
  | ResponseUnion<400, ResponseBodyData<'application/json', Error>>;

export type GetSapiV1MarginAllassetsRequestResult = RequestResult<
  GetSapiV1MarginAllassetsRequest,
  GetSapiV1MarginAllassetsResponse
>;

export function getSapiV1MarginAllassets(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<
    GetSapiV1MarginAllassetsRequest,
    'queryParams',
    never
  >,
  config?: RequestHandlerExecutionConfig
): Promise<GetSapiV1MarginAllassetsRequestResult> {
  return requestHandler.execute(
    createRequest(getSapiV1MarginAllassetsEndpointSchema, payload),
    config
  );
}
