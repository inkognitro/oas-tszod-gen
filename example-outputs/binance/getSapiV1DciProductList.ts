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

export const getSapiV1DciProductListEndpointSchema = {
  path: '/sapi/v1/dci/product/list',
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

export type GetSapiV1DciProductListPayload = {
  queryParams: {
    optionType: 'CALL' | 'PUT';
    exercisedCoin: string;
    investCoin: string;
    pageSize?: string;
    pageIndex?: number; // int
    recvWindow?: number; // int
    timestamp: number; // int
    signature: string;
  };
};

export type GetSapiV1DciProductListResponse =
  | Response<
      200,
      ResponseData<
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
    >
  | Response<400, ResponseData<ResponseBodyData<'application/json', Error>>>
  | Response<401, ResponseData<ResponseBodyData<'application/json', Error>>>;

export type GetSapiV1DciProductListRequestResult = RequestResult<
  Request,
  GetSapiV1DciProductListResponse
>;

export function getSapiV1DciProductList(
  requestHandler: SimpleRequestHandler,
  payload: GetSapiV1DciProductListPayload,
  config?: RequestHandlerExecutionConfig
): Promise<GetSapiV1DciProductListRequestResult> {
  return requestHandler.execute(
    createRequest({
      ...payload,
      endpointSchema: getSapiV1DciProductListEndpointSchema,
    }),
    config
  );
}
