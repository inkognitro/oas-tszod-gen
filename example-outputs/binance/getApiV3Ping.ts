import {
  ResponseBodyData,
  ResponseUnion,
  RequestResult,
  Request,
  SimpleRequestHandler,
  createRequest,
  RequestHandlerExecutionConfig,
} from '@example-outputs/binance/core';

export const getApiV3PingEndpointSchema = {
  path: '/api/v3/ping',
  method: 'get',
  supportedSecuritySchemas: [],
  bodyByContentType: {},
  responseByStatus: {
    '200': {
      bodyByContentType: {
        'application/json': {},
      },
    },
  },
};

export type GetApiV3PingResponse = ResponseUnion<
  200,
  ResponseBodyData<'application/json', {}>
>;

export type GetApiV3PingRequestResult = RequestResult<
  Request,
  GetApiV3PingResponse
>;

export function getApiV3Ping(
  requestHandler: SimpleRequestHandler,
  config?: RequestHandlerExecutionConfig
): Promise<GetApiV3PingRequestResult> {
  return requestHandler.execute(
    createRequest({endpointSchema: getApiV3PingEndpointSchema}),
    config
  );
}
