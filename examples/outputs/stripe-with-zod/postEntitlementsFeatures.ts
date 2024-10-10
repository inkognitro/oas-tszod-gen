import {z_Entitlements_Feature, Entitlements_Feature} from './entitlements';
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

export const postEntitlementsFeaturesEndpointSchema = {
  path: '/v1/entitlements/features',
  method: 'post',
  supportedSecuritySchemas: [],
  bodyByContentType: {
    'application/x-www-form-urlencoded': {
      zodSchema: z.object({
        expand: z.array(z.string()).optional(),
        lookup_key: z.string(),
        metadata: z.record(z.string()).optional(),
        name: z.string(),
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

export type PostEntitlementsFeaturesRequest = RequestUnion<
  RequestBodyData<
    'application/x-www-form-urlencoded',
    {
      expand?: string[];
      lookup_key: string;
      metadata?: {
        [key: string]: string;
      };
      name: string;
    }
  >
>;

export type PostEntitlementsFeaturesResponse =
  | ResponseUnion<
      200,
      ResponseBodyData<'application/json', Entitlements_Feature>
    >
  | ResponseUnion<any, ResponseBodyData<'application/json', Error>>;

export type PostEntitlementsFeaturesRequestResult = RequestResult<
  PostEntitlementsFeaturesRequest,
  PostEntitlementsFeaturesResponse
>;

export function postEntitlementsFeatures(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<
    PostEntitlementsFeaturesRequest,
    'contentType' | 'body',
    never
  >,
  config?: RequestHandlerExecutionConfig
): Promise<PostEntitlementsFeaturesRequestResult> {
  return requestHandler.execute(
    createRequest(postEntitlementsFeaturesEndpointSchema, payload),
    config
  );
}
