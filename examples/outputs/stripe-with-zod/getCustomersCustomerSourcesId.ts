import {z_Payment_source, z_Error, Payment_source, Error} from './schemas';
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

export const getCustomersCustomerSourcesIdEndpointSchema = {
  path: '/v1/customers/{customer}/sources/{id}',
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
          zodSchema: z_Payment_source,
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
