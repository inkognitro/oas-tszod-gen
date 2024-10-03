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

export const getSapiV1SystemStatusEndpointSchema = {
  path: '/sapi/v1/system/status',
  method: 'get',
  supportedSecuritySchemas: [],
  bodyByContentType: {},
  responseByStatus: {
    '200': {
      bodyByContentType: {
        'application/json': {
          zodSchema: z.object({
            status: z.number().int().safe().finite(),
            msg: z.string(),
          }),
        },
      },
    },
  },
};

export type GetSapiV1SystemStatusRequest = Request;

export type GetSapiV1SystemStatusResponse = ResponseUnion<
  200,
  ResponseBodyData<
    'application/json',
    {
      status: number; // int
      msg: string;
    }
  >
>;

export type GetSapiV1SystemStatusRequestResult = RequestResult<
  GetSapiV1SystemStatusRequest,
  GetSapiV1SystemStatusResponse
>;

export function getSapiV1SystemStatus(
  requestHandler: SimpleRequestHandler,
  config?: RequestHandlerExecutionConfig
): Promise<GetSapiV1SystemStatusRequestResult> {
  return requestHandler.execute(
    createRequest(getSapiV1SystemStatusEndpointSchema),
    config
  );
}
