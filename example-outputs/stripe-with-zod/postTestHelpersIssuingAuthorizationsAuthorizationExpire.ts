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

export const postTestHelpersIssuingAuthorizationsAuthorizationExpireEndpointSchema =
  {
    path: '/v1/test_helpers/issuing/authorizations/{authorization}/expire',
    method: 'post',
    supportedSecuritySchemas: [],
    pathParamsZodSchema: z.object({
      authorization: z.string(),
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

export type PostTestHelpersIssuingAuthorizationsAuthorizationExpireRequest =
  RequestUnion<
    RequestBodyData<
      'application/x-www-form-urlencoded',
      {
        expand?: string[];
      }
    >,
    {
      authorization: string;
    }
  >;

export type PostTestHelpersIssuingAuthorizationsAuthorizationExpireResponse =
  | ResponseUnion<
      200,
      ResponseBodyData<'application/json', Issuing_Authorization>
    >
  | ResponseUnion<any, ResponseBodyData<'application/json', Error>>;

export type PostTestHelpersIssuingAuthorizationsAuthorizationExpireRequestResult =
  RequestResult<
    PostTestHelpersIssuingAuthorizationsAuthorizationExpireRequest,
    PostTestHelpersIssuingAuthorizationsAuthorizationExpireResponse
  >;

export function postTestHelpersIssuingAuthorizationsAuthorizationExpire(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<
    PostTestHelpersIssuingAuthorizationsAuthorizationExpireRequest,
    'pathParams' | 'contentType' | 'body',
    never
  >,
  config?: RequestHandlerExecutionConfig
): Promise<PostTestHelpersIssuingAuthorizationsAuthorizationExpireRequestResult> {
  return requestHandler.execute(
    createRequest(
      postTestHelpersIssuingAuthorizationsAuthorizationExpireEndpointSchema,
      payload
    ),
    config
  );
}
