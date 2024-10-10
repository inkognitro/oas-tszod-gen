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
import {Entitlements_Feature} from './entitlements';
import {Error} from './schemas';

export const postEntitlementsFeaturesEndpointSchema = {
  path: '/v1/entitlements/features',
  method: 'post',
  supportedSecuritySchemas: [],
  bodyByContentType: {
    'application/x-www-form-urlencoded': {},
  },
  responseByStatus: {
    '200': {
      bodyByContentType: {
        'application/json': {},
      },
    },
    default: {
      bodyByContentType: {
        'application/json': {},
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
