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

export const getAssetDetailEndpointSchema = {
  path: '/sapi/v1/asset/assetDetail',
  method: 'get',
  supportedSecuritySchemas: [{name: 'ApiKeyAuth', scopes: []}],
  queryParamsZodSchema: z.object({
    asset: z.string().optional(),
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
            CTR: z.object({
              minWithdrawAmount: z.string(),
              depositStatus: z.boolean(),
              withdrawFee: z.number().int().safe().finite(),
              withdrawStatus: z.boolean(),
              depositTip: z.string(),
            }),
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

export type GetAssetDetailRequest = RequestUnion<
  any,
  any,
  {
    asset?: string;
    recvWindow?: number; // int
    timestamp: number; // int
    signature: string;
  }
>;

export type GetAssetDetailResponse =
  | ResponseUnion<
      200,
      ResponseBodyData<
        'application/json',
        {
          CTR: {
            minWithdrawAmount: string;
            depositStatus: boolean;
            withdrawFee: number; // int
            withdrawStatus: boolean;
            depositTip: string;
          };
        }
      >
    >
  | ResponseUnion<400, ResponseBodyData<'application/json', Error>>
  | ResponseUnion<401, ResponseBodyData<'application/json', Error>>;

export type GetAssetDetailRequestResult = RequestResult<
  GetAssetDetailRequest,
  GetAssetDetailResponse
>;

export function getAssetDetail(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<GetAssetDetailRequest, 'queryParams', never>,
  config?: RequestHandlerExecutionConfig
): Promise<GetAssetDetailRequestResult> {
  return requestHandler.execute(
    createRequest(getAssetDetailEndpointSchema, payload),
    config
  );
}
