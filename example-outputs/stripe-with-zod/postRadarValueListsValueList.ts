import {
  z_Radar_Value_list,
  z_Error,
  Radar_Value_list,
  Error,
} from '@example-outputs/stripe-with-zod';
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
} from '@example-outputs/stripe-with-zod/core';

export const postRadarValueListsValueListEndpointSchema = {
  path: '/v1/radar/value_lists/{value_list}',
  method: 'post',
  supportedSecuritySchemas: [],
  pathParamsZodSchema: z.object({
    value_list: z.string(),
  }),
  bodyByContentType: {
    'application/x-www-form-urlencoded': {
      zodSchema: z.object({
        alias: z.string().optional(),
        expand: z.array(z.string()).optional(),
        metadata: z.record(z.string()).optional(),
        name: z.string().optional(),
      }),
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

export type PostRadarValueListsValueListRequest = RequestUnion<
  RequestBodyData<
    'application/x-www-form-urlencoded',
    {
      alias?: string;
      expand?: string[];
      metadata?: {
        [key: string]: string;
      };
      name?: string;
    }
  >,
  {
    value_list: string;
  }
>;

export type PostRadarValueListsValueListResponse =
  | ResponseUnion<200, ResponseBodyData<'application/json', Radar_Value_list>>
  | ResponseUnion<any, ResponseBodyData<'application/json', Error>>;

export type PostRadarValueListsValueListRequestResult = RequestResult<
  PostRadarValueListsValueListRequest,
  PostRadarValueListsValueListResponse
>;

export function postRadarValueListsValueList(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<
    PostRadarValueListsValueListRequest,
    'pathParams' | 'contentType' | 'body',
    never
  >,
  config?: RequestHandlerExecutionConfig
): Promise<PostRadarValueListsValueListRequestResult> {
  return requestHandler.execute(
    createRequest(postRadarValueListsValueListEndpointSchema, payload),
    config
  );
}
