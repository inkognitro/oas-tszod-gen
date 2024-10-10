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
import {Payment_method, Error} from './schemas';

export const postPaymentMethodsPaymentMethodEndpointSchema = {
  path: '/v1/payment_methods/{payment_method}',
  method: 'post',
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
