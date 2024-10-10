import {z_Error, Error} from '../../../../../../../';
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
} from '../../../../../../../core';

export const getListEndpointSchema = {
  path: '/sapi/v1/lending/auto-invest/source-asset/list',
  method: 'get',
  supportedSecuritySchemas: [{name: 'ApiKeyAuth', scopes: []}],
  queryParamsZodSchema: z.object({
    targetAsset: z.string().optional(),
    indexId: z.number().int().safe().finite().optional(),
    usageType: z.string(),
    flexibleAllowedToUse: z.boolean().optional(),
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
            feeRate: z.string(),
            sourceAssets: z.array(
              z.object({
                sourceAsset: z.string(),
                assetMinAmount: z.string(),
                assetMaxAmount: z.string(),
                scale: z.string(),
                flexibleAmount: z.string(),
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

export type GetListRequest = RequestUnion<
  any,
  any,
  {
    targetAsset?: string;
    indexId?: number; // int
    usageType: string;
    flexibleAllowedToUse?: boolean;
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
          feeRate: string;
          sourceAssets: {
            sourceAsset: string;
            assetMinAmount: string;
            assetMaxAmount: string;
            scale: string;
            flexibleAmount: string;
          }[];
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
