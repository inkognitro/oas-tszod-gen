import {z_Account_session, z_Error, Account_session, Error} from './schemas';
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

export const postAccountSessionsEndpointSchema = {
  path: '/v1/account_sessions',
  method: 'post',
  supportedSecuritySchemas: [],
  bodyByContentType: {
    'application/x-www-form-urlencoded': {
      zodSchema: z.object({
        account: z.string(),
        components: z.object({
          account_management: z
            .object({
              enabled: z.boolean(),
              features: z
                .object({
                  external_account_collection: z.boolean().optional(),
                })
                .optional(),
            })
            .optional(),
          account_onboarding: z
            .object({
              enabled: z.boolean(),
              features: z
                .object({
                  external_account_collection: z.boolean().optional(),
                })
                .optional(),
            })
            .optional(),
          balances: z
            .object({
              enabled: z.boolean(),
              features: z
                .object({
                  edit_payout_schedule: z.boolean().optional(),
                  external_account_collection: z.boolean().optional(),
                  instant_payouts: z.boolean().optional(),
                  standard_payouts: z.boolean().optional(),
                })
                .optional(),
            })
            .optional(),
          documents: z
            .object({
              enabled: z.boolean(),
              features: z.object({}).optional(),
            })
            .optional(),
          notification_banner: z
            .object({
              enabled: z.boolean(),
              features: z
                .object({
                  external_account_collection: z.boolean().optional(),
                })
                .optional(),
            })
            .optional(),
          payment_details: z
            .object({
              enabled: z.boolean(),
              features: z
                .object({
                  capture_payments: z.boolean().optional(),
                  destination_on_behalf_of_charge_management: z
                    .boolean()
                    .optional(),
                  dispute_management: z.boolean().optional(),
                  refund_management: z.boolean().optional(),
                })
                .optional(),
            })
            .optional(),
          payments: z
            .object({
              enabled: z.boolean(),
              features: z
                .object({
                  capture_payments: z.boolean().optional(),
                  destination_on_behalf_of_charge_management: z
                    .boolean()
                    .optional(),
                  dispute_management: z.boolean().optional(),
                  refund_management: z.boolean().optional(),
                })
                .optional(),
            })
            .optional(),
          payouts: z
            .object({
              enabled: z.boolean(),
              features: z
                .object({
                  edit_payout_schedule: z.boolean().optional(),
                  external_account_collection: z.boolean().optional(),
                  instant_payouts: z.boolean().optional(),
                  standard_payouts: z.boolean().optional(),
                })
                .optional(),
            })
            .optional(),
          payouts_list: z
            .object({
              enabled: z.boolean(),
              features: z.object({}).optional(),
            })
            .optional(),
          tax_registrations: z
            .object({
              enabled: z.boolean(),
              features: z.object({}).optional(),
            })
            .optional(),
          tax_settings: z
            .object({
              enabled: z.boolean(),
              features: z.object({}).optional(),
            })
            .optional(),
        }),
        expand: z.array(z.string()).optional(),
      }),
    },
  },
  responseByStatus: {
    '200': {
      bodyByContentType: {
        'application/json': {
          zodSchema: z_Account_session,
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

export type PostAccountSessionsRequest = RequestUnion<
  RequestBodyData<
    'application/x-www-form-urlencoded',
    {
      account: string;
      components: {
        account_management?: {
          enabled: boolean;
          features?: {
            external_account_collection?: boolean;
          };
        };
        account_onboarding?: {
          enabled: boolean;
          features?: {
            external_account_collection?: boolean;
          };
        };
        balances?: {
          enabled: boolean;
          features?: {
            edit_payout_schedule?: boolean;
            external_account_collection?: boolean;
            instant_payouts?: boolean;
            standard_payouts?: boolean;
          };
        };
        documents?: {
          enabled: boolean;
          features?: {};
        };
        notification_banner?: {
          enabled: boolean;
          features?: {
            external_account_collection?: boolean;
          };
        };
        payment_details?: {
          enabled: boolean;
          features?: {
            capture_payments?: boolean;
            destination_on_behalf_of_charge_management?: boolean;
            dispute_management?: boolean;
            refund_management?: boolean;
          };
        };
        payments?: {
          enabled: boolean;
          features?: {
            capture_payments?: boolean;
            destination_on_behalf_of_charge_management?: boolean;
            dispute_management?: boolean;
            refund_management?: boolean;
          };
        };
        payouts?: {
          enabled: boolean;
          features?: {
            edit_payout_schedule?: boolean;
            external_account_collection?: boolean;
            instant_payouts?: boolean;
            standard_payouts?: boolean;
          };
        };
        payouts_list?: {
          enabled: boolean;
          features?: {};
        };
        tax_registrations?: {
          enabled: boolean;
          features?: {};
        };
        tax_settings?: {
          enabled: boolean;
          features?: {};
        };
      };
      expand?: string[];
    }
  >
>;

export type PostAccountSessionsResponse =
  | ResponseUnion<200, ResponseBodyData<'application/json', Account_session>>
  | ResponseUnion<any, ResponseBodyData<'application/json', Error>>;

export type PostAccountSessionsRequestResult = RequestResult<
  PostAccountSessionsRequest,
  PostAccountSessionsResponse
>;

export function postAccountSessions(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<
    PostAccountSessionsRequest,
    'contentType' | 'body',
    never
  >,
  config?: RequestHandlerExecutionConfig
): Promise<PostAccountSessionsRequestResult> {
  return requestHandler.execute(
    createRequest(postAccountSessionsEndpointSchema, payload),
    config
  );
}
