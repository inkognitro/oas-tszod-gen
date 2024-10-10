import {z_Dispute, z_Error, Dispute, Error} from './schemas';
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

export const postDisputesDisputeCloseEndpointSchema = {
  path: '/v1/disputes/{dispute}/close',
  method: 'post',
  supportedSecuritySchemas: [],
  pathParamsZodSchema: z.object({
    dispute: z.string(),
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
          zodSchema: z_Dispute,
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

export type PostDisputesDisputeCloseRequest = RequestUnion<
  RequestBodyData<
    'application/x-www-form-urlencoded',
    {
      expand?: string[];
    }
  >,
  {
    dispute: string;
  }
>;

export type PostDisputesDisputeCloseResponse =
  | ResponseUnion<200, ResponseBodyData<'application/json', Dispute>>
  | ResponseUnion<any, ResponseBodyData<'application/json', Error>>;

export type PostDisputesDisputeCloseRequestResult = RequestResult<
  PostDisputesDisputeCloseRequest,
  PostDisputesDisputeCloseResponse
>;

export function postDisputesDisputeClose(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<
    PostDisputesDisputeCloseRequest,
    'pathParams' | 'contentType' | 'body',
    never
  >,
  config?: RequestHandlerExecutionConfig
): Promise<PostDisputesDisputeCloseRequestResult> {
  return requestHandler.execute(
    createRequest(postDisputesDisputeCloseEndpointSchema, payload),
    config
  );
}
