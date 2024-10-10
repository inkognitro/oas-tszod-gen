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
import {Tax_Calculation} from './tax';
import {Error} from './schemas';

export const getTaxCalculationsCalculationEndpointSchema = {
  path: '/v1/tax/calculations/{calculation}',
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
