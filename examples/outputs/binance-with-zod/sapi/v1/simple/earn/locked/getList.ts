import {z_Error, Error} from '../../../../../';
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
} from '../../../../../core';

export const getListEndpointSchema = {
  path: '/sapi/v1/simple-earn/locked/list',
  method: 'get',
  supportedSecuritySchemas: [{name: 'ApiKeyAuth', scopes: []}],
  queryParamsZodSchema: z.object({
    asset: z.string().optional(),
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
                projectId: z.string(),
                detail: z.object({
                  asset: z.string(),
                  rewardAsset: z.string(),
                  duration: z.number().int().safe().finite(),
                  renewable: z.boolean(),
                  isSoldOut: z.boolean(),
                  apr: z.string(),
                  status: z.string(),
                  subscriptionStartTime: z.string(),
                  extraRewardAsset: z.string(),
                  extraRewardAPR: z.string(),
                }),
                quota: z.object({
                  totalPersonalQuota: z.string(),
                  minimum: z.string(),
                }),
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

export type GetListRequest = RequestUnion<
  any,
  any,
  {
    asset?: string;
    current?: number; // int
    size?: number; // int
    recvWindow?: number; // int
    timestamp: number; // int
    signature: string;
  }
>;

export type GetListResponse =
  | ResponseUnion<
      200,
      ResponseBodyData<
        'application/json',
        {
          rows: {
            projectId: string;
            detail: {
              asset: string;
              rewardAsset: string;
              duration: number; // int
              renewable: boolean;
              isSoldOut: boolean;
              apr: string;
              status: string;
              subscriptionStartTime: string;
              extraRewardAsset: string;
              extraRewardAPR: string;
            };
            quota: {
              totalPersonalQuota: string;
              minimum: string;
            };
          }[];
          total: number; // int
        }
      >
    >
  | ResponseUnion<400, ResponseBodyData<'application/json', Error>>
  | ResponseUnion<401, ResponseBodyData<'application/json', Error>>;

export type GetListRequestResult = RequestResult<
  GetListRequest,
  GetListResponse
>;

export function getList(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<GetListRequest, 'queryParams', never>,
  config?: RequestHandlerExecutionConfig
): Promise<GetListRequestResult> {
  return requestHandler.execute(
    createRequest(getListEndpointSchema, payload),
    config
  );
}
