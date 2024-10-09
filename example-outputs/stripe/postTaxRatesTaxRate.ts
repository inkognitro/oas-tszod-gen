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
} from '@example-outputs/stripe/core';
import {Tax_rate, Error} from '@example-outputs/stripe';

export const postTaxRatesTaxRateEndpointSchema = {
  path: '/v1/tax_rates/{tax_rate}',
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

export type PostTaxRatesTaxRateRequest = RequestUnion<
  RequestBodyData<
    'application/x-www-form-urlencoded',
    {
      active?: boolean;
      country?: string;
      description?: string;
      display_name?: string;
      expand?: string[];
      jurisdiction?: string;
      metadata?:
        | {
            [key: string]: string;
          }
        | '';
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
  >,
  {
    tax_rate: string;
  }
>;

export type PostTaxRatesTaxRateResponse =
  | ResponseUnion<200, ResponseBodyData<'application/json', Tax_rate>>
  | ResponseUnion<any, ResponseBodyData<'application/json', Error>>;

export type PostTaxRatesTaxRateRequestResult = RequestResult<
  PostTaxRatesTaxRateRequest,
  PostTaxRatesTaxRateResponse
>;

export function postTaxRatesTaxRate(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<
    PostTaxRatesTaxRateRequest,
    'pathParams' | 'contentType' | 'body',
    never
  >,
  config?: RequestHandlerExecutionConfig
): Promise<PostTaxRatesTaxRateRequestResult> {
  return requestHandler.execute(
    createRequest(postTaxRatesTaxRateEndpointSchema, payload),
    config
  );
}
