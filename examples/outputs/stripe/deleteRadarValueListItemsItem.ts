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
import {Deleted_radar_Value_list_item} from './deleted_radar';
import {Error} from './schemas';

export const deleteRadarValueListItemsItemEndpointSchema = {
  path: '/v1/radar/value_list_items/{item}',
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

export type DeleteRadarValueListItemsItemRequest = RequestUnion<
  RequestBodyData<'application/x-www-form-urlencoded', {}>,
  {
    item: string;
  }
>;

export type DeleteRadarValueListItemsItemResponse =
  | ResponseUnion<
      200,
      ResponseBodyData<'application/json', Deleted_radar_Value_list_item>
    >
  | ResponseUnion<any, ResponseBodyData<'application/json', Error>>;

export type DeleteRadarValueListItemsItemRequestResult = RequestResult<
  DeleteRadarValueListItemsItemRequest,
  DeleteRadarValueListItemsItemResponse
>;

export function deleteRadarValueListItemsItem(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<
    DeleteRadarValueListItemsItemRequest,
    'pathParams' | 'contentType' | 'body',
    never
  >,
  config?: RequestHandlerExecutionConfig
): Promise<DeleteRadarValueListItemsItemRequestResult> {
  return requestHandler.execute(
    createRequest(deleteRadarValueListItemsItemEndpointSchema, payload),
    config
  );
}
