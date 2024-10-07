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

export const getSapiV1BlvtTokeninfoEndpointSchema = {
  path: '/sapi/v1/blvt/tokenInfo',
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

export type GetSapiV1BlvtTokeninfoRequest = RequestUnion<
  any,
  any,
  {
    tokenName?: string;
  }
>;

export type GetSapiV1BlvtTokeninfoResponse =
  | ResponseUnion<
      200,
      ResponseBodyData<
        'application/json',
        {
          tokenName: string;
          description: string;
          underlying: string;
          tokenIssued: string;
          basket: string;
          currentBaskets: {
            symbol: string;
            amount: string;
            notionalValue: string;
          }[];
          nav: string;
          realLeverage: string;
          fundingRate: string;
          dailyManagementFee: string;
          purchaseFeePct: string;
          dailyPurchaseLimit: string;
          redeemFeePct: string;
          dailyRedeemLimit: string;
          timestamp: number; // int
        }[]
      >
    >
  | ResponseUnion<400, ResponseBodyData<'application/json', Error>>;

export type GetSapiV1BlvtTokeninfoRequestResult = RequestResult<
  GetSapiV1BlvtTokeninfoRequest,
  GetSapiV1BlvtTokeninfoResponse
>;

export function getSapiV1BlvtTokeninfo(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<GetSapiV1BlvtTokeninfoRequest, never, 'queryParams'>,
  config?: RequestHandlerExecutionConfig
): Promise<GetSapiV1BlvtTokeninfoRequestResult> {
  return requestHandler.execute(
    createRequest(getSapiV1BlvtTokeninfoEndpointSchema, payload),
    config
  );
}
