import {
  RequestUnion,
  ResponseBodyData,
  ResponseUnion,
  RequestResult,
  SimpleRequestHandler,
  createRequest,
  RequestHandlerExecutionConfig,
  RequestPayload,
} from '../../../../core';
import {Error} from '../../../../';

export const getAccountSnapshotEndpointSchema = {
  path: '/sapi/v1/managed-subaccount/accountSnapshot',
  method: 'get',
  supportedSecuritySchemas: [],
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

export type GetAccountSnapshotRequest = RequestUnion<
  any,
  any,
  {
    email: string;
    type: string;
    startTime?: number; // int
    endTime?: number; // int
    limit?: number; // int
    recvWindow?: number; // int
    timestamp: number; // int
    signature: string;
  }
>;

export type GetAccountSnapshotResponse =
  | ResponseUnion<
      200,
      ResponseBodyData<
        'application/json',
        {
          code: number; // int
          msg: string;
          snapshotVos: {
            data: {
              balances: {
                asset: string;
                free: string;
                locked: string;
              }[];
              totalAssetOfBtc: string;
            };
            type: string;
            updateTime: number; // int
          }[];
        }
      >
    >
  | ResponseUnion<400, ResponseBodyData<'application/json', Error>>
  | ResponseUnion<401, ResponseBodyData<'application/json', Error>>;

export type GetAccountSnapshotRequestResult = RequestResult<
  GetAccountSnapshotRequest,
  GetAccountSnapshotResponse
>;

export function getAccountSnapshot(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<GetAccountSnapshotRequest, 'queryParams', never>,
  config?: RequestHandlerExecutionConfig
): Promise<GetAccountSnapshotRequestResult> {
  return requestHandler.execute(
    createRequest(getAccountSnapshotEndpointSchema, payload),
    config
  );
}
