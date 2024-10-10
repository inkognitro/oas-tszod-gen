import {z_Payment_method, z_Error, Payment_method, Error} from './schemas';
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

export const postPaymentMethodsPaymentMethodEndpointSchema = {
  path: '/v1/payment_methods/{payment_method}',
  method: 'post',
  supportedSecuritySchemas: [],
  pathParamsZodSchema: z.object({
    payment_method: z.string(),
  }),
  bodyByContentType: {
    'application/x-www-form-urlencoded': {
      zodSchema: z.object({
        allow_redisplay: z
          .enum(['always', 'limited', 'unspecified'])
          .optional(),
        billing_details: z
          .object({
            address: z
              .union([
                z.object({
                  city: z.string().optional(),
                  country: z.string().optional(),
                  line1: z.string().optional(),
                  line2: z.string().optional(),
                  postal_code: z.string().optional(),
                  state: z.string().optional(),
                }),
                z.enum(['']),
              ])
              .optional(),
            email: z.union([z.string(), z.enum([''])]).optional(),
            name: z.union([z.string(), z.enum([''])]).optional(),
            phone: z.union([z.string(), z.enum([''])]).optional(),
          })
          .optional(),
        card: z
          .object({
            exp_month: z.number().int().safe().finite().optional(),
            exp_year: z.number().int().safe().finite().optional(),
            networks: z
              .object({
                preferred: z
                  .enum(['', 'cartes_bancaires', 'mastercard', 'visa'])
                  .optional(),
              })
              .optional(),
          })
          .optional(),
        expand: z.array(z.string()).optional(),
        link: z.object({}).optional(),
        metadata: z.union([z.record(z.string()), z.enum([''])]).optional(),
        us_bank_account: z
          .object({
            account_holder_type: z.enum(['company', 'individual']).optional(),
            account_type: z.enum(['checking', 'savings']).optional(),
          })
          .optional(),
      }),
    },
  },
  responseByStatus: {
    '200': {
      bodyByContentType: {
        'application/json': {
          zodSchema: z_Payment_method,
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

export type PostPaymentMethodsPaymentMethodRequest = RequestUnion<
  RequestBodyData<
    'application/x-www-form-urlencoded',
    {
      allow_redisplay?: 'always' | 'limited' | 'unspecified';
      billing_details?: {
        address?: (
          | {
              city?: string;
              country?: string;
              line1?: string;
              line2?: string;
              postal_code?: string;
              state?: string;
            }
          | ''
        ) &
          Partial<{
            city?: string;
            country?: string;
            line1?: string;
            line2?: string;
            postal_code?: string;
            state?: string;
          }>;
        email?: string | '';
        name?: string | '';
        phone?: string | '';
      };
      card?: {
        exp_month?: number; // int
        exp_year?: number; // int
        networks?: {
          preferred?: '' | 'cartes_bancaires' | 'mastercard' | 'visa';
        };
      };
      expand?: string[];
      link?: {};
      metadata?:
        | {
            [key: string]: string;
          }
        | '';
      us_bank_account?: {
        account_holder_type?: 'company' | 'individual';
        account_type?: 'checking' | 'savings';
      };
    }
  >,
  {
    payment_method: string;
  }
>;

export type PostPaymentMethodsPaymentMethodResponse =
  | ResponseUnion<200, ResponseBodyData<'application/json', Payment_method>>
  | ResponseUnion<any, ResponseBodyData<'application/json', Error>>;

export type PostPaymentMethodsPaymentMethodRequestResult = RequestResult<
  PostPaymentMethodsPaymentMethodRequest,
  PostPaymentMethodsPaymentMethodResponse
>;

export function postPaymentMethodsPaymentMethod(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<
    PostPaymentMethodsPaymentMethodRequest,
    'pathParams' | 'contentType' | 'body',
    never
  >,
  config?: RequestHandlerExecutionConfig
): Promise<PostPaymentMethodsPaymentMethodRequestResult> {
  return requestHandler.execute(
    createRequest(postPaymentMethodsPaymentMethodEndpointSchema, payload),
    config
  );
}
