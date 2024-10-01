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

export const postSapiV2LoanFlexibleAdjustLtvEndpointSchema = {
  path: '/sapi/v2/loan/flexible/adjust/ltv',
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

export type PostSapiV2LoanFlexibleAdjustLtvPayload = {
  queryParams: {
    loanCoin?: string;
    collateralCoin?: string;
    adjustmentAmount: number;
    direction: 'ADDITIONAL' | 'REDUCED';
    recvWindow?: number; // int
    timestamp: number; // int
    signature: string;
  };
};

export type PostSapiV2LoanFlexibleAdjustLtvResponse =
  | ResponseUnion<
      200,
      ResponseBodyData<
        'application/json',
        {
          loanCoin: string;
          collateralCoin: string;
          direction: string;
          adjustmentAmount: string;
          currentLTV: string;
        }
      >
    >
  | ResponseUnion<400, ResponseBodyData<'application/json', Error>>
  | ResponseUnion<401, ResponseBodyData<'application/json', Error>>;

export type PostSapiV2LoanFlexibleAdjustLtvRequestResult = RequestResult<
  Request,
  PostSapiV2LoanFlexibleAdjustLtvResponse
>;

export function postSapiV2LoanFlexibleAdjustLtv(
  requestHandler: SimpleRequestHandler,
  payload: PostSapiV2LoanFlexibleAdjustLtvPayload,
  config?: RequestHandlerExecutionConfig
): Promise<PostSapiV2LoanFlexibleAdjustLtvRequestResult> {
  return requestHandler.execute(
    createRequest({
      ...payload,
      endpointSchema: postSapiV2LoanFlexibleAdjustLtvEndpointSchema,
    }),
    config
  );
}
