import {Error} from '@example-outputs/binance';
import {
  ResponseBodyData,
  Response,
  RequestResult,
  Request,
  SimpleRequestHandler,
  createRequest,
  RequestHandlerExecutionConfig,
} from '@example-outputs/binance/core';

export const getSapiV1ManagedSubaccountAccountsnapshotEndpointSchema = {
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

export type GetSapiV1ManagedSubaccountAccountsnapshotPayload = {
  queryParams: {
    email: string;
    type: string;
    startTime?: number; // int
    endTime?: number; // int
    limit?: number; // int
    recvWindow?: number; // int
    timestamp: number; // int
    signature: string;
  };
};

export type GetSapiV1ManagedSubaccountAccountsnapshotResponse =
  | Response<
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
  | Response<400, ResponseBodyData<'application/json', Error>>
  | Response<401, ResponseBodyData<'application/json', Error>>;

export type GetSapiV1ManagedSubaccountAccountsnapshotRequestResult =
  RequestResult<Request, GetSapiV1ManagedSubaccountAccountsnapshotResponse>;

export function getSapiV1ManagedSubaccountAccountsnapshot(
  requestHandler: SimpleRequestHandler,
  payload: GetSapiV1ManagedSubaccountAccountsnapshotPayload,
  config?: RequestHandlerExecutionConfig
): Promise<GetSapiV1ManagedSubaccountAccountsnapshotRequestResult> {
  return requestHandler.execute(
    createRequest({
      ...payload,
      endpointSchema: getSapiV1ManagedSubaccountAccountsnapshotEndpointSchema,
    }),
    config
  );
}
