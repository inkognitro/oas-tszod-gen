import {z_Tax_id, z_Error, Tax_id, Error} from './schemas';
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
} from './core';

export const getCustomersCustomerTaxIdsIdEndpointSchema = {
  path: '/v1/customers/{customer}/tax_ids/{id}',
  method: 'get',
  supportedSecuritySchemas: [],
  queryParamsZodSchema: z.object({
    expand: z.array(z.string()).optional(),
  }),
  pathParamsZodSchema: z.object({
    customer: z.string(),
    id: z.string(),
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
          zodSchema: z_Tax_id,
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
