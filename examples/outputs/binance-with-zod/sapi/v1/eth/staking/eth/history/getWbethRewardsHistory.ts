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

export const getWbethRewardsHistoryEndpointSchema = {
  path: '/sapi/v1/eth-staking/eth/history/wbethRewardsHistory',
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
            estRewardsInETH: z.string(),
            rows: z.array(
              z.object({
                time: z.number().int().safe().finite(),
                amountInETH: z.string(),
                holding: z.string(),
                holdingInETH: z.string(),
                annualPercentageRate: z.string(),
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

export type GetWbethRewardsHistoryRequest = RequestUnion<
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

export type GetWbethRewardsHistoryResponse =
  | ResponseUnion<
      200,
      ResponseBodyData<
        'application/json',
        {
          estRewardsInETH: string;
          rows: {
            time: number; // int
            amountInETH: string;
            holding: string;
            holdingInETH: string;
            annualPercentageRate: string;
          }[];
          total: number; // int
        }
      >
    >
  | ResponseUnion<400, ResponseBodyData<'application/json', Error>>
  | ResponseUnion<401, ResponseBodyData<'application/json', Error>>;

export type GetWbethRewardsHistoryRequestResult = RequestResult<
  GetWbethRewardsHistoryRequest,
  GetWbethRewardsHistoryResponse
>;

export function getWbethRewardsHistory(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<GetWbethRewardsHistoryRequest, 'queryParams', never>,
  config?: RequestHandlerExecutionConfig
): Promise<GetWbethRewardsHistoryRequestResult> {
  return requestHandler.execute(
    createRequest(getWbethRewardsHistoryEndpointSchema, payload),
    config
  );
}
