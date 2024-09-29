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

export type PostSapiV1LoanCustomizeMargin_callPayload = {
  queryParams: {
    orderId?: number; // int
    collateralCoin?: string;
    marginCall: number;
    recvWindow?: number; // int
    timestamp: number; // int
    signature: string;
  };
};

export type PostSapiV1LoanCustomizeMargin_callResponse =
  | Response<
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
  | Response<400, ResponseBodyData<'application/json', Error>>
  | Response<401, ResponseBodyData<'application/json', Error>>;

export type PostSapiV1LoanCustomizeMargin_callRequestResult = RequestResult<
  Request,
  PostSapiV1LoanCustomizeMargin_callResponse
>;

export function postSapiV1LoanCustomizeMargin_call(
  requestHandler: SimpleRequestHandler,
  payload: PostSapiV1LoanCustomizeMargin_callPayload,
  config?: RequestHandlerExecutionConfig
): Promise<PostSapiV1LoanCustomizeMargin_callRequestResult> {
  return requestHandler.execute(
    createRequest({
      ...payload,
      endpointSchema: postSapiV1LoanCustomizeMargin_callEndpointSchema,
    }),
    config
  );
}
