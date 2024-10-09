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
} from '@example-outputs/stripe/core';
import {Radar_Value_list, Error} from '@example-outputs/stripe';

export const postRadarValueListsValueListEndpointSchema = {
  path: '/v1/radar/value_lists/{value_list}',
  method: 'post',
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
