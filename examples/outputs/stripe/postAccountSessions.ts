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
import {Account_session, Error} from './schemas';

export const postAccountSessionsEndpointSchema = {
  path: '/v1/account_sessions',
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
