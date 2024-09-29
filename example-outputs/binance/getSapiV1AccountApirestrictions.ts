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

export const getSapiV1AccountApirestrictionsEndpointSchema = {
  path: '/sapi/v1/account/apiRestrictions',
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

export type GetSapiV1AccountApirestrictionsPayload = {
  queryParams: {
    recvWindow?: number; // int
    timestamp: number; // int
    signature: string;
  };
};

export type GetSapiV1AccountApirestrictionsResponse =
  | Response<
      200,
      ResponseBodyData<
        'application/json',
        {
          ipRestrict: boolean;
          createTime: number; // int
          enableInternalTransfer: boolean;
          enableFutures: boolean;
          enablePortfolioMarginTrading?: boolean;
          enableVanillaOptions: boolean;
          permitsUniversalTransfer: boolean;
          enableReading: boolean;
          enableSpotAndMarginTrading: boolean;
          enableWithdrawals: boolean;
          enableMargin: boolean;
          tradingAuthorityExpirationTime: number; // int
        }
      >
    >
  | Response<400, ResponseBodyData<'application/json', Error>>
  | Response<401, ResponseBodyData<'application/json', Error>>;

export type GetSapiV1AccountApirestrictionsRequestResult = RequestResult<
  Request,
  GetSapiV1AccountApirestrictionsResponse
>;

export function getSapiV1AccountApirestrictions(
  requestHandler: SimpleRequestHandler,
  payload: GetSapiV1AccountApirestrictionsPayload,
  config?: RequestHandlerExecutionConfig
): Promise<GetSapiV1AccountApirestrictionsRequestResult> {
  return requestHandler.execute(
    createRequest({
      ...payload,
      endpointSchema: getSapiV1AccountApirestrictionsEndpointSchema,
    }),
    config
  );
}
