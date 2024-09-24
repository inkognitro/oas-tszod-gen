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

export const postSapiV1ConvertGetquoteEndpointSchema = {
  path: '/sapi/v1/convert/getQuote',
  method: 'post',
  supportedSecuritySchemas: [{name: 'ApiKeyAuth', requiredPermissions: []}],
  queryParamsZodSchema: z.object({
    fromAsset: z.string(),
    toAsset: z.string(),
    fromAmount: z.number().safe().finite().optional(),
    toAmount: z.number().safe().finite().optional(),
    validTime: z.string().optional(),
    walletType: z.string().optional(),
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
            quoteId: z.string(),
            ratio: z.string(),
            inverseRatio: z.string(),
            validTimestamp: z.number().int().safe().finite(),
            toAmount: z.string(),
            fromAmount: z.string(),
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

export type PostSapiV1ConvertGetquotePayload = {
  queryParams: {
    fromAsset: string;
    toAsset: string;
    fromAmount?: number;
    toAmount?: number;
    validTime?: string;
    walletType?: string;
    recvWindow?: number; // int
    timestamp: number; // int
    signature: string;
  };
};

export type PostSapiV1ConvertGetquoteResponse =
  | Response<
      200,
      ResponseData<
        ResponseBodyData<
          'application/json',
          {
            quoteId: string;
            ratio: string;
            inverseRatio: string;
            validTimestamp: number; // int
            toAmount: string;
            fromAmount: string;
          }
        >
      >
    >
  | Response<400, ResponseData<ResponseBodyData<'application/json', Error>>>
  | Response<401, ResponseData<ResponseBodyData<'application/json', Error>>>;

export type PostSapiV1ConvertGetquoteRequestResult = RequestResult<
  Request,
  PostSapiV1ConvertGetquoteResponse
>;

export function postSapiV1ConvertGetquote(
  requestHandler: RequestHandler,
  payload: PostSapiV1ConvertGetquotePayload,
  config?: RequestHandlerExecutionConfig
): Promise<PostSapiV1ConvertGetquoteRequestResult> {
  return requestHandler.execute(
    createRequest({
      ...payload,
      endpointSchema: postSapiV1ConvertGetquoteEndpointSchema,
    }),
    config
  );
}
