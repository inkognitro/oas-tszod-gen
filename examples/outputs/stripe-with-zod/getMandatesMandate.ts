import {z_Mandate, z_Error, Mandate, Error} from './schemas';
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

export const getMandatesMandateEndpointSchema = {
  path: '/v1/mandates/{mandate}',
  method: 'get',
  supportedSecuritySchemas: [],
  queryParamsZodSchema: z.object({
    expand: z.array(z.string()).optional(),
  }),
  pathParamsZodSchema: z.object({
    mandate: z.string(),
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
          zodSchema: z_Mandate,
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

export type GetMandatesMandateRequest = RequestUnion<
  RequestBodyData<'application/x-www-form-urlencoded', {}>,
  {
    mandate: string;
  },
  {
    expand?: string[];
  }
>;

export type GetMandatesMandateResponse =
  | ResponseUnion<200, ResponseBodyData<'application/json', Mandate>>
  | ResponseUnion<any, ResponseBodyData<'application/json', Error>>;

export type GetMandatesMandateRequestResult = RequestResult<
  GetMandatesMandateRequest,
  GetMandatesMandateResponse
>;

export function getMandatesMandate(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<
    GetMandatesMandateRequest,
    'pathParams' | 'contentType' | 'body',
    'queryParams'
  >,
  config?: RequestHandlerExecutionConfig
): Promise<GetMandatesMandateRequestResult> {
  return requestHandler.execute(
    createRequest(getMandatesMandateEndpointSchema, payload),
    config
  );
}
