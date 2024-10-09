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
import {Payment_source, Error} from '@example-outputs/stripe';

export const getCustomersCustomerSourcesIdEndpointSchema = {
  path: '/v1/customers/{customer}/sources/{id}',
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

export type GetCustomersCustomerSourcesIdRequest = RequestUnion<
  RequestBodyData<'application/x-www-form-urlencoded', {}>,
  {
    customer: string;
    id: string;
  },
  {
    expand?: string[];
  }
>;

export type GetCustomersCustomerSourcesIdResponse =
  | ResponseUnion<200, ResponseBodyData<'application/json', Payment_source>>
  | ResponseUnion<any, ResponseBodyData<'application/json', Error>>;

export type GetCustomersCustomerSourcesIdRequestResult = RequestResult<
  GetCustomersCustomerSourcesIdRequest,
  GetCustomersCustomerSourcesIdResponse
>;

export function getCustomersCustomerSourcesId(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<
    GetCustomersCustomerSourcesIdRequest,
    'pathParams' | 'contentType' | 'body',
    'queryParams'
  >,
  config?: RequestHandlerExecutionConfig
): Promise<GetCustomersCustomerSourcesIdRequestResult> {
  return requestHandler.execute(
    createRequest(getCustomersCustomerSourcesIdEndpointSchema, payload),
    config
  );
}
