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

export const getSubscriptionRecordEndpointSchema = {
  path: '/sapi/v1/simple-earn/locked/history/subscriptionRecord',
  method: 'get',
  supportedSecuritySchemas: [{name: 'ApiKeyAuth', scopes: []}],
  queryParamsZodSchema: z.object({
    purchaseId: z.string().optional(),
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
                purchaseId: z.number().int().safe().finite(),
                time: z.number().int().safe().finite(),
                asset: z.string(),
                amount: z.string(),
                lockPeriod: z.string(),
                type: z.string(),
                sourceAccount: z.string(),
                amtFromSpot: z.string(),
                amtFromFunding: z.string(),
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

export type GetSubscriptionRecordRequest = RequestUnion<
  any,
  any,
  {
    purchaseId?: string;
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

export type GetSubscriptionRecordResponse =
  | ResponseUnion<
      200,
      ResponseBodyData<
        'application/json',
        {
          rows: {
            positionId: string;
            purchaseId: number; // int
            time: number; // int
            asset: string;
            amount: string;
            lockPeriod: string;
            type: string;
            sourceAccount: string;
            amtFromSpot: string;
            amtFromFunding: string;
            status: string;
          }[];
          total: number; // int
        }
      >
    >
  | ResponseUnion<400, ResponseBodyData<'application/json', Error>>
  | ResponseUnion<401, ResponseBodyData<'application/json', Error>>;

export type GetSubscriptionRecordRequestResult = RequestResult<
  GetSubscriptionRecordRequest,
  GetSubscriptionRecordResponse
>;

export function getSubscriptionRecord(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<GetSubscriptionRecordRequest, 'queryParams', never>,
  config?: RequestHandlerExecutionConfig
): Promise<GetSubscriptionRecordRequestResult> {
  return requestHandler.execute(
    createRequest(getSubscriptionRecordEndpointSchema, payload),
    config
  );
}
