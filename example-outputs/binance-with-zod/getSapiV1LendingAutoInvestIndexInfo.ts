import {errorZodSchema, Error} from '@example-outputs/binance-with-zod';
import {z} from 'zod';
import {
  ResponseBodyData,
  ResponseData,
  Response,
  RequestResult,
  Request,
  SimpleRequestHandler,
  createRequest,
  RequestHandlerExecutionConfig,
} from '@example-outputs/binance-with-zod/core';

export const getSapiV1LendingAutoInvestIndexInfoEndpointSchema = {
  path: '/sapi/v1/lending/auto-invest/index/info',
  method: 'get',
  supportedSecuritySchemas: [{name: 'ApiKeyAuth', requiredPermissions: []}],
  queryParamsZodSchema: z.object({
    indexId: z.number().int().safe().finite(),
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
            indexId: z.number().int().safe().finite(),
            indexName: z.string(),
            status: z.string(),
            assetAllocation: z.array(
              z.object({
                targetAsset: z.string(),
                allocation: z.string(),
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

export type GetSapiV1LendingAutoInvestIndexInfoPayload = {
  queryParams: {
    indexId: number; // int
    recvWindow?: number; // int
    timestamp: number; // int
    signature: string;
  };
};

export type GetSapiV1LendingAutoInvestIndexInfoResponse =
  | Response<
      200,
      ResponseData<
        ResponseBodyData<
          'application/json',
          {
            indexId: number; // int
            indexName: string;
            status: string;
            assetAllocation: {
              targetAsset: string;
              allocation: string;
            }[];
          }
        >
      >
    >
  | Response<400, ResponseData<ResponseBodyData<'application/json', Error>>>
  | Response<401, ResponseData<ResponseBodyData<'application/json', Error>>>;

export type GetSapiV1LendingAutoInvestIndexInfoRequestResult = RequestResult<
  Request,
  GetSapiV1LendingAutoInvestIndexInfoResponse
>;

export function getSapiV1LendingAutoInvestIndexInfo(
  requestHandler: SimpleRequestHandler,
  payload: GetSapiV1LendingAutoInvestIndexInfoPayload,
  config?: RequestHandlerExecutionConfig
): Promise<GetSapiV1LendingAutoInvestIndexInfoRequestResult> {
  return requestHandler.execute(
    createRequest({
      ...payload,
      endpointSchema: getSapiV1LendingAutoInvestIndexInfoEndpointSchema,
    }),
    config
  );
}
