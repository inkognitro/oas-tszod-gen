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
import {Bank_account, Error} from '@example-outputs/stripe';

export const postCustomersCustomerSourcesIdVerifyEndpointSchema = {
  path: '/v1/customers/{customer}/sources/{id}/verify',
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

export type PostCustomersCustomerSourcesIdVerifyRequest = RequestUnion<
  RequestBodyData<
    'application/x-www-form-urlencoded',
    {
      amounts?: number[]; // item: int
      expand?: string[];
    }
  >,
  {
    customer: string;
    id: string;
  }
>;

export type PostCustomersCustomerSourcesIdVerifyResponse =
  | ResponseUnion<200, ResponseBodyData<'application/json', Bank_account>>
  | ResponseUnion<any, ResponseBodyData<'application/json', Error>>;

export type PostCustomersCustomerSourcesIdVerifyRequestResult = RequestResult<
  PostCustomersCustomerSourcesIdVerifyRequest,
  PostCustomersCustomerSourcesIdVerifyResponse
>;

export function postCustomersCustomerSourcesIdVerify(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<
    PostCustomersCustomerSourcesIdVerifyRequest,
    'pathParams' | 'contentType' | 'body',
    never
  >,
  config?: RequestHandlerExecutionConfig
): Promise<PostCustomersCustomerSourcesIdVerifyRequestResult> {
  return requestHandler.execute(
    createRequest(postCustomersCustomerSourcesIdVerifyEndpointSchema, payload),
    config
  );
}
