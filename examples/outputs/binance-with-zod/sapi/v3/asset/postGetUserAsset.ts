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

export const postGetUserAssetEndpointSchema = {
  path: '/sapi/v3/asset/getUserAsset',
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
              ipoable: z.string(),
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

export type PostGetUserAssetRequest = RequestUnion<
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

export type PostGetUserAssetResponse =
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
          ipoable: string;
          btcValuation: string;
        }[]
      >
    >
  | ResponseUnion<400, ResponseBodyData<'application/json', Error>>
  | ResponseUnion<401, ResponseBodyData<'application/json', Error>>;

export type PostGetUserAssetRequestResult = RequestResult<
  PostGetUserAssetRequest,
  PostGetUserAssetResponse
>;

export function postGetUserAsset(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<PostGetUserAssetRequest, 'queryParams', never>,
  config?: RequestHandlerExecutionConfig
): Promise<PostGetUserAssetRequestResult> {
  return requestHandler.execute(
    createRequest(postGetUserAssetEndpointSchema, payload),
    config
  );
}
