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

export const postIssuingAuthorizationsAuthorizationApproveEndpointSchema = {
  path: '/v1/issuing/authorizations/{authorization}/approve',
  method: 'post',
  supportedSecuritySchemas: [],
  pathParamsZodSchema: z.object({
    authorization: z.string(),
  }),
  bodyByContentType: {
    'application/x-www-form-urlencoded': {
      zodSchema: z.object({
        amount: z.number().int().safe().finite().optional(),
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

export type PostIssuingAuthorizationsAuthorizationApproveRequest = RequestUnion<
  RequestBodyData<
    'application/x-www-form-urlencoded',
    {
      amount?: number; // int
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

export type PostIssuingAuthorizationsAuthorizationApproveResponse =
  | ResponseUnion<
      200,
      ResponseBodyData<'application/json', Issuing_Authorization>
    >
  | ResponseUnion<any, ResponseBodyData<'application/json', Error>>;

export type PostIssuingAuthorizationsAuthorizationApproveRequestResult =
  RequestResult<
    PostIssuingAuthorizationsAuthorizationApproveRequest,
    PostIssuingAuthorizationsAuthorizationApproveResponse
  >;

export function postIssuingAuthorizationsAuthorizationApprove(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<
    PostIssuingAuthorizationsAuthorizationApproveRequest,
    'pathParams' | 'contentType' | 'body',
    never
  >,
  config?: RequestHandlerExecutionConfig
): Promise<PostIssuingAuthorizationsAuthorizationApproveRequestResult> {
  return requestHandler.execute(
    createRequest(
      postIssuingAuthorizationsAuthorizationApproveEndpointSchema,
      payload
    ),
    config
  );
}
