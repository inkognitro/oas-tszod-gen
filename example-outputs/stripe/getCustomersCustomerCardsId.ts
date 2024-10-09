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
import {Card, Error} from '@example-outputs/stripe';

export const getCustomersCustomerCardsIdEndpointSchema = {
  path: '/v1/customers/{customer}/cards/{id}',
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

export type GetCustomersCustomerCardsIdRequest = RequestUnion<
  RequestBodyData<'application/x-www-form-urlencoded', {}>,
  {
    customer: string;
    id: string;
  },
  {
    expand?: string[];
  }
>;

export type GetCustomersCustomerCardsIdResponse =
  | ResponseUnion<200, ResponseBodyData<'application/json', Card>>
  | ResponseUnion<any, ResponseBodyData<'application/json', Error>>;

export type GetCustomersCustomerCardsIdRequestResult = RequestResult<
  GetCustomersCustomerCardsIdRequest,
  GetCustomersCustomerCardsIdResponse
>;

export function getCustomersCustomerCardsId(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<
    GetCustomersCustomerCardsIdRequest,
    'pathParams' | 'contentType' | 'body',
    'queryParams'
  >,
  config?: RequestHandlerExecutionConfig
): Promise<GetCustomersCustomerCardsIdRequestResult> {
  return requestHandler.execute(
    createRequest(getCustomersCustomerCardsIdEndpointSchema, payload),
    config
  );
}
