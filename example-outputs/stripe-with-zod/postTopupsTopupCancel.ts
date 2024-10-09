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

export const postTopupsTopupCancelEndpointSchema = {
  path: '/v1/topups/{topup}/cancel',
  method: 'post',
  supportedSecuritySchemas: [],
  pathParamsZodSchema: z.object({
    topup: z.string(),
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

export type PostTopupsTopupCancelRequest = RequestUnion<
  RequestBodyData<
    'application/x-www-form-urlencoded',
    {
      expand?: string[];
    }
  >,
  {
    topup: string;
  }
>;

export type PostTopupsTopupCancelResponse =
  | ResponseUnion<200, ResponseBodyData<'application/json', Topup>>
  | ResponseUnion<any, ResponseBodyData<'application/json', Error>>;

export type PostTopupsTopupCancelRequestResult = RequestResult<
  PostTopupsTopupCancelRequest,
  PostTopupsTopupCancelResponse
>;

export function postTopupsTopupCancel(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<
    PostTopupsTopupCancelRequest,
    'pathParams' | 'contentType' | 'body',
    never
  >,
  config?: RequestHandlerExecutionConfig
): Promise<PostTopupsTopupCancelRequestResult> {
  return requestHandler.execute(
    createRequest(postTopupsTopupCancelEndpointSchema, payload),
    config
  );
}
