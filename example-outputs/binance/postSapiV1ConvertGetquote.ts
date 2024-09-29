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

export const postSapiV1ConvertGetquoteEndpointSchema = {
  path: '/sapi/v1/convert/getQuote',
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

export type PostSapiV1ConvertGetquotePayload = {
  queryParams: {
    fromAsset: string;
    toAsset: string;
    fromAmount?: number;
    toAmount?: number;
    validTime?: string;
    walletType?: string;
    recvWindow?: number; // int
    timestamp: number; // int
    signature: string;
  };
};

export type PostSapiV1ConvertGetquoteResponse =
  | Response<
      200,
      ResponseBodyData<
        'application/json',
        {
          quoteId: string;
          ratio: string;
          inverseRatio: string;
          validTimestamp: number; // int
          toAmount: string;
          fromAmount: string;
        }
      >
    >
  | Response<400, ResponseBodyData<'application/json', Error>>
  | Response<401, ResponseBodyData<'application/json', Error>>;

export type PostSapiV1ConvertGetquoteRequestResult = RequestResult<
  Request,
  PostSapiV1ConvertGetquoteResponse
>;

export function postSapiV1ConvertGetquote(
  requestHandler: SimpleRequestHandler,
  payload: PostSapiV1ConvertGetquotePayload,
  config?: RequestHandlerExecutionConfig
): Promise<PostSapiV1ConvertGetquoteRequestResult> {
  return requestHandler.execute(
    createRequest({
      ...payload,
      endpointSchema: postSapiV1ConvertGetquoteEndpointSchema,
    }),
    config
  );
}
