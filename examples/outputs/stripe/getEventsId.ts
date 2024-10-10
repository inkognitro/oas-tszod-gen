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
import {Event, Error} from './schemas';

export const getEventsIdEndpointSchema = {
  path: '/v1/events/{id}',
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

export type GetEventsIdRequest = RequestUnion<
  RequestBodyData<'application/x-www-form-urlencoded', {}>,
  {
    id: string;
  },
  {
    expand?: string[];
  }
>;

export type GetEventsIdResponse =
  | ResponseUnion<200, ResponseBodyData<'application/json', Event>>
  | ResponseUnion<any, ResponseBodyData<'application/json', Error>>;

export type GetEventsIdRequestResult = RequestResult<
  GetEventsIdRequest,
  GetEventsIdResponse
>;

export function getEventsId(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<
    GetEventsIdRequest,
    'pathParams' | 'contentType' | 'body',
    'queryParams'
  >,
  config?: RequestHandlerExecutionConfig
): Promise<GetEventsIdRequestResult> {
  return requestHandler.execute(
    createRequest(getEventsIdEndpointSchema, payload),
    config
  );
}
