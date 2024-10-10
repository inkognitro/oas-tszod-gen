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

export const postTaxRatesEndpointSchema = {
  path: '/v1/tax_rates',
  method: 'post',
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

export type PostTaxRatesRequest = RequestUnion<
  RequestBodyData<
    'application/x-www-form-urlencoded',
    {
      active?: boolean;
      country?: string;
      description?: string;
      display_name: string;
      expand?: string[];
      inclusive: boolean;
      jurisdiction?: string;
      metadata?: {
        [key: string]: string;
      };
      percentage: number;
      state?: string;
      tax_type?:
        | 'amusement_tax'
        | 'communications_tax'
        | 'gst'
        | 'hst'
        | 'igst'
        | 'jct'
        | 'lease_tax'
        | 'pst'
        | 'qst'
        | 'rst'
        | 'sales_tax'
        | 'vat';
    }
  >
>;

export type PostTaxRatesResponse =
  | ResponseUnion<200, ResponseBodyData<'application/json', Tax_rate>>
  | ResponseUnion<any, ResponseBodyData<'application/json', Error>>;

export type PostTaxRatesRequestResult = RequestResult<
  PostTaxRatesRequest,
  PostTaxRatesResponse
>;

export function postTaxRates(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<PostTaxRatesRequest, 'contentType' | 'body', never>,
  config?: RequestHandlerExecutionConfig
): Promise<PostTaxRatesRequestResult> {
  return requestHandler.execute(
    createRequest(postTaxRatesEndpointSchema, payload),
    config
  );
}
