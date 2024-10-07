import {z_Error, Error} from '@example-outputs/binance-with-zod';
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

export const getSapiV1ConvertLimitQueryopenordersEndpointSchema = {
  path: '/sapi/v1/convert/limit/queryOpenOrders',
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
                expiredTimestamp: z.number().int().safe().finite(),
              })
            ),
          }),
        },
      },
    },
    '400': {
      bodyByContentType: {
        'application/json': {
          zodSchema: z_Error,
        },
      },
    },
    '401': {
      bodyByContentType: {
        'application/json': {
          zodSchema: z_Error,
        },
      },
    },
  },
};

export type GetSapiV1ConvertLimitQueryopenordersRequest = RequestUnion<
  any,
  any,
  {
    recvWindow?: number; // int
    timestamp: number; // int
    signature: string;
  }
>;

export type GetSapiV1ConvertLimitQueryopenordersResponse =
  | ResponseUnion<
      200,
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
            expiredTimestamp: number; // int
          }[];
        }
      >
    >
  | ResponseUnion<400, ResponseBodyData<'application/json', Error>>
  | ResponseUnion<401, ResponseBodyData<'application/json', Error>>;

export type GetSapiV1ConvertLimitQueryopenordersRequestResult = RequestResult<
  GetSapiV1ConvertLimitQueryopenordersRequest,
  GetSapiV1ConvertLimitQueryopenordersResponse
>;

export function getSapiV1ConvertLimitQueryopenorders(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<
    GetSapiV1ConvertLimitQueryopenordersRequest,
    'queryParams',
    never
  >,
  config?: RequestHandlerExecutionConfig
): Promise<GetSapiV1ConvertLimitQueryopenordersRequestResult> {
  return requestHandler.execute(
    createRequest(getSapiV1ConvertLimitQueryopenordersEndpointSchema, payload),
    config
  );
}
