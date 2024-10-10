import {z_Application_fee, z_Error, Application_fee, Error} from './schemas';
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

export const getApplicationFeesIdEndpointSchema = {
  path: '/v1/application_fees/{id}',
  method: 'get',
  supportedSecuritySchemas: [],
  queryParamsZodSchema: z.object({
    expand: z.array(z.string()).optional(),
  }),
  pathParamsZodSchema: z.object({
    id: z.string(),
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
          zodSchema: z_Application_fee,
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

export type GetApplicationFeesIdRequest = RequestUnion<
  RequestBodyData<'application/x-www-form-urlencoded', {}>,
  {
    id: string;
  },
  {
    expand?: string[];
  }
>;

export type GetApplicationFeesIdResponse =
  | ResponseUnion<200, ResponseBodyData<'application/json', Application_fee>>
  | ResponseUnion<any, ResponseBodyData<'application/json', Error>>;

export type GetApplicationFeesIdRequestResult = RequestResult<
  GetApplicationFeesIdRequest,
  GetApplicationFeesIdResponse
>;

export function getApplicationFeesId(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<
    GetApplicationFeesIdRequest,
    'pathParams' | 'contentType' | 'body',
    'queryParams'
  >,
  config?: RequestHandlerExecutionConfig
): Promise<GetApplicationFeesIdRequestResult> {
  return requestHandler.execute(
    createRequest(getApplicationFeesIdEndpointSchema, payload),
    config
  );
}
