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

export const postSapiV1ConvertGetquoteEndpointSchema = {
  path: '/sapi/v1/convert/getQuote',
  method: 'post',
  supportedSecuritySchemas: [{name: 'ApiKeyAuth', scopes: []}],
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

export type PostSapiV1ConvertGetquoteRequest = RequestUnion<
  any,
  any,
  {
    fromAsset: string;
    toAsset: string;
    fromAmount?: number;
    toAmount?: number;
    validTime?: string;
    walletType?: string;
    recvWindow?: number; // int
    timestamp: number; // int
    signature: string;
  }
>;

export type PostSapiV1ConvertGetquoteResponse =
  | ResponseUnion<
      200,
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
  | ResponseUnion<400, ResponseBodyData<'application/json', Error>>
  | ResponseUnion<401, ResponseBodyData<'application/json', Error>>;

export type PostSapiV1ConvertGetquoteRequestResult = RequestResult<
  PostSapiV1ConvertGetquoteRequest,
  PostSapiV1ConvertGetquoteResponse
>;

export function postSapiV1ConvertGetquote(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<PostSapiV1ConvertGetquoteRequest, 'queryParams'>,
  config?: RequestHandlerExecutionConfig
): Promise<PostSapiV1ConvertGetquoteRequestResult> {
  return requestHandler.execute(
    createRequest(postSapiV1ConvertGetquoteEndpointSchema, payload),
    config
  );
}
