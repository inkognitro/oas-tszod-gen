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

export const getLogEndpointSchema = {
  path: '/sapi/v1/managed-subaccount/query-trans-log',
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

export type GetLogRequest = RequestUnion<
  any,
  any,
  {
    startTime?: number; // int
    endTime?: number; // int
    page?: number; // int
    limit?: number; // int
    transfers: 'FROM' | 'TO';
    transferFunctionAccountType:
      | 'SPOT'
      | 'MARGIN'
      | 'ISOLATED_MARGIN'
      | 'USDT_FUTURE'
      | 'COIN_FUTURE';
    recvWindow?: number; // int
    timestamp: number; // int
    signature: string;
  }
>;

export type GetLogResponse =
  | ResponseUnion<
      200,
      ResponseBodyData<
        'application/json',
        {
          count: number; // int
          managerSubTransferHistoryVos: {
            fromEmail: string;
            fromAccountType: string;
            toEmail: string;
            toAccountType: string;
            asset: string;
            amount: string;
            scheduledData: number; // int
            createTime: number; // int
            status: string;
            tranId: number; // int
          }[];
        }
      >
    >
  | ResponseUnion<400, ResponseBodyData<'application/json', Error>>
  | ResponseUnion<401, ResponseBodyData<'application/json', Error>>;

export type GetLogRequestResult = RequestResult<GetLogRequest, GetLogResponse>;

export function getLog(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<GetLogRequest, 'queryParams', never>,
  config?: RequestHandlerExecutionConfig
): Promise<GetLogRequestResult> {
  return requestHandler.execute(
    createRequest(getLogEndpointSchema, payload),
    config
  );
}
