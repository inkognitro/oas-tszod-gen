import {
  z_Issuing_Authorization,
  z_Error,
  Issuing_Authorization,
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

export const postIssuingAuthorizationsAuthorizationEndpointSchema = {
  path: '/v1/issuing/authorizations/{authorization}',
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

export type PostIssuingAuthorizationsAuthorizationRequest = RequestUnion<
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

export type PostIssuingAuthorizationsAuthorizationResponse =
  | ResponseUnion<
      200,
      ResponseBodyData<'application/json', Issuing_Authorization>
    >
  | ResponseUnion<any, ResponseBodyData<'application/json', Error>>;

export type PostIssuingAuthorizationsAuthorizationRequestResult = RequestResult<
  PostIssuingAuthorizationsAuthorizationRequest,
  PostIssuingAuthorizationsAuthorizationResponse
>;

export function postIssuingAuthorizationsAuthorization(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<
    PostIssuingAuthorizationsAuthorizationRequest,
    'pathParams' | 'contentType' | 'body',
    never
  >,
  config?: RequestHandlerExecutionConfig
): Promise<PostIssuingAuthorizationsAuthorizationRequestResult> {
  return requestHandler.execute(
    createRequest(
      postIssuingAuthorizationsAuthorizationEndpointSchema,
      payload
    ),
    config
  );
}
