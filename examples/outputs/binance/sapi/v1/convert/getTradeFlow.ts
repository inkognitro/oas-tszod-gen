import {
  RequestUnion,
  ResponseBodyData,
  ResponseUnion,
  RequestResult,
  SimpleRequestHandler,
  createRequest,
  RequestHandlerExecutionConfig,
  RequestPayload,
} from '../../../core';
import {Error} from '../../../';

export const getTradeFlowEndpointSchema = {
  path: '/sapi/v1/convert/tradeFlow',
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

export type GetTradeFlowRequest = RequestUnion<
  any,
  any,
  {
    startTime: number; // int
    endTime: number; // int
    limit?: number; // int
    recvWindow?: number; // int
    timestamp: number; // int
    signature: string;
  }
>;

export type GetTradeFlowResponse =
  | ResponseUnion<
      200,
      ResponseBodyData<
        'application/json',
        {
          list: {
            quoteId: string;
            orderId: number; // int
            orderStatus: string;
            fromAsset: string;
            fromAmount: string;
            toAsset: string;
            toAmount: string;
            ratio: string;
            inverseRatio: string;
            createTime: number; // int
          }[];
          startTime: number; // int
          endTime: number; // int
          limit: number; // int
          moreData: boolean;
        }
      >
    >
  | ResponseUnion<400, ResponseBodyData<'application/json', Error>>
  | ResponseUnion<401, ResponseBodyData<'application/json', Error>>;

export type GetTradeFlowRequestResult = RequestResult<
  GetTradeFlowRequest,
  GetTradeFlowResponse
>;

export function getTradeFlow(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<GetTradeFlowRequest, 'queryParams', never>,
  config?: RequestHandlerExecutionConfig
): Promise<GetTradeFlowRequestResult> {
  return requestHandler.execute(
    createRequest(getTradeFlowEndpointSchema, payload),
    config
  );
}
