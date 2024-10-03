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

export const getSapiV1FiatOrdersEndpointSchema = {
  path: '/sapi/v1/fiat/orders',
  method: 'get',
  supportedSecuritySchemas: [{name: 'ApiKeyAuth', scopes: []}],
  queryParamsZodSchema: z.object({
    transactionType: z.number().int().safe().finite().gte(0).lte(1),
    beginTime: z.number().int().safe().finite().optional(),
    endTime: z.number().int().safe().finite().optional(),
    page: z.number().int().safe().finite().optional(),
    rows: z.number().int().safe().finite().optional(),
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
            code: z.string(),
            message: z.string(),
            data: z.array(
              z.object({
                orderNo: z.string(),
                fiatCurrency: z.string(),
                indicatedAmount: z.string(),
                amount: z.string(),
                totalFee: z.string(),
                method: z.string(),
                status: z.string(),
                createTime: z.number().int().safe().finite(),
                updateTime: z.number().int().safe().finite(),
              })
            ),
            total: z.number().int().safe().finite(),
            success: z.boolean(),
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

export type GetSapiV1FiatOrdersRequest = RequestUnion<
  any,
  any,
  {
    transactionType: number; // int
    beginTime?: number; // int
    endTime?: number; // int
    page?: number; // int
    rows?: number; // int
    recvWindow?: number; // int
    timestamp: number; // int
    signature: string;
  }
>;

export type GetSapiV1FiatOrdersResponse =
  | ResponseUnion<
      200,
      ResponseBodyData<
        'application/json',
        {
          code: string;
          message: string;
          data: {
            orderNo: string;
            fiatCurrency: string;
            indicatedAmount: string;
            amount: string;
            totalFee: string;
            method: string;
            status: string;
            createTime: number; // int
            updateTime: number; // int
          }[];
          total: number; // int
          success: boolean;
        }
      >
    >
  | ResponseUnion<400, ResponseBodyData<'application/json', Error>>
  | ResponseUnion<401, ResponseBodyData<'application/json', Error>>;

export type GetSapiV1FiatOrdersRequestResult = RequestResult<
  GetSapiV1FiatOrdersRequest,
  GetSapiV1FiatOrdersResponse
>;

export function getSapiV1FiatOrders(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<GetSapiV1FiatOrdersRequest, 'queryParams'>,
  config?: RequestHandlerExecutionConfig
): Promise<GetSapiV1FiatOrdersRequestResult> {
  return requestHandler.execute(
    createRequest(getSapiV1FiatOrdersEndpointSchema, payload),
    config
  );
}
