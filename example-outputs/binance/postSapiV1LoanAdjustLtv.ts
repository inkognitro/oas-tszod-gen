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

export const postSapiV1LoanAdjustLtvEndpointSchema = {
  path: '/sapi/v1/loan/adjust/ltv',
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

export type PostSapiV1LoanAdjustLtvRequest = RequestUnion<
  any,
  any,
  {
    orderId: number; // int
    amount: number;
    direction: 'ADDITIONAL' | 'REDUCED';
    recvWindow?: number; // int
    timestamp: number; // int
    signature: string;
  }
>;

export type PostSapiV1LoanAdjustLtvResponse =
  | ResponseUnion<
      200,
      ResponseBodyData<
        'application/json',
        {
          loanCoin: string;
          collateralCoin: string;
          direction: string;
          amount: string;
          currentLTV: string;
        }
      >
    >
  | ResponseUnion<400, ResponseBodyData<'application/json', Error>>
  | ResponseUnion<401, ResponseBodyData<'application/json', Error>>;

export type PostSapiV1LoanAdjustLtvRequestResult = RequestResult<
  PostSapiV1LoanAdjustLtvRequest,
  PostSapiV1LoanAdjustLtvResponse
>;

export function postSapiV1LoanAdjustLtv(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<PostSapiV1LoanAdjustLtvRequest, 'queryParams', never>,
  config?: RequestHandlerExecutionConfig
): Promise<PostSapiV1LoanAdjustLtvRequestResult> {
  return requestHandler.execute(
    createRequest(postSapiV1LoanAdjustLtvEndpointSchema, payload),
    config
  );
}
