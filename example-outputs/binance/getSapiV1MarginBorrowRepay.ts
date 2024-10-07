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

export const getSapiV1MarginBorrowRepayEndpointSchema = {
  path: '/sapi/v1/margin/borrow-repay',
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

export type GetSapiV1MarginBorrowRepayRequest = RequestUnion<
  any,
  any,
  {
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
  }
>;

export type GetSapiV1MarginBorrowRepayResponse =
  | ResponseUnion<
      200,
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
  | ResponseUnion<400, ResponseBodyData<'application/json', Error>>;

export type GetSapiV1MarginBorrowRepayRequestResult = RequestResult<
  GetSapiV1MarginBorrowRepayRequest,
  GetSapiV1MarginBorrowRepayResponse
>;

export function getSapiV1MarginBorrowRepay(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<
    GetSapiV1MarginBorrowRepayRequest,
    'queryParams',
    never
  >,
  config?: RequestHandlerExecutionConfig
): Promise<GetSapiV1MarginBorrowRepayRequestResult> {
  return requestHandler.execute(
    createRequest(getSapiV1MarginBorrowRepayEndpointSchema, payload),
    config
  );
}
