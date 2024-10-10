import {z_Payout, z_Error, Payout, Error} from './schemas';
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

export const postPayoutsPayoutEndpointSchema = {
  path: '/v1/payouts/{payout}',
  method: 'post',
  supportedSecuritySchemas: [],
  pathParamsZodSchema: z.object({
    payout: z.string(),
  }),
  bodyByContentType: {
    'application/x-www-form-urlencoded': {
      zodSchema: z.object({
        expand: z.array(z.string()).optional(),
        metadata: z.union([z.record(z.string()), z.enum([''])]).optional(),
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

export type PostPayoutsPayoutRequest = RequestUnion<
  RequestBodyData<
    'application/x-www-form-urlencoded',
    {
      expand?: string[];
      metadata?:
        | {
            [key: string]: string;
          }
        | '';
    }
  >,
  {
    payout: string;
  }
>;

export type PostPayoutsPayoutResponse =
  | ResponseUnion<200, ResponseBodyData<'application/json', Payout>>
  | ResponseUnion<any, ResponseBodyData<'application/json', Error>>;

export type PostPayoutsPayoutRequestResult = RequestResult<
  PostPayoutsPayoutRequest,
  PostPayoutsPayoutResponse
>;

export function postPayoutsPayout(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<
    PostPayoutsPayoutRequest,
    'pathParams' | 'contentType' | 'body',
    never
  >,
  config?: RequestHandlerExecutionConfig
): Promise<PostPayoutsPayoutRequestResult> {
  return requestHandler.execute(
    createRequest(postPayoutsPayoutEndpointSchema, payload),
    config
  );
}
