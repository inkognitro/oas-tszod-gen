import {
  RequestUnion,
  ResponseBodyData,
  ResponseUnion,
  RequestResult,
  SimpleRequestHandler,
  createRequest,
  RequestHandlerExecutionConfig,
  RequestPayload,
} from '../../../../../../core';
import {Error} from '../../../../../../';

export const getUnwrapHistoryEndpointSchema = {
  path: '/sapi/v1/eth-staking/wbeth/history/unwrapHistory',
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

export type GetUnwrapHistoryRequest = RequestUnion<
  any,
  any,
  {
    startTime?: number; // int
    endTime?: number; // int
    current?: number; // int
    size?: number; // int
    recvWindow?: number; // int
    timestamp: number; // int
    signature: string;
  }
>;

export type GetUnwrapHistoryResponse =
  | ResponseUnion<
      200,
      ResponseBodyData<
        'application/json',
        {
          rows: {
            time: number; // int
            fromAsset: string;
            fromAmount: string;
            toAsset: string;
            toAmount: string;
            exchangeRate: string;
            status: string;
          }[];
          total: number; // int
        }
      >
    >
  | ResponseUnion<400, ResponseBodyData<'application/json', Error>>
  | ResponseUnion<401, ResponseBodyData<'application/json', Error>>;

export type GetUnwrapHistoryRequestResult = RequestResult<
  GetUnwrapHistoryRequest,
  GetUnwrapHistoryResponse
>;

export function getUnwrapHistory(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<GetUnwrapHistoryRequest, 'queryParams', never>,
  config?: RequestHandlerExecutionConfig
): Promise<GetUnwrapHistoryRequestResult> {
  return requestHandler.execute(
    createRequest(getUnwrapHistoryEndpointSchema, payload),
    config
  );
}
