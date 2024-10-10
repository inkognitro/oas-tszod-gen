import {z_Error, Error} from './schemas';
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

export const getQuotesQuotePdfEndpointSchema = {
  path: '/v1/quotes/{quote}/pdf',
  method: 'get',
  supportedSecuritySchemas: [],
  queryParamsZodSchema: z.object({
    expand: z.array(z.string()).optional(),
  }),
  pathParamsZodSchema: z.object({
    quote: z.string(),
  }),
  bodyByContentType: {
    'application/x-www-form-urlencoded': {
      zodSchema: z.object({}),
    },
  },
  responseByStatus: {
    '200': {
      bodyByContentType: {
        'application/pdf': {
          zodSchema: z.any(),
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

export type GetQuotesQuotePdfRequest = RequestUnion<
  RequestBodyData<'application/x-www-form-urlencoded', {}>,
  {
    quote: string;
  },
  {
    expand?: string[];
  }
>;

export type GetQuotesQuotePdfResponse =
  | ResponseUnion<200, ResponseBodyData<'application/pdf', Blob | any>>
  | ResponseUnion<any, ResponseBodyData<'application/json', Error>>;

export type GetQuotesQuotePdfRequestResult = RequestResult<
  GetQuotesQuotePdfRequest,
  GetQuotesQuotePdfResponse
>;

export function getQuotesQuotePdf(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<
    GetQuotesQuotePdfRequest,
    'pathParams' | 'contentType' | 'body',
    'queryParams'
  >,
  config?: RequestHandlerExecutionConfig
): Promise<GetQuotesQuotePdfRequestResult> {
  return requestHandler.execute(
    createRequest(getQuotesQuotePdfEndpointSchema, payload),
    config
  );
}
