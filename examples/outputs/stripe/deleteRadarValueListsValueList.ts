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
import {Deleted_radar_Value_list} from './deleted_radar';
import {Error} from './schemas';

export const deleteRadarValueListsValueListEndpointSchema = {
  path: '/v1/radar/value_lists/{value_list}',
  method: 'delete',
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

export type DeleteRadarValueListsValueListRequest = RequestUnion<
  RequestBodyData<'application/x-www-form-urlencoded', {}>,
  {
    value_list: string;
  }
>;

export type DeleteRadarValueListsValueListResponse =
  | ResponseUnion<
      200,
      ResponseBodyData<'application/json', Deleted_radar_Value_list>
    >
  | ResponseUnion<any, ResponseBodyData<'application/json', Error>>;

export type DeleteRadarValueListsValueListRequestResult = RequestResult<
  DeleteRadarValueListsValueListRequest,
  DeleteRadarValueListsValueListResponse
>;

export function deleteRadarValueListsValueList(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<
    DeleteRadarValueListsValueListRequest,
    'pathParams' | 'contentType' | 'body',
    never
  >,
  config?: RequestHandlerExecutionConfig
): Promise<DeleteRadarValueListsValueListRequestResult> {
  return requestHandler.execute(
    createRequest(deleteRadarValueListsValueListEndpointSchema, payload),
    config
  );
}
