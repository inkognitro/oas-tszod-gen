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

export const getSapiV1SubAccountListEndpointSchema = {
  path: '/sapi/v1/sub-account/list',
  method: 'get',
  supportedSecuritySchemas: [{name: 'ApiKeyAuth', scopes: []}],
  queryParamsZodSchema: z.object({
    email: z.string().optional(),
    isFreeze: z.enum(['true', 'false']).optional(),
    page: z.number().int().safe().finite().optional(),
    limit: z.number().int().safe().finite().optional(),
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
            subAccounts: z.array(
              z.object({
                email: z.string(),
                isFreeze: z.boolean(),
                createTime: z.number().int().safe().finite(),
                isManagedSubAccount: z.boolean(),
                isAssetManagementSubAccount: z.boolean(),
              })
            ),
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

export type GetSapiV1SubAccountListPayload = {
  queryParams: {
    email?: string;
    isFreeze?: 'true' | 'false';
    page?: number; // int
    limit?: number; // int
    recvWindow?: number; // int
    timestamp: number; // int
    signature: string;
  };
};

export type GetSapiV1SubAccountListResponse =
  | Response<
      200,
      ResponseBodyData<
        'application/json',
        {
          subAccounts: {
            email: string;
            isFreeze: boolean;
            createTime: number; // int
            isManagedSubAccount: boolean;
            isAssetManagementSubAccount: boolean;
          }[];
        }
      >
    >
  | Response<400, ResponseBodyData<'application/json', Error>>
  | Response<401, ResponseBodyData<'application/json', Error>>;

export type GetSapiV1SubAccountListRequestResult = RequestResult<
  Request,
  GetSapiV1SubAccountListResponse
>;

export function getSapiV1SubAccountList(
  requestHandler: SimpleRequestHandler,
  payload: GetSapiV1SubAccountListPayload,
  config?: RequestHandlerExecutionConfig
): Promise<GetSapiV1SubAccountListRequestResult> {
  return requestHandler.execute(
    createRequest({
      ...payload,
      endpointSchema: getSapiV1SubAccountListEndpointSchema,
    }),
    config
  );
}
