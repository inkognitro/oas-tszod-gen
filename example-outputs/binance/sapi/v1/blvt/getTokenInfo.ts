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

export const getTokenInfoEndpointSchema = {
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

export type GetTokenInfoRequest = RequestUnion<
  any,
  any,
  {
    tokenName?: string;
  }
>;

export type GetTokenInfoResponse =
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

export type GetTokenInfoRequestResult = RequestResult<
  GetTokenInfoRequest,
  GetTokenInfoResponse
>;

export function getTokenInfo(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<GetTokenInfoRequest, never, 'queryParams'>,
  config?: RequestHandlerExecutionConfig
): Promise<GetTokenInfoRequestResult> {
  return requestHandler.execute(
    createRequest(getTokenInfoEndpointSchema, payload),
    config
  );
}
