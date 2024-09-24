import {errorZodSchema, Error} from '@example-outputs/binance-with-zod';
import {z} from 'zod';
import {
  ResponseBodyData,
  ResponseData,
  Response,
  RequestResult,
  Request,
  RequestHandler,
  createRequest,
  RequestHandlerExecutionConfig,
} from '@example-outputs/binance-with-zod/core';

export const getSapiV1LendingProjectListEndpointSchema = {
  path: '/sapi/v1/lending/project/list',
  method: 'get',
  supportedSecuritySchemas: [{name: 'ApiKeyAuth', requiredPermissions: []}],
  queryParamsZodSchema: z.object({
    asset: z.string().optional(),
    type: z.union([z.literal('ACTIVITY'), z.literal('CUSTOMIZED_FIXED')]),
    status: z
      .union([
        z.literal('ALL'),
        z.literal('SUBSCRIBABLE'),
        z.literal('UNSUBSCRIBABLE'),
      ])
      .optional(),
    isSortAsc: z.boolean().optional(),
    sortBy: z
      .union([
        z.literal('START_TIME'),
        z.literal('LOT_SIZE'),
        z.literal('INTEREST_RATE'),
        z.literal('DURATION'),
      ])
      .optional(),
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
          zodSchema: z.array(
            z.object({
              asset: z.string(),
              displayPriority: z.number().int().safe().finite(),
              duration: z.number().int().safe().finite(),
              interestPerLot: z.string(),
              interestRate: z.string(),
              lotSize: z.string(),
              lotsLowLimit: z.number().int().safe().finite(),
              lotsPurchased: z.number().int().safe().finite(),
              lotsUpLimit: z.number().int().safe().finite(),
              maxLotsPerUser: z.number().int().safe().finite(),
              needKyc: z.boolean(),
              projectId: z.string(),
              projectName: z.string(),
              status: z.string(),
              type: z.string(),
              withAreaLimitation: z.boolean(),
            })
          ),
        },
      },
    },
    '400': {
      bodyByContentType: {
        'application/json': {
          zodSchema: errorZodSchema,
        },
      },
    },
    '401': {
      bodyByContentType: {
        'application/json': {
          zodSchema: errorZodSchema,
        },
      },
    },
  },
};

export type GetSapiV1LendingProjectListPayload = {
  queryParams: {
    asset?: string;
    type: 'ACTIVITY' | 'CUSTOMIZED_FIXED';
    status?: 'ALL' | 'SUBSCRIBABLE' | 'UNSUBSCRIBABLE';
    isSortAsc?: boolean;
    sortBy?: 'START_TIME' | 'LOT_SIZE' | 'INTEREST_RATE' | 'DURATION';
    current?: number; // int
    size?: number; // int
    recvWindow?: number; // int
    timestamp: number; // int
    signature: string;
  };
};

export type GetSapiV1LendingProjectListResponse =
  | Response<
      200,
      ResponseData<
        ResponseBodyData<
          'application/json',
          {
            asset: string;
            displayPriority: number; // int
            duration: number; // int
            interestPerLot: string;
            interestRate: string;
            lotSize: string;
            lotsLowLimit: number; // int
            lotsPurchased: number; // int
            lotsUpLimit: number; // int
            maxLotsPerUser: number; // int
            needKyc: boolean;
            projectId: string;
            projectName: string;
            status: string;
            type: string;
            withAreaLimitation: boolean;
          }[]
        >
      >
    >
  | Response<400, ResponseData<ResponseBodyData<'application/json', Error>>>
  | Response<401, ResponseData<ResponseBodyData<'application/json', Error>>>;

export type GetSapiV1LendingProjectListRequestResult = RequestResult<
  Request,
  GetSapiV1LendingProjectListResponse
>;

export function getSapiV1LendingProjectList(
  requestHandler: RequestHandler,
  payload: GetSapiV1LendingProjectListPayload,
  config?: RequestHandlerExecutionConfig
): Promise<GetSapiV1LendingProjectListRequestResult> {
  return requestHandler.execute(
    createRequest({
      ...payload,
      endpointSchema: getSapiV1LendingProjectListEndpointSchema,
    }),
    config
  );
}
