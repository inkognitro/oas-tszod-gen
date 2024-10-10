import {z_Card, z_Error, Card, Error} from './schemas';
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

export const getCustomersCustomerCardsIdEndpointSchema = {
  path: '/v1/customers/{customer}/cards/{id}',
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
          zodSchema: z_Card,
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
