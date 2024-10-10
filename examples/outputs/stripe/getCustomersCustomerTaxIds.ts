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
import {Tax_id, Error} from './schemas';

export const getCustomersCustomerTaxIdsEndpointSchema = {
  path: '/v1/customers/{customer}/tax_ids',
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

export type GetCustomersCustomerTaxIdsRequest = RequestUnion<
  RequestBodyData<'application/x-www-form-urlencoded', {}>,
  {
    customer: string;
  },
  {
    ending_before?: string;
    expand?: string[];
    limit?: number; // int
    starting_after?: string;
  }
>;

export type GetCustomersCustomerTaxIdsResponse =
  | ResponseUnion<
      200,
      ResponseBodyData<
        'application/json',
        {
          data: Tax_id[];
          has_more: boolean;
          object: 'list';
          url: string;
        }
      >
    >
  | ResponseUnion<any, ResponseBodyData<'application/json', Error>>;

export type GetCustomersCustomerTaxIdsRequestResult = RequestResult<
  GetCustomersCustomerTaxIdsRequest,
  GetCustomersCustomerTaxIdsResponse
>;

export function getCustomersCustomerTaxIds(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<
    GetCustomersCustomerTaxIdsRequest,
    'pathParams' | 'contentType' | 'body',
    'queryParams'
  >,
  config?: RequestHandlerExecutionConfig
): Promise<GetCustomersCustomerTaxIdsRequestResult> {
  return requestHandler.execute(
    createRequest(getCustomersCustomerTaxIdsEndpointSchema, payload),
    config
  );
}
