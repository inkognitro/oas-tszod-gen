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

export const getCrossMarginDataEndpointSchema = {
  path: '/sapi/v1/margin/crossMarginData',
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

export type GetCrossMarginDataRequest = RequestUnion<
  any,
  any,
  {
    vipLevel?: number; // int
    coin?: string;
    recvWindow?: number; // int
    timestamp: number; // int
    signature: string;
  }
>;

export type GetCrossMarginDataResponse =
  | ResponseUnion<
      200,
      ResponseBodyData<
        'application/json',
        {
          vipLevel: number; // int
          coin: string;
          transferIn: boolean;
          borrowable: boolean;
          dailyInterest: string;
          yearlyInterest: string;
          borrowLimit: string;
          marginablePairs: string[];
        }[]
      >
    >
  | ResponseUnion<400, ResponseBodyData<'application/json', Error>>
  | ResponseUnion<401, ResponseBodyData<'application/json', Error>>;

export type GetCrossMarginDataRequestResult = RequestResult<
  GetCrossMarginDataRequest,
  GetCrossMarginDataResponse
>;

export function getCrossMarginData(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<GetCrossMarginDataRequest, 'queryParams', never>,
  config?: RequestHandlerExecutionConfig
): Promise<GetCrossMarginDataRequestResult> {
  return requestHandler.execute(
    createRequest(getCrossMarginDataEndpointSchema, payload),
    config
  );
}
