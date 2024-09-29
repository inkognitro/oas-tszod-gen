import {
  bulkObjectIdZodSchema,
  $200OkBulkAuthorizationsResponseSchema,
  authorizationsNotSupportedResponseSchema,
  $400BadRequestResponseSchema,
  $404NotFoundDrsObjectResponseSchema,
  $413RequestTooLargeResponseSchema,
  $500InternalServerErrorResponseSchema,
  BulkObjectId,
  $200OkBulkAuthorizationsResponse,
  AuthorizationsNotSupportedResponse,
  $400BadRequestResponse,
  $404NotFoundDrsObjectResponse,
  $413RequestTooLargeResponse,
  $500InternalServerErrorResponse,
} from '@example-outputs/petstore1-with-zod';
import {
  Response,
  RequestResult,
  Request,
  SimpleRequestHandler,
  createRequest,
  RequestHandlerExecutionConfig,
} from '@example-outputs/petstore1-with-zod/core';

export const optionsBulkObjectEndpointSchema = {
  path: '/objects',
  method: 'options',
  supportedSecuritySchemas: [],
  bodyByContentType: {
    'application/json': {
      zodSchema: bulkObjectIdZodSchema,
    },
  },
  responseByStatus: {
    '200': $200OkBulkAuthorizationsResponseSchema,
    '204': authorizationsNotSupportedResponseSchema,
    '400': $400BadRequestResponseSchema,
    '404': $404NotFoundDrsObjectResponseSchema,
    '405': authorizationsNotSupportedResponseSchema,
    '413': $413RequestTooLargeResponseSchema,
    '500': $500InternalServerErrorResponseSchema,
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
