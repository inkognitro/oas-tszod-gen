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

export const postAssetEndpointSchema = {
  path: '/sapi/v1/asset/get-funding-asset',
  method: 'post',
  supportedSecuritySchemas: [{name: 'ApiKeyAuth', scopes: []}],
  queryParamsZodSchema: z.object({
    asset: z.string().optional(),
    needBtcValuation: z.enum(['true', 'false']).optional(),
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
              free: z.string(),
              locked: z.string(),
              freeze: z.string(),
              withdrawing: z.string(),
              btcValuation: z.string(),
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

export type PostAssetRequest = RequestUnion<
  any,
  any,
  {
    asset?: string;
    needBtcValuation?: 'true' | 'false';
    recvWindow?: number; // int
    timestamp: number; // int
    signature: string;
  }
>;

export type PostAssetResponse =
  | ResponseUnion<
      200,
      ResponseBodyData<
        'application/json',
        {
          asset: string;
          free: string;
          locked: string;
          freeze: string;
          withdrawing: string;
          btcValuation: string;
        }[]
      >
    >
  | ResponseUnion<400, ResponseBodyData<'application/json', Error>>
  | ResponseUnion<401, ResponseBodyData<'application/json', Error>>;

export type PostAssetRequestResult = RequestResult<
  PostAssetRequest,
  PostAssetResponse
>;

export function postAsset(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<PostAssetRequest, 'queryParams', never>,
  config?: RequestHandlerExecutionConfig
): Promise<PostAssetRequestResult> {
  return requestHandler.execute(
    createRequest(postAssetEndpointSchema, payload),
    config
  );
}
