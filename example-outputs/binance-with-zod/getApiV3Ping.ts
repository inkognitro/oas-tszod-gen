import {z} from 'zod';
import {
  Request,
  ResponseBodyData,
  ResponseUnion,
  RequestResult,
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

export type GetApiV3PingRequest = Request;

export type GetApiV3PingResponse = ResponseUnion<
  200,
  ResponseBodyData<'application/json', {}>
>;

export type GetApiV3PingRequestResult = RequestResult<
  GetApiV3PingRequest,
  GetApiV3PingResponse
>;

export function getApiV3Ping(
  requestHandler: SimpleRequestHandler,
  config?: RequestHandlerExecutionConfig
): Promise<GetApiV3PingRequestResult> {
  return requestHandler.execute(
    createRequest(getApiV3PingEndpointSchema),
    config
  );
}
