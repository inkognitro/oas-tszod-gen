import {Error} from '@example-outputs/binance';
import {
  ResponseBodyData,
  ResponseData,
  Response,
  RequestResult,
  Request,
  SimpleRequestHandler,
  createRequest,
  RequestHandlerExecutionConfig,
} from '@example-outputs/binance/core';

export const getSapiV1SimpleEarnFlexiblePersonalleftquotaEndpointSchema = {
  path: '/sapi/v1/simple-earn/flexible/personalLeftQuota',
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

export type GetSapiV1SimpleEarnFlexiblePersonalleftquotaPayload = {
  queryParams: {
    productId: string;
    recvWindow?: number; // int
    timestamp: number; // int
    signature: string;
  };
};

export type GetSapiV1SimpleEarnFlexiblePersonalleftquotaResponse =
  | Response<
      200,
      ResponseData<
        ResponseBodyData<
          'application/json',
          {
            leftPersonalQuota: string;
          }
        >
      >
    >
  | Response<400, ResponseData<ResponseBodyData<'application/json', Error>>>
  | Response<401, ResponseData<ResponseBodyData<'application/json', Error>>>;

export type GetSapiV1SimpleEarnFlexiblePersonalleftquotaRequestResult =
  RequestResult<Request, GetSapiV1SimpleEarnFlexiblePersonalleftquotaResponse>;

export function getSapiV1SimpleEarnFlexiblePersonalleftquota(
  requestHandler: SimpleRequestHandler,
  payload: GetSapiV1SimpleEarnFlexiblePersonalleftquotaPayload,
  config?: RequestHandlerExecutionConfig
): Promise<GetSapiV1SimpleEarnFlexiblePersonalleftquotaRequestResult> {
  return requestHandler.execute(
    createRequest({
      ...payload,
      endpointSchema:
        getSapiV1SimpleEarnFlexiblePersonalleftquotaEndpointSchema,
    }),
    config
  );
}
