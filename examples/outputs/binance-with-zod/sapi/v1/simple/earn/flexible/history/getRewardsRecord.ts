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
  path: '/sapi/v1/simple-earn/flexible/history/rewardsRecord',
  method: 'get',
  supportedSecuritySchemas: [{name: 'ApiKeyAuth', scopes: []}],
  queryParamsZodSchema: z.object({
    productId: z.string().optional(),
    asset: z.string().optional(),
    startTime: z.number().int().safe().finite().optional(),
    endTime: z.number().int().safe().finite().optional(),
    type: z.string(),
  }),
  bodyByContentType: {},
  responseByStatus: {
    '200': {
      bodyByContentType: {
        'application/json': {
          zodSchema: z.object({
            rows: z.array(
              z.object({
                asset: z.string(),
                rewards: z.string(),
                projectId: z.string(),
                type: z.string(),
                time: z.number().int().safe().finite(),
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
    productId?: string;
    asset?: string;
    startTime?: number; // int
    endTime?: number; // int
    type: string;
  }
>;

export type GetRewardsRecordResponse =
  | ResponseUnion<
      200,
      ResponseBodyData<
        'application/json',
        {
          rows: {
            asset: string;
            rewards: string;
            projectId: string;
            type: string;
            time: number; // int
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
