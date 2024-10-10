import {z_Topup, z_Error, Topup, Error} from './schemas';
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

export const postTopupsTopupEndpointSchema = {
  path: '/v1/topups/{topup}',
  method: 'post',
  supportedSecuritySchemas: [],
  pathParamsZodSchema: z.object({
    topup: z.string(),
  }),
  bodyByContentType: {
    'application/x-www-form-urlencoded': {
      zodSchema: z.object({
        description: z.string().optional(),
        expand: z.array(z.string()).optional(),
        metadata: z.union([z.record(z.string()), z.enum([''])]).optional(),
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

export type PostTopupsTopupRequest = RequestUnion<
  RequestBodyData<
    'application/x-www-form-urlencoded',
    {
      description?: string;
      expand?: string[];
      metadata?:
        | {
            [key: string]: string;
          }
        | '';
    }
  >,
  {
    topup: string;
  }
>;

export type PostTopupsTopupResponse =
  | ResponseUnion<200, ResponseBodyData<'application/json', Topup>>
  | ResponseUnion<any, ResponseBodyData<'application/json', Error>>;

export type PostTopupsTopupRequestResult = RequestResult<
  PostTopupsTopupRequest,
  PostTopupsTopupResponse
>;

export function postTopupsTopup(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<
    PostTopupsTopupRequest,
    'pathParams' | 'contentType' | 'body',
    never
  >,
  config?: RequestHandlerExecutionConfig
): Promise<PostTopupsTopupRequestResult> {
  return requestHandler.execute(
    createRequest(postTopupsTopupEndpointSchema, payload),
    config
  );
}
