import {z_Radar_Value_list_item, Radar_Value_list_item} from './radar';
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

export const getRadarValueListItemsItemEndpointSchema = {
  path: '/v1/radar/value_list_items/{item}',
  method: 'get',
  supportedSecuritySchemas: [],
  queryParamsZodSchema: z.object({
    expand: z.array(z.string()).optional(),
  }),
  pathParamsZodSchema: z.object({
    item: z.string(),
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
          zodSchema: z_Radar_Value_list_item,
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
