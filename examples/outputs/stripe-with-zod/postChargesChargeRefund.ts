import {z_Charge, z_Error, Charge, Error} from './schemas';
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

export const postChargesChargeRefundEndpointSchema = {
  path: '/v1/charges/{charge}/refund',
  method: 'post',
  supportedSecuritySchemas: [],
  pathParamsZodSchema: z.object({
    charge: z.string(),
  }),
  bodyByContentType: {
    'application/x-www-form-urlencoded': {
      zodSchema: z.object({
        amount: z.number().int().safe().finite().optional(),
        expand: z.array(z.string()).optional(),
        instructions_email: z.string().optional(),
        metadata: z.union([z.record(z.string()), z.enum([''])]).optional(),
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
          zodSchema: z_Charge,
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

export type PostChargesChargeRefundRequest = RequestUnion<
  RequestBodyData<
    'application/x-www-form-urlencoded',
    {
      amount?: number; // int
      expand?: string[];
      instructions_email?: string;
      metadata?:
        | {
            [key: string]: string;
          }
        | '';
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

export type PostChargesChargeRefundResponse =
  | ResponseUnion<200, ResponseBodyData<'application/json', Charge>>
  | ResponseUnion<any, ResponseBodyData<'application/json', Error>>;

export type PostChargesChargeRefundRequestResult = RequestResult<
  PostChargesChargeRefundRequest,
  PostChargesChargeRefundResponse
>;

export function postChargesChargeRefund(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<
    PostChargesChargeRefundRequest,
    'pathParams' | 'contentType' | 'body',
    never
  >,
  config?: RequestHandlerExecutionConfig
): Promise<PostChargesChargeRefundRequestResult> {
  return requestHandler.execute(
    createRequest(postChargesChargeRefundEndpointSchema, payload),
    config
  );
}
