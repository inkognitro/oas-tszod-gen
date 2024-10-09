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
import {Radar_Value_list_item, Error} from '@example-outputs/stripe';

export const getRadarValueListItemsEndpointSchema = {
  path: '/v1/radar/value_list_items',
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

export type GetRadarValueListItemsRequest = RequestUnion<
  RequestBodyData<'application/x-www-form-urlencoded', {}>,
  any,
  {
    created?: (
      | {
          gt?: number; // int
          gte?: number; // int
          lt?: number; // int
          lte?: number; // int
        }
      | number
    ) &
      Partial<{
        gt?: number; // int
        gte?: number; // int
        lt?: number; // int
        lte?: number; // int
      }>;
    ending_before?: string;
    expand?: string[];
    limit?: number; // int
    starting_after?: string;
    value?: string;
    value_list: string;
  }
>;

export type GetRadarValueListItemsResponse =
  | ResponseUnion<
      200,
      ResponseBodyData<
        'application/json',
        {
          data: Radar_Value_list_item[];
          has_more: boolean;
          object: 'list';
          url: string;
        }
      >
    >
  | ResponseUnion<any, ResponseBodyData<'application/json', Error>>;

export type GetRadarValueListItemsRequestResult = RequestResult<
  GetRadarValueListItemsRequest,
  GetRadarValueListItemsResponse
>;

export function getRadarValueListItems(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<
    GetRadarValueListItemsRequest,
    'queryParams' | 'contentType' | 'body',
    never
  >,
  config?: RequestHandlerExecutionConfig
): Promise<GetRadarValueListItemsRequestResult> {
  return requestHandler.execute(
    createRequest(getRadarValueListItemsEndpointSchema, payload),
    config
  );
}
