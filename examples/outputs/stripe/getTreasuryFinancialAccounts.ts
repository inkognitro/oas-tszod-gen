import {
  RequestUnion,
  RequestBodyData,
  ResponseBodyData,
  ResponseUnion,
  RequestResult,
  SimpleRequestHandler,
  createRequest,
  RequestHandlerExecutionConfig,
  RequestPayload,
} from './core';
import {Treasury_Financial_account} from './treasury';
import {Error} from './schemas';

export const getTreasuryFinancialAccountsEndpointSchema = {
  path: '/v1/treasury/financial_accounts',
  method: 'get',
  supportedSecuritySchemas: [],
  bodyByContentType: {
    'application/x-www-form-urlencoded': {},
  },
  responseByStatus: {
    '200': {
      bodyByContentType: {
        'application/json': {},
      },
    },
    default: {
      bodyByContentType: {
        'application/json': {},
      },
    },
  },
};

export type GetTreasuryFinancialAccountsRequest = RequestUnion<
  RequestBodyData<'application/x-www-form-urlencoded', {}>,
  any,
  {
    created?: (
      | {
          gt?: number; // int
          gte?: number; // int
          lt?: number; // int
          lte?: number; // int
        }
      | number
    ) &
      Partial<{
        gt?: number; // int
        gte?: number; // int
        lt?: number; // int
        lte?: number; // int
      }>;
    ending_before?: string;
    expand?: string[];
    limit?: number; // int
    starting_after?: string;
  }
>;

export type GetTreasuryFinancialAccountsResponse =
  | ResponseUnion<
      200,
      ResponseBodyData<
        'application/json',
        {
          data: Treasury_Financial_account[];
          has_more: boolean;
          object: 'list';
          url: string;
        }
      >
    >
  | ResponseUnion<any, ResponseBodyData<'application/json', Error>>;

export type GetTreasuryFinancialAccountsRequestResult = RequestResult<
  GetTreasuryFinancialAccountsRequest,
  GetTreasuryFinancialAccountsResponse
>;

export function getTreasuryFinancialAccounts(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<
    GetTreasuryFinancialAccountsRequest,
    'contentType' | 'body',
    'queryParams'
  >,
  config?: RequestHandlerExecutionConfig
): Promise<GetTreasuryFinancialAccountsRequestResult> {
  return requestHandler.execute(
    createRequest(getTreasuryFinancialAccountsEndpointSchema, payload),
    config
  );
}
