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

export const getListEndpointSchema = {
  path: '/sapi/v1/lending/auto-invest/history/list',
  method: 'get',
  supportedSecuritySchemas: [{name: 'ApiKeyAuth', scopes: []}],
  queryParamsZodSchema: z.object({
    planId: z.number().int().safe().finite().optional(),
    startTime: z.number().int().safe().finite().optional(),
    endTime: z.number().int().safe().finite().optional(),
    targetAsset: z.number().safe().finite().optional(),
    planType: z.enum(['SINGLE', 'PORTFOLIO', 'INDEX', 'ALL']).optional(),
    size: z.number().int().safe().finite().optional(),
    current: z.number().int().safe().finite().optional(),
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
              id: z.number().int().safe().finite(),
              targetAsset: z.string(),
              planType: z.string(),
              planName: z.string(),
              planId: z.number().int().safe().finite(),
              transactionDateTime: z.number().int().safe().finite(),
              transactionStatus: z.string(),
              failedType: z.string(),
              sourceAsset: z.string(),
              sourceAssetAmount: z.string(),
              targetAssetAmount: z.string(),
              sourceWallet: z.string(),
              flexibleUsed: z.string(),
              transactionFee: z.string(),
              transactionFeeUnit: z.string(),
              executionPrice: z.string(),
              executionType: z.string(),
              subscriptionCycle: z.string(),
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

export type GetListRequest = RequestUnion<
  any,
  any,
  {
    planId?: number; // int
    startTime?: number; // int
    endTime?: number; // int
    targetAsset?: number;
    planType?: 'SINGLE' | 'PORTFOLIO' | 'INDEX' | 'ALL';
    size?: number; // int
    current?: number; // int
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
          id: number; // int
          targetAsset: string;
          planType: string;
          planName: string;
          planId: number; // int
          transactionDateTime: number; // int
          transactionStatus: string;
          failedType: string;
          sourceAsset: string;
          sourceAssetAmount: string;
          targetAssetAmount: string;
          sourceWallet: string;
          flexibleUsed: string;
          transactionFee: string;
          transactionFeeUnit: string;
          executionPrice: string;
          executionType: string;
          subscriptionCycle: string;
        }[]
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
