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

export const getSapiV1ManagedSubaccountQuerytranslogforinvestorEndpointSchema =
  {
    path: '/sapi/v1/managed-subaccount/queryTransLogForInvestor',
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

export type GetSapiV1ManagedSubaccountQuerytranslogforinvestorRequest =
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

export type GetSapiV1ManagedSubaccountQuerytranslogforinvestorResponse =
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

export type GetSapiV1ManagedSubaccountQuerytranslogforinvestorRequestResult =
  RequestResult<
    GetSapiV1ManagedSubaccountQuerytranslogforinvestorRequest,
    GetSapiV1ManagedSubaccountQuerytranslogforinvestorResponse
  >;

export function getSapiV1ManagedSubaccountQuerytranslogforinvestor(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<
    GetSapiV1ManagedSubaccountQuerytranslogforinvestorRequest,
    'queryParams'
  >,
  config?: RequestHandlerExecutionConfig
): Promise<GetSapiV1ManagedSubaccountQuerytranslogforinvestorRequestResult> {
  return requestHandler.execute(
    createRequest(
      getSapiV1ManagedSubaccountQuerytranslogforinvestorEndpointSchema,
      payload
    ),
    config
  );
}
