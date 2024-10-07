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

export const getSapiV1SimpleEarnFlexiblePersonalleftquotaEndpointSchema = {
  path: '/sapi/v1/simple-earn/flexible/personalLeftQuota',
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

export type GetSapiV1SimpleEarnFlexiblePersonalleftquotaRequest = RequestUnion<
  any,
  any,
  {
    productId: string;
    recvWindow?: number; // int
    timestamp: number; // int
    signature: string;
  }
>;

export type GetSapiV1SimpleEarnFlexiblePersonalleftquotaResponse =
  | ResponseUnion<
      200,
      ResponseBodyData<
        'application/json',
        {
          leftPersonalQuota: string;
        }
      >
    >
  | ResponseUnion<400, ResponseBodyData<'application/json', Error>>
  | ResponseUnion<401, ResponseBodyData<'application/json', Error>>;

export type GetSapiV1SimpleEarnFlexiblePersonalleftquotaRequestResult =
  RequestResult<
    GetSapiV1SimpleEarnFlexiblePersonalleftquotaRequest,
    GetSapiV1SimpleEarnFlexiblePersonalleftquotaResponse
  >;

export function getSapiV1SimpleEarnFlexiblePersonalleftquota(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<
    GetSapiV1SimpleEarnFlexiblePersonalleftquotaRequest,
    'queryParams',
    never
  >,
  config?: RequestHandlerExecutionConfig
): Promise<GetSapiV1SimpleEarnFlexiblePersonalleftquotaRequestResult> {
  return requestHandler.execute(
    createRequest(
      getSapiV1SimpleEarnFlexiblePersonalleftquotaEndpointSchema,
      payload
    ),
    config
  );
}
