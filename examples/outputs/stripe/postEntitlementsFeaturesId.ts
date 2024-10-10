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

export const postEntitlementsFeaturesIdEndpointSchema = {
  path: '/v1/entitlements/features/{id}',
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
