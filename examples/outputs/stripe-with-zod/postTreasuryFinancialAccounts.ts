import {
  z_Treasury_Financial_account,
  Treasury_Financial_account,
} from './treasury';
import {z_Error, Error} from './schemas';
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
} from './core';

export const postTreasuryFinancialAccountsEndpointSchema = {
  path: '/v1/treasury/financial_accounts',
  method: 'post',
  supportedSecuritySchemas: [],
  bodyByContentType: {
    'application/x-www-form-urlencoded': {
      zodSchema: z.object({
        expand: z.array(z.string()).optional(),
        features: z
          .object({
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
          })
          .optional(),
        metadata: z.record(z.string()).optional(),
        platform_restrictions: z
          .object({
            inbound_flows: z.enum(['restricted', 'unrestricted']).optional(),
            outbound_flows: z.enum(['restricted', 'unrestricted']).optional(),
          })
          .optional(),
        supported_currencies: z.array(z.string()),
      }),
    },
  },
  responseByStatus: {
    '200': {
      bodyByContentType: {
        'application/json': {
          zodSchema: z_Treasury_Financial_account,
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

export type PostTreasuryFinancialAccountsRequest = RequestUnion<
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
      supported_currencies: string[];
    }
  >
>;

export type PostTreasuryFinancialAccountsResponse =
  | ResponseUnion<
      200,
      ResponseBodyData<'application/json', Treasury_Financial_account>
    >
  | ResponseUnion<any, ResponseBodyData<'application/json', Error>>;

export type PostTreasuryFinancialAccountsRequestResult = RequestResult<
  PostTreasuryFinancialAccountsRequest,
  PostTreasuryFinancialAccountsResponse
>;

export function postTreasuryFinancialAccounts(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<
    PostTreasuryFinancialAccountsRequest,
    'contentType' | 'body',
    never
  >,
  config?: RequestHandlerExecutionConfig
): Promise<PostTreasuryFinancialAccountsRequestResult> {
  return requestHandler.execute(
    createRequest(postTreasuryFinancialAccountsEndpointSchema, payload),
    config
  );
}
