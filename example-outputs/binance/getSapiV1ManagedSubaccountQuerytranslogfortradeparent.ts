import {Error} from '@example-outputs/binance';
import {
  ResponseBodyData,
  ResponseData,
  Response,
  RequestResult,
  Request,
  RequestHandler,
  createRequest,
  RequestHandlerExecutionConfig,
} from '@example-outputs/binance/core';

export const getSapiV1ManagedSubaccountQuerytranslogfortradeparentEndpointSchema =
  {
    path: '/sapi/v1/managed-subaccount/queryTransLogForTradeParent',
    method: 'get',
    supportedSecuritySchemas: [{name: 'ApiKeyAuth', requiredPermissions: []}],
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

export type GetSapiV1ManagedSubaccountQuerytranslogfortradeparentPayload = {
  queryParams: {
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
  };
};

export type GetSapiV1ManagedSubaccountQuerytranslogfortradeparentResponse =
  | Response<
      200,
      ResponseData<
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
    >
  | Response<400, ResponseData<ResponseBodyData<'application/json', Error>>>
  | Response<401, ResponseData<ResponseBodyData<'application/json', Error>>>;

export type GetSapiV1ManagedSubaccountQuerytranslogfortradeparentRequestResult =
  RequestResult<
    Request,
    GetSapiV1ManagedSubaccountQuerytranslogfortradeparentResponse
  >;

export function getSapiV1ManagedSubaccountQuerytranslogfortradeparent(
  requestHandler: RequestHandler,
  payload: GetSapiV1ManagedSubaccountQuerytranslogfortradeparentPayload,
  config?: RequestHandlerExecutionConfig
): Promise<GetSapiV1ManagedSubaccountQuerytranslogfortradeparentRequestResult> {
  return requestHandler.execute(
    createRequest({
      ...payload,
      endpointSchema:
        getSapiV1ManagedSubaccountQuerytranslogfortradeparentEndpointSchema,
    }),
    config
  );
}
