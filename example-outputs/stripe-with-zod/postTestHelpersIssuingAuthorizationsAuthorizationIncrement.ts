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

export const postTestHelpersIssuingAuthorizationsAuthorizationIncrementEndpointSchema =
  {
    path: '/v1/test_helpers/issuing/authorizations/{authorization}/increment',
    method: 'post',
    supportedSecuritySchemas: [],
    pathParamsZodSchema: z.object({
      authorization: z.string(),
    }),
    bodyByContentType: {
      'application/x-www-form-urlencoded': {
        zodSchema: z.object({
          expand: z.array(z.string()).optional(),
          increment_amount: z.number().int().safe().finite(),
          is_amount_controllable: z.boolean().optional(),
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

export type PostTestHelpersIssuingAuthorizationsAuthorizationIncrementRequest =
  RequestUnion<
    RequestBodyData<
      'application/x-www-form-urlencoded',
      {
        expand?: string[];
        increment_amount: number; // int
        is_amount_controllable?: boolean;
      }
    >,
    {
      authorization: string;
    }
  >;

export type PostTestHelpersIssuingAuthorizationsAuthorizationIncrementResponse =

    | ResponseUnion<
        200,
        ResponseBodyData<'application/json', Issuing_Authorization>
      >
    | ResponseUnion<any, ResponseBodyData<'application/json', Error>>;

export type PostTestHelpersIssuingAuthorizationsAuthorizationIncrementRequestResult =
  RequestResult<
    PostTestHelpersIssuingAuthorizationsAuthorizationIncrementRequest,
    PostTestHelpersIssuingAuthorizationsAuthorizationIncrementResponse
  >;

export function postTestHelpersIssuingAuthorizationsAuthorizationIncrement(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<
    PostTestHelpersIssuingAuthorizationsAuthorizationIncrementRequest,
    'pathParams' | 'contentType' | 'body',
    never
  >,
  config?: RequestHandlerExecutionConfig
): Promise<PostTestHelpersIssuingAuthorizationsAuthorizationIncrementRequestResult> {
  return requestHandler.execute(
    createRequest(
      postTestHelpersIssuingAuthorizationsAuthorizationIncrementEndpointSchema,
      payload
    ),
    config
  );
}
