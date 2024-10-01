import {
  SnapshotSpot,
  SnapshotMargin,
  SnapshotFutures,
  Error,
} from '@example-outputs/binance';
import {
  ResponseBodyData,
  ResponseUnion,
  RequestResult,
  Request,
  SimpleRequestHandler,
  createRequest,
  RequestHandlerExecutionConfig,
} from '@example-outputs/binance/core';

export const getSapiV1AccountsnapshotEndpointSchema = {
  path: '/sapi/v1/accountSnapshot',
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

export type GetSapiV1AccountsnapshotPayload = {
  queryParams: {
    type: 'SPOT' | 'MARGIN' | 'FUTURES';
    startTime?: number; // int
    endTime?: number; // int
    limit?: number; // int
    recvWindow?: number; // int
    timestamp: number; // int
    signature: string;
  };
};

export type GetSapiV1AccountsnapshotResponse =
  | ResponseUnion<
      200,
      ResponseBodyData<
        'application/json',
        SnapshotSpot | SnapshotMargin | SnapshotFutures
      >
    >
  | ResponseUnion<400, ResponseBodyData<'application/json', Error>>
  | ResponseUnion<401, ResponseBodyData<'application/json', Error>>;

export type GetSapiV1AccountsnapshotRequestResult = RequestResult<
  Request,
  GetSapiV1AccountsnapshotResponse
>;

export function getSapiV1Accountsnapshot(
  requestHandler: SimpleRequestHandler,
  payload: GetSapiV1AccountsnapshotPayload,
  config?: RequestHandlerExecutionConfig
): Promise<GetSapiV1AccountsnapshotRequestResult> {
  return requestHandler.execute(
    createRequest({
      ...payload,
      endpointSchema: getSapiV1AccountsnapshotEndpointSchema,
    }),
    config
  );
}
