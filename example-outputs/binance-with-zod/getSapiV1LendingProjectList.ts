import {z_Error, Error} from '@example-outputs/binance-with-zod';
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
} from '@example-outputs/binance-with-zod/core';

export const getSapiV1LendingProjectListEndpointSchema = {
  path: '/sapi/v1/lending/project/list',
  method: 'get',
  supportedSecuritySchemas: [{name: 'ApiKeyAuth', scopes: []}],
  queryParamsZodSchema: z.object({
    asset: z.string().optional(),
    type: z.enum(['ACTIVITY', 'CUSTOMIZED_FIXED']),
    status: z.enum(['ALL', 'SUBSCRIBABLE', 'UNSUBSCRIBABLE']).optional(),
    isSortAsc: z.boolean().optional(),
    sortBy: z
      .enum(['START_TIME', 'LOT_SIZE', 'INTEREST_RATE', 'DURATION'])
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

export type GetSapiV1LendingProjectListRequest = RequestUnion<
  any,
  any,
  {
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
  }
>;

export type GetSapiV1LendingProjectListResponse =
  | ResponseUnion<
      200,
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
  | ResponseUnion<400, ResponseBodyData<'application/json', Error>>
  | ResponseUnion<401, ResponseBodyData<'application/json', Error>>;

export type GetSapiV1LendingProjectListRequestResult = RequestResult<
  GetSapiV1LendingProjectListRequest,
  GetSapiV1LendingProjectListResponse
>;

export function getSapiV1LendingProjectList(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<GetSapiV1LendingProjectListRequest, 'queryParams'>,
  config?: RequestHandlerExecutionConfig
): Promise<GetSapiV1LendingProjectListRequestResult> {
  return requestHandler.execute(
    createRequest(getSapiV1LendingProjectListEndpointSchema, payload),
    config
  );
}
