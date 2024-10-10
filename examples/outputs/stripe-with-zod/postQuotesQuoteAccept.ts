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

export const postQuotesQuoteAcceptEndpointSchema = {
  path: '/v1/quotes/{quote}/accept',
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

export type PostQuotesQuoteAcceptRequest = RequestUnion<
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

export type PostQuotesQuoteAcceptResponse =
  | ResponseUnion<200, ResponseBodyData<'application/json', Quote>>
  | ResponseUnion<any, ResponseBodyData<'application/json', Error>>;

export type PostQuotesQuoteAcceptRequestResult = RequestResult<
  PostQuotesQuoteAcceptRequest,
  PostQuotesQuoteAcceptResponse
>;

export function postQuotesQuoteAccept(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<
    PostQuotesQuoteAcceptRequest,
    'pathParams' | 'contentType' | 'body',
    never
  >,
  config?: RequestHandlerExecutionConfig
): Promise<PostQuotesQuoteAcceptRequestResult> {
  return requestHandler.execute(
    createRequest(postQuotesQuoteAcceptEndpointSchema, payload),
    config
  );
}
