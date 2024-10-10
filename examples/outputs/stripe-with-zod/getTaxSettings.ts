import {z_Tax_Settings, Tax_Settings} from './tax';
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

export const getTaxSettingsEndpointSchema = {
  path: '/v1/tax/settings',
  method: 'get',
  supportedSecuritySchemas: [],
  queryParamsZodSchema: z.object({
    expand: z.array(z.string()).optional(),
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
          zodSchema: z_Tax_Settings,
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

export type GetTaxSettingsRequest = RequestUnion<
  RequestBodyData<'application/x-www-form-urlencoded', {}>,
  any,
  {
    expand?: string[];
  }
>;

export type GetTaxSettingsResponse =
  | ResponseUnion<200, ResponseBodyData<'application/json', Tax_Settings>>
  | ResponseUnion<any, ResponseBodyData<'application/json', Error>>;

export type GetTaxSettingsRequestResult = RequestResult<
  GetTaxSettingsRequest,
  GetTaxSettingsResponse
>;

export function getTaxSettings(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<
    GetTaxSettingsRequest,
    'contentType' | 'body',
    'queryParams'
  >,
  config?: RequestHandlerExecutionConfig
): Promise<GetTaxSettingsRequestResult> {
  return requestHandler.execute(
    createRequest(getTaxSettingsEndpointSchema, payload),
    config
  );
}
