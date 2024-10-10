import {z_Quote, z_Error, Quote, Error} from './schemas';
import {z} from 'zod';
import {
  RequestUnion,
  RequestBodyData,
  ResponseBodyData,
  ResponseUnion,
  RequestResult,
  SimpleRequestHandler,
  createRequest,
  RequestHandlerExecutionConfig,
  RequestPayload,
} from './core';

export const postQuotesQuoteCancelEndpointSchema = {
  path: '/v1/quotes/{quote}/cancel',
  method: 'post',
  supportedSecuritySchemas: [],
  pathParamsZodSchema: z.object({
    quote: z.string(),
  }),
  bodyByContentType: {
    'application/x-www-form-urlencoded': {
      zodSchema: z.object({
        expand: z.array(z.string()).optional(),
      }),
    },
  },
  responseByStatus: {
    '200': {
      bodyByContentType: {
        'application/json': {
          zodSchema: z_Quote,
        },
      },
    },
    default: {
      bodyByContentType: {
        'application/json': {
          zodSchema: z_Error,
        },
      },
    },
  },
};

export type PostQuotesQuoteCancelRequest = RequestUnion<
  RequestBodyData<
    'application/x-www-form-urlencoded',
    {
      expand?: string[];
    }
  >,
  {
    quote: string;
  }
>;

export type PostQuotesQuoteCancelResponse =
  | ResponseUnion<200, ResponseBodyData<'application/json', Quote>>
  | ResponseUnion<any, ResponseBodyData<'application/json', Error>>;

export type PostQuotesQuoteCancelRequestResult = RequestResult<
  PostQuotesQuoteCancelRequest,
  PostQuotesQuoteCancelResponse
>;

export function postQuotesQuoteCancel(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<
    PostQuotesQuoteCancelRequest,
    'pathParams' | 'contentType' | 'body',
    never
  >,
  config?: RequestHandlerExecutionConfig
): Promise<PostQuotesQuoteCancelRequestResult> {
  return requestHandler.execute(
    createRequest(postQuotesQuoteCancelEndpointSchema, payload),
    config
  );
}
