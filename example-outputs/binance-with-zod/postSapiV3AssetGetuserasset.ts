import {errorZodSchema, Error} from '@example-outputs/binance-with-zod';
import {z} from 'zod';
import {
  ResponseBodyData,
  ResponseData,
  Response,
  RequestResult,
  Request,
  RequestHandler,
  createRequest,
  RequestHandlerExecutionConfig,
} from '@example-outputs/binance-with-zod/core';

export const postSapiV3AssetGetuserassetEndpointSchema = {
  path: '/sapi/v3/asset/getUserAsset',
  method: 'post',
  supportedSecuritySchemas: [{name: 'ApiKeyAuth', requiredPermissions: []}],
  queryParamsZodSchema: z.object({
    asset: z.string().optional(),
    needBtcValuation: z.enum('true', 'false').optional(),
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

export type PostSapiV3AssetGetuserassetPayload = {
  queryParams: {
    asset?: string;
    needBtcValuation?: 'true' | 'false';
    recvWindow?: number; // int
    timestamp: number; // int
    signature: string;
  };
};

export type PostSapiV3AssetGetuserassetResponse =
  | Response<
      200,
      ResponseData<
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
    >
  | Response<400, ResponseData<ResponseBodyData<'application/json', Error>>>
  | Response<401, ResponseData<ResponseBodyData<'application/json', Error>>>;

export type PostSapiV3AssetGetuserassetRequestResult = RequestResult<
  Request,
  PostSapiV3AssetGetuserassetResponse
>;

export function postSapiV3AssetGetuserasset(
  requestHandler: RequestHandler,
  payload: PostSapiV3AssetGetuserassetPayload,
  config?: RequestHandlerExecutionConfig
): Promise<PostSapiV3AssetGetuserassetRequestResult> {
  return requestHandler.execute(
    createRequest({
      ...payload,
      endpointSchema: postSapiV3AssetGetuserassetEndpointSchema,
    }),
    config
  );
}
