import {z_Error, Error} from '../../../';
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
} from '../../../core';

export const getAssetDividendEndpointSchema = {
  path: '/sapi/v1/asset/assetDividend',
  method: 'get',
  supportedSecuritySchemas: [{name: 'ApiKeyAuth', scopes: []}],
  queryParamsZodSchema: z.object({
    asset: z.string().optional(),
    startTime: z.number().int().safe().finite().optional(),
    endTime: z.number().int().safe().finite().optional(),
    limit: z.number().int().safe().finite().lte(500).optional(),
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
                id: z.number().int().safe().finite(),
                amount: z.string(),
                asset: z.string(),
                divTime: z.number().int().safe().finite(),
                enInfo: z.string(),
                tranId: z.number().int().safe().finite(),
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

export type GetAssetDividendRequest = RequestUnion<
  any,
  any,
  {
    asset?: string;
    startTime?: number; // int
    endTime?: number; // int
    limit?: number; // int
    recvWindow?: number; // int
    timestamp: number; // int
    signature: string;
  }
>;

export type GetAssetDividendResponse =
  | ResponseUnion<
      200,
      ResponseBodyData<
        'application/json',
        {
          rows: {
            id: number; // int
            amount: string;
            asset: string;
            divTime: number; // int
            enInfo: string;
            tranId: number; // int
          }[];
          total: number; // int
        }
      >
    >
  | ResponseUnion<400, ResponseBodyData<'application/json', Error>>
  | ResponseUnion<401, ResponseBodyData<'application/json', Error>>;

export type GetAssetDividendRequestResult = RequestResult<
  GetAssetDividendRequest,
  GetAssetDividendResponse
>;

export function getAssetDividend(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<GetAssetDividendRequest, 'queryParams', never>,
  config?: RequestHandlerExecutionConfig
): Promise<GetAssetDividendRequestResult> {
  return requestHandler.execute(
    createRequest(getAssetDividendEndpointSchema, payload),
    config
  );
}
