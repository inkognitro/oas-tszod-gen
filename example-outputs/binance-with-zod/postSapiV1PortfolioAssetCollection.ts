import {z_Error, Error} from '@example-outputs/binance-with-zod';
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
} from '@example-outputs/binance-with-zod/core';

export const postSapiV1PortfolioAssetCollectionEndpointSchema = {
  path: '/sapi/v1/portfolio/asset-collection',
  method: 'post',
  supportedSecuritySchemas: [{name: 'ApiKeyAuth', scopes: []}],
  queryParamsZodSchema: z.object({
    asset: z.string(),
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
            msg: z.string(),
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

export type PostSapiV1PortfolioAssetCollectionRequest = RequestUnion<
  any,
  any,
  {
    asset: string;
    recvWindow?: number; // int
    timestamp: number; // int
    signature: string;
  }
>;

export type PostSapiV1PortfolioAssetCollectionResponse =
  | ResponseUnion<
      200,
      ResponseBodyData<
        'application/json',
        {
          msg: string;
        }
      >
    >
  | ResponseUnion<400, ResponseBodyData<'application/json', Error>>
  | ResponseUnion<401, ResponseBodyData<'application/json', Error>>;

export type PostSapiV1PortfolioAssetCollectionRequestResult = RequestResult<
  PostSapiV1PortfolioAssetCollectionRequest,
  PostSapiV1PortfolioAssetCollectionResponse
>;

export function postSapiV1PortfolioAssetCollection(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<
    PostSapiV1PortfolioAssetCollectionRequest,
    'queryParams',
    never
  >,
  config?: RequestHandlerExecutionConfig
): Promise<PostSapiV1PortfolioAssetCollectionRequestResult> {
  return requestHandler.execute(
    createRequest(postSapiV1PortfolioAssetCollectionEndpointSchema, payload),
    config
  );
}
