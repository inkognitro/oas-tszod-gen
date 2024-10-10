import {z} from 'zod';
import {
  Request,
  ResponseBodyData,
  ResponseUnion,
  RequestResult,
  SimpleRequestHandler,
  createRequest,
  RequestHandlerExecutionConfig,
} from '../../core';

export const getTimeEndpointSchema = {
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

export type GetTimeRequest = Request;

export type GetTimeResponse = ResponseUnion<
  200,
  ResponseBodyData<
    'application/json',
    {
      serverTime: number; // int
    }
  >
>;

export type GetTimeRequestResult = RequestResult<
  GetTimeRequest,
  GetTimeResponse
>;

export function getTime(
  requestHandler: SimpleRequestHandler,
  config?: RequestHandlerExecutionConfig
): Promise<GetTimeRequestResult> {
  return requestHandler.execute(createRequest(getTimeEndpointSchema), config);
}
