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
import {Treasury_Financial_account_features} from './treasury';
import {Error} from './schemas';

export const postTreasuryFinancialAccountsFinancialAccountFeaturesEndpointSchema =
  {
    path: '/v1/treasury/financial_accounts/{financial_account}/features',
    method: 'post',
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

export type PostTreasuryFinancialAccountsFinancialAccountFeaturesRequest =
  RequestUnion<
    RequestBodyData<
      'application/x-www-form-urlencoded',
      {
        card_issuing?: {
          requested: boolean;
        };
        deposit_insurance?: {
          requested: boolean;
        };
        expand?: string[];
        financial_addresses?: {
          aba?: {
            requested: boolean;
          };
        };
        inbound_transfers?: {
          ach?: {
            requested: boolean;
          };
        };
        intra_stripe_flows?: {
          requested: boolean;
        };
        outbound_payments?: {
          ach?: {
            requested: boolean;
          };
          us_domestic_wire?: {
            requested: boolean;
          };
        };
        outbound_transfers?: {
          ach?: {
            requested: boolean;
          };
          us_domestic_wire?: {
            requested: boolean;
          };
        };
      }
    >,
    {
      financial_account: string;
    }
  >;

export type PostTreasuryFinancialAccountsFinancialAccountFeaturesResponse =
  | ResponseUnion<
      200,
      ResponseBodyData<'application/json', Treasury_Financial_account_features>
    >
  | ResponseUnion<any, ResponseBodyData<'application/json', Error>>;

export type PostTreasuryFinancialAccountsFinancialAccountFeaturesRequestResult =
  RequestResult<
    PostTreasuryFinancialAccountsFinancialAccountFeaturesRequest,
    PostTreasuryFinancialAccountsFinancialAccountFeaturesResponse
  >;

export function postTreasuryFinancialAccountsFinancialAccountFeatures(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<
    PostTreasuryFinancialAccountsFinancialAccountFeaturesRequest,
    'pathParams' | 'contentType' | 'body',
    never
  >,
  config?: RequestHandlerExecutionConfig
): Promise<PostTreasuryFinancialAccountsFinancialAccountFeaturesRequestResult> {
  return requestHandler.execute(
    createRequest(
      postTreasuryFinancialAccountsFinancialAccountFeaturesEndpointSchema,
      payload
    ),
    config
  );
}
