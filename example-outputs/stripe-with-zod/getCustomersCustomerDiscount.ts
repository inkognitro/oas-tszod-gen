import {
  z_Discount,
  z_Error,
  Discount,
  Error,
} from '@example-outputs/stripe-with-zod';
import {z} from 'zod';
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
} from '@example-outputs/stripe-with-zod/core';

export const getCustomersCustomerDiscountEndpointSchema = {
  path: '/v1/customers/{customer}/discount',
  method: 'get',
  supportedSecuritySchemas: [],
  queryParamsZodSchema: z.object({
    expand: z.array(z.string()).optional(),
  }),
  pathParamsZodSchema: z.object({
    customer: z.string(),
  }),
  bodyByContentType: {
    'application/x-www-form-urlencoded': {
      zodSchema: z.object({}),
    },
  },
  responseByStatus: {
    '200': {
      bodyByContentType: {
        'application/json': {
          zodSchema: z_Discount,
        },
      },
    },
    default: {
      bodyByContentType: {
        'application/json': {
          zodSchema: z_Error,
        },
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
