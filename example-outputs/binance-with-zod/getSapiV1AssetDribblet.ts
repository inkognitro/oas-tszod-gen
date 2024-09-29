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

export const getSapiV1AssetDribbletEndpointSchema = {
  path: '/sapi/v1/asset/dribblet',
  method: 'get',
  supportedSecuritySchemas: [{name: 'ApiKeyAuth', scopes: []}],
  queryParamsZodSchema: z.object({
    accountType: z.enum(['SPOT', 'MARGIN']).optional(),
    startTime: z.number().int().safe().finite().optional(),
    endTime: z.number().int().safe().finite().optional(),
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
            total: z.number().int().safe().finite(),
            userAssetDribblets: z.array(
              z.object({
                operateTime: z.number().int().safe().finite(),
                totalTransferedAmount: z.string(),
                totalServiceChargeAmount: z.string(),
                transId: z.number().int().safe().finite(),
                userAssetDribbletDetails: z.array(
                  z.object({
                    transId: z.number().int().safe().finite(),
                    serviceChargeAmount: z.string(),
                    amount: z.string(),
                    operateTime: z.number().int().safe().finite(),
                    transferedAmount: z.string(),
                    fromAsset: z.string(),
                  })
                ),
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

export type GetSapiV1AssetDribbletPayload = {
  queryParams: {
    accountType?: 'SPOT' | 'MARGIN';
    startTime?: number; // int
    endTime?: number; // int
    recvWindow?: number; // int
    timestamp: number; // int
    signature: string;
  };
};

export type GetSapiV1AssetDribbletResponse =
  | Response<
      200,
      ResponseBodyData<
        'application/json',
        {
          total: number; // int
          userAssetDribblets: {
            operateTime: number; // int
            totalTransferedAmount: string;
            totalServiceChargeAmount: string;
            transId: number; // int
            userAssetDribbletDetails: {
              transId: number; // int
              serviceChargeAmount: string;
              amount: string;
              operateTime: number; // int
              transferedAmount: string;
              fromAsset: string;
            }[];
          }[];
        }
      >
    >
  | Response<400, ResponseBodyData<'application/json', Error>>
  | Response<401, ResponseBodyData<'application/json', Error>>;

export type GetSapiV1AssetDribbletRequestResult = RequestResult<
  Request,
  GetSapiV1AssetDribbletResponse
>;

export function getSapiV1AssetDribblet(
  requestHandler: SimpleRequestHandler,
  payload: GetSapiV1AssetDribbletPayload,
  config?: RequestHandlerExecutionConfig
): Promise<GetSapiV1AssetDribbletRequestResult> {
  return requestHandler.execute(
    createRequest({
      ...payload,
      endpointSchema: getSapiV1AssetDribbletEndpointSchema,
    }),
    config
  );
}
