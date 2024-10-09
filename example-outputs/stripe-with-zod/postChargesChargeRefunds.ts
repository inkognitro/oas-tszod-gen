import {
  z_Refund,
  z_Error,
  Refund,
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

export const postChargesChargeRefundsEndpointSchema = {
  path: '/v1/charges/{charge}/refunds',
  method: 'post',
  supportedSecuritySchemas: [],
  pathParamsZodSchema: z.object({
    charge: z.string(),
  }),
  bodyByContentType: {
    'application/x-www-form-urlencoded': {
      zodSchema: z.object({
        amount: z.number().int().safe().finite().optional(),
        currency: z.string().optional(),
        customer: z.string().optional(),
        expand: z.array(z.string()).optional(),
        instructions_email: z.string().optional(),
        metadata: z.union([z.record(z.string()), z.enum([''])]).optional(),
        origin: z.enum(['customer_balance']).optional(),
        payment_intent: z.string().optional(),
        reason: z
          .enum(['duplicate', 'fraudulent', 'requested_by_customer'])
          .optional(),
        refund_application_fee: z.boolean().optional(),
        reverse_transfer: z.boolean().optional(),
      }),
    },
  },
  responseByStatus: {
    '200': {
      bodyByContentType: {
        'application/json': {
          zodSchema: z_Refund,
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

export type PostChargesChargeRefundsRequest = RequestUnion<
  RequestBodyData<
    'application/x-www-form-urlencoded',
    {
      amount?: number; // int
      currency?: string;
      customer?: string;
      expand?: string[];
      instructions_email?: string;
      metadata?:
        | {
            [key: string]: string;
          }
        | '';
      origin?: 'customer_balance';
      payment_intent?: string;
      reason?: 'duplicate' | 'fraudulent' | 'requested_by_customer';
      refund_application_fee?: boolean;
      reverse_transfer?: boolean;
    }
  >,
  {
    charge: string;
  }
>;

export type PostChargesChargeRefundsResponse =
  | ResponseUnion<200, ResponseBodyData<'application/json', Refund>>
  | ResponseUnion<any, ResponseBodyData<'application/json', Error>>;

export type PostChargesChargeRefundsRequestResult = RequestResult<
  PostChargesChargeRefundsRequest,
  PostChargesChargeRefundsResponse
>;

export function postChargesChargeRefunds(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<
    PostChargesChargeRefundsRequest,
    'pathParams' | 'contentType' | 'body',
    never
  >,
  config?: RequestHandlerExecutionConfig
): Promise<PostChargesChargeRefundsRequestResult> {
  return requestHandler.execute(
    createRequest(postChargesChargeRefundsEndpointSchema, payload),
    config
  );
}
