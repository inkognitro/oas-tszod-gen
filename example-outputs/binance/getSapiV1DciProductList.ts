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

export const getSapiV1DciProductListEndpointSchema = {
  path: '/sapi/v1/dci/product/list',
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

export type GetSapiV1DciProductListRequest = RequestUnion<
  any,
  any,
  {
    optionType: 'CALL' | 'PUT';
    exercisedCoin: string;
    investCoin: string;
    pageSize?: string;
    pageIndex?: number; // int
    recvWindow?: number; // int
    timestamp: number; // int
    signature: string;
  }
>;

export type GetSapiV1DciProductListResponse =
  | ResponseUnion<
      200,
      ResponseBodyData<
        'application/json',
        {
          total: number; // int
          list: {
            id: string;
            investCoin: string;
            exercisedCoin: string;
            strikePrice: string;
            duration: number; // int
            settleDate: number; // int
            purchaseDecimal: number; // int
            purchaseEndTime: number; // int
            canPurchase: boolean;
            apr: string;
            orderId: number; // int
            minAmount: string;
            maxAmount: string;
            createTimestamp: number; // int
            optionType: string;
            isAutoCompoundEnable: boolean;
            autoCompoundPlanList: string[];
          }[];
        }
      >
    >
  | ResponseUnion<400, ResponseBodyData<'application/json', Error>>
  | ResponseUnion<401, ResponseBodyData<'application/json', Error>>;

export type GetSapiV1DciProductListRequestResult = RequestResult<
  GetSapiV1DciProductListRequest,
  GetSapiV1DciProductListResponse
>;

export function getSapiV1DciProductList(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<GetSapiV1DciProductListRequest, 'queryParams', never>,
  config?: RequestHandlerExecutionConfig
): Promise<GetSapiV1DciProductListRequestResult> {
  return requestHandler.execute(
    createRequest(getSapiV1DciProductListEndpointSchema, payload),
    config
  );
}
