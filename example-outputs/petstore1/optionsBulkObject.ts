import {BulkObjectId} from '@example-outputs/petstore1';
import {
  RequestUnion,
  RequestBodyData,
  Response,
  RequestResult,
  SimpleRequestHandler,
  createRequest,
  RequestHandlerExecutionConfig,
  RequestPayload,
} from '@example-outputs/petstore1/core';

export const optionsBulkObjectEndpointSchema = {
  path: '/objects',
  method: 'options',
  supportedSecuritySchemas: [],
  bodyByContentType: {
    'application/json': {},
  },
  responseByStatus: {
    '200': {
      bodyByContentType: {},
    },
    '204': {
      bodyByContentType: {},
    },
    '400': {
      bodyByContentType: {},
    },
    '404': {
      bodyByContentType: {},
    },
    '405': {
      bodyByContentType: {},
    },
    '413': {
      bodyByContentType: {},
    },
    '500': {
      bodyByContentType: {},
    },
  },
};

export type OptionsBulkObjectRequest = RequestUnion<
  RequestBodyData<'application/json', BulkObjectId>
>;

export type OptionsBulkObjectResponse =
  | Response<200>
  | Response<204>
  | Response<400>
  | Response<404>
  | Response<405>
  | Response<413>
  | Response<500>;

export type OptionsBulkObjectRequestResult = RequestResult<
  OptionsBulkObjectRequest,
  OptionsBulkObjectResponse
>;

export function optionsBulkObject(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<OptionsBulkObjectRequest, 'contentType' | 'body'>,
  config?: RequestHandlerExecutionConfig
): Promise<OptionsBulkObjectRequestResult> {
  return requestHandler.execute(
    createRequest(optionsBulkObjectEndpointSchema, payload),
    config
  );
}
