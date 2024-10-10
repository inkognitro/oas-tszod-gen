import {z_Refund, z_Error, Refund, Error} from './schemas';
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

export const postRefundsEndpointSchema = {
  path: '/v1/refunds',
  method: 'post',
  supportedSecuritySchemas: [],
  bodyByContentType: {
    'application/x-www-form-urlencoded': {
      zodSchema: z.object({
        amount: z.number().int().safe().finite().optional(),
        charge: z.string().optional(),
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

export type PostRefundsRequest = RequestUnion<
  RequestBodyData<
    'application/x-www-form-urlencoded',
    {
      amount?: number; // int
      charge?: string;
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
  >
>;

export type PostRefundsResponse =
  | ResponseUnion<200, ResponseBodyData<'application/json', Refund>>
  | ResponseUnion<any, ResponseBodyData<'application/json', Error>>;

export type PostRefundsRequestResult = RequestResult<
  PostRefundsRequest,
  PostRefundsResponse
>;

export function postRefunds(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<PostRefundsRequest, 'contentType' | 'body', never>,
  config?: RequestHandlerExecutionConfig
): Promise<PostRefundsRequestResult> {
  return requestHandler.execute(
    createRequest(postRefundsEndpointSchema, payload),
    config
  );
}
