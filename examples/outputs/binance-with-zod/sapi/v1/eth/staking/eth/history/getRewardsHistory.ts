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

export const getRewardsHistoryEndpointSchema = {
  path: '/sapi/v1/eth-staking/eth/history/rewardsHistory',
  method: 'get',
  supportedSecuritySchemas: [{name: 'ApiKeyAuth', scopes: []}],
  queryParamsZodSchema: z.object({
    startTime: z.number().int().safe().finite().optional(),
    endTime: z.number().int().safe().finite().optional(),
    current: z.number().int().safe().finite().optional(),
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
                time: z.number().int().safe().finite(),
                asset: z.string(),
                holding: z.string(),
                amount: z.string(),
                annualPercentageRate: z.string(),
                status: z.string(),
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

export type GetRewardsHistoryRequest = RequestUnion<
  any,
  any,
  {
    startTime?: number; // int
    endTime?: number; // int
    current?: number; // int
    size?: number; // int
    recvWindow?: number; // int
    timestamp: number; // int
    signature: string;
  }
>;

export type GetRewardsHistoryResponse =
  | ResponseUnion<
      200,
      ResponseBodyData<
        'application/json',
        {
          rows: {
            time: number; // int
            asset: string;
            holding: string;
            amount: string;
            annualPercentageRate: string;
            status: string;
          }[];
          total: number; // int
        }
      >
    >
  | ResponseUnion<400, ResponseBodyData<'application/json', Error>>
  | ResponseUnion<401, ResponseBodyData<'application/json', Error>>;

export type GetRewardsHistoryRequestResult = RequestResult<
  GetRewardsHistoryRequest,
  GetRewardsHistoryResponse
>;

export function getRewardsHistory(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<GetRewardsHistoryRequest, 'queryParams', never>,
  config?: RequestHandlerExecutionConfig
): Promise<GetRewardsHistoryRequestResult> {
  return requestHandler.execute(
    createRequest(getRewardsHistoryEndpointSchema, payload),
    config
  );
}
