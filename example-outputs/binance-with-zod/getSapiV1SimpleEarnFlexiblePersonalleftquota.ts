import {errorZodSchema, Error} from '@example-outputs/binance-with-zod';
import {z} from 'zod';
import {
  ResponseBodyData,
  Response,
  RequestResult,
  Request,
  SimpleRequestHandler,
  createRequest,
  RequestHandlerExecutionConfig,
} from '@example-outputs/binance-with-zod/core';

export const getSapiV1SimpleEarnFlexiblePersonalleftquotaEndpointSchema = {
  path: '/sapi/v1/simple-earn/flexible/personalLeftQuota',
  method: 'get',
  supportedSecuritySchemas: [{name: 'ApiKeyAuth', scopes: []}],
  queryParamsZodSchema: z.object({
    productId: z.string(),
    recvWindow: z.number().int().safe().finite().optional(),
    timestamp: z.number().int().safe().finite(),
    signature: z.string(),
  }),
  bodyByContentType: {},
  responseByStatus: {
    '200': {
      bodyByContentType: {
        'application/json': {
          zodSchema: z.object({
            leftPersonalQuota: z.string(),
          }),
        },
      },
    },
    '400': {
      bodyByContentType: {
        'application/json': {
          zodSchema: errorZodSchema,
        },
      },
    },
    '401': {
      bodyByContentType: {
        'application/json': {
          zodSchema: errorZodSchema,
        },
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
      ResponseBodyData<
        'application/json',
        {
          leftPersonalQuota: string;
        }
      >
    >
  | Response<400, ResponseBodyData<'application/json', Error>>
  | Response<401, ResponseBodyData<'application/json', Error>>;

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
