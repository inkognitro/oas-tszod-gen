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

export const postSapiV1LoanCustomizeMargin_callEndpointSchema = {
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

export type PostSapiV1LoanCustomizeMargin_callRequest = RequestUnion<
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

export type PostSapiV1LoanCustomizeMargin_callResponse =
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

export type PostSapiV1LoanCustomizeMargin_callRequestResult = RequestResult<
  PostSapiV1LoanCustomizeMargin_callRequest,
  PostSapiV1LoanCustomizeMargin_callResponse
>;

export function postSapiV1LoanCustomizeMargin_call(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<
    PostSapiV1LoanCustomizeMargin_callRequest,
    'queryParams',
    never
  >,
  config?: RequestHandlerExecutionConfig
): Promise<PostSapiV1LoanCustomizeMargin_callRequestResult> {
  return requestHandler.execute(
    createRequest(postSapiV1LoanCustomizeMargin_callEndpointSchema, payload),
    config
  );
}
