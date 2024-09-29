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

export const postSapiV1LoanAdjustLtvEndpointSchema = {
  path: '/sapi/v1/loan/adjust/ltv',
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

export type PostSapiV1LoanAdjustLtvPayload = {
  queryParams: {
    orderId: number; // int
    amount: number;
    direction: 'ADDITIONAL' | 'REDUCED';
    recvWindow?: number; // int
    timestamp: number; // int
    signature: string;
  };
};

export type PostSapiV1LoanAdjustLtvResponse =
  | Response<
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
  | Response<400, ResponseBodyData<'application/json', Error>>
  | Response<401, ResponseBodyData<'application/json', Error>>;

export type PostSapiV1LoanAdjustLtvRequestResult = RequestResult<
  Request,
  PostSapiV1LoanAdjustLtvResponse
>;

export function postSapiV1LoanAdjustLtv(
  requestHandler: SimpleRequestHandler,
  payload: PostSapiV1LoanAdjustLtvPayload,
  config?: RequestHandlerExecutionConfig
): Promise<PostSapiV1LoanAdjustLtvRequestResult> {
  return requestHandler.execute(
    createRequest({
      ...payload,
      endpointSchema: postSapiV1LoanAdjustLtvEndpointSchema,
    }),
    config
  );
}
