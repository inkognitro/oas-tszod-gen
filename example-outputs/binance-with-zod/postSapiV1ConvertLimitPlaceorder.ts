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

export const postSapiV1ConvertLimitPlaceorderEndpointSchema = {
  path: '/sapi/v1/convert/limit/placeOrder',
  method: 'post',
  supportedSecuritySchemas: [{name: 'ApiKeyAuth', scopes: []}],
  queryParamsZodSchema: z.object({
    baseAsset: z.string(),
    quoteAsset: z.string(),
    limitPrice: z.number().safe().finite(),
    baseAmount: z.number().safe().finite().optional(),
    quoteAmount: z.number().safe().finite().optional(),
    side: z.enum(['SELL', 'BUY']),
    walletType: z.enum(['SPOT', 'FUNDING', 'SPOT_FUNDING']).optional(),
    expiredType: z.enum(['1_D', '3_D', '7_D', '30_D']).optional(),
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
            status: z.string(),
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

export type PostSapiV1ConvertLimitPlaceorderPayload = {
  queryParams: {
    baseAsset: string;
    quoteAsset: string;
    limitPrice: number;
    baseAmount?: number;
    quoteAmount?: number;
    side: 'SELL' | 'BUY';
    walletType?: 'SPOT' | 'FUNDING' | 'SPOT_FUNDING';
    expiredType?: '1_D' | '3_D' | '7_D' | '30_D';
    recvWindow?: number; // int
    timestamp: number; // int
    signature: string;
  };
};

export type PostSapiV1ConvertLimitPlaceorderResponse =
  | ResponseUnion<
      200,
      ResponseBodyData<
        'application/json',
        {
          orderId: number; // int
          status: string;
        }
      >
    >
  | ResponseUnion<400, ResponseBodyData<'application/json', Error>>
  | ResponseUnion<401, ResponseBodyData<'application/json', Error>>;

export type PostSapiV1ConvertLimitPlaceorderRequestResult = RequestResult<
  Request,
  PostSapiV1ConvertLimitPlaceorderResponse
>;

export function postSapiV1ConvertLimitPlaceorder(
  requestHandler: SimpleRequestHandler,
  payload: PostSapiV1ConvertLimitPlaceorderPayload,
  config?: RequestHandlerExecutionConfig
): Promise<PostSapiV1ConvertLimitPlaceorderRequestResult> {
  return requestHandler.execute(
    createRequest({
      ...payload,
      endpointSchema: postSapiV1ConvertLimitPlaceorderEndpointSchema,
    }),
    config
  );
}
