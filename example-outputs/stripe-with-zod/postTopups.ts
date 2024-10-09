import {z_Topup, z_Error, Topup, Error} from '@example-outputs/stripe-with-zod';
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

export const postTopupsEndpointSchema = {
  path: '/v1/topups',
  method: 'post',
  supportedSecuritySchemas: [],
  bodyByContentType: {
    'application/x-www-form-urlencoded': {
      zodSchema: z.object({
        amount: z.number().int().safe().finite(),
        currency: z.string(),
        description: z.string().optional(),
        expand: z.array(z.string()).optional(),
        metadata: z.union([z.record(z.string()), z.enum([''])]).optional(),
        source: z.string().optional(),
        statement_descriptor: z.string().optional(),
        transfer_group: z.string().optional(),
      }),
    },
  },
  responseByStatus: {
    '200': {
      bodyByContentType: {
        'application/json': {
          zodSchema: z_Topup,
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

export type PostTopupsRequest = RequestUnion<
  RequestBodyData<
    'application/x-www-form-urlencoded',
    {
      amount: number; // int
      currency: string;
      description?: string;
      expand?: string[];
      metadata?:
        | {
            [key: string]: string;
          }
        | '';
      source?: string;
      statement_descriptor?: string;
      transfer_group?: string;
    }
  >
>;

export type PostTopupsResponse =
  | ResponseUnion<200, ResponseBodyData<'application/json', Topup>>
  | ResponseUnion<any, ResponseBodyData<'application/json', Error>>;

export type PostTopupsRequestResult = RequestResult<
  PostTopupsRequest,
  PostTopupsResponse
>;

export function postTopups(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<PostTopupsRequest, 'contentType' | 'body', never>,
  config?: RequestHandlerExecutionConfig
): Promise<PostTopupsRequestResult> {
  return requestHandler.execute(
    createRequest(postTopupsEndpointSchema, payload),
    config
  );
}
