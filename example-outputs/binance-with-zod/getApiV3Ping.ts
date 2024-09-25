import {z} from 'zod';
import {
  ResponseBodyData,
  ResponseData,
  Response,
  RequestResult,
  Request,
  SimpleRequestHandler,
  createRequest,
  RequestHandlerExecutionConfig,
} from '@example-outputs/binance-with-zod/core';

export const getApiV3PingEndpointSchema = {
  path: '/api/v3/ping',
  method: 'get',
  supportedSecuritySchemas: [],
  bodyByContentType: {},
  responseByStatus: {
    '200': {
      bodyByContentType: {
        'application/json': {
          zodSchema: z.object({}),
        },
      },
    },
  },
};

export type GetApiV3PingResponse = Response<
  200,
  ResponseData<ResponseBodyData<'application/json', {}>>
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
