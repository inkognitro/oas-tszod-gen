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

export const getSapiV1AccountInfoEndpointSchema = {
  path: '/sapi/v1/account/info',
  method: 'get',
  supportedSecuritySchemas: [{name: 'ApiKeyAuth', scopes: []}],
  queryParamsZodSchema: z.object({
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
            vipLevel: z.number().int().safe().finite(),
            isMarginEnabled: z.boolean(),
            isFutureEnabled: z.boolean(),
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

export type GetSapiV1AccountInfoRequest = RequestUnion<
  any,
  any,
  {
    recvWindow?: number; // int
    timestamp: number; // int
    signature: string;
  }
>;

export type GetSapiV1AccountInfoResponse =
  | ResponseUnion<
      200,
      ResponseBodyData<
        'application/json',
        {
          vipLevel: number; // int
          isMarginEnabled: boolean;
          isFutureEnabled: boolean;
        }
      >
    >
  | ResponseUnion<400, ResponseBodyData<'application/json', Error>>
  | ResponseUnion<401, ResponseBodyData<'application/json', Error>>;

export type GetSapiV1AccountInfoRequestResult = RequestResult<
  GetSapiV1AccountInfoRequest,
  GetSapiV1AccountInfoResponse
>;

export function getSapiV1AccountInfo(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<GetSapiV1AccountInfoRequest, 'queryParams'>,
  config?: RequestHandlerExecutionConfig
): Promise<GetSapiV1AccountInfoRequestResult> {
  return requestHandler.execute(
    createRequest(getSapiV1AccountInfoEndpointSchema, payload),
    config
  );
}
