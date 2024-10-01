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

export type GetSapiV1BlvtUserlimitPayload = {
  queryParams: {
    tokenName?: string;
    recvWindow?: number; // int
    timestamp: number; // int
    signature: string;
  };
};

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
  Request,
  GetSapiV1BlvtUserlimitResponse
>;

export function getSapiV1BlvtUserlimit(
  requestHandler: SimpleRequestHandler,
  payload: GetSapiV1BlvtUserlimitPayload,
  config?: RequestHandlerExecutionConfig
): Promise<GetSapiV1BlvtUserlimitRequestResult> {
  return requestHandler.execute(
    createRequest({
      ...payload,
      endpointSchema: getSapiV1BlvtUserlimitEndpointSchema,
    }),
    config
  );
}
