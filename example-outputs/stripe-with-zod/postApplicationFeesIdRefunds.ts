import {
  z_Fee_refund,
  z_Error,
  Fee_refund,
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

export const postApplicationFeesIdRefundsEndpointSchema = {
  path: '/v1/application_fees/{id}/refunds',
  method: 'post',
  supportedSecuritySchemas: [],
  pathParamsZodSchema: z.object({
    id: z.string(),
  }),
  bodyByContentType: {
    'application/x-www-form-urlencoded': {
      zodSchema: z.object({
        amount: z.number().int().safe().finite().optional(),
        expand: z.array(z.string()).optional(),
        metadata: z.record(z.string()).optional(),
      }),
    },
  },
  responseByStatus: {
    '200': {
      bodyByContentType: {
        'application/json': {
          zodSchema: z_Fee_refund,
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

export type PostApplicationFeesIdRefundsRequest = RequestUnion<
  RequestBodyData<
    'application/x-www-form-urlencoded',
    {
      amount?: number; // int
      expand?: string[];
      metadata?: {
        [key: string]: string;
      };
    }
  >,
  {
    id: string;
  }
>;

export type PostApplicationFeesIdRefundsResponse =
  | ResponseUnion<200, ResponseBodyData<'application/json', Fee_refund>>
  | ResponseUnion<any, ResponseBodyData<'application/json', Error>>;

export type PostApplicationFeesIdRefundsRequestResult = RequestResult<
  PostApplicationFeesIdRefundsRequest,
  PostApplicationFeesIdRefundsResponse
>;

export function postApplicationFeesIdRefunds(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<
    PostApplicationFeesIdRefundsRequest,
    'pathParams' | 'contentType' | 'body',
    never
  >,
  config?: RequestHandlerExecutionConfig
): Promise<PostApplicationFeesIdRefundsRequestResult> {
  return requestHandler.execute(
    createRequest(postApplicationFeesIdRefundsEndpointSchema, payload),
    config
  );
}
