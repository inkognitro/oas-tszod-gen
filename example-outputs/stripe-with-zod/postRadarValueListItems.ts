import {
  z_Radar_Value_list_item,
  z_Error,
  Radar_Value_list_item,
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

export const postRadarValueListItemsEndpointSchema = {
  path: '/v1/radar/value_list_items',
  method: 'post',
  supportedSecuritySchemas: [],
  bodyByContentType: {
    'application/x-www-form-urlencoded': {
      zodSchema: z.object({
        expand: z.array(z.string()).optional(),
        value: z.string(),
        value_list: z.string(),
      }),
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

export type PostRadarValueListItemsRequest = RequestUnion<
  RequestBodyData<
    'application/x-www-form-urlencoded',
    {
      expand?: string[];
      value: string;
      value_list: string;
    }
  >
>;

export type PostRadarValueListItemsResponse =
  | ResponseUnion<
      200,
      ResponseBodyData<'application/json', Radar_Value_list_item>
    >
  | ResponseUnion<any, ResponseBodyData<'application/json', Error>>;

export type PostRadarValueListItemsRequestResult = RequestResult<
  PostRadarValueListItemsRequest,
  PostRadarValueListItemsResponse
>;

export function postRadarValueListItems(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<
    PostRadarValueListItemsRequest,
    'contentType' | 'body',
    never
  >,
  config?: RequestHandlerExecutionConfig
): Promise<PostRadarValueListItemsRequestResult> {
  return requestHandler.execute(
    createRequest(postRadarValueListItemsEndpointSchema, payload),
    config
  );
}
