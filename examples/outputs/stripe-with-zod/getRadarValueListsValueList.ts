import {z_Radar_Value_list, Radar_Value_list} from './radar';
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

export const getRadarValueListsValueListEndpointSchema = {
  path: '/v1/radar/value_lists/{value_list}',
  method: 'get',
  supportedSecuritySchemas: [],
  queryParamsZodSchema: z.object({
    expand: z.array(z.string()).optional(),
  }),
  pathParamsZodSchema: z.object({
    value_list: z.string(),
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
          zodSchema: z_Radar_Value_list,
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

export type GetRadarValueListsValueListRequest = RequestUnion<
  RequestBodyData<'application/x-www-form-urlencoded', {}>,
  {
    value_list: string;
  },
  {
    expand?: string[];
  }
>;

export type GetRadarValueListsValueListResponse =
  | ResponseUnion<200, ResponseBodyData<'application/json', Radar_Value_list>>
  | ResponseUnion<any, ResponseBodyData<'application/json', Error>>;

export type GetRadarValueListsValueListRequestResult = RequestResult<
  GetRadarValueListsValueListRequest,
  GetRadarValueListsValueListResponse
>;

export function getRadarValueListsValueList(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<
    GetRadarValueListsValueListRequest,
    'pathParams' | 'contentType' | 'body',
    'queryParams'
  >,
  config?: RequestHandlerExecutionConfig
): Promise<GetRadarValueListsValueListRequestResult> {
  return requestHandler.execute(
    createRequest(getRadarValueListsValueListEndpointSchema, payload),
    config
  );
}
