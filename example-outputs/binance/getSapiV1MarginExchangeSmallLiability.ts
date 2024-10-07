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

export const getSapiV1MarginExchangeSmallLiabilityEndpointSchema = {
  path: '/sapi/v1/margin/exchange-small-liability',
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

export type GetSapiV1MarginExchangeSmallLiabilityRequest = RequestUnion<
  any,
  any,
  {
    recvWindow?: number; // int
    timestamp: number; // int
    signature: string;
  }
>;

export type GetSapiV1MarginExchangeSmallLiabilityResponse =
  | ResponseUnion<
      200,
      ResponseBodyData<
        'application/json',
        {
          asset: string;
          interest: string;
          principal: string;
          liabilityAsset: string;
          liabilityQty: number;
        }[]
      >
    >
  | ResponseUnion<400, ResponseBodyData<'application/json', Error>>
  | ResponseUnion<401, ResponseBodyData<'application/json', Error>>;

export type GetSapiV1MarginExchangeSmallLiabilityRequestResult = RequestResult<
  GetSapiV1MarginExchangeSmallLiabilityRequest,
  GetSapiV1MarginExchangeSmallLiabilityResponse
>;

export function getSapiV1MarginExchangeSmallLiability(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<
    GetSapiV1MarginExchangeSmallLiabilityRequest,
    'queryParams',
    never
  >,
  config?: RequestHandlerExecutionConfig
): Promise<GetSapiV1MarginExchangeSmallLiabilityRequestResult> {
  return requestHandler.execute(
    createRequest(getSapiV1MarginExchangeSmallLiabilityEndpointSchema, payload),
    config
  );
}
