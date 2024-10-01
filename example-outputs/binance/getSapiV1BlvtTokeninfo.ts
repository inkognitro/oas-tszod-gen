import {Error} from '@example-outputs/binance';
import {
  ResponseBodyData,
  ResponseUnion,
  RequestResult,
  Request,
  SimpleRequestHandler,
  createRequest,
  RequestHandlerExecutionConfig,
} from '@example-outputs/binance/core';

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

export type GetSapiV1BlvtTokeninfoPayload = {
  queryParams: {
    tokenName?: string;
  };
};

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
  Request,
  GetSapiV1BlvtTokeninfoResponse
>;

export function getSapiV1BlvtTokeninfo(
  requestHandler: SimpleRequestHandler,
  payload: GetSapiV1BlvtTokeninfoPayload,
  config?: RequestHandlerExecutionConfig
): Promise<GetSapiV1BlvtTokeninfoRequestResult> {
  return requestHandler.execute(
    createRequest({
      ...payload,
      endpointSchema: getSapiV1BlvtTokeninfoEndpointSchema,
    }),
    config
  );
}
