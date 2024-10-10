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

export const postAcceptQuoteEndpointSchema = {
  path: '/sapi/v1/convert/acceptQuote',
  method: 'post',
  supportedSecuritySchemas: [{name: 'ApiKeyAuth', scopes: []}],
  queryParamsZodSchema: z.object({
    quoteId: z.string(),
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
            orderId: z.string(),
            createTime: z.number().int().safe().finite(),
            orderStatus: z.string(),
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

export type PostAcceptQuoteRequest = RequestUnion<
  any,
  any,
  {
    quoteId: string;
    recvWindow?: number; // int
    timestamp: number; // int
    signature: string;
  }
>;

export type PostAcceptQuoteResponse =
  | ResponseUnion<
      200,
      ResponseBodyData<
        'application/json',
        {
          orderId: string;
          createTime: number; // int
          orderStatus: string;
        }
      >
    >
  | ResponseUnion<400, ResponseBodyData<'application/json', Error>>
  | ResponseUnion<401, ResponseBodyData<'application/json', Error>>;

export type PostAcceptQuoteRequestResult = RequestResult<
  PostAcceptQuoteRequest,
  PostAcceptQuoteResponse
>;

export function postAcceptQuote(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<PostAcceptQuoteRequest, 'queryParams', never>,
  config?: RequestHandlerExecutionConfig
): Promise<PostAcceptQuoteRequestResult> {
  return requestHandler.execute(
    createRequest(postAcceptQuoteEndpointSchema, payload),
    config
  );
}
