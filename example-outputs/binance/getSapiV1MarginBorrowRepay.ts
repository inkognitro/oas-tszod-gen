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

export const getSapiV1MarginBorrowRepayEndpointSchema = {
  path: '/sapi/v1/margin/borrow-repay',
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

export type GetSapiV1MarginBorrowRepayPayload = {
  queryParams: {
    asset: string;
    isolatedSymbol?: string;
    txId?: number; // int
    startTime?: number; // int
    endTime?: number; // int
    current?: number; // int
    size?: number; // int
    type: string;
    recvWindow?: number; // int
    timestamp: number; // int
    signature: string;
  };
};

export type GetSapiV1MarginBorrowRepayResponse =
  | Response<
      200,
      ResponseData<
        ResponseBodyData<
          'application/json',
          {
            rows: {
              isolatedSymbol?: string;
              amount?: string;
              asset: string;
              interest?: string;
              principal: string;
              status: string;
              timestamp: number; // int
              txId: number; // int
            }[];
            total: number; // int
          }
        >
      >
    >
  | Response<400, ResponseData<ResponseBodyData<'application/json', Error>>>;

export type GetSapiV1MarginBorrowRepayRequestResult = RequestResult<
  Request,
  GetSapiV1MarginBorrowRepayResponse
>;

export function getSapiV1MarginBorrowRepay(
  requestHandler: SimpleRequestHandler,
  payload: GetSapiV1MarginBorrowRepayPayload,
  config?: RequestHandlerExecutionConfig
): Promise<GetSapiV1MarginBorrowRepayRequestResult> {
  return requestHandler.execute(
    createRequest({
      ...payload,
      endpointSchema: getSapiV1MarginBorrowRepayEndpointSchema,
    }),
    config
  );
}
