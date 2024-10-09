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

export const getRadarValueListsValueListEndpointSchema = {
  path: '/v1/radar/value_lists/{value_list}',
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
