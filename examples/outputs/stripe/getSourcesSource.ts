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
import {Source, Error} from './schemas';

export const getSourcesSourceEndpointSchema = {
  path: '/v1/sources/{source}',
  method: 'get',
  supportedSecuritySchemas: [],
  bodyByContentType: {
    'application/x-www-form-urlencoded': {},
  },
  responseByStatus: {
    '200': {
      bodyByContentType: {
        'application/json': {},
      },
    },
    default: {
      bodyByContentType: {
        'application/json': {},
      },
    },
  },
};

export type GetSourcesSourceRequest = RequestUnion<
  RequestBodyData<'application/x-www-form-urlencoded', {}>,
  {
    source: string;
  },
  {
    client_secret?: string;
    expand?: string[];
  }
>;

export type GetSourcesSourceResponse =
  | ResponseUnion<200, ResponseBodyData<'application/json', Source>>
  | ResponseUnion<any, ResponseBodyData<'application/json', Error>>;

export type GetSourcesSourceRequestResult = RequestResult<
  GetSourcesSourceRequest,
  GetSourcesSourceResponse
>;

export function getSourcesSource(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<
    GetSourcesSourceRequest,
    'pathParams' | 'contentType' | 'body',
    'queryParams'
  >,
  config?: RequestHandlerExecutionConfig
): Promise<GetSourcesSourceRequestResult> {
  return requestHandler.execute(
    createRequest(getSourcesSourceEndpointSchema, payload),
    config
  );
}
