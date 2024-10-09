import {
  z_Deleted_radar_Value_list_item,
  z_Error,
  Deleted_radar_Value_list_item,
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

export const deleteRadarValueListItemsItemEndpointSchema = {
  path: '/v1/radar/value_list_items/{item}',
  method: 'delete',
  supportedSecuritySchemas: [],
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
          zodSchema: z_Deleted_radar_Value_list_item,
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
