import {
  bulkObjectIdZodSchema,
  $200OkBulkAuthorizationsResponse,
  authorizationsNotSupportedResponse,
  $400BadRequestResponse,
  $404NotFoundDrsObjectResponse,
  $413RequestTooLargeResponse,
  $500InternalServerErrorResponse,
  AuthorizationsNotSupportedResponse,
  BulkObjectId,
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
  | Response<200, $200OkBulkAuthorizationsResponse>
  | Response<204, AuthorizationsNotSupportedResponse>
  | Response<400, $400BadRequestResponse>
  | Response<404, $404NotFoundDrsObjectResponse>
  | Response<405, AuthorizationsNotSupportedResponse>
  | Response<413, $413RequestTooLargeResponse>
  | Response<500, $500InternalServerErrorResponse>;

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
