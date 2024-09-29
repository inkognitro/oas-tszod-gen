import {Error} from '@example-outputs/binance';
import {
  ResponseBodyData,
  Response,
  RequestResult,
  Request,
  SimpleRequestHandler,
  createRequest,
  RequestHandlerExecutionConfig,
} from '@example-outputs/binance/core';

export const postSapiV1PortfolioAutoCollectionEndpointSchema = {
  path: '/sapi/v1/portfolio/auto-collection',
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

export type PostSapiV1PortfolioAutoCollectionPayload = {
  queryParams: {
    recvWindow?: number; // int
    timestamp: number; // int
    signature: string;
  };
};

export type PostSapiV1PortfolioAutoCollectionResponse =
  | Response<
      200,
      ResponseBodyData<
        'application/json',
        {
          msg: string;
        }
      >
    >
  | Response<400, ResponseBodyData<'application/json', Error>>
  | Response<401, ResponseBodyData<'application/json', Error>>;

export type PostSapiV1PortfolioAutoCollectionRequestResult = RequestResult<
  Request,
  PostSapiV1PortfolioAutoCollectionResponse
>;

export function postSapiV1PortfolioAutoCollection(
  requestHandler: SimpleRequestHandler,
  payload: PostSapiV1PortfolioAutoCollectionPayload,
  config?: RequestHandlerExecutionConfig
): Promise<PostSapiV1PortfolioAutoCollectionRequestResult> {
  return requestHandler.execute(
    createRequest({
      ...payload,
      endpointSchema: postSapiV1PortfolioAutoCollectionEndpointSchema,
    }),
    config
  );
}
