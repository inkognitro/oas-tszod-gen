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

export const getQueryTransLogForInvestorEndpointSchema = {
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

export type GetQueryTransLogForInvestorRequest = RequestUnion<
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

export type GetQueryTransLogForInvestorResponse =
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

export type GetQueryTransLogForInvestorRequestResult = RequestResult<
  GetQueryTransLogForInvestorRequest,
  GetQueryTransLogForInvestorResponse
>;

export function getQueryTransLogForInvestor(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<
    GetQueryTransLogForInvestorRequest,
    'queryParams',
    never
  >,
  config?: RequestHandlerExecutionConfig
): Promise<GetQueryTransLogForInvestorRequestResult> {
  return requestHandler.execute(
    createRequest(getQueryTransLogForInvestorEndpointSchema, payload),
    config
  );
}
