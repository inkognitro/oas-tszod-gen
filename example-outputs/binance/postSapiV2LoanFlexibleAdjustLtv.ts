import {Error} from '@example-outputs/binance';
import {
  ResponseBodyData,
  ResponseData,
  Response,
  RequestResult,
  Request,
  RequestHandler,
  createRequest,
  RequestHandlerExecutionConfig,
} from '@example-outputs/binance/core';

export const postSapiV2LoanFlexibleAdjustLtvEndpointSchema = {
  path: '/sapi/v2/loan/flexible/adjust/ltv',
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
  | Response<
      200,
      ResponseData<
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
    >
  | Response<400, ResponseData<ResponseBodyData<'application/json', Error>>>
  | Response<401, ResponseData<ResponseBodyData<'application/json', Error>>>;

export type PostSapiV2LoanFlexibleAdjustLtvRequestResult = RequestResult<
  Request,
  PostSapiV2LoanFlexibleAdjustLtvResponse
>;

export function postSapiV2LoanFlexibleAdjustLtv(
  requestHandler: RequestHandler,
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
