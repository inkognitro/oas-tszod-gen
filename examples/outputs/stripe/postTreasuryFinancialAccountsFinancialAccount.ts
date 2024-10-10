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

export const postTreasuryFinancialAccountsFinancialAccountEndpointSchema = {
  path: '/v1/treasury/financial_accounts/{financial_account}',
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

export type PostTreasuryFinancialAccountsFinancialAccountRequest = RequestUnion<
  RequestBodyData<
    'application/x-www-form-urlencoded',
    {
      expand?: string[];
      features?: {
        card_issuing?: {
          requested: boolean;
        };
        deposit_insurance?: {
          requested: boolean;
        };
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
      };
      metadata?: {
        [key: string]: string;
      };
      platform_restrictions?: {
        inbound_flows?: 'restricted' | 'unrestricted';
        outbound_flows?: 'restricted' | 'unrestricted';
      };
    }
  >,
  {
    financial_account: string;
  }
>;

export type PostTreasuryFinancialAccountsFinancialAccountResponse =
  | ResponseUnion<
      200,
      ResponseBodyData<'application/json', Treasury_Financial_account>
    >
  | ResponseUnion<any, ResponseBodyData<'application/json', Error>>;

export type PostTreasuryFinancialAccountsFinancialAccountRequestResult =
  RequestResult<
    PostTreasuryFinancialAccountsFinancialAccountRequest,
    PostTreasuryFinancialAccountsFinancialAccountResponse
  >;

export function postTreasuryFinancialAccountsFinancialAccount(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<
    PostTreasuryFinancialAccountsFinancialAccountRequest,
    'pathParams' | 'contentType' | 'body',
    never
  >,
  config?: RequestHandlerExecutionConfig
): Promise<PostTreasuryFinancialAccountsFinancialAccountRequestResult> {
  return requestHandler.execute(
    createRequest(
      postTreasuryFinancialAccountsFinancialAccountEndpointSchema,
      payload
    ),
    config
  );
}
