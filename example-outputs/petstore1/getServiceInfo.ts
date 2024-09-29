import {
  $200ServiceInfoResponse,
  $500InternalServerErrorResponse,
} from '@example-outputs/petstore1';
import {
  Response,
  RequestResult,
  Request,
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
    '200': $200ServiceInfoResponse,
    '500': $500InternalServerErrorResponse,
  },
};

export type GetServiceInfoResponse =
  | $200ServiceInfoResponse<200>
  | $500InternalServerErrorResponse<500>;

export type GetServiceInfoRequestResult = RequestResult<
  Request,
  GetServiceInfoResponse
>;

export function getServiceInfo(
  requestHandler: SimpleRequestHandler,
  config?: RequestHandlerExecutionConfig
): Promise<GetServiceInfoRequestResult> {
  return requestHandler.execute(
    createRequest({endpointSchema: getServiceInfoEndpointSchema}),
    config
  );
}
