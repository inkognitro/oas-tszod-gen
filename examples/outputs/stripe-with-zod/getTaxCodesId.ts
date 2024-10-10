import {z_Tax_code, z_Error, Tax_code, Error} from './schemas';
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

export const getTaxCodesIdEndpointSchema = {
  path: '/v1/tax_codes/{id}',
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
          zodSchema: z_Tax_code,
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

export type GetTaxCodesIdRequest = RequestUnion<
  RequestBodyData<'application/x-www-form-urlencoded', {}>,
  {
    id: string;
  },
  {
    expand?: string[];
  }
>;

export type GetTaxCodesIdResponse =
  | ResponseUnion<200, ResponseBodyData<'application/json', Tax_code>>
  | ResponseUnion<any, ResponseBodyData<'application/json', Error>>;

export type GetTaxCodesIdRequestResult = RequestResult<
  GetTaxCodesIdRequest,
  GetTaxCodesIdResponse
>;

export function getTaxCodesId(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<
    GetTaxCodesIdRequest,
    'pathParams' | 'contentType' | 'body',
    'queryParams'
  >,
  config?: RequestHandlerExecutionConfig
): Promise<GetTaxCodesIdRequestResult> {
  return requestHandler.execute(
    createRequest(getTaxCodesIdEndpointSchema, payload),
    config
  );
}
