import {Error} from '@example-outputs/binance';
import {
  ResponseBodyData,
  ResponseUnion,
  RequestResult,
  Request,
  SimpleRequestHandler,
  createRequest,
  RequestHandlerExecutionConfig,
} from '@example-outputs/binance/core';

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

export type PostSapiV1PortfolioAssetCollectionPayload = {
  queryParams: {
    asset: string;
    recvWindow?: number; // int
    timestamp: number; // int
    signature: string;
  };
};

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
  Request,
  PostSapiV1PortfolioAssetCollectionResponse
>;

export function postSapiV1PortfolioAssetCollection(
  requestHandler: SimpleRequestHandler,
  payload: PostSapiV1PortfolioAssetCollectionPayload,
  config?: RequestHandlerExecutionConfig
): Promise<PostSapiV1PortfolioAssetCollectionRequestResult> {
  return requestHandler.execute(
    createRequest({
      ...payload,
      endpointSchema: postSapiV1PortfolioAssetCollectionEndpointSchema,
    }),
    config
  );
}
