import {
  z_Charge,
  z_Error,
  Charge,
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

export const postChargesChargeEndpointSchema = {
  path: '/v1/charges/{charge}',
  method: 'post',
  supportedSecuritySchemas: [],
  pathParamsZodSchema: z.object({
    charge: z.string(),
  }),
  bodyByContentType: {
    'application/x-www-form-urlencoded': {
      zodSchema: z.object({
        customer: z.string().optional(),
        description: z.string().optional(),
        expand: z.array(z.string()).optional(),
        fraud_details: z
          .object({
            user_report: z.enum(['', 'fraudulent', 'safe']),
          })
          .optional(),
        metadata: z.union([z.record(z.string()), z.enum([''])]).optional(),
        receipt_email: z.string().optional(),
        shipping: z
          .object({
            address: z.object({
              city: z.string().optional(),
              country: z.string().optional(),
              line1: z.string().optional(),
              line2: z.string().optional(),
              postal_code: z.string().optional(),
              state: z.string().optional(),
            }),
            carrier: z.string().optional(),
            name: z.string(),
            phone: z.string().optional(),
            tracking_number: z.string().optional(),
          })
          .optional(),
        transfer_group: z.string().optional(),
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

export type PostChargesChargeRequest = RequestUnion<
  RequestBodyData<
    'application/x-www-form-urlencoded',
    {
      customer?: string;
      description?: string;
      expand?: string[];
      fraud_details?: {
        user_report: '' | 'fraudulent' | 'safe';
      };
      metadata?:
        | {
            [key: string]: string;
          }
        | '';
      receipt_email?: string;
      shipping?: {
        address: {
          city?: string;
          country?: string;
          line1?: string;
          line2?: string;
          postal_code?: string;
          state?: string;
        };
        carrier?: string;
        name: string;
        phone?: string;
        tracking_number?: string;
      };
      transfer_group?: string;
    }
  >,
  {
    charge: string;
  }
>;

export type PostChargesChargeResponse =
  | ResponseUnion<200, ResponseBodyData<'application/json', Charge>>
  | ResponseUnion<any, ResponseBodyData<'application/json', Error>>;

export type PostChargesChargeRequestResult = RequestResult<
  PostChargesChargeRequest,
  PostChargesChargeResponse
>;

export function postChargesCharge(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<
    PostChargesChargeRequest,
    'pathParams' | 'contentType' | 'body',
    never
  >,
  config?: RequestHandlerExecutionConfig
): Promise<PostChargesChargeRequestResult> {
  return requestHandler.execute(
    createRequest(postChargesChargeEndpointSchema, payload),
    config
  );
}
