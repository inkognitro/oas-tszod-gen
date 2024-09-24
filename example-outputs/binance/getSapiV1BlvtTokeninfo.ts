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

export const getSapiV1BlvtTokeninfoEndpointSchema = {
  path: '/sapi/v1/blvt/tokenInfo',
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

export type GetSapiV1BlvtTokeninfoPayload = {
  queryParams: {
    tokenName?: string;
  };
};

export type GetSapiV1BlvtTokeninfoResponse =
  | Response<
      200,
      ResponseData<
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
    >
  | Response<400, ResponseData<ResponseBodyData<'application/json', Error>>>;

export type GetSapiV1BlvtTokeninfoRequestResult = RequestResult<
  Request,
  GetSapiV1BlvtTokeninfoResponse
>;

export function getSapiV1BlvtTokeninfo(
  requestHandler: RequestHandler,
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
