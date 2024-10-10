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
import {Quote, Error} from './schemas';

export const postQuotesQuoteEndpointSchema = {
  path: '/v1/quotes/{quote}',
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

export type PostQuotesQuoteRequest = RequestUnion<
  RequestBodyData<
    'application/x-www-form-urlencoded',
    {
      application_fee_amount?: number | '';
      application_fee_percent?: number | '';
      automatic_tax?: {
        enabled: boolean;
        liability?: {
          account?: string;
          type: 'account' | 'self';
        };
      };
      collection_method?: 'charge_automatically' | 'send_invoice';
      customer?: string;
      default_tax_rates?: string[] | '';
      description?: string | '';
      discounts?:
        | {
            coupon?: string;
            discount?: string;
            promotion_code?: string;
          }[]
        | '';
      expand?: string[];
      expires_at?: number; // int
      footer?: string | '';
      header?: string | '';
      invoice_settings?: {
        days_until_due?: number; // int
        issuer?: {
          account?: string;
          type: 'account' | 'self';
        };
      };
      line_items?: {
        discounts?:
          | {
              coupon?: string;
              discount?: string;
              promotion_code?: string;
            }[]
          | '';
        id?: string;
        price?: string;
        price_data?: {
          currency: string;
          product: string;
          recurring?: {
            interval: 'day' | 'month' | 'week' | 'year';
            interval_count?: number; // int
          };
          tax_behavior?: 'exclusive' | 'inclusive' | 'unspecified';
          unit_amount?: number; // int
          unit_amount_decimal?: string; // decimal
        };
        quantity?: number; // int
        tax_rates?: string[] | '';
      }[];
      metadata?: {
        [key: string]: string;
      };
      on_behalf_of?: string | '';
      subscription_data?: {
        description?: string | '';
        effective_date?: 'current_period_end' | number | '';
        metadata?: {
          [key: string]: string;
        };
        trial_period_days?: number | '';
      };
      transfer_data?: (
        | {
            amount?: number; // int
            amount_percent?: number;
            destination: string;
          }
        | ''
      ) &
        Partial<{
          amount?: number; // int
          amount_percent?: number;
          destination: string;
        }>;
    }
  >,
  {
    quote: string;
  }
>;

export type PostQuotesQuoteResponse =
  | ResponseUnion<200, ResponseBodyData<'application/json', Quote>>
  | ResponseUnion<any, ResponseBodyData<'application/json', Error>>;

export type PostQuotesQuoteRequestResult = RequestResult<
  PostQuotesQuoteRequest,
  PostQuotesQuoteResponse
>;

export function postQuotesQuote(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<
    PostQuotesQuoteRequest,
    'pathParams' | 'contentType' | 'body',
    never
  >,
  config?: RequestHandlerExecutionConfig
): Promise<PostQuotesQuoteRequestResult> {
  return requestHandler.execute(
    createRequest(postQuotesQuoteEndpointSchema, payload),
    config
  );
}
