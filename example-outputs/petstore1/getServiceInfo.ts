import {
  Request,
  Response,
  RequestResult,
  SimpleRequestHandler,
  createRequest,
  RequestHandlerExecutionConfig,
} from '@example-outputs/petstore1/core';

export const getServiceInfoEndpointSchema = {
  path: '/service-info',
  method: 'get',
  supportedSecuritySchemas: [],
  bodyByContentType: {},
  responseByStatus: {
    '200': {
      bodyByContentType: {},
    },
    '500': {
      bodyByContentType: {},
    },
  },
};

export type GetServiceInfoRequest = Request;

export type GetServiceInfoResponse = Response<200> | Response<500>;

export type GetServiceInfoRequestResult = RequestResult<
  GetServiceInfoRequest,
  GetServiceInfoResponse
>;

export function getServiceInfo(
  requestHandler: SimpleRequestHandler,
  config?: RequestHandlerExecutionConfig
): Promise<GetServiceInfoRequestResult> {
  return requestHandler.execute(
    createRequest(getServiceInfoEndpointSchema),
    config
  );
}
