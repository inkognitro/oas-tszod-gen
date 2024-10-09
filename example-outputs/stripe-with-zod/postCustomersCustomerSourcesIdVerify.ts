import {
  z_Bank_account,
  z_Error,
  Bank_account,
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

export const postCustomersCustomerSourcesIdVerifyEndpointSchema = {
  path: '/v1/customers/{customer}/sources/{id}/verify',
  method: 'post',
  supportedSecuritySchemas: [],
  pathParamsZodSchema: z.object({
    customer: z.string(),
    id: z.string(),
  }),
  bodyByContentType: {
    'application/x-www-form-urlencoded': {
      zodSchema: z.object({
        amounts: z.array(z.number().int().safe().finite()).optional(),
        expand: z.array(z.string()).optional(),
      }),
    },
  },
  responseByStatus: {
    '200': {
      bodyByContentType: {
        'application/json': {
          zodSchema: z_Bank_account,
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
