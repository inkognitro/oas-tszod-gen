import {
  $200OkAuthorizationsResponse,
  authorizationsNotSupportedResponse,
  $400BadRequestResponse,
  $404NotFoundDrsObjectResponse,
  $500InternalServerErrorResponse,
  AuthorizationsNotSupportedResponse,
} from '@example-outputs/petstore1-with-zod';
import {z} from 'zod';
import {
  Response,
  RequestResult,
  Request,
  SimpleRequestHandler,
  createRequest,
  RequestHandlerExecutionConfig,
} from '@example-outputs/petstore1-with-zod/core';

export const optionsObjectEndpointSchema = {
  path: '/objects/{object_id}',
  method: 'options',
  supportedSecuritySchemas: [],
  pathParamsZodSchema: z.object({
    object_id: z.string(),
  }),
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
  | $200OkAuthorizationsResponse<200>
  | AuthorizationsNotSupportedResponse<204>
  | $400BadRequestResponse<400>
  | $404NotFoundDrsObjectResponse<404>
  | AuthorizationsNotSupportedResponse<405>
  | $500InternalServerErrorResponse<500>;

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
