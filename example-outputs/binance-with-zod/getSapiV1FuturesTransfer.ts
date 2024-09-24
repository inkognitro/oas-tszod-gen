import {errorZodSchema, Error} from '@example-outputs/binance-with-zod';
import {z} from 'zod';
import {
  ResponseBodyData,
  ResponseData,
  Response,
  RequestResult,
  Request,
  RequestHandler,
  createRequest,
  RequestHandlerExecutionConfig,
} from '@example-outputs/binance-with-zod/core';

export const getSapiV1FuturesTransferEndpointSchema = {
  path: '/sapi/v1/futures/transfer',
  method: 'get',
  supportedSecuritySchemas: [{name: 'ApiKeyAuth', requiredPermissions: []}],
  queryParamsZodSchema: z.object({
    asset: z.string(),
    startTime: z.number().int().safe().finite(),
    endTime: z.number().int().safe().finite().optional(),
    current: z.number().int().safe().finite().optional(),
    size: z.number().int().safe().finite().optional(),
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
            rows: z.array(
              z.object({
                asset: z.string(),
                tranId: z.number().int().safe().finite(),
                amount: z.string(),
                type: z.string(),
                timestamp: z.number().int().safe().finite(),
                status: z.string(),
              })
            ),
            total: z.number().int().safe().finite(),
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

export type GetSapiV1FuturesTransferPayload = {
  queryParams: {
    asset: string;
    startTime: number; // int
    endTime?: number; // int
    current?: number; // int
    size?: number; // int
    recvWindow?: number; // int
    timestamp: number; // int
    signature: string;
  };
};

export type GetSapiV1FuturesTransferResponse =
  | Response<
      200,
      ResponseData<
        ResponseBodyData<
          'application/json',
          {
            rows: {
              asset: string;
              tranId: number; // int
              amount: string;
              type: string;
              timestamp: number; // int
              status: string;
            }[];
            total: number; // int
          }
        >
      >
    >
  | Response<400, ResponseData<ResponseBodyData<'application/json', Error>>>
  | Response<401, ResponseData<ResponseBodyData<'application/json', Error>>>;

export type GetSapiV1FuturesTransferRequestResult = RequestResult<
  Request,
  GetSapiV1FuturesTransferResponse
>;

export function getSapiV1FuturesTransfer(
  requestHandler: RequestHandler,
  payload: GetSapiV1FuturesTransferPayload,
  config?: RequestHandlerExecutionConfig
): Promise<GetSapiV1FuturesTransferRequestResult> {
  return requestHandler.execute(
    createRequest({
      ...payload,
      endpointSchema: getSapiV1FuturesTransferEndpointSchema,
    }),
    config
  );
}
