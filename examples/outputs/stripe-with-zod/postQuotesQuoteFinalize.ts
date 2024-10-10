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

export const postQuotesQuoteFinalizeEndpointSchema = {
  path: '/v1/quotes/{quote}/finalize',
  method: 'post',
  supportedSecuritySchemas: [],
  pathParamsZodSchema: z.object({
    quote: z.string(),
  }),
  bodyByContentType: {
    'application/x-www-form-urlencoded': {
      zodSchema: z.object({
        expand: z.array(z.string()).optional(),
        expires_at: z.number().int().safe().finite().optional(),
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

export type PostQuotesQuoteFinalizeRequest = RequestUnion<
  RequestBodyData<
    'application/x-www-form-urlencoded',
    {
      expand?: string[];
      expires_at?: number; // int
    }
  >,
  {
    quote: string;
  }
>;

export type PostQuotesQuoteFinalizeResponse =
  | ResponseUnion<200, ResponseBodyData<'application/json', Quote>>
  | ResponseUnion<any, ResponseBodyData<'application/json', Error>>;

export type PostQuotesQuoteFinalizeRequestResult = RequestResult<
  PostQuotesQuoteFinalizeRequest,
  PostQuotesQuoteFinalizeResponse
>;

export function postQuotesQuoteFinalize(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<
    PostQuotesQuoteFinalizeRequest,
    'pathParams' | 'contentType' | 'body',
    never
  >,
  config?: RequestHandlerExecutionConfig
): Promise<PostQuotesQuoteFinalizeRequestResult> {
  return requestHandler.execute(
    createRequest(postQuotesQuoteFinalizeEndpointSchema, payload),
    config
  );
}
