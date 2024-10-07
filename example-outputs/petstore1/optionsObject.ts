import {
  RequestUnion,
  Response,
  RequestResult,
  SimpleRequestHandler,
  createRequest,
  RequestHandlerExecutionConfig,
  RequestPayload,
} from '@example-outputs/petstore1/core';

export const optionsObjectEndpointSchema = {
  path: '/objects/{object_id}',
  method: 'options',
  supportedSecuritySchemas: [],
  bodyByContentType: {},
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
    '500': {
      bodyByContentType: {},
    },
  },
};

export type OptionsObjectRequest = RequestUnion<
  any,
  {
    object_id: string;
  }
>;

export type OptionsObjectResponse =
  | Response<200>
  | Response<204>
  | Response<400>
  | Response<404>
  | Response<405>
  | Response<500>;

export type OptionsObjectRequestResult = RequestResult<
  OptionsObjectRequest,
  OptionsObjectResponse
>;

export function optionsObject(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<OptionsObjectRequest, 'pathParams', never>,
  config?: RequestHandlerExecutionConfig
): Promise<OptionsObjectRequestResult> {
  return requestHandler.execute(
    createRequest(optionsObjectEndpointSchema, payload),
    config
  );
}
