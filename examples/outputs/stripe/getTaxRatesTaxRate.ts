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
import {Tax_rate, Error} from './schemas';

export const getTaxRatesTaxRateEndpointSchema = {
  path: '/v1/tax_rates/{tax_rate}',
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
