import {
  z_Dispute,
  z_Error,
  Dispute,
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

export const postChargesChargeDisputeEndpointSchema = {
  path: '/v1/charges/{charge}/dispute',
  method: 'post',
  supportedSecuritySchemas: [],
  pathParamsZodSchema: z.object({
    charge: z.string(),
  }),
  bodyByContentType: {
    'application/x-www-form-urlencoded': {
      zodSchema: z.object({
        evidence: z
          .object({
            access_activity_log: z.string().optional(),
            billing_address: z.string().optional(),
            cancellation_policy: z.string().optional(),
            cancellation_policy_disclosure: z.string().optional(),
            cancellation_rebuttal: z.string().optional(),
            customer_communication: z.string().optional(),
            customer_email_address: z.string().optional(),
            customer_name: z.string().optional(),
            customer_purchase_ip: z.string().optional(),
            customer_signature: z.string().optional(),
            duplicate_charge_documentation: z.string().optional(),
            duplicate_charge_explanation: z.string().optional(),
            duplicate_charge_id: z.string().optional(),
            product_description: z.string().optional(),
            receipt: z.string().optional(),
            refund_policy: z.string().optional(),
            refund_policy_disclosure: z.string().optional(),
            refund_refusal_explanation: z.string().optional(),
            service_date: z.string().optional(),
            service_documentation: z.string().optional(),
            shipping_address: z.string().optional(),
            shipping_carrier: z.string().optional(),
            shipping_date: z.string().optional(),
            shipping_documentation: z.string().optional(),
            shipping_tracking_number: z.string().optional(),
            uncategorized_file: z.string().optional(),
            uncategorized_text: z.string().optional(),
          })
          .optional(),
        expand: z.array(z.string()).optional(),
        metadata: z.union([z.record(z.string()), z.enum([''])]).optional(),
        submit: z.boolean().optional(),
      }),
    },
  },
  responseByStatus: {
    '200': {
      bodyByContentType: {
        'application/json': {
          zodSchema: z_Dispute,
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

export type PostChargesChargeDisputeRequest = RequestUnion<
  RequestBodyData<
    'application/x-www-form-urlencoded',
    {
      evidence?: {
        access_activity_log?: string;
        billing_address?: string;
        cancellation_policy?: string;
        cancellation_policy_disclosure?: string;
        cancellation_rebuttal?: string;
        customer_communication?: string;
        customer_email_address?: string;
        customer_name?: string;
        customer_purchase_ip?: string;
        customer_signature?: string;
        duplicate_charge_documentation?: string;
        duplicate_charge_explanation?: string;
        duplicate_charge_id?: string;
        product_description?: string;
        receipt?: string;
        refund_policy?: string;
        refund_policy_disclosure?: string;
        refund_refusal_explanation?: string;
        service_date?: string;
        service_documentation?: string;
        shipping_address?: string;
        shipping_carrier?: string;
        shipping_date?: string;
        shipping_documentation?: string;
        shipping_tracking_number?: string;
        uncategorized_file?: string;
        uncategorized_text?: string;
      };
      expand?: string[];
      metadata?:
        | {
            [key: string]: string;
          }
        | '';
      submit?: boolean;
    }
  >,
  {
    charge: string;
  }
>;

export type PostChargesChargeDisputeResponse =
  | ResponseUnion<200, ResponseBodyData<'application/json', Dispute>>
  | ResponseUnion<any, ResponseBodyData<'application/json', Error>>;

export type PostChargesChargeDisputeRequestResult = RequestResult<
  PostChargesChargeDisputeRequest,
  PostChargesChargeDisputeResponse
>;

export function postChargesChargeDispute(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<
    PostChargesChargeDisputeRequest,
    'pathParams' | 'contentType' | 'body',
    never
  >,
  config?: RequestHandlerExecutionConfig
): Promise<PostChargesChargeDisputeRequestResult> {
  return requestHandler.execute(
    createRequest(postChargesChargeDisputeEndpointSchema, payload),
    config
  );
}
