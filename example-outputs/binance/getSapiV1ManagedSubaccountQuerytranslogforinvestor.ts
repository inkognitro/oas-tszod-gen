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

export const getSapiV1ManagedSubaccountQuerytranslogforinvestorEndpointSchema =
  {
    path: '/sapi/v1/managed-subaccount/queryTransLogForInvestor',
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

export type GetSapiV1ManagedSubaccountQuerytranslogforinvestorPayload = {
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

export type GetSapiV1ManagedSubaccountQuerytranslogforinvestorResponse =
  | Response<
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
  | Response<400, ResponseBodyData<'application/json', Error>>
  | Response<401, ResponseBodyData<'application/json', Error>>;

export type GetSapiV1ManagedSubaccountQuerytranslogforinvestorRequestResult =
  RequestResult<
    Request,
    GetSapiV1ManagedSubaccountQuerytranslogforinvestorResponse
  >;

export function getSapiV1ManagedSubaccountQuerytranslogforinvestor(
  requestHandler: SimpleRequestHandler,
  payload: GetSapiV1ManagedSubaccountQuerytranslogforinvestorPayload,
  config?: RequestHandlerExecutionConfig
): Promise<GetSapiV1ManagedSubaccountQuerytranslogforinvestorRequestResult> {
  return requestHandler.execute(
    createRequest({
      ...payload,
      endpointSchema:
        getSapiV1ManagedSubaccountQuerytranslogforinvestorEndpointSchema,
    }),
    config
  );
}
