import {z_Event, z_Error, Event, Error} from './schemas';
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

export const getEventsIdEndpointSchema = {
  path: '/v1/events/{id}',
  method: 'get',
  supportedSecuritySchemas: [],
  queryParamsZodSchema: z.object({
    expand: z.array(z.string()).optional(),
  }),
  pathParamsZodSchema: z.object({
    id: z.string(),
  }),
  bodyByContentType: {
    'application/x-www-form-urlencoded': {
      zodSchema: z.object({}),
    },
  },
  responseByStatus: {
    '200': {
      bodyByContentType: {
        'application/json': {
          zodSchema: z_Event,
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
