import {
  z_Source,
  z_Error,
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

export const postSourcesEndpointSchema = {
  path: '/v1/sources',
  method: 'post',
  supportedSecuritySchemas: [],
  bodyByContentType: {
    'application/x-www-form-urlencoded': {
      zodSchema: z.object({
        amount: z.number().int().safe().finite().optional(),
        currency: z.string().optional(),
        customer: z.string().optional(),
        expand: z.array(z.string()).optional(),
        flow: z
          .enum(['code_verification', 'none', 'receiver', 'redirect'])
          .optional(),
        mandate: z
          .object({
            acceptance: z
              .object({
                date: z.number().int().safe().finite().optional(),
                ip: z.string().optional(),
                offline: z
                  .object({
                    contact_email: z.string(),
                  })
                  .optional(),
                online: z
                  .object({
                    date: z.number().int().safe().finite().optional(),
                    ip: z.string().optional(),
                    user_agent: z.string().optional(),
                  })
                  .optional(),
                status: z.enum(['accepted', 'pending', 'refused', 'revoked']),
                type: z.enum(['offline', 'online']).optional(),
                user_agent: z.string().optional(),
              })
              .optional(),
            amount: z
              .union([z.number().int().safe().finite(), z.enum([''])])
              .optional(),
            currency: z.string().optional(),
            interval: z.enum(['one_time', 'scheduled', 'variable']).optional(),
            notification_method: z
              .enum([
                'deprecated_none',
                'email',
                'manual',
                'none',
                'stripe_email',
              ])
              .optional(),
          })
          .optional(),
        metadata: z.record(z.string()).optional(),
        original_source: z.string().optional(),
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
        receiver: z
          .object({
            refund_attributes_method: z
              .enum(['email', 'manual', 'none'])
              .optional(),
          })
          .optional(),
        redirect: z
          .object({
            return_url: z.string(),
          })
          .optional(),
        source_order: z
          .object({
            items: z
              .array(
                z.object({
                  amount: z.number().int().safe().finite().optional(),
                  currency: z.string().optional(),
                  description: z.string().optional(),
                  parent: z.string().optional(),
                  quantity: z.number().int().safe().finite().optional(),
                  type: z
                    .enum(['discount', 'shipping', 'sku', 'tax'])
                    .optional(),
                })
              )
              .optional(),
            shipping: z
              .object({
                address: z.object({
                  city: z.string().optional(),
                  country: z.string().optional(),
                  line1: z.string(),
                  line2: z.string().optional(),
                  postal_code: z.string().optional(),
                  state: z.string().optional(),
                }),
                carrier: z.string().optional(),
                name: z.string().optional(),
                phone: z.string().optional(),
                tracking_number: z.string().optional(),
              })
              .optional(),
          })
          .optional(),
        statement_descriptor: z.string().optional(),
        token: z.string().optional(),
        type: z.string().optional(),
        usage: z.enum(['reusable', 'single_use']).optional(),
      }),
    },
  },
  responseByStatus: {
    '200': {
      bodyByContentType: {
        'application/json': {
          zodSchema: z_Source,
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

export type PostSourcesRequest = RequestUnion<
  RequestBodyData<
    'application/x-www-form-urlencoded',
    {
      amount?: number; // int
      currency?: string;
      customer?: string;
      expand?: string[];
      flow?: 'code_verification' | 'none' | 'receiver' | 'redirect';
      mandate?: {
        acceptance?: {
          date?: number; // int
          ip?: string;
          offline?: {
            contact_email: string;
          };
          online?: {
            date?: number; // int
            ip?: string;
            user_agent?: string;
          };
          status: 'accepted' | 'pending' | 'refused' | 'revoked';
          type?: 'offline' | 'online';
          user_agent?: string;
        };
        amount?: number | '';
        currency?: string;
        interval?: 'one_time' | 'scheduled' | 'variable';
        notification_method?:
          | 'deprecated_none'
          | 'email'
          | 'manual'
          | 'none'
          | 'stripe_email';
      };
      metadata?: {
        [key: string]: string;
      };
      original_source?: string;
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
      receiver?: {
        refund_attributes_method?: 'email' | 'manual' | 'none';
      };
      redirect?: {
        return_url: string;
      };
      source_order?: {
        items?: {
          amount?: number; // int
          currency?: string;
          description?: string;
          parent?: string;
          quantity?: number; // int
          type?: 'discount' | 'shipping' | 'sku' | 'tax';
        }[];
        shipping?: {
          address: {
            city?: string;
            country?: string;
            line1: string;
            line2?: string;
            postal_code?: string;
            state?: string;
          };
          carrier?: string;
          name?: string;
          phone?: string;
          tracking_number?: string;
        };
      };
      statement_descriptor?: string;
      token?: string;
      type?: string;
      usage?: 'reusable' | 'single_use';
    }
  >
>;

export type PostSourcesResponse =
  | ResponseUnion<200, ResponseBodyData<'application/json', Source>>
  | ResponseUnion<any, ResponseBodyData<'application/json', Error>>;

export type PostSourcesRequestResult = RequestResult<
  PostSourcesRequest,
  PostSourcesResponse
>;

export function postSources(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<PostSourcesRequest, 'contentType' | 'body', never>,
  config?: RequestHandlerExecutionConfig
): Promise<PostSourcesRequestResult> {
  return requestHandler.execute(
    createRequest(postSourcesEndpointSchema, payload),
    config
  );
}
