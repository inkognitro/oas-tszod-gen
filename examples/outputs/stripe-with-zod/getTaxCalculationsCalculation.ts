import {z_Tax_Calculation, Tax_Calculation} from './tax';
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

export const getTaxCalculationsCalculationEndpointSchema = {
  path: '/v1/tax/calculations/{calculation}',
  method: 'get',
  supportedSecuritySchemas: [],
  queryParamsZodSchema: z.object({
    expand: z.array(z.string()).optional(),
  }),
  pathParamsZodSchema: z.object({
    calculation: z.string(),
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
          zodSchema: z_Tax_Calculation,
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

export type GetTaxCalculationsCalculationRequest = RequestUnion<
  RequestBodyData<'application/x-www-form-urlencoded', {}>,
  {
    calculation: string;
  },
  {
    expand?: string[];
  }
>;

export type GetTaxCalculationsCalculationResponse =
  | ResponseUnion<200, ResponseBodyData<'application/json', Tax_Calculation>>
  | ResponseUnion<any, ResponseBodyData<'application/json', Error>>;

export type GetTaxCalculationsCalculationRequestResult = RequestResult<
  GetTaxCalculationsCalculationRequest,
  GetTaxCalculationsCalculationResponse
>;

export function getTaxCalculationsCalculation(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<
    GetTaxCalculationsCalculationRequest,
    'pathParams' | 'contentType' | 'body',
    'queryParams'
  >,
  config?: RequestHandlerExecutionConfig
): Promise<GetTaxCalculationsCalculationRequestResult> {
  return requestHandler.execute(
    createRequest(getTaxCalculationsCalculationEndpointSchema, payload),
    config
  );
}
