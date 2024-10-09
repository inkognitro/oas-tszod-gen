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

export const postMargin_callEndpointSchema = {
  path: '/sapi/v1/loan/customize/margin_call',
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

export type PostMargin_callRequest = RequestUnion<
  any,
  any,
  {
    orderId?: number; // int
    collateralCoin?: string;
    marginCall: number;
    recvWindow?: number; // int
    timestamp: number; // int
    signature: string;
  }
>;

export type PostMargin_callResponse =
  | ResponseUnion<
      200,
      ResponseBodyData<
        'application/json',
        {
          rows: {
            orderId: string;
            collateralCoin: string;
            preMarginCall: string;
            afterMarginCall: string;
            customizeTime: number; // int
          }[];
          total: number; // int
        }
      >
    >
  | ResponseUnion<400, ResponseBodyData<'application/json', Error>>
  | ResponseUnion<401, ResponseBodyData<'application/json', Error>>;

export type PostMargin_callRequestResult = RequestResult<
  PostMargin_callRequest,
  PostMargin_callResponse
>;

export function postMargin_call(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<PostMargin_callRequest, 'queryParams', never>,
  config?: RequestHandlerExecutionConfig
): Promise<PostMargin_callRequestResult> {
  return requestHandler.execute(
    createRequest(postMargin_callEndpointSchema, payload),
    config
  );
}
