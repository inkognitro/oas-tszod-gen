import {z_Error, Error} from '../../../../../../';
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
} from '../../../../../../core';

export const getRewardsRecordEndpointSchema = {
  path: '/sapi/v1/simple-earn/locked/history/rewardsRecord',
  method: 'get',
  supportedSecuritySchemas: [{name: 'ApiKeyAuth', scopes: []}],
  queryParamsZodSchema: z.object({
    positionId: z.string().optional(),
    asset: z.string().optional(),
    startTime: z.number().int().safe().finite().optional(),
    endTime: z.number().int().safe().finite().optional(),
    size: z.number().int().safe().finite().optional(),
    recvWindow: z.number().int().safe().finite().optional(),
    timestamp: z.number().int().safe().finite(),
    signature: z.string(),
  }),
  bodyByContentType: {},
  responseByStatus: {
    '200': {
      bodyByContentType: {
        'application/json': {
          zodSchema: z.object({
            rows: z.array(
              z.object({
                positionId: z.string(),
                time: z.number().int().safe().finite(),
                asset: z.string(),
                lockPeriod: z.string(),
                amount: z.string(),
              })
            ),
            total: z.number().int().safe().finite(),
          }),
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

export type GetRewardsRecordRequest = RequestUnion<
  any,
  any,
  {
    positionId?: string;
    asset?: string;
    startTime?: number; // int
    endTime?: number; // int
    size?: number; // int
    recvWindow?: number; // int
    timestamp: number; // int
    signature: string;
  }
>;

export type GetRewardsRecordResponse =
  | ResponseUnion<
      200,
      ResponseBodyData<
        'application/json',
        {
          rows: {
            positionId: string;
            time: number; // int
            asset: string;
            lockPeriod: string;
            amount: string;
          }[];
          total: number; // int
        }
      >
    >
  | ResponseUnion<400, ResponseBodyData<'application/json', Error>>
  | ResponseUnion<401, ResponseBodyData<'application/json', Error>>;

export type GetRewardsRecordRequestResult = RequestResult<
  GetRewardsRecordRequest,
  GetRewardsRecordResponse
>;

export function getRewardsRecord(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<GetRewardsRecordRequest, 'queryParams', never>,
  config?: RequestHandlerExecutionConfig
): Promise<GetRewardsRecordRequestResult> {
  return requestHandler.execute(
    createRequest(getRewardsRecordEndpointSchema, payload),
    config
  );
}
