import {
  RequestUnion,
  ResponseBodyData,
  ResponseUnion,
  RequestResult,
  SimpleRequestHandler,
  createRequest,
  RequestHandlerExecutionConfig,
  RequestPayload,
} from '../../../../../core';
import {Error} from '../../../../../';

export const getAccountSummaryEndpointSchema = {
  path: '/sapi/v1/sub-account/margin/accountSummary',
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

export type GetAccountSummaryRequest = RequestUnion<
  any,
  any,
  {
    recvWindow?: number; // int
    timestamp: number; // int
    signature: string;
  }
>;

export type GetAccountSummaryResponse =
  | ResponseUnion<
      200,
      ResponseBodyData<
        'application/json',
        {
          totalAssetOfBtc: string;
          totalLiabilityOfBtc: string;
          totalNetAssetOfBtc: string;
          subAccountList: {
            email: string;
            totalAssetOfBtc: string;
            totalLiabilityOfBtc: string;
            totalNetAssetOfBtc: string;
          }[];
        }
      >
    >
  | ResponseUnion<400, ResponseBodyData<'application/json', Error>>
  | ResponseUnion<401, ResponseBodyData<'application/json', Error>>;

export type GetAccountSummaryRequestResult = RequestResult<
  GetAccountSummaryRequest,
  GetAccountSummaryResponse
>;

export function getAccountSummary(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<GetAccountSummaryRequest, 'queryParams', never>,
  config?: RequestHandlerExecutionConfig
): Promise<GetAccountSummaryRequestResult> {
  return requestHandler.execute(
    createRequest(getAccountSummaryEndpointSchema, payload),
    config
  );
}
