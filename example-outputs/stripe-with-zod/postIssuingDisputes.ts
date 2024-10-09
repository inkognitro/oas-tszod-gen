import {
  z_Issuing_Dispute,
  z_Error,
  Issuing_Dispute,
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

export const postIssuingDisputesEndpointSchema = {
  path: '/v1/issuing/disputes',
  method: 'post',
  supportedSecuritySchemas: [],
  bodyByContentType: {
    'application/x-www-form-urlencoded': {
      zodSchema: z.object({
        amount: z.number().int().safe().finite().optional(),
        evidence: z
          .object({
            canceled: z
              .union([
                z.object({
                  additional_documentation: z
                    .union([z.string(), z.enum([''])])
                    .optional(),
                  canceled_at: z
                    .union([z.number().int().safe().finite(), z.enum([''])])
                    .optional(),
                  cancellation_policy_provided: z
                    .union([z.boolean(), z.enum([''])])
                    .optional(),
                  cancellation_reason: z
                    .union([z.string(), z.enum([''])])
                    .optional(),
                  expected_at: z
                    .union([z.number().int().safe().finite(), z.enum([''])])
                    .optional(),
                  explanation: z.union([z.string(), z.enum([''])]).optional(),
                  product_description: z
                    .union([z.string(), z.enum([''])])
                    .optional(),
                  product_type: z
                    .enum(['', 'merchandise', 'service'])
                    .optional(),
                  return_status: z
                    .enum(['', 'merchant_rejected', 'successful'])
                    .optional(),
                  returned_at: z
                    .union([z.number().int().safe().finite(), z.enum([''])])
                    .optional(),
                }),
                z.enum(['']),
              ])
              .optional(),
            duplicate: z
              .union([
                z.object({
                  additional_documentation: z
                    .union([z.string(), z.enum([''])])
                    .optional(),
                  card_statement: z
                    .union([z.string(), z.enum([''])])
                    .optional(),
                  cash_receipt: z.union([z.string(), z.enum([''])]).optional(),
                  check_image: z.union([z.string(), z.enum([''])]).optional(),
                  explanation: z.union([z.string(), z.enum([''])]).optional(),
                  original_transaction: z.string().optional(),
                }),
                z.enum(['']),
              ])
              .optional(),
            fraudulent: z
              .union([
                z.object({
                  additional_documentation: z
                    .union([z.string(), z.enum([''])])
                    .optional(),
                  explanation: z.union([z.string(), z.enum([''])]).optional(),
                }),
                z.enum(['']),
              ])
              .optional(),
            merchandise_not_as_described: z
              .union([
                z.object({
                  additional_documentation: z
                    .union([z.string(), z.enum([''])])
                    .optional(),
                  explanation: z.union([z.string(), z.enum([''])]).optional(),
                  received_at: z
                    .union([z.number().int().safe().finite(), z.enum([''])])
                    .optional(),
                  return_description: z
                    .union([z.string(), z.enum([''])])
                    .optional(),
                  return_status: z
                    .enum(['', 'merchant_rejected', 'successful'])
                    .optional(),
                  returned_at: z
                    .union([z.number().int().safe().finite(), z.enum([''])])
                    .optional(),
                }),
                z.enum(['']),
              ])
              .optional(),
            no_valid_authorization: z
              .union([
                z.object({
                  additional_documentation: z
                    .union([z.string(), z.enum([''])])
                    .optional(),
                  explanation: z.union([z.string(), z.enum([''])]).optional(),
                }),
                z.enum(['']),
              ])
              .optional(),
            not_received: z
              .union([
                z.object({
                  additional_documentation: z
                    .union([z.string(), z.enum([''])])
                    .optional(),
                  expected_at: z
                    .union([z.number().int().safe().finite(), z.enum([''])])
                    .optional(),
                  explanation: z.union([z.string(), z.enum([''])]).optional(),
                  product_description: z
                    .union([z.string(), z.enum([''])])
                    .optional(),
                  product_type: z
                    .enum(['', 'merchandise', 'service'])
                    .optional(),
                }),
                z.enum(['']),
              ])
              .optional(),
            other: z
              .union([
                z.object({
                  additional_documentation: z
                    .union([z.string(), z.enum([''])])
                    .optional(),
                  explanation: z.union([z.string(), z.enum([''])]).optional(),
                  product_description: z
                    .union([z.string(), z.enum([''])])
                    .optional(),
                  product_type: z
                    .enum(['', 'merchandise', 'service'])
                    .optional(),
                }),
                z.enum(['']),
              ])
              .optional(),
            reason: z
              .enum([
                'canceled',
                'duplicate',
                'fraudulent',
                'merchandise_not_as_described',
                'no_valid_authorization',
                'not_received',
                'other',
                'service_not_as_described',
              ])
              .optional(),
            service_not_as_described: z
              .union([
                z.object({
                  additional_documentation: z
                    .union([z.string(), z.enum([''])])
                    .optional(),
                  canceled_at: z
                    .union([z.number().int().safe().finite(), z.enum([''])])
                    .optional(),
                  cancellation_reason: z
                    .union([z.string(), z.enum([''])])
                    .optional(),
                  explanation: z.union([z.string(), z.enum([''])]).optional(),
                  received_at: z
                    .union([z.number().int().safe().finite(), z.enum([''])])
                    .optional(),
                }),
                z.enum(['']),
              ])
              .optional(),
          })
          .optional(),
        expand: z.array(z.string()).optional(),
        metadata: z.record(z.string()).optional(),
        transaction: z.string().optional(),
        treasury: z
          .object({
            received_debit: z.string(),
          })
          .optional(),
      }),
    },
  },
  responseByStatus: {
    '200': {
      bodyByContentType: {
        'application/json': {
          zodSchema: z_Issuing_Dispute,
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
