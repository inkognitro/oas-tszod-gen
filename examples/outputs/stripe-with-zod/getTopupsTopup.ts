import {z_Topup, z_Error, Topup, Error} from './schemas';
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

export const getTopupsTopupEndpointSchema = {
  path: '/v1/topups/{topup}',
  method: 'get',
  supportedSecuritySchemas: [],
  queryParamsZodSchema: z.object({
    expand: z.array(z.string()).optional(),
  }),
  pathParamsZodSchema: z.object({
    topup: z.string(),
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
          zodSchema: z_Topup,
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

export type GetTopupsTopupRequest = RequestUnion<
  RequestBodyData<'application/x-www-form-urlencoded', {}>,
  {
    topup: string;
  },
  {
    expand?: string[];
  }
>;

export type GetTopupsTopupResponse =
  | ResponseUnion<200, ResponseBodyData<'application/json', Topup>>
  | ResponseUnion<any, ResponseBodyData<'application/json', Error>>;

export type GetTopupsTopupRequestResult = RequestResult<
  GetTopupsTopupRequest,
  GetTopupsTopupResponse
>;

export function getTopupsTopup(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<
    GetTopupsTopupRequest,
    'pathParams' | 'contentType' | 'body',
    'queryParams'
  >,
  config?: RequestHandlerExecutionConfig
): Promise<GetTopupsTopupRequestResult> {
  return requestHandler.execute(
    createRequest(getTopupsTopupEndpointSchema, payload),
    config
  );
}
