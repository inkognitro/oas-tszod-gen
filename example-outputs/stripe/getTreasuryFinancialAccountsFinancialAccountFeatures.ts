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
} from '@example-outputs/stripe/core';
import {
  Treasury_Financial_account_features,
  Error,
} from '@example-outputs/stripe';

export const getTreasuryFinancialAccountsFinancialAccountFeaturesEndpointSchema =
  {
    path: '/v1/treasury/financial_accounts/{financial_account}/features',
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

export type GetTreasuryFinancialAccountsFinancialAccountFeaturesRequest =
  RequestUnion<
    RequestBodyData<'application/x-www-form-urlencoded', {}>,
    {
      financial_account: string;
    },
    {
      expand?: string[];
    }
  >;

export type GetTreasuryFinancialAccountsFinancialAccountFeaturesResponse =
  | ResponseUnion<
      200,
      ResponseBodyData<'application/json', Treasury_Financial_account_features>
    >
  | ResponseUnion<any, ResponseBodyData<'application/json', Error>>;

export type GetTreasuryFinancialAccountsFinancialAccountFeaturesRequestResult =
  RequestResult<
    GetTreasuryFinancialAccountsFinancialAccountFeaturesRequest,
    GetTreasuryFinancialAccountsFinancialAccountFeaturesResponse
  >;

export function getTreasuryFinancialAccountsFinancialAccountFeatures(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<
    GetTreasuryFinancialAccountsFinancialAccountFeaturesRequest,
    'pathParams' | 'contentType' | 'body',
    'queryParams'
  >,
  config?: RequestHandlerExecutionConfig
): Promise<GetTreasuryFinancialAccountsFinancialAccountFeaturesRequestResult> {
  return requestHandler.execute(
    createRequest(
      getTreasuryFinancialAccountsFinancialAccountFeaturesEndpointSchema,
      payload
    ),
    config
  );
}
