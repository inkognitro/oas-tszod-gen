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
import {Bank_account, Card, Source, Error} from '@example-outputs/stripe';

export const getCustomersCustomerSourcesEndpointSchema = {
  path: '/v1/customers/{customer}/sources',
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

export type GetCustomersCustomerSourcesRequest = RequestUnion<
  RequestBodyData<'application/x-www-form-urlencoded', {}>,
  {
    customer: string;
  },
  {
    ending_before?: string;
    expand?: string[];
    limit?: number; // int
    object?: string;
    starting_after?: string;
  }
>;

export type GetCustomersCustomerSourcesResponse =
  | ResponseUnion<
      200,
      ResponseBodyData<
        'application/json',
        {
          data: ((Bank_account | Card | Source) &
            (Partial<Bank_account> & Partial<Card> & Partial<Source>))[];
          has_more: boolean;
          object: 'list';
          url: string;
        }
      >
    >
  | ResponseUnion<any, ResponseBodyData<'application/json', Error>>;

export type GetCustomersCustomerSourcesRequestResult = RequestResult<
  GetCustomersCustomerSourcesRequest,
  GetCustomersCustomerSourcesResponse
>;

export function getCustomersCustomerSources(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<
    GetCustomersCustomerSourcesRequest,
    'pathParams' | 'contentType' | 'body',
    'queryParams'
  >,
  config?: RequestHandlerExecutionConfig
): Promise<GetCustomersCustomerSourcesRequestResult> {
  return requestHandler.execute(
    createRequest(getCustomersCustomerSourcesEndpointSchema, payload),
    config
  );
}
