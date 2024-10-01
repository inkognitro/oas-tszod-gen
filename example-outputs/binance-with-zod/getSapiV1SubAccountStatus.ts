import {errorZodSchema, Error} from '@example-outputs/binance-with-zod';
import {z} from 'zod';
import {
  ResponseBodyData,
  ResponseUnion,
  RequestResult,
  Request,
  SimpleRequestHandler,
  createRequest,
  RequestHandlerExecutionConfig,
} from '@example-outputs/binance-with-zod/core';

export const getSapiV1SubAccountStatusEndpointSchema = {
  path: '/sapi/v1/sub-account/status',
  method: 'get',
  supportedSecuritySchemas: [{name: 'ApiKeyAuth', scopes: []}],
  queryParamsZodSchema: z.object({
    email: z.string().optional(),
    recvWindow: z.number().int().safe().finite().optional(),
    timestamp: z.number().int().safe().finite(),
    signature: z.string(),
  }),
  bodyByContentType: {},
  responseByStatus: {
    '200': {
      bodyByContentType: {
        'application/json': {
          zodSchema: z.array(
            z.object({
              email: z.string(),
              isSubUserEnabled: z.boolean(),
              isUserActive: z.boolean(),
              insertTime: z.number().int().safe().finite(),
              isMarginEnabled: z.boolean(),
              isFutureEnabled: z.boolean(),
              mobile: z.number().int().safe().finite(),
            })
          ),
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

export type GetSapiV1SubAccountStatusPayload = {
  queryParams: {
    email?: string;
    recvWindow?: number; // int
    timestamp: number; // int
    signature: string;
  };
};

export type GetSapiV1SubAccountStatusResponse =
  | ResponseUnion<
      200,
      ResponseBodyData<
        'application/json',
        {
          email: string;
          isSubUserEnabled: boolean;
          isUserActive: boolean;
          insertTime: number; // int
          isMarginEnabled: boolean;
          isFutureEnabled: boolean;
          mobile: number; // int
        }[]
      >
    >
  | ResponseUnion<400, ResponseBodyData<'application/json', Error>>
  | ResponseUnion<401, ResponseBodyData<'application/json', Error>>;

export type GetSapiV1SubAccountStatusRequestResult = RequestResult<
  Request,
  GetSapiV1SubAccountStatusResponse
>;

export function getSapiV1SubAccountStatus(
  requestHandler: SimpleRequestHandler,
  payload: GetSapiV1SubAccountStatusPayload,
  config?: RequestHandlerExecutionConfig
): Promise<GetSapiV1SubAccountStatusRequestResult> {
  return requestHandler.execute(
    createRequest({
      ...payload,
      endpointSchema: getSapiV1SubAccountStatusEndpointSchema,
    }),
    config
  );
}
