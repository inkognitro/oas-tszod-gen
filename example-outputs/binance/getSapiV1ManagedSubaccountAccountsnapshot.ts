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

export type GetSapiV1ManagedSubaccountAccountsnapshotRequest = RequestUnion<
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

export type GetSapiV1ManagedSubaccountAccountsnapshotResponse =
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

export type GetSapiV1ManagedSubaccountAccountsnapshotRequestResult =
  RequestResult<
    GetSapiV1ManagedSubaccountAccountsnapshotRequest,
    GetSapiV1ManagedSubaccountAccountsnapshotResponse
  >;

export function getSapiV1ManagedSubaccountAccountsnapshot(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<
    GetSapiV1ManagedSubaccountAccountsnapshotRequest,
    'queryParams',
    never
  >,
  config?: RequestHandlerExecutionConfig
): Promise<GetSapiV1ManagedSubaccountAccountsnapshotRequestResult> {
  return requestHandler.execute(
    createRequest(
      getSapiV1ManagedSubaccountAccountsnapshotEndpointSchema,
      payload
    ),
    config
  );
}
