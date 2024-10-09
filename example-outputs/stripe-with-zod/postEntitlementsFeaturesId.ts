import {
  z_Entitlements_Feature,
  z_Error,
  Entitlements_Feature,
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

export const postEntitlementsFeaturesIdEndpointSchema = {
  path: '/v1/entitlements/features/{id}',
  method: 'post',
  supportedSecuritySchemas: [],
  pathParamsZodSchema: z.object({
    id: z.string(),
  }),
  bodyByContentType: {
    'application/x-www-form-urlencoded': {
      zodSchema: z.object({
        active: z.boolean().optional(),
        expand: z.array(z.string()).optional(),
        metadata: z.union([z.record(z.string()), z.enum([''])]).optional(),
        name: z.string().optional(),
      }),
    },
  },
  responseByStatus: {
    '200': {
      bodyByContentType: {
        'application/json': {
          zodSchema: z_Entitlements_Feature,
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

export type PostEntitlementsFeaturesIdRequest = RequestUnion<
  RequestBodyData<
    'application/x-www-form-urlencoded',
    {
      active?: boolean;
      expand?: string[];
      metadata?:
        | {
            [key: string]: string;
          }
        | '';
      name?: string;
    }
  >,
  {
    id: string;
  }
>;

export type PostEntitlementsFeaturesIdResponse =
  | ResponseUnion<
      200,
      ResponseBodyData<'application/json', Entitlements_Feature>
    >
  | ResponseUnion<any, ResponseBodyData<'application/json', Error>>;

export type PostEntitlementsFeaturesIdRequestResult = RequestResult<
  PostEntitlementsFeaturesIdRequest,
  PostEntitlementsFeaturesIdResponse
>;

export function postEntitlementsFeaturesId(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<
    PostEntitlementsFeaturesIdRequest,
    'pathParams' | 'contentType' | 'body',
    never
  >,
  config?: RequestHandlerExecutionConfig
): Promise<PostEntitlementsFeaturesIdRequestResult> {
  return requestHandler.execute(
    createRequest(postEntitlementsFeaturesIdEndpointSchema, payload),
    config
  );
}
