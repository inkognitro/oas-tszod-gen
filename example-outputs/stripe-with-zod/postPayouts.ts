import {
  z_Payout,
  z_Error,
  Payout,
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

export const postPayoutsEndpointSchema = {
  path: '/v1/payouts',
  method: 'post',
  supportedSecuritySchemas: [],
  bodyByContentType: {
    'application/x-www-form-urlencoded': {
      zodSchema: z.object({
        amount: z.number().int().safe().finite(),
        currency: z.string(),
        description: z.string().optional(),
        destination: z.string().optional(),
        expand: z.array(z.string()).optional(),
        metadata: z.record(z.string()).optional(),
        method: z.enum(['instant', 'standard']).optional(),
        source_type: z.enum(['bank_account', 'card', 'fpx']).optional(),
        statement_descriptor: z.string().optional(),
      }),
    },
  },
  responseByStatus: {
    '200': {
      bodyByContentType: {
        'application/json': {
          zodSchema: z_Payout,
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

export type PostPayoutsRequest = RequestUnion<
  RequestBodyData<
    'application/x-www-form-urlencoded',
    {
      amount: number; // int
      currency: string;
      description?: string;
      destination?: string;
      expand?: string[];
      metadata?: {
        [key: string]: string;
      };
      method?: 'instant' | 'standard';
      source_type?: 'bank_account' | 'card' | 'fpx';
      statement_descriptor?: string;
    }
  >
>;

export type PostPayoutsResponse =
  | ResponseUnion<200, ResponseBodyData<'application/json', Payout>>
  | ResponseUnion<any, ResponseBodyData<'application/json', Error>>;

export type PostPayoutsRequestResult = RequestResult<
  PostPayoutsRequest,
  PostPayoutsResponse
>;

export function postPayouts(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<PostPayoutsRequest, 'contentType' | 'body', never>,
  config?: RequestHandlerExecutionConfig
): Promise<PostPayoutsRequestResult> {
  return requestHandler.execute(
    createRequest(postPayoutsEndpointSchema, payload),
    config
  );
}
