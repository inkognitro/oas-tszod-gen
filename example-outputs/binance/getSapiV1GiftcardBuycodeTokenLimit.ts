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

export const getSapiV1GiftcardBuycodeTokenLimitEndpointSchema = {
  path: '/sapi/v1/giftcard/buyCode/token-limit',
  method: 'get',
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

export type GetSapiV1GiftcardBuycodeTokenLimitPayload = {
  queryParams: {
    baseToken: string;
    recvWindow?: number; // int
    timestamp: number; // int
    signature: string;
  };
};

export type GetSapiV1GiftcardBuycodeTokenLimitResponse =
  | Response<
      200,
      ResponseData<
        ResponseBodyData<
          'application/json',
          {
            code: string;
            message: string;
            data: {
              coin?: string;
              fromMin?: string;
              fromMax?: string;
            };
            success: boolean;
          }
        >
      >
    >
  | Response<400, ResponseData<ResponseBodyData<'application/json', Error>>>
  | Response<401, ResponseData<ResponseBodyData<'application/json', Error>>>;

export type GetSapiV1GiftcardBuycodeTokenLimitRequestResult = RequestResult<
  Request,
  GetSapiV1GiftcardBuycodeTokenLimitResponse
>;

export function getSapiV1GiftcardBuycodeTokenLimit(
  requestHandler: RequestHandler,
  payload: GetSapiV1GiftcardBuycodeTokenLimitPayload,
  config?: RequestHandlerExecutionConfig
): Promise<GetSapiV1GiftcardBuycodeTokenLimitRequestResult> {
  return requestHandler.execute(
    createRequest({
      ...payload,
      endpointSchema: getSapiV1GiftcardBuycodeTokenLimitEndpointSchema,
    }),
    config
  );
}
