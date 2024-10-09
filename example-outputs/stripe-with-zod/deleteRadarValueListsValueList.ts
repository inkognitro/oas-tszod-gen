import {
  z_Deleted_radar_Value_list,
  z_Error,
  Deleted_radar_Value_list,
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

export const deleteRadarValueListsValueListEndpointSchema = {
  path: '/v1/radar/value_lists/{value_list}',
  method: 'delete',
  supportedSecuritySchemas: [],
  pathParamsZodSchema: z.object({
    value_list: z.string(),
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
          zodSchema: z_Deleted_radar_Value_list,
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
