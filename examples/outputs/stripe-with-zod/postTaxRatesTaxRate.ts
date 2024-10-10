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

export const postTaxRatesTaxRateEndpointSchema = {
  path: '/v1/tax_rates/{tax_rate}',
  method: 'post',
  supportedSecuritySchemas: [],
  pathParamsZodSchema: z.object({
    tax_rate: z.string(),
  }),
  bodyByContentType: {
    'application/x-www-form-urlencoded': {
      zodSchema: z.object({
        active: z.boolean().optional(),
        country: z.string().optional(),
        description: z.string().optional(),
        display_name: z.string().optional(),
        expand: z.array(z.string()).optional(),
        jurisdiction: z.string().optional(),
        metadata: z.union([z.record(z.string()), z.enum([''])]).optional(),
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
