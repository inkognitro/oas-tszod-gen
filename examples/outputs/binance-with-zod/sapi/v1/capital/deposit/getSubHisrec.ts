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

export const getSubHisrecEndpointSchema = {
  path: '/sapi/v1/capital/deposit/subHisrec',
  method: 'get',
  supportedSecuritySchemas: [{name: 'ApiKeyAuth', scopes: []}],
  queryParamsZodSchema: z.object({
    email: z.string(),
    coin: z.string().optional(),
    status: z.number().int().safe().finite().optional(),
    startTime: z.number().int().safe().finite().optional(),
    endTime: z.number().int().safe().finite().optional(),
    limit: z.number().int().safe().finite().optional(),
    offset: z.number().int().safe().finite().optional(),
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
              amount: z.string(),
              coin: z.string(),
              network: z.string(),
              status: z.number().int().safe().finite(),
              address: z.string(),
              addressTag: z.string(),
              txId: z.string(),
              insertTime: z.number().int().safe().finite(),
              transferType: z.number().int().safe().finite(),
              confirmTimes: z.string(),
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

export type GetSubHisrecRequest = RequestUnion<
  any,
  any,
  {
    email: string;
    coin?: string;
    status?: number; // int
    startTime?: number; // int
    endTime?: number; // int
    limit?: number; // int
    offset?: number; // int
    recvWindow?: number; // int
    timestamp: number; // int
    signature: string;
  }
>;

export type GetSubHisrecResponse =
  | ResponseUnion<
      200,
      ResponseBodyData<
        'application/json',
        {
          amount: string;
          coin: string;
          network: string;
          status: number; // int
          address: string;
          addressTag: string;
          txId: string;
          insertTime: number; // int
          transferType: number; // int
          confirmTimes: string;
        }[]
      >
    >
  | ResponseUnion<400, ResponseBodyData<'application/json', Error>>
  | ResponseUnion<401, ResponseBodyData<'application/json', Error>>;

export type GetSubHisrecRequestResult = RequestResult<
  GetSubHisrecRequest,
  GetSubHisrecResponse
>;

export function getSubHisrec(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<GetSubHisrecRequest, 'queryParams', never>,
  config?: RequestHandlerExecutionConfig
): Promise<GetSubHisrecRequestResult> {
  return requestHandler.execute(
    createRequest(getSubHisrecEndpointSchema, payload),
    config
  );
}
