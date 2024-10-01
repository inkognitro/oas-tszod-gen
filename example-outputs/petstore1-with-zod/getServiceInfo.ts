import {
  $200ServiceInfoResponseSchema,
  $500InternalServerErrorResponseSchema,
  $200ServiceInfoResponse,
  $500InternalServerErrorResponse,
} from '@example-outputs/petstore1-with-zod';
import {
  RequestResult,
  Request,
  SimpleRequestHandler,
  createRequest,
  RequestHandlerExecutionConfig,
} from '@example-outputs/petstore1-with-zod/core';

export const getServiceInfoEndpointSchema = {
  path: '/service-info',
  method: 'get',
  supportedSecuritySchemas: [],
  bodyByContentType: {},
  responseByStatus: {
    '200': $200ServiceInfoResponseSchema,
    '500': $500InternalServerErrorResponseSchema,
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
