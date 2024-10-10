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

export const getRedemptionRecordEndpointSchema = {
  path: '/sapi/v1/simple-earn/locked/history/redemptionRecord',
  method: 'get',
  supportedSecuritySchemas: [{name: 'ApiKeyAuth', scopes: []}],
  queryParamsZodSchema: z.object({
    positionId: z.string().optional(),
    redeemId: z.string().optional(),
    asset: z.string().optional(),
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
                positionId: z.string(),
                redeemId: z.number().int().safe().finite(),
                time: z.number().int().safe().finite(),
                asset: z.string(),
                lockPeriod: z.string(),
                amount: z.string(),
                type: z.string(),
                deliverDate: z.string(),
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

export type GetRedemptionRecordRequest = RequestUnion<
  any,
  any,
  {
    positionId?: string;
    redeemId?: string;
    asset?: string;
    startTime?: number; // int
    endTime?: number; // int
    current?: number; // int
    size?: number; // int
    recvWindow?: number; // int
    timestamp: number; // int
    signature: string;
  }
>;

export type GetRedemptionRecordResponse =
  | ResponseUnion<
      200,
      ResponseBodyData<
        'application/json',
        {
          rows: {
            positionId: string;
            redeemId: number; // int
            time: number; // int
            asset: string;
            lockPeriod: string;
            amount: string;
            type: string;
            deliverDate: string;
            status: string;
          }[];
          total: number; // int
        }
      >
    >
  | ResponseUnion<400, ResponseBodyData<'application/json', Error>>
  | ResponseUnion<401, ResponseBodyData<'application/json', Error>>;

export type GetRedemptionRecordRequestResult = RequestResult<
  GetRedemptionRecordRequest,
  GetRedemptionRecordResponse
>;

export function getRedemptionRecord(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<GetRedemptionRecordRequest, 'queryParams', never>,
  config?: RequestHandlerExecutionConfig
): Promise<GetRedemptionRecordRequestResult> {
  return requestHandler.execute(
    createRequest(getRedemptionRecordEndpointSchema, payload),
    config
  );
}
