import {
  $200OkBulkAuthorizationsResponse,
  authorizationsNotSupportedResponse,
  $400BadRequestResponse,
  $404NotFoundDrsObjectResponse,
  $413RequestTooLargeResponse,
  $500InternalServerErrorResponse,
  AuthorizationsNotSupportedResponse,
  BulkObjectId,
} from '@example-outputs/petstore1';
import {
  Response,
  RequestResult,
  Request,
  SimpleRequestHandler,
  createRequest,
  RequestHandlerExecutionConfig,
} from '@example-outputs/petstore1/core';

export const optionsBulkObjectEndpointSchema = {
  path: '/objects',
  method: 'options',
  supportedSecuritySchemas: [],
  bodyByContentType: {
    'application/json': {},
  },
  responseByStatus: {
    '200': $200OkBulkAuthorizationsResponse,
    '204': authorizationsNotSupportedResponse,
    '400': $400BadRequestResponse,
    '404': $404NotFoundDrsObjectResponse,
    '405': authorizationsNotSupportedResponse,
    '413': $413RequestTooLargeResponse,
    '500': $500InternalServerErrorResponse,
  },
};

export type OptionsBulkObjectRequestBody = {
  contentType: 'application/json';
  body: BulkObjectId;
};

export type OptionsBulkObjectPayload = OptionsBulkObjectRequestBody;

export type OptionsBulkObjectResponse =
  | $200OkBulkAuthorizationsResponse<200>
  | AuthorizationsNotSupportedResponse<204>
  | $400BadRequestResponse<400>
  | $404NotFoundDrsObjectResponse<404>
  | AuthorizationsNotSupportedResponse<405>
  | $413RequestTooLargeResponse<413>
  | $500InternalServerErrorResponse<500>;

export type OptionsBulkObjectRequestResult = RequestResult<
  Request,
  OptionsBulkObjectResponse
>;

export function optionsBulkObject(
  requestHandler: SimpleRequestHandler,
  payload: OptionsBulkObjectPayload,
  config?: RequestHandlerExecutionConfig
): Promise<OptionsBulkObjectRequestResult> {
  return requestHandler.execute(
    createRequest({
      ...payload,
      endpointSchema: optionsBulkObjectEndpointSchema,
    }),
    config
  );
}
