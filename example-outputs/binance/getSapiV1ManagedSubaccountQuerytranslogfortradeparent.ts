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

export const getSapiV1ManagedSubaccountQuerytranslogfortradeparentEndpointSchema =
  {
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

export type GetSapiV1ManagedSubaccountQuerytranslogfortradeparentRequest =
  RequestUnion<
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

export type GetSapiV1ManagedSubaccountQuerytranslogfortradeparentResponse =
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

export type GetSapiV1ManagedSubaccountQuerytranslogfortradeparentRequestResult =
  RequestResult<
    GetSapiV1ManagedSubaccountQuerytranslogfortradeparentRequest,
    GetSapiV1ManagedSubaccountQuerytranslogfortradeparentResponse
  >;

export function getSapiV1ManagedSubaccountQuerytranslogfortradeparent(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<
    GetSapiV1ManagedSubaccountQuerytranslogfortradeparentRequest,
    'queryParams',
    never
  >,
  config?: RequestHandlerExecutionConfig
): Promise<GetSapiV1ManagedSubaccountQuerytranslogfortradeparentRequestResult> {
  return requestHandler.execute(
    createRequest(
      getSapiV1ManagedSubaccountQuerytranslogfortradeparentEndpointSchema,
      payload
    ),
    config
  );
}
