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
import {Card, Bank_account, Source, Error} from '@example-outputs/stripe';

export const postCustomersCustomerSourcesIdEndpointSchema = {
  path: '/v1/customers/{customer}/sources/{id}',
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

export type PostCustomersCustomerSourcesIdRequest = RequestUnion<
  RequestBodyData<
    'application/x-www-form-urlencoded',
    {
      account_holder_name?: string;
      account_holder_type?: 'company' | 'individual';
      address_city?: string;
      address_country?: string;
      address_line1?: string;
      address_line2?: string;
      address_state?: string;
      address_zip?: string;
      exp_month?: string;
      exp_year?: string;
      expand?: string[];
      metadata?:
        | {
            [key: string]: string;
          }
        | '';
      name?: string;
      owner?: {
        address?: {
          city?: string;
          country?: string;
          line1?: string;
          line2?: string;
          postal_code?: string;
          state?: string;
        };
        email?: string;
        name?: string;
        phone?: string;
      };
    }
  >,
  {
    customer: string;
    id: string;
  }
>;

export type PostCustomersCustomerSourcesIdResponse =
  | ResponseUnion<
      200,
      ResponseBodyData<
        'application/json',
        (Card | Bank_account | Source) &
          (Partial<Card> & Partial<Bank_account> & Partial<Source>)
      >
    >
  | ResponseUnion<any, ResponseBodyData<'application/json', Error>>;

export type PostCustomersCustomerSourcesIdRequestResult = RequestResult<
  PostCustomersCustomerSourcesIdRequest,
  PostCustomersCustomerSourcesIdResponse
>;

export function postCustomersCustomerSourcesId(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<
    PostCustomersCustomerSourcesIdRequest,
    'pathParams' | 'contentType' | 'body',
    never
  >,
  config?: RequestHandlerExecutionConfig
): Promise<PostCustomersCustomerSourcesIdRequestResult> {
  return requestHandler.execute(
    createRequest(postCustomersCustomerSourcesIdEndpointSchema, payload),
    config
  );
}
