import {
  RequestUnion,
  ResponseBodyData,
  ResponseUnion,
  RequestResult,
  SimpleRequestHandler,
  createRequest,
  RequestHandlerExecutionConfig,
  RequestPayload,
} from '../../../../../core';
import {Error} from '../../../../../';

export const getRateEndpointSchema = {
  path: '/sapi/v1/loan/repay/collateral/rate',
  method: 'get',
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

export type GetRateRequest = RequestUnion<
  any,
  any,
  {
    loanCoin: string;
    collateralCoin: string;
    repayAmount: number;
    recvWindow?: number; // int
    timestamp: number; // int
    signature: string;
  }
>;

export type GetRateResponse =
  | ResponseUnion<
      200,
      ResponseBodyData<
        'application/json',
        {
          loanCoin: string;
          collateralCoin: string;
          repayAmount: string;
          rate: string;
        }
      >
    >
  | ResponseUnion<400, ResponseBodyData<'application/json', Error>>
  | ResponseUnion<401, ResponseBodyData<'application/json', Error>>;

export type GetRateRequestResult = RequestResult<
  GetRateRequest,
  GetRateResponse
>;

export function getRate(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<GetRateRequest, 'queryParams', never>,
  config?: RequestHandlerExecutionConfig
): Promise<GetRateRequestResult> {
  return requestHandler.execute(
    createRequest(getRateEndpointSchema, payload),
    config
  );
}
