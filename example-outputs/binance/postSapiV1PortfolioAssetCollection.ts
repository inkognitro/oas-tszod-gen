import {
  RequestUnion,
  ResponseBodyData,
  ResponseUnion,
  RequestResult,
  SimpleRequestHandler,
  createRequest,
  RequestHandlerExecutionConfig,
  RequestPayload,
} from '@example-outputs/binance/core';
import {Error} from '@example-outputs/binance';

export const postSapiV1PortfolioAssetCollectionEndpointSchema = {
  path: '/sapi/v1/portfolio/asset-collection',
  method: 'post',
  supportedSecuritySchemas: [{name: 'ApiKeyAuth', scopes: []}],
  bodyByContentType: {},
  responseByStatus: {
    '200': {
      bodyByContentType: {
        'application/json': {},
      },
    },
    '400': {
      bodyByContentType: {
        'application/json': {},
      },
    },
    '401': {
      bodyByContentType: {
        'application/json': {},
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
    'queryParams'
  >,
  config?: RequestHandlerExecutionConfig
): Promise<PostSapiV1PortfolioAssetCollectionRequestResult> {
  return requestHandler.execute(
    createRequest(postSapiV1PortfolioAssetCollectionEndpointSchema, payload),
    config
  );
}
