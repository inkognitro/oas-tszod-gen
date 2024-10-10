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

export const postPayoutsPayoutReverseEndpointSchema = {
  path: '/v1/payouts/{payout}/reverse',
  method: 'post',
  supportedSecuritySchemas: [],
  pathParamsZodSchema: z.object({
    payout: z.string(),
  }),
  bodyByContentType: {
    'application/x-www-form-urlencoded': {
      zodSchema: z.object({
        expand: z.array(z.string()).optional(),
        metadata: z.record(z.string()).optional(),
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

export type PostPayoutsPayoutReverseRequest = RequestUnion<
  RequestBodyData<
    'application/x-www-form-urlencoded',
    {
      expand?: string[];
      metadata?: {
        [key: string]: string;
      };
    }
  >,
  {
    payout: string;
  }
>;

export type PostPayoutsPayoutReverseResponse =
  | ResponseUnion<200, ResponseBodyData<'application/json', Payout>>
  | ResponseUnion<any, ResponseBodyData<'application/json', Error>>;

export type PostPayoutsPayoutReverseRequestResult = RequestResult<
  PostPayoutsPayoutReverseRequest,
  PostPayoutsPayoutReverseResponse
>;

export function postPayoutsPayoutReverse(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<
    PostPayoutsPayoutReverseRequest,
    'pathParams' | 'contentType' | 'body',
    never
  >,
  config?: RequestHandlerExecutionConfig
): Promise<PostPayoutsPayoutReverseRequestResult> {
  return requestHandler.execute(
    createRequest(postPayoutsPayoutReverseEndpointSchema, payload),
    config
  );
}
