import {
  z_SubAccountUSDTFuturesSummary,
  z_SubAccountCOINFuturesSummary,
  z_Error,
  SubAccountUSDTFuturesSummary,
  SubAccountCOINFuturesSummary,
  Error,
} from '../../../../../';
import {z} from 'zod';
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

export const getAccountSummaryEndpointSchema = {
  path: '/sapi/v2/sub-account/futures/accountSummary',
  method: 'get',
  supportedSecuritySchemas: [{name: 'ApiKeyAuth', scopes: []}],
  queryParamsZodSchema: z.object({
    futuresType: z.number().int().safe().finite(),
    page: z.number().int().safe().finite().optional(),
    limit: z.number().int().safe().finite().optional(),
    recvWindow: z.number().int().safe().finite().optional(),
    timestamp: z.number().int().safe().finite(),
    signature: z.string(),
  }),
  bodyByContentType: {},
  responseByStatus: {
    '200': {
      bodyByContentType: {
        'application/json': {
          zodSchema: z.union([
            z_SubAccountUSDTFuturesSummary,
            z_SubAccountCOINFuturesSummary,
          ]),
        },
      },
    },
    '400': {
      bodyByContentType: {
        'application/json': {
          zodSchema: z_Error,
        },
      },
    },
    '401': {
      bodyByContentType: {
        'application/json': {
          zodSchema: z_Error,
        },
      },
    },
  },
};

export type GetAccountSummaryRequest = RequestUnion<
  any,
  any,
  {
    futuresType: number; // int
    page?: number; // int
    limit?: number; // int
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
        SubAccountUSDTFuturesSummary | SubAccountCOINFuturesSummary
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
