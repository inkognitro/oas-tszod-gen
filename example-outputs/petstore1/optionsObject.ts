import {
  $200OkAuthorizationsResponse,
  authorizationsNotSupportedResponse,
  $400BadRequestResponse,
  $404NotFoundDrsObjectResponse,
  $500InternalServerErrorResponse,
  AuthorizationsNotSupportedResponse,
} from '@example-outputs/petstore1';
import {
  Response,
  RequestResult,
  Request,
  SimpleRequestHandler,
  createRequest,
  RequestHandlerExecutionConfig,
} from '@example-outputs/petstore1/core';

export const optionsObjectEndpointSchema = {
  path: '/objects/{object_id}',
  method: 'options',
  supportedSecuritySchemas: [],
  bodyByContentType: {},
  responseByStatus: {
    '200': $200OkAuthorizationsResponse,
    '204': authorizationsNotSupportedResponse,
    '400': $400BadRequestResponse,
    '404': $404NotFoundDrsObjectResponse,
    '405': authorizationsNotSupportedResponse,
    '500': $500InternalServerErrorResponse,
  },
};

export type OptionsObjectPayload = {
  pathParams: {
    object_id: string;
  };
};

export type OptionsObjectResponse =
  | Response<200, $200OkAuthorizationsResponse>
  | Response<204, AuthorizationsNotSupportedResponse>
  | Response<400, $400BadRequestResponse>
  | Response<404, $404NotFoundDrsObjectResponse>
  | Response<405, AuthorizationsNotSupportedResponse>
  | Response<500, $500InternalServerErrorResponse>;

export type OptionsObjectRequestResult = RequestResult<
  Request,
  OptionsObjectResponse
>;

export function optionsObject(
  requestHandler: SimpleRequestHandler,
  payload: OptionsObjectPayload,
  config?: RequestHandlerExecutionConfig
): Promise<OptionsObjectRequestResult> {
  return requestHandler.execute(
    createRequest({...payload, endpointSchema: optionsObjectEndpointSchema}),
    config
  );
}
