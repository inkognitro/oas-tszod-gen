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

export const getSapiV1ConvertOrderstatusEndpointSchema = {
  path: '/sapi/v1/convert/orderStatus',
  method: 'get',
  supportedSecuritySchemas: [{name: 'ApiKeyAuth', scopes: []}],
  queryParamsZodSchema: z.object({
    orderId: z.string().optional(),
    quoteId: z.string().optional(),
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
            orderId: z.number().int().safe().finite(),
            orderStatus: z.string(),
            fromAsset: z.string(),
            fromAmount: z.string(),
            toAsset: z.string(),
            toAmount: z.string(),
            ratio: z.string(),
            inverseRatio: z.string(),
            createTime: z.number().int().safe().finite(),
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

export type GetSapiV1ConvertOrderstatusPayload = {
  queryParams: {
    orderId?: string;
    quoteId?: string;
    recvWindow?: number; // int
    timestamp: number; // int
    signature: string;
  };
};

export type GetSapiV1ConvertOrderstatusResponse =
  | Response<
      200,
      ResponseBodyData<
        'application/json',
        {
          orderId: number; // int
          orderStatus: string;
          fromAsset: string;
          fromAmount: string;
          toAsset: string;
          toAmount: string;
          ratio: string;
          inverseRatio: string;
          createTime: number; // int
        }
      >
    >
  | Response<400, ResponseBodyData<'application/json', Error>>
  | Response<401, ResponseBodyData<'application/json', Error>>;

export type GetSapiV1ConvertOrderstatusRequestResult = RequestResult<
  Request,
  GetSapiV1ConvertOrderstatusResponse
>;

export function getSapiV1ConvertOrderstatus(
  requestHandler: SimpleRequestHandler,
  payload: GetSapiV1ConvertOrderstatusPayload,
  config?: RequestHandlerExecutionConfig
): Promise<GetSapiV1ConvertOrderstatusRequestResult> {
  return requestHandler.execute(
    createRequest({
      ...payload,
      endpointSchema: getSapiV1ConvertOrderstatusEndpointSchema,
    }),
    config
  );
}
