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
import {Error} from '../../../';

export const postGetQuoteEndpointSchema = {
  path: '/sapi/v1/convert/getQuote',
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

export type PostGetQuoteRequest = RequestUnion<
  any,
  any,
  {
    fromAsset: string;
    toAsset: string;
    fromAmount?: number;
    toAmount?: number;
    validTime?: string;
    walletType?: string;
    recvWindow?: number; // int
    timestamp: number; // int
    signature: string;
  }
>;

export type PostGetQuoteResponse =
  | ResponseUnion<
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
  | ResponseUnion<400, ResponseBodyData<'application/json', Error>>
  | ResponseUnion<401, ResponseBodyData<'application/json', Error>>;

export type PostGetQuoteRequestResult = RequestResult<
  PostGetQuoteRequest,
  PostGetQuoteResponse
>;

export function postGetQuote(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<PostGetQuoteRequest, 'queryParams', never>,
  config?: RequestHandlerExecutionConfig
): Promise<PostGetQuoteRequestResult> {
  return requestHandler.execute(
    createRequest(postGetQuoteEndpointSchema, payload),
    config
  );
}
