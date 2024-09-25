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

export const getSapiV1ConvertTradeflowEndpointSchema = {
  path: '/sapi/v1/convert/tradeFlow',
  method: 'get',
  supportedSecuritySchemas: [{name: 'ApiKeyAuth', requiredPermissions: []}],
  queryParamsZodSchema: z.object({
    startTime: z.number().int().safe().finite(),
    endTime: z.number().int().safe().finite(),
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
            list: z.array(
              z.object({
                quoteId: z.string(),
                orderId: z.number().int().safe().finite(),
                orderStatus: z.string(),
                fromAsset: z.string(),
                fromAmount: z.string(),
                toAsset: z.string(),
                toAmount: z.string(),
                ratio: z.string(),
                inverseRatio: z.string(),
                createTime: z.number().int().safe().finite(),
              })
            ),
            startTime: z.number().int().safe().finite(),
            endTime: z.number().int().safe().finite(),
            limit: z.number().int().safe().finite(),
            moreData: z.boolean(),
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

export type GetSapiV1ConvertTradeflowPayload = {
  queryParams: {
    startTime: number; // int
    endTime: number; // int
    limit?: number; // int
    recvWindow?: number; // int
    timestamp: number; // int
    signature: string;
  };
};

export type GetSapiV1ConvertTradeflowResponse =
  | Response<
      200,
      ResponseData<
        ResponseBodyData<
          'application/json',
          {
            list: {
              quoteId: string;
              orderId: number; // int
              orderStatus: string;
              fromAsset: string;
              fromAmount: string;
              toAsset: string;
              toAmount: string;
              ratio: string;
              inverseRatio: string;
              createTime: number; // int
            }[];
            startTime: number; // int
            endTime: number; // int
            limit: number; // int
            moreData: boolean;
          }
        >
      >
    >
  | Response<400, ResponseData<ResponseBodyData<'application/json', Error>>>
  | Response<401, ResponseData<ResponseBodyData<'application/json', Error>>>;

export type GetSapiV1ConvertTradeflowRequestResult = RequestResult<
  Request,
  GetSapiV1ConvertTradeflowResponse
>;

export function getSapiV1ConvertTradeflow(
  requestHandler: SimpleRequestHandler,
  payload: GetSapiV1ConvertTradeflowPayload,
  config?: RequestHandlerExecutionConfig
): Promise<GetSapiV1ConvertTradeflowRequestResult> {
  return requestHandler.execute(
    createRequest({
      ...payload,
      endpointSchema: getSapiV1ConvertTradeflowEndpointSchema,
    }),
    config
  );
}
