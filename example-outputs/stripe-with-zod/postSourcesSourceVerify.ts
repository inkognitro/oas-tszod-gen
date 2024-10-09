import {
  z_Source,
  z_Error,
  Source,
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

export const postSourcesSourceVerifyEndpointSchema = {
  path: '/v1/sources/{source}/verify',
  method: 'post',
  supportedSecuritySchemas: [],
  pathParamsZodSchema: z.object({
    source: z.string(),
  }),
  bodyByContentType: {
    'application/x-www-form-urlencoded': {
      zodSchema: z.object({
        expand: z.array(z.string()).optional(),
        values: z.array(z.string()),
      }),
    },
  },
  responseByStatus: {
    '200': {
      bodyByContentType: {
        'application/json': {
          zodSchema: z_Source,
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

export type PostSourcesSourceVerifyRequest = RequestUnion<
  RequestBodyData<
    'application/x-www-form-urlencoded',
    {
      expand?: string[];
      values: string[];
    }
  >,
  {
    source: string;
  }
>;

export type PostSourcesSourceVerifyResponse =
  | ResponseUnion<200, ResponseBodyData<'application/json', Source>>
  | ResponseUnion<any, ResponseBodyData<'application/json', Error>>;

export type PostSourcesSourceVerifyRequestResult = RequestResult<
  PostSourcesSourceVerifyRequest,
  PostSourcesSourceVerifyResponse
>;

export function postSourcesSourceVerify(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<
    PostSourcesSourceVerifyRequest,
    'pathParams' | 'contentType' | 'body',
    never
  >,
  config?: RequestHandlerExecutionConfig
): Promise<PostSourcesSourceVerifyRequestResult> {
  return requestHandler.execute(
    createRequest(postSourcesSourceVerifyEndpointSchema, payload),
    config
  );
}
