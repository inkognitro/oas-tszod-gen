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

export const getSapiV1DciProductPositionsEndpointSchema = {
  path: '/sapi/v1/dci/product/positions',
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

export type GetSapiV1DciProductPositionsRequest = RequestUnion<
  any,
  any,
  {
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
  }
>;

export type GetSapiV1DciProductPositionsResponse =
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
  | ResponseUnion<400, ResponseBodyData<'application/json', Error>>
  | ResponseUnion<401, ResponseBodyData<'application/json', Error>>;

export type GetSapiV1DciProductPositionsRequestResult = RequestResult<
  GetSapiV1DciProductPositionsRequest,
  GetSapiV1DciProductPositionsResponse
>;

export function getSapiV1DciProductPositions(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<GetSapiV1DciProductPositionsRequest, 'queryParams'>,
  config?: RequestHandlerExecutionConfig
): Promise<GetSapiV1DciProductPositionsRequestResult> {
  return requestHandler.execute(
    createRequest(getSapiV1DciProductPositionsEndpointSchema, payload),
    config
  );
}
