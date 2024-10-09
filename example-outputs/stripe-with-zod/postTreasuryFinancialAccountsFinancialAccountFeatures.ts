import {
  z_Treasury_Financial_account_features,
  z_Error,
  Treasury_Financial_account_features,
  Error,
} from '@example-outputs/stripe-with-zod';
import {z} from 'zod';
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
} from '@example-outputs/stripe-with-zod/core';

export const postTreasuryFinancialAccountsFinancialAccountFeaturesEndpointSchema =
  {
    path: '/v1/treasury/financial_accounts/{financial_account}/features',
    method: 'post',
    supportedSecuritySchemas: [],
    pathParamsZodSchema: z.object({
      financial_account: z.string(),
    }),
    bodyByContentType: {
      'application/x-www-form-urlencoded': {
        zodSchema: z.object({
          card_issuing: z
            .object({
              requested: z.boolean(),
            })
            .optional(),
          deposit_insurance: z
            .object({
              requested: z.boolean(),
            })
            .optional(),
          expand: z.array(z.string()).optional(),
          financial_addresses: z
            .object({
              aba: z
                .object({
                  requested: z.boolean(),
                })
                .optional(),
            })
            .optional(),
          inbound_transfers: z
            .object({
              ach: z
                .object({
                  requested: z.boolean(),
                })
                .optional(),
            })
            .optional(),
          intra_stripe_flows: z
            .object({
              requested: z.boolean(),
            })
            .optional(),
          outbound_payments: z
            .object({
              ach: z
                .object({
                  requested: z.boolean(),
                })
                .optional(),
              us_domestic_wire: z
                .object({
                  requested: z.boolean(),
                })
                .optional(),
            })
            .optional(),
          outbound_transfers: z
            .object({
              ach: z
                .object({
                  requested: z.boolean(),
                })
                .optional(),
              us_domestic_wire: z
                .object({
                  requested: z.boolean(),
                })
                .optional(),
            })
            .optional(),
        }),
      },
    },
    responseByStatus: {
      '200': {
        bodyByContentType: {
          'application/json': {
            zodSchema: z_Treasury_Financial_account_features,
          },
        },
      },
      default: {
        bodyByContentType: {
          'application/json': {
            zodSchema: z_Error,
          },
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
