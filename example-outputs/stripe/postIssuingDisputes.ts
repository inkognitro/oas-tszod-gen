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
import {Issuing_Dispute, Error} from '@example-outputs/stripe';

export const postIssuingDisputesEndpointSchema = {
  path: '/v1/issuing/disputes',
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

export type PostIssuingDisputesRequest = RequestUnion<
  RequestBodyData<
    'application/x-www-form-urlencoded',
    {
      amount?: number; // int
      evidence?: {
        canceled?: (
          | {
              additional_documentation?: string | '';
              canceled_at?: number | '';
              cancellation_policy_provided?: boolean | '';
              cancellation_reason?: string | '';
              expected_at?: number | '';
              explanation?: string | '';
              product_description?: string | '';
              product_type?: '' | 'merchandise' | 'service';
              return_status?: '' | 'merchant_rejected' | 'successful';
              returned_at?: number | '';
            }
          | ''
        ) &
          Partial<{
            additional_documentation?: string | '';
            canceled_at?: number | '';
            cancellation_policy_provided?: boolean | '';
            cancellation_reason?: string | '';
            expected_at?: number | '';
            explanation?: string | '';
            product_description?: string | '';
            product_type?: '' | 'merchandise' | 'service';
            return_status?: '' | 'merchant_rejected' | 'successful';
            returned_at?: number | '';
          }>;
        duplicate?: (
          | {
              additional_documentation?: string | '';
              card_statement?: string | '';
              cash_receipt?: string | '';
              check_image?: string | '';
              explanation?: string | '';
              original_transaction?: string;
            }
          | ''
        ) &
          Partial<{
            additional_documentation?: string | '';
            card_statement?: string | '';
            cash_receipt?: string | '';
            check_image?: string | '';
            explanation?: string | '';
            original_transaction?: string;
          }>;
        fraudulent?: (
          | {
              additional_documentation?: string | '';
              explanation?: string | '';
            }
          | ''
        ) &
          Partial<{
            additional_documentation?: string | '';
            explanation?: string | '';
          }>;
        merchandise_not_as_described?: (
          | {
              additional_documentation?: string | '';
              explanation?: string | '';
              received_at?: number | '';
              return_description?: string | '';
              return_status?: '' | 'merchant_rejected' | 'successful';
              returned_at?: number | '';
            }
          | ''
        ) &
          Partial<{
            additional_documentation?: string | '';
            explanation?: string | '';
            received_at?: number | '';
            return_description?: string | '';
            return_status?: '' | 'merchant_rejected' | 'successful';
            returned_at?: number | '';
          }>;
        no_valid_authorization?: (
          | {
              additional_documentation?: string | '';
              explanation?: string | '';
            }
          | ''
        ) &
          Partial<{
            additional_documentation?: string | '';
            explanation?: string | '';
          }>;
        not_received?: (
          | {
              additional_documentation?: string | '';
              expected_at?: number | '';
              explanation?: string | '';
              product_description?: string | '';
              product_type?: '' | 'merchandise' | 'service';
            }
          | ''
        ) &
          Partial<{
            additional_documentation?: string | '';
            expected_at?: number | '';
            explanation?: string | '';
            product_description?: string | '';
            product_type?: '' | 'merchandise' | 'service';
          }>;
        other?: (
          | {
              additional_documentation?: string | '';
              explanation?: string | '';
              product_description?: string | '';
              product_type?: '' | 'merchandise' | 'service';
            }
          | ''
        ) &
          Partial<{
            additional_documentation?: string | '';
            explanation?: string | '';
            product_description?: string | '';
            product_type?: '' | 'merchandise' | 'service';
          }>;
        reason?:
          | 'canceled'
          | 'duplicate'
          | 'fraudulent'
          | 'merchandise_not_as_described'
          | 'no_valid_authorization'
          | 'not_received'
          | 'other'
          | 'service_not_as_described';
        service_not_as_described?: (
          | {
              additional_documentation?: string | '';
              canceled_at?: number | '';
              cancellation_reason?: string | '';
              explanation?: string | '';
              received_at?: number | '';
            }
          | ''
        ) &
          Partial<{
            additional_documentation?: string | '';
            canceled_at?: number | '';
            cancellation_reason?: string | '';
            explanation?: string | '';
            received_at?: number | '';
          }>;
      };
      expand?: string[];
      metadata?: {
        [key: string]: string;
      };
      transaction?: string;
      treasury?: {
        received_debit: string;
      };
    }
  >
>;

export type PostIssuingDisputesResponse =
  | ResponseUnion<200, ResponseBodyData<'application/json', Issuing_Dispute>>
  | ResponseUnion<any, ResponseBodyData<'application/json', Error>>;

export type PostIssuingDisputesRequestResult = RequestResult<
  PostIssuingDisputesRequest,
  PostIssuingDisputesResponse
>;

export function postIssuingDisputes(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<
    PostIssuingDisputesRequest,
    'contentType' | 'body',
    never
  >,
  config?: RequestHandlerExecutionConfig
): Promise<PostIssuingDisputesRequestResult> {
  return requestHandler.execute(
    createRequest(postIssuingDisputesEndpointSchema, payload),
    config
  );
}
