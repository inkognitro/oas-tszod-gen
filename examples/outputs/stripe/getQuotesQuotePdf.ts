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
import {Error} from './schemas';

export const getQuotesQuotePdfEndpointSchema = {
  path: '/v1/quotes/{quote}/pdf',
  method: 'get',
  supportedSecuritySchemas: [],
  bodyByContentType: {
    'application/x-www-form-urlencoded': {},
  },
  responseByStatus: {
    '200': {
      bodyByContentType: {
        'application/pdf': {},
      },
    },
    default: {
      bodyByContentType: {
        'application/json': {},
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
