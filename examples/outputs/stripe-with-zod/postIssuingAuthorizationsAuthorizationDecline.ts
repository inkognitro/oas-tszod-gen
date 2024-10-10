import {z_Issuing_Authorization, Issuing_Authorization} from './issuing';
import {z_Error, Error} from './schemas';
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

export const postIssuingAuthorizationsAuthorizationDeclineEndpointSchema = {
  path: '/v1/issuing/authorizations/{authorization}/decline',
  method: 'post',
  supportedSecuritySchemas: [],
  pathParamsZodSchema: z.object({
    authorization: z.string(),
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
          zodSchema: z_Issuing_Authorization,
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

export type PostIssuingAuthorizationsAuthorizationDeclineRequest = RequestUnion<
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
    authorization: string;
  }
>;

export type PostIssuingAuthorizationsAuthorizationDeclineResponse =
  | ResponseUnion<
      200,
      ResponseBodyData<'application/json', Issuing_Authorization>
    >
  | ResponseUnion<any, ResponseBodyData<'application/json', Error>>;

export type PostIssuingAuthorizationsAuthorizationDeclineRequestResult =
  RequestResult<
    PostIssuingAuthorizationsAuthorizationDeclineRequest,
    PostIssuingAuthorizationsAuthorizationDeclineResponse
  >;

export function postIssuingAuthorizationsAuthorizationDecline(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<
    PostIssuingAuthorizationsAuthorizationDeclineRequest,
    'pathParams' | 'contentType' | 'body',
    never
  >,
  config?: RequestHandlerExecutionConfig
): Promise<PostIssuingAuthorizationsAuthorizationDeclineRequestResult> {
  return requestHandler.execute(
    createRequest(
      postIssuingAuthorizationsAuthorizationDeclineEndpointSchema,
      payload
    ),
    config
  );
}
