import {
  ResponseBodyData,
  ResponseData,
  Response,
  RequestResult,
  Request,
  SimpleRequestHandler,
  createRequest,
  RequestHandlerExecutionConfig,
} from '@example-outputs/binance/core';

export const getApiV3TimeEndpointSchema = {
  path: '/api/v3/time',
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

export type GetApiV3TimeResponse = Response<
  200,
  ResponseData<
    ResponseBodyData<
      'application/json',
      {
        serverTime: number; // int
      }
    >
  >
>;

export type GetApiV3TimeRequestResult = RequestResult<
  Request,
  GetApiV3TimeResponse
>;

export function getApiV3Time(
  requestHandler: SimpleRequestHandler,
  config?: RequestHandlerExecutionConfig
): Promise<GetApiV3TimeRequestResult> {
  return requestHandler.execute(
    createRequest({endpointSchema: getApiV3TimeEndpointSchema}),
    config
  );
}
