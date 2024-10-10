import {z_Tax_rate, z_Error, Tax_rate, Error} from './schemas';
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

export const getTaxRatesTaxRateEndpointSchema = {
  path: '/v1/tax_rates/{tax_rate}',
  method: 'get',
  supportedSecuritySchemas: [],
  queryParamsZodSchema: z.object({
    expand: z.array(z.string()).optional(),
  }),
  pathParamsZodSchema: z.object({
    tax_rate: z.string(),
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
          zodSchema: z_Tax_rate,
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

export type GetTaxRatesTaxRateRequest = RequestUnion<
  RequestBodyData<'application/x-www-form-urlencoded', {}>,
  {
    tax_rate: string;
  },
  {
    expand?: string[];
  }
>;

export type GetTaxRatesTaxRateResponse =
  | ResponseUnion<200, ResponseBodyData<'application/json', Tax_rate>>
  | ResponseUnion<any, ResponseBodyData<'application/json', Error>>;

export type GetTaxRatesTaxRateRequestResult = RequestResult<
  GetTaxRatesTaxRateRequest,
  GetTaxRatesTaxRateResponse
>;

export function getTaxRatesTaxRate(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<
    GetTaxRatesTaxRateRequest,
    'pathParams' | 'contentType' | 'body',
    'queryParams'
  >,
  config?: RequestHandlerExecutionConfig
): Promise<GetTaxRatesTaxRateRequestResult> {
  return requestHandler.execute(
    createRequest(getTaxRatesTaxRateEndpointSchema, payload),
    config
  );
}
