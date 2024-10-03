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

export const getApiV3TimeEndpointSchema = {
  path: '/api/v3/time',
  method: 'get',
  supportedSecuritySchemas: [],
  bodyByContentType: {},
  responseByStatus: {
    '200': {
      bodyByContentType: {
        'application/json': {
          zodSchema: z.object({
            serverTime: z.number().int().safe().finite(),
          }),
        },
      },
    },
  },
};

export type GetApiV3TimeRequest = Request;

export type GetApiV3TimeResponse = ResponseUnion<
  200,
  ResponseBodyData<
    'application/json',
    {
      serverTime: number; // int
    }
  >
>;

export type GetApiV3TimeRequestResult = RequestResult<
  GetApiV3TimeRequest,
  GetApiV3TimeResponse
>;

export function getApiV3Time(
  requestHandler: SimpleRequestHandler,
  config?: RequestHandlerExecutionConfig
): Promise<GetApiV3TimeRequestResult> {
  return requestHandler.execute(
    createRequest(getApiV3TimeEndpointSchema),
    config
  );
}
