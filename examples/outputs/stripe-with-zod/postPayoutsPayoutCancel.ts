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

export const postPayoutsPayoutCancelEndpointSchema = {
  path: '/v1/payouts/{payout}/cancel',
  method: 'post',
  supportedSecuritySchemas: [],
  pathParamsZodSchema: z.object({
    payout: z.string(),
  }),
  bodyByContentType: {
    'application/x-www-form-urlencoded': {
      zodSchema: z.object({
        expand: z.array(z.string()).optional(),
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

export type PostPayoutsPayoutCancelRequest = RequestUnion<
  RequestBodyData<
    'application/x-www-form-urlencoded',
    {
      expand?: string[];
    }
  >,
  {
    payout: string;
  }
>;

export type PostPayoutsPayoutCancelResponse =
  | ResponseUnion<200, ResponseBodyData<'application/json', Payout>>
  | ResponseUnion<any, ResponseBodyData<'application/json', Error>>;

export type PostPayoutsPayoutCancelRequestResult = RequestResult<
  PostPayoutsPayoutCancelRequest,
  PostPayoutsPayoutCancelResponse
>;

export function postPayoutsPayoutCancel(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<
    PostPayoutsPayoutCancelRequest,
    'pathParams' | 'contentType' | 'body',
    never
  >,
  config?: RequestHandlerExecutionConfig
): Promise<PostPayoutsPayoutCancelRequestResult> {
  return requestHandler.execute(
    createRequest(postPayoutsPayoutCancelEndpointSchema, payload),
    config
  );
}
