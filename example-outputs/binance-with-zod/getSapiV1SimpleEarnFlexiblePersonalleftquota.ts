import {errorZodSchema, Error} from '@example-outputs/binance-with-zod';
import {z} from 'zod';
import {
  RequestUnion,
  ResponseBodyData,
  ResponseUnion,
  RequestResult,
  SimpleRequestHandler,
  createRequest,
  RequestHandlerExecutionConfig,
  RequestPayload,
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
    'queryParams'
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
