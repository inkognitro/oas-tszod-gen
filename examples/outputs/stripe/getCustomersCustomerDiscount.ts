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
import {Discount, Error} from './schemas';

export const getCustomersCustomerDiscountEndpointSchema = {
  path: '/v1/customers/{customer}/discount',
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

export type GetCustomersCustomerDiscountRequest = RequestUnion<
  RequestBodyData<'application/x-www-form-urlencoded', {}>,
  {
    customer: string;
  },
  {
    expand?: string[];
  }
>;

export type GetCustomersCustomerDiscountResponse =
  | ResponseUnion<200, ResponseBodyData<'application/json', Discount>>
  | ResponseUnion<any, ResponseBodyData<'application/json', Error>>;

export type GetCustomersCustomerDiscountRequestResult = RequestResult<
  GetCustomersCustomerDiscountRequest,
  GetCustomersCustomerDiscountResponse
>;

export function getCustomersCustomerDiscount(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<
    GetCustomersCustomerDiscountRequest,
    'pathParams' | 'contentType' | 'body',
    'queryParams'
  >,
  config?: RequestHandlerExecutionConfig
): Promise<GetCustomersCustomerDiscountRequestResult> {
  return requestHandler.execute(
    createRequest(getCustomersCustomerDiscountEndpointSchema, payload),
    config
  );
}
