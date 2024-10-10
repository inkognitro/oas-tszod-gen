import {z_Error, Error} from '../../../../';
import {z} from 'zod';
import {
  RequestUnion,
  ResponseBodyData,
  ResponseUnion,
  RequestResult,
  SimpleRequestHandler,
  createRequest,
  RequestHandlerExecutionConfig,
  RequestPayload,
} from '../../../../core';

export const getScheduleEndpointSchema = {
  path: '/sapi/v1/spot/delist-schedule',
  method: 'get',
  supportedSecuritySchemas: [{name: 'ApiKeyAuth', scopes: []}],
  queryParamsZodSchema: z.object({
    recvWindow: z.number().int().safe().finite().optional(),
    timestamp: z.number().int().safe().finite(),
    signature: z.string(),
  }),
  bodyByContentType: {},
  responseByStatus: {
    '200': {
      bodyByContentType: {
        'application/json': {
          zodSchema: z.array(
            z.object({
              delistTime: z.number().int().safe().finite(),
              symbol: z.array(z.string()),
            })
          ),
        },
      },
    },
    '400': {
      bodyByContentType: {
        'application/json': {
          zodSchema: z_Error,
        },
      },
    },
    '401': {
      bodyByContentType: {
        'application/json': {
          zodSchema: z_Error,
        },
      },
    },
  },
};

export type GetScheduleRequest = RequestUnion<
  any,
  any,
  {
    recvWindow?: number; // int
    timestamp: number; // int
    signature: string;
  }
>;

export type GetScheduleResponse =
  | ResponseUnion<
      200,
      ResponseBodyData<
        'application/json',
        {
          delistTime: number; // int
          symbol: string[];
        }[]
      >
    >
  | ResponseUnion<400, ResponseBodyData<'application/json', Error>>
  | ResponseUnion<401, ResponseBodyData<'application/json', Error>>;

export type GetScheduleRequestResult = RequestResult<
  GetScheduleRequest,
  GetScheduleResponse
>;

export function getSchedule(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<GetScheduleRequest, 'queryParams', never>,
  config?: RequestHandlerExecutionConfig
): Promise<GetScheduleRequestResult> {
  return requestHandler.execute(
    createRequest(getScheduleEndpointSchema, payload),
    config
  );
}
