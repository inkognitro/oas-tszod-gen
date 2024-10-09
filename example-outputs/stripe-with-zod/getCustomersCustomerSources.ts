import {
  z_Bank_account,
  z_Card,
  z_Source,
  z_Error,
  Bank_account,
  Card,
  Source,
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

export const getCustomersCustomerSourcesEndpointSchema = {
  path: '/v1/customers/{customer}/sources',
  method: 'get',
  supportedSecuritySchemas: [],
  queryParamsZodSchema: z.object({
    ending_before: z.string().optional(),
    expand: z.array(z.string()).optional(),
    limit: z.number().int().safe().finite().optional(),
    object: z.string().optional(),
    starting_after: z.string().optional(),
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
          zodSchema: z.object({
            data: z.array(z.union([z_Bank_account, z_Card, z_Source])),
            has_more: z.boolean(),
            object: z.enum(['list']),
            url: z.string(),
          }),
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

export type GetCustomersCustomerSourcesRequest = RequestUnion<
  RequestBodyData<'application/x-www-form-urlencoded', {}>,
  {
    customer: string;
  },
  {
    ending_before?: string;
    expand?: string[];
    limit?: number; // int
    object?: string;
    starting_after?: string;
  }
>;

export type GetCustomersCustomerSourcesResponse =
  | ResponseUnion<
      200,
      ResponseBodyData<
        'application/json',
        {
          data: ((Bank_account | Card | Source) &
            (Partial<Bank_account> & Partial<Card> & Partial<Source>))[];
          has_more: boolean;
          object: 'list';
          url: string;
        }
      >
    >
  | ResponseUnion<any, ResponseBodyData<'application/json', Error>>;

export type GetCustomersCustomerSourcesRequestResult = RequestResult<
  GetCustomersCustomerSourcesRequest,
  GetCustomersCustomerSourcesResponse
>;

export function getCustomersCustomerSources(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<
    GetCustomersCustomerSourcesRequest,
    'pathParams' | 'contentType' | 'body',
    'queryParams'
  >,
  config?: RequestHandlerExecutionConfig
): Promise<GetCustomersCustomerSourcesRequestResult> {
  return requestHandler.execute(
    createRequest(getCustomersCustomerSourcesEndpointSchema, payload),
    config
  );
}
