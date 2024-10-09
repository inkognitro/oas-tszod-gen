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
} from '@example-outputs/stripe/core';
import {Application_fee, Error} from '@example-outputs/stripe';

export const getApplicationFeesIdEndpointSchema = {
  path: '/v1/application_fees/{id}',
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

export type GetApplicationFeesIdRequest = RequestUnion<
  RequestBodyData<'application/x-www-form-urlencoded', {}>,
  {
    id: string;
  },
  {
    expand?: string[];
  }
>;

export type GetApplicationFeesIdResponse =
  | ResponseUnion<200, ResponseBodyData<'application/json', Application_fee>>
  | ResponseUnion<any, ResponseBodyData<'application/json', Error>>;

export type GetApplicationFeesIdRequestResult = RequestResult<
  GetApplicationFeesIdRequest,
  GetApplicationFeesIdResponse
>;

export function getApplicationFeesId(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<
    GetApplicationFeesIdRequest,
    'pathParams' | 'contentType' | 'body',
    'queryParams'
  >,
  config?: RequestHandlerExecutionConfig
): Promise<GetApplicationFeesIdRequestResult> {
  return requestHandler.execute(
    createRequest(getApplicationFeesIdEndpointSchema, payload),
    config
  );
}
