import {z_Error, Error} from '../../../';
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
} from '../../../core';

export const postGetQuoteEndpointSchema = {
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

export type PostGetQuoteRequest = RequestUnion<
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

export type PostGetQuoteResponse =
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

export type PostGetQuoteRequestResult = RequestResult<
  PostGetQuoteRequest,
  PostGetQuoteResponse
>;

export function postGetQuote(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<PostGetQuoteRequest, 'queryParams', never>,
  config?: RequestHandlerExecutionConfig
): Promise<PostGetQuoteRequestResult> {
  return requestHandler.execute(
    createRequest(postGetQuoteEndpointSchema, payload),
    config
  );
}
