import {errorZodSchema, Error} from '@example-outputs/binance-with-zod';
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

export const getSapiV1LendingProjectPositionListEndpointSchema = {
  path: '/sapi/v1/lending/project/position/list',
  method: 'get',
  supportedSecuritySchemas: [{name: 'ApiKeyAuth', scopes: []}],
  queryParamsZodSchema: z.object({
    asset: z.string(),
    projectId: z.string().optional(),
    status: z.enum(['ALL', 'SUBSCRIBABLE', 'UNSUBSCRIBABLE']).optional(),
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
              canTransfer: z.boolean(),
              createTimestamp: z.number().int().safe().finite(),
              duration: z.number().int().safe().finite(),
              endTime: z.number().int().safe().finite(),
              interest: z.string(),
              interestRate: z.string(),
              lot: z.number().int().safe().finite(),
              positionId: z.number().int().safe().finite(),
              principal: z.string(),
              projectId: z.string(),
              projectName: z.string(),
              purchaseTime: z.number().int().safe().finite(),
              redeemDate: z.string().date(), // date
              startTime: z.number().int().safe().finite(),
              status: z.string(),
              type: z.string(),
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

export type GetSapiV1LendingProjectPositionListRequest = RequestUnion<
  any,
  any,
  {
    asset: string;
    projectId?: string;
    status?: 'ALL' | 'SUBSCRIBABLE' | 'UNSUBSCRIBABLE';
    recvWindow?: number; // int
    timestamp: number; // int
    signature: string;
  }
>;

export type GetSapiV1LendingProjectPositionListResponse =
  | ResponseUnion<
      200,
      ResponseBodyData<
        'application/json',
        {
          asset: string;
          canTransfer: boolean;
          createTimestamp: number; // int
          duration: number; // int
          endTime: number; // int
          interest: string;
          interestRate: string;
          lot: number; // int
          positionId: number; // int
          principal: string;
          projectId: string;
          projectName: string;
          purchaseTime: number; // int
          redeemDate: string; // date
          startTime: number; // int
          status: string;
          type: string;
        }[]
      >
    >
  | ResponseUnion<400, ResponseBodyData<'application/json', Error>>
  | ResponseUnion<401, ResponseBodyData<'application/json', Error>>;

export type GetSapiV1LendingProjectPositionListRequestResult = RequestResult<
  GetSapiV1LendingProjectPositionListRequest,
  GetSapiV1LendingProjectPositionListResponse
>;

export function getSapiV1LendingProjectPositionList(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<
    GetSapiV1LendingProjectPositionListRequest,
    'queryParams'
  >,
  config?: RequestHandlerExecutionConfig
): Promise<GetSapiV1LendingProjectPositionListRequestResult> {
  return requestHandler.execute(
    createRequest(getSapiV1LendingProjectPositionListEndpointSchema, payload),
    config
  );
}
