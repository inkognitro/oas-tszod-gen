import {
  $200ServiceInfoResponse,
  $500InternalServerErrorResponse,
} from '@example-outputs/petstore1-with-zod';
import {
  Response,
  RequestResult,
  Request,
  RequestHandler,
  createRequest,
  RequestHandlerExecutionConfig,
} from '@example-outputs/petstore1-with-zod/core';

export const getServiceInfoEndpointSchema = {
  path: '/service-info',
  method: 'get',
  supportedSecuritySchemas: [],
  bodyByContentType: {},
  responseByStatus: {
    '200': $200ServiceInfoResponse,
    '500': $500InternalServerErrorResponse,
  },
};

export type GetServiceInfoResponse =
  | Response<200, $200ServiceInfoResponse>
  | Response<500, $500InternalServerErrorResponse>;

export type GetServiceInfoRequestResult = RequestResult<
  Request,
  GetServiceInfoResponse
>;

export function getServiceInfo(
  requestHandler: RequestHandler,
  config?: RequestHandlerExecutionConfig
): Promise<GetServiceInfoRequestResult> {
  return requestHandler.execute(
    createRequest({endpointSchema: getServiceInfoEndpointSchema}),
    config
  );
}
