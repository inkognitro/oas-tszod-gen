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

export const getSapiV1SimpleEarnLockedPersonalleftquotaEndpointSchema = {
  path: '/sapi/v1/simple-earn/locked/personalLeftQuota',
  method: 'get',
  supportedSecuritySchemas: [{name: 'ApiKeyAuth', requiredPermissions: []}],
  queryParamsZodSchema: z.object({
    projectId: z.string(),
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

export type GetSapiV1SimpleEarnLockedPersonalleftquotaPayload = {
  queryParams: {
    projectId: string;
    recvWindow?: number; // int
    timestamp: number; // int
    signature: string;
  };
};

export type GetSapiV1SimpleEarnLockedPersonalleftquotaResponse =
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

export type GetSapiV1SimpleEarnLockedPersonalleftquotaRequestResult =
  RequestResult<Request, GetSapiV1SimpleEarnLockedPersonalleftquotaResponse>;

export function getSapiV1SimpleEarnLockedPersonalleftquota(
  requestHandler: SimpleRequestHandler,
  payload: GetSapiV1SimpleEarnLockedPersonalleftquotaPayload,
  config?: RequestHandlerExecutionConfig
): Promise<GetSapiV1SimpleEarnLockedPersonalleftquotaRequestResult> {
  return requestHandler.execute(
    createRequest({
      ...payload,
      endpointSchema: getSapiV1SimpleEarnLockedPersonalleftquotaEndpointSchema,
    }),
    config
  );
}
