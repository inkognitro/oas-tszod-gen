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

export const getSapiV1BlvtUserlimitEndpointSchema = {
  path: '/sapi/v1/blvt/userLimit',
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

export type GetSapiV1BlvtUserlimitRequest = RequestUnion<
  any,
  any,
  {
    tokenName?: string;
    recvWindow?: number; // int
    timestamp: number; // int
    signature: string;
  }
>;

export type GetSapiV1BlvtUserlimitResponse =
  | ResponseUnion<
      200,
      ResponseBodyData<
        'application/json',
        {
          tokenName: string;
          userDailyTotalPurchaseLimit: string;
          userDailyTotalRedeemLimit: string;
        }[]
      >
    >
  | ResponseUnion<400, ResponseBodyData<'application/json', Error>>
  | ResponseUnion<401, ResponseBodyData<'application/json', Error>>;

export type GetSapiV1BlvtUserlimitRequestResult = RequestResult<
  GetSapiV1BlvtUserlimitRequest,
  GetSapiV1BlvtUserlimitResponse
>;

export function getSapiV1BlvtUserlimit(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<GetSapiV1BlvtUserlimitRequest, 'queryParams', never>,
  config?: RequestHandlerExecutionConfig
): Promise<GetSapiV1BlvtUserlimitRequestResult> {
  return requestHandler.execute(
    createRequest(getSapiV1BlvtUserlimitEndpointSchema, payload),
    config
  );
}
