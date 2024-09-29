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

export const getSapiV1DciProductPositionsEndpointSchema = {
  path: '/sapi/v1/dci/product/positions',
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

export type GetSapiV1DciProductPositionsPayload = {
  queryParams: {
    status?:
      | 'PENDING'
      | 'PURCHASE_SUCCESS'
      | 'SETTLED'
      | 'PURCHASE_FAIL'
      | 'REFUNDING'
      | 'REFUND_SUCCESS'
      | 'SETTLING';
    pageSize?: string;
    pageIndex?: number; // int
    recvWindow?: number; // int
    timestamp: number; // int
    signature: string;
  };
};

export type GetSapiV1DciProductPositionsResponse =
  | Response<
      200,
      ResponseBodyData<
        'application/json',
        {
          total: number; // int
          list: {
            id: string;
            investCoin: string;
            exercisedCoin: string;
            subscriptionAmount: string;
            strikePrice: string;
            duration: number; // int
            settleDate: number; // int
            purchaseStatus: string;
            apr: string;
            orderId: number; // int
            purchaseEndTime: number; // int
            optionType: string;
            autoCompoundPlan: string;
          }[];
        }
      >
    >
  | Response<400, ResponseBodyData<'application/json', Error>>
  | Response<401, ResponseBodyData<'application/json', Error>>;

export type GetSapiV1DciProductPositionsRequestResult = RequestResult<
  Request,
  GetSapiV1DciProductPositionsResponse
>;

export function getSapiV1DciProductPositions(
  requestHandler: SimpleRequestHandler,
  payload: GetSapiV1DciProductPositionsPayload,
  config?: RequestHandlerExecutionConfig
): Promise<GetSapiV1DciProductPositionsRequestResult> {
  return requestHandler.execute(
    createRequest({
      ...payload,
      endpointSchema: getSapiV1DciProductPositionsEndpointSchema,
    }),
    config
  );
}
