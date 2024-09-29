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

export const postSapiV1PortfolioRepayEndpointSchema = {
  path: '/sapi/v1/portfolio/repay',
  method: 'post',
  supportedSecuritySchemas: [{name: 'ApiKeyAuth', requiredPermissions: []}],
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

export type PostSapiV1PortfolioRepayPayload = {
  queryParams: {
    from?: string;
    recvWindow?: number; // int
    timestamp: number; // int
    signature: string;
  };
};

export type PostSapiV1PortfolioRepayResponse =
  | Response<
      200,
      ResponseBodyData<
        'application/json',
        {
          tranId: number; // int
        }
      >
    >
  | Response<400, ResponseBodyData<'application/json', Error>>
  | Response<401, ResponseBodyData<'application/json', Error>>;

export type PostSapiV1PortfolioRepayRequestResult = RequestResult<
  Request,
  PostSapiV1PortfolioRepayResponse
>;

export function postSapiV1PortfolioRepay(
  requestHandler: SimpleRequestHandler,
  payload: PostSapiV1PortfolioRepayPayload,
  config?: RequestHandlerExecutionConfig
): Promise<PostSapiV1PortfolioRepayRequestResult> {
  return requestHandler.execute(
    createRequest({
      ...payload,
      endpointSchema: postSapiV1PortfolioRepayEndpointSchema,
    }),
    config
  );
}
