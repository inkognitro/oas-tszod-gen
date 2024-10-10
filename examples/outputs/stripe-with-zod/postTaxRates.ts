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

export const postTaxRatesEndpointSchema = {
  path: '/v1/tax_rates',
  method: 'post',
  supportedSecuritySchemas: [],
  bodyByContentType: {
    'application/x-www-form-urlencoded': {
      zodSchema: z.object({
        active: z.boolean().optional(),
        country: z.string().optional(),
        description: z.string().optional(),
        display_name: z.string(),
        expand: z.array(z.string()).optional(),
        inclusive: z.boolean(),
        jurisdiction: z.string().optional(),
        metadata: z.record(z.string()).optional(),
        percentage: z.number().safe().finite(),
        state: z.string().optional(),
        tax_type: z
          .enum([
            'amusement_tax',
            'communications_tax',
            'gst',
            'hst',
            'igst',
            'jct',
            'lease_tax',
            'pst',
            'qst',
            'rst',
            'sales_tax',
            'vat',
          ])
          .optional(),
      }),
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
