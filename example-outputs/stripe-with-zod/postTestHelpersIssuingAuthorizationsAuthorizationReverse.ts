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

export const postTestHelpersIssuingAuthorizationsAuthorizationReverseEndpointSchema =
  {
    path: '/v1/test_helpers/issuing/authorizations/{authorization}/reverse',
    method: 'post',
    supportedSecuritySchemas: [],
    pathParamsZodSchema: z.object({
      authorization: z.string(),
    }),
    bodyByContentType: {
      'application/x-www-form-urlencoded': {
        zodSchema: z.object({
          expand: z.array(z.string()).optional(),
          reverse_amount: z.number().int().safe().finite().optional(),
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

export type PostTestHelpersIssuingAuthorizationsAuthorizationReverseRequest =
  RequestUnion<
    RequestBodyData<
      'application/x-www-form-urlencoded',
      {
        expand?: string[];
        reverse_amount?: number; // int
      }
    >,
    {
      authorization: string;
    }
  >;

export type PostTestHelpersIssuingAuthorizationsAuthorizationReverseResponse =
  | ResponseUnion<
      200,
      ResponseBodyData<'application/json', Issuing_Authorization>
    >
  | ResponseUnion<any, ResponseBodyData<'application/json', Error>>;

export type PostTestHelpersIssuingAuthorizationsAuthorizationReverseRequestResult =
  RequestResult<
    PostTestHelpersIssuingAuthorizationsAuthorizationReverseRequest,
    PostTestHelpersIssuingAuthorizationsAuthorizationReverseResponse
  >;

export function postTestHelpersIssuingAuthorizationsAuthorizationReverse(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<
    PostTestHelpersIssuingAuthorizationsAuthorizationReverseRequest,
    'pathParams' | 'contentType' | 'body',
    never
  >,
  config?: RequestHandlerExecutionConfig
): Promise<PostTestHelpersIssuingAuthorizationsAuthorizationReverseRequestResult> {
  return requestHandler.execute(
    createRequest(
      postTestHelpersIssuingAuthorizationsAuthorizationReverseEndpointSchema,
      payload
    ),
    config
  );
}
