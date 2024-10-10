import {z_Customer_session, z_Error, Customer_session, Error} from './schemas';
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

export const postCustomerSessionsEndpointSchema = {
  path: '/v1/customer_sessions',
  method: 'post',
  supportedSecuritySchemas: [],
  bodyByContentType: {
    'application/x-www-form-urlencoded': {
      zodSchema: z.object({
        components: z.object({
          buy_button: z
            .object({
              enabled: z.boolean(),
            })
            .optional(),
          payment_element: z
            .object({
              enabled: z.boolean(),
              features: z
                .object({
                  payment_method_allow_redisplay_filters: z
                    .array(z.enum(['always', 'limited', 'unspecified']))
                    .optional(),
                  payment_method_redisplay: z
                    .enum(['disabled', 'enabled'])
                    .optional(),
                  payment_method_redisplay_limit: z
                    .number()
                    .int()
                    .safe()
                    .finite()
                    .optional(),
                  payment_method_remove: z
                    .enum(['disabled', 'enabled'])
                    .optional(),
                  payment_method_save: z
                    .enum(['disabled', 'enabled'])
                    .optional(),
                  payment_method_save_usage: z
                    .enum(['off_session', 'on_session'])
                    .optional(),
                })
                .optional(),
            })
            .optional(),
          pricing_table: z
            .object({
              enabled: z.boolean(),
            })
            .optional(),
        }),
        customer: z.string(),
        expand: z.array(z.string()).optional(),
      }),
    },
  },
  responseByStatus: {
    '200': {
      bodyByContentType: {
        'application/json': {
          zodSchema: z_Customer_session,
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

export type PostCustomerSessionsRequest = RequestUnion<
  RequestBodyData<
    'application/x-www-form-urlencoded',
    {
      components: {
        buy_button?: {
          enabled: boolean;
        };
        payment_element?: {
          enabled: boolean;
          features?: {
            payment_method_allow_redisplay_filters?: (
              | 'always'
              | 'limited'
              | 'unspecified'
            )[];
            payment_method_redisplay?: 'disabled' | 'enabled';
            payment_method_redisplay_limit?: number; // int
            payment_method_remove?: 'disabled' | 'enabled';
            payment_method_save?: 'disabled' | 'enabled';
            payment_method_save_usage?: 'off_session' | 'on_session';
          };
        };
        pricing_table?: {
          enabled: boolean;
        };
      };
      customer: string;
      expand?: string[];
    }
  >
>;

export type PostCustomerSessionsResponse =
  | ResponseUnion<200, ResponseBodyData<'application/json', Customer_session>>
  | ResponseUnion<any, ResponseBodyData<'application/json', Error>>;

export type PostCustomerSessionsRequestResult = RequestResult<
  PostCustomerSessionsRequest,
  PostCustomerSessionsResponse
>;

export function postCustomerSessions(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<
    PostCustomerSessionsRequest,
    'contentType' | 'body',
    never
  >,
  config?: RequestHandlerExecutionConfig
): Promise<PostCustomerSessionsRequestResult> {
  return requestHandler.execute(
    createRequest(postCustomerSessionsEndpointSchema, payload),
    config
  );
}
