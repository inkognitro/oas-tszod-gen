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
import {Radar_Value_list_item} from './radar';
import {Error} from './schemas';

export const getRadarValueListItemsItemEndpointSchema = {
  path: '/v1/radar/value_list_items/{item}',
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

export type GetRadarValueListItemsItemRequest = RequestUnion<
  RequestBodyData<'application/x-www-form-urlencoded', {}>,
  {
    item: string;
  },
  {
    expand?: string[];
  }
>;

export type GetRadarValueListItemsItemResponse =
  | ResponseUnion<
      200,
      ResponseBodyData<'application/json', Radar_Value_list_item>
    >
  | ResponseUnion<any, ResponseBodyData<'application/json', Error>>;

export type GetRadarValueListItemsItemRequestResult = RequestResult<
  GetRadarValueListItemsItemRequest,
  GetRadarValueListItemsItemResponse
>;

export function getRadarValueListItemsItem(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<
    GetRadarValueListItemsItemRequest,
    'pathParams' | 'contentType' | 'body',
    'queryParams'
  >,
  config?: RequestHandlerExecutionConfig
): Promise<GetRadarValueListItemsItemRequestResult> {
  return requestHandler.execute(
    createRequest(getRadarValueListItemsItemEndpointSchema, payload),
    config
  );
}
