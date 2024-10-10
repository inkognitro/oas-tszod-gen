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

export const getCustomersCustomerTaxIdsIdEndpointSchema = {
  path: '/v1/customers/{customer}/tax_ids/{id}',
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

export type GetCustomersCustomerTaxIdsIdRequest = RequestUnion<
  RequestBodyData<'application/x-www-form-urlencoded', {}>,
  {
    customer: string;
    id: string;
  },
  {
    expand?: string[];
  }
>;

export type GetCustomersCustomerTaxIdsIdResponse =
  | ResponseUnion<200, ResponseBodyData<'application/json', Tax_id>>
  | ResponseUnion<any, ResponseBodyData<'application/json', Error>>;

export type GetCustomersCustomerTaxIdsIdRequestResult = RequestResult<
  GetCustomersCustomerTaxIdsIdRequest,
  GetCustomersCustomerTaxIdsIdResponse
>;

export function getCustomersCustomerTaxIdsId(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<
    GetCustomersCustomerTaxIdsIdRequest,
    'pathParams' | 'contentType' | 'body',
    'queryParams'
  >,
  config?: RequestHandlerExecutionConfig
): Promise<GetCustomersCustomerTaxIdsIdRequestResult> {
  return requestHandler.execute(
    createRequest(getCustomersCustomerTaxIdsIdEndpointSchema, payload),
    config
  );
}
