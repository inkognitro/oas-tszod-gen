import {
  z_Card,
  z_Bank_account,
  z_Source,
  z_Error,
  Card,
  Bank_account,
  Source,
  Error,
} from './schemas';
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

export const postCustomersCustomerCardsIdEndpointSchema = {
  path: '/v1/customers/{customer}/cards/{id}',
  method: 'post',
  supportedSecuritySchemas: [],
  pathParamsZodSchema: z.object({
    customer: z.string(),
    id: z.string(),
  }),
  bodyByContentType: {
    'application/x-www-form-urlencoded': {
      zodSchema: z.object({
        account_holder_name: z.string().optional(),
        account_holder_type: z.enum(['company', 'individual']).optional(),
        address_city: z.string().optional(),
        address_country: z.string().optional(),
        address_line1: z.string().optional(),
        address_line2: z.string().optional(),
        address_state: z.string().optional(),
        address_zip: z.string().optional(),
        exp_month: z.string().optional(),
        exp_year: z.string().optional(),
        expand: z.array(z.string()).optional(),
        metadata: z.union([z.record(z.string()), z.enum([''])]).optional(),
        name: z.string().optional(),
        owner: z
          .object({
            address: z
              .object({
                city: z.string().optional(),
                country: z.string().optional(),
                line1: z.string().optional(),
                line2: z.string().optional(),
                postal_code: z.string().optional(),
                state: z.string().optional(),
              })
              .optional(),
            email: z.string().optional(),
            name: z.string().optional(),
            phone: z.string().optional(),
          })
          .optional(),
      }),
    },
  },
  responseByStatus: {
    '200': {
      bodyByContentType: {
        'application/json': {
          zodSchema: z.union([z_Card, z_Bank_account, z_Source]),
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

export type PostCustomersCustomerCardsIdRequest = RequestUnion<
  RequestBodyData<
    'application/x-www-form-urlencoded',
    {
      account_holder_name?: string;
      account_holder_type?: 'company' | 'individual';
      address_city?: string;
      address_country?: string;
      address_line1?: string;
      address_line2?: string;
      address_state?: string;
      address_zip?: string;
      exp_month?: string;
      exp_year?: string;
      expand?: string[];
      metadata?:
        | {
            [key: string]: string;
          }
        | '';
      name?: string;
      owner?: {
        address?: {
          city?: string;
          country?: string;
          line1?: string;
          line2?: string;
          postal_code?: string;
          state?: string;
        };
        email?: string;
        name?: string;
        phone?: string;
      };
    }
  >,
  {
    customer: string;
    id: string;
  }
>;

export type PostCustomersCustomerCardsIdResponse =
  | ResponseUnion<
      200,
      ResponseBodyData<
        'application/json',
        (Card | Bank_account | Source) &
          (Partial<Card> & Partial<Bank_account> & Partial<Source>)
      >
    >
  | ResponseUnion<any, ResponseBodyData<'application/json', Error>>;

export type PostCustomersCustomerCardsIdRequestResult = RequestResult<
  PostCustomersCustomerCardsIdRequest,
  PostCustomersCustomerCardsIdResponse
>;

export function postCustomersCustomerCardsId(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<
    PostCustomersCustomerCardsIdRequest,
    'pathParams' | 'contentType' | 'body',
    never
  >,
  config?: RequestHandlerExecutionConfig
): Promise<PostCustomersCustomerCardsIdRequestResult> {
  return requestHandler.execute(
    createRequest(postCustomersCustomerCardsIdEndpointSchema, payload),
    config
  );
}
