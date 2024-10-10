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
import {Entitlements_Active_entitlement} from './entitlements';
import {Error} from './schemas';

export const getEntitlementsActiveEntitlementsIdEndpointSchema = {
  path: '/v1/entitlements/active_entitlements/{id}',
  method: 'get',
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

export type GetEntitlementsActiveEntitlementsIdRequest = RequestUnion<
  RequestBodyData<'application/x-www-form-urlencoded', {}>,
  {
    id: string;
  },
  {
    expand?: string[];
  }
>;

export type GetEntitlementsActiveEntitlementsIdResponse =
  | ResponseUnion<
      200,
      ResponseBodyData<'application/json', Entitlements_Active_entitlement>
    >
  | ResponseUnion<any, ResponseBodyData<'application/json', Error>>;

export type GetEntitlementsActiveEntitlementsIdRequestResult = RequestResult<
  GetEntitlementsActiveEntitlementsIdRequest,
  GetEntitlementsActiveEntitlementsIdResponse
>;

export function getEntitlementsActiveEntitlementsId(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<
    GetEntitlementsActiveEntitlementsIdRequest,
    'pathParams' | 'contentType' | 'body',
    'queryParams'
  >,
  config?: RequestHandlerExecutionConfig
): Promise<GetEntitlementsActiveEntitlementsIdRequestResult> {
  return requestHandler.execute(
    createRequest(getEntitlementsActiveEntitlementsIdEndpointSchema, payload),
    config
  );
}
