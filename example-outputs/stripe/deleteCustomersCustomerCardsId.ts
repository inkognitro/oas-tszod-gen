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
import {
  Payment_source,
  Deleted_payment_source,
  Error,
} from '@example-outputs/stripe';

export const deleteCustomersCustomerCardsIdEndpointSchema = {
  path: '/v1/customers/{customer}/cards/{id}',
  method: 'delete',
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

export type DeleteCustomersCustomerCardsIdRequest = RequestUnion<
  RequestBodyData<
    'application/x-www-form-urlencoded',
    {
      expand?: string[];
    }
  >,
  {
    customer: string;
    id: string;
  }
>;

export type DeleteCustomersCustomerCardsIdResponse =
  | ResponseUnion<
      200,
      ResponseBodyData<
        'application/json',
        Payment_source | Deleted_payment_source
      >
    >
  | ResponseUnion<any, ResponseBodyData<'application/json', Error>>;

export type DeleteCustomersCustomerCardsIdRequestResult = RequestResult<
  DeleteCustomersCustomerCardsIdRequest,
  DeleteCustomersCustomerCardsIdResponse
>;

export function deleteCustomersCustomerCardsId(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<
    DeleteCustomersCustomerCardsIdRequest,
    'pathParams' | 'contentType' | 'body',
    never
  >,
  config?: RequestHandlerExecutionConfig
): Promise<DeleteCustomersCustomerCardsIdRequestResult> {
  return requestHandler.execute(
    createRequest(deleteCustomersCustomerCardsIdEndpointSchema, payload),
    config
  );
}
