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

export const getQueryTransLogForTradeParentEndpointSchema = {
  path: '/sapi/v1/managed-subaccount/queryTransLogForTradeParent',
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

export type GetQueryTransLogForTradeParentRequest = RequestUnion<
  any,
  any,
  {
    email: string;
    startTime?: number; // int
    endTime?: number; // int
    page?: number; // int
    limit?: number; // int
    transfers?: string;
    transferFunctionAccountType?: string;
    recvWindow?: number; // int
    timestamp: number; // int
    signature: string;
  }
>;

export type GetQueryTransLogForTradeParentResponse =
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

export type GetQueryTransLogForTradeParentRequestResult = RequestResult<
  GetQueryTransLogForTradeParentRequest,
  GetQueryTransLogForTradeParentResponse
>;

export function getQueryTransLogForTradeParent(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<
    GetQueryTransLogForTradeParentRequest,
    'queryParams',
    never
  >,
  config?: RequestHandlerExecutionConfig
): Promise<GetQueryTransLogForTradeParentRequestResult> {
  return requestHandler.execute(
    createRequest(getQueryTransLogForTradeParentEndpointSchema, payload),
    config
  );
}
