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

export const getQueryByPageEndpointSchema = {
  path: '/sapi/v1/asset/convert-transfer/queryByPage',
  method: 'get',
  supportedSecuritySchemas: [{name: 'ApiKeyAuth', scopes: []}],
  queryParamsZodSchema: z.object({
    tranId: z.number().int().safe().finite().optional(),
    asset: z.string().optional(),
    startTime: z.number().int().safe().finite(),
    endTime: z.number().int().safe().finite(),
    accountType: z.enum(['MAIN', 'CARD']).optional(),
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
            total: z.number().int().safe().finite(),
            rows: z.array(
              z.object({
                tranId: z.number().int().safe().finite(),
                type: z.number().int().safe().finite(),
                time: z.number().int().safe().finite(),
                deductedAsset: z.string(),
                deductedAmount: z.string(),
                targetAsset: z.string(),
                targetAmount: z.string(),
                status: z.string(),
                accountType: z.string(),
              })
            ),
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

export type GetQueryByPageRequest = RequestUnion<
  any,
  any,
  {
    tranId?: number; // int
    asset?: string;
    startTime: number; // int
    endTime: number; // int
    accountType?: 'MAIN' | 'CARD';
    current?: number; // int
    size?: number; // int
    recvWindow?: number; // int
    timestamp: number; // int
    signature: string;
  }
>;

export type GetQueryByPageResponse =
  | ResponseUnion<
      200,
      ResponseBodyData<
        'application/json',
        {
          total: number; // int
          rows: {
            tranId: number; // int
            type: number; // int
            time: number; // int
            deductedAsset: string;
            deductedAmount: string;
            targetAsset: string;
            targetAmount: string;
            status: string;
            accountType: string;
          }[];
        }
      >
    >
  | ResponseUnion<400, ResponseBodyData<'application/json', Error>>
  | ResponseUnion<401, ResponseBodyData<'application/json', Error>>;

export type GetQueryByPageRequestResult = RequestResult<
  GetQueryByPageRequest,
  GetQueryByPageResponse
>;

export function getQueryByPage(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<GetQueryByPageRequest, 'queryParams', never>,
  config?: RequestHandlerExecutionConfig
): Promise<GetQueryByPageRequestResult> {
  return requestHandler.execute(
    createRequest(getQueryByPageEndpointSchema, payload),
    config
  );
}
