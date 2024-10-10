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
import {Payment_source, Error} from './schemas';

export const postCustomersCustomerCardsEndpointSchema = {
  path: '/v1/customers/{customer}/cards',
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

export type PostCustomersCustomerCardsRequest = RequestUnion<
  RequestBodyData<
    'application/x-www-form-urlencoded',
    {
      alipay_account?: string;
      bank_account?: (
        | {
            account_holder_name?: string;
            account_holder_type?: 'company' | 'individual';
            account_number: string;
            country: string;
            currency?: string;
            object?: 'bank_account';
            routing_number?: string;
          }
        | string
      ) &
        Partial<{
          account_holder_name?: string;
          account_holder_type?: 'company' | 'individual';
          account_number: string;
          country: string;
          currency?: string;
          object?: 'bank_account';
          routing_number?: string;
        }>;
      card?: (
        | {
            address_city?: string;
            address_country?: string;
            address_line1?: string;
            address_line2?: string;
            address_state?: string;
            address_zip?: string;
            cvc?: string;
            exp_month: number; // int
            exp_year: number; // int
            metadata?: {
              [key: string]: string;
            };
            name?: string;
            number: string;
            object?: 'card';
          }
        | string
      ) &
        Partial<{
          address_city?: string;
          address_country?: string;
          address_line1?: string;
          address_line2?: string;
          address_state?: string;
          address_zip?: string;
          cvc?: string;
          exp_month: number; // int
          exp_year: number; // int
          metadata?: {
            [key: string]: string;
          };
          name?: string;
          number: string;
          object?: 'card';
        }>;
      expand?: string[];
      metadata?: {
        [key: string]: string;
      };
      source?: string;
    }
  >,
  {
    customer: string;
  }
>;

export type PostCustomersCustomerCardsResponse =
  | ResponseUnion<200, ResponseBodyData<'application/json', Payment_source>>
  | ResponseUnion<any, ResponseBodyData<'application/json', Error>>;

export type PostCustomersCustomerCardsRequestResult = RequestResult<
  PostCustomersCustomerCardsRequest,
  PostCustomersCustomerCardsResponse
>;

export function postCustomersCustomerCards(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<
    PostCustomersCustomerCardsRequest,
    'pathParams' | 'contentType' | 'body',
    never
  >,
  config?: RequestHandlerExecutionConfig
): Promise<PostCustomersCustomerCardsRequestResult> {
  return requestHandler.execute(
    createRequest(postCustomersCustomerCardsEndpointSchema, payload),
    config
  );
}
