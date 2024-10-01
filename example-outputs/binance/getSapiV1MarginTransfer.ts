import {Error} from '@example-outputs/binance';
import {
  ResponseBodyData,
  ResponseUnion,
  RequestResult,
  Request,
  SimpleRequestHandler,
  createRequest,
  RequestHandlerExecutionConfig,
} from '@example-outputs/binance/core';

export const getSapiV1MarginTransferEndpointSchema = {
  path: '/sapi/v1/margin/transfer',
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

export type GetSapiV1MarginTransferPayload = {
  queryParams: {
    asset?: string;
    type?: 'ROLL_IN' | 'ROLL_OUT';
    startTime?: number; // int
    endTime?: number; // int
    current?: number; // int
    size?: number; // int
    isolatedSymbol?: string;
    recvWindow?: number; // int
    timestamp: number; // int
    signature: string;
  };
};

export type GetSapiV1MarginTransferResponse =
  | ResponseUnion<
      200,
      ResponseBodyData<
        'application/json',
        {
          rows: {
            amount: string;
            asset: string;
            status: string;
            timestamp: number; // int
            txId: number; // int
            type: string;
          }[];
          total: number; // int
        }
      >
    >
  | ResponseUnion<400, ResponseBodyData<'application/json', Error>>
  | ResponseUnion<401, ResponseBodyData<'application/json', Error>>;

export type GetSapiV1MarginTransferRequestResult = RequestResult<
  Request,
  GetSapiV1MarginTransferResponse
>;

export function getSapiV1MarginTransfer(
  requestHandler: SimpleRequestHandler,
  payload: GetSapiV1MarginTransferPayload,
  config?: RequestHandlerExecutionConfig
): Promise<GetSapiV1MarginTransferRequestResult> {
  return requestHandler.execute(
    createRequest({
      ...payload,
      endpointSchema: getSapiV1MarginTransferEndpointSchema,
    }),
    config
  );
}
