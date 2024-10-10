import {
  z_Payment_method_configuration,
  z_Error,
  Payment_method_configuration,
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

export const postPaymentMethodConfigurationsConfigurationEndpointSchema = {
  path: '/v1/payment_method_configurations/{configuration}',
  method: 'post',
  supportedSecuritySchemas: [],
  pathParamsZodSchema: z.object({
    configuration: z.string(),
  }),
  bodyByContentType: {
    'application/x-www-form-urlencoded': {
      zodSchema: z.object({
        acss_debit: z
          .object({
            display_preference: z
              .object({
                preference: z.enum(['none', 'off', 'on']).optional(),
              })
              .optional(),
          })
          .optional(),
        active: z.boolean().optional(),
        affirm: z
          .object({
            display_preference: z
              .object({
                preference: z.enum(['none', 'off', 'on']).optional(),
              })
              .optional(),
          })
          .optional(),
        afterpay_clearpay: z
          .object({
            display_preference: z
              .object({
                preference: z.enum(['none', 'off', 'on']).optional(),
              })
              .optional(),
          })
          .optional(),
        alipay: z
          .object({
            display_preference: z
              .object({
                preference: z.enum(['none', 'off', 'on']).optional(),
              })
              .optional(),
          })
          .optional(),
        amazon_pay: z
          .object({
            display_preference: z
              .object({
                preference: z.enum(['none', 'off', 'on']).optional(),
              })
              .optional(),
          })
          .optional(),
        apple_pay: z
          .object({
            display_preference: z
              .object({
                preference: z.enum(['none', 'off', 'on']).optional(),
              })
              .optional(),
          })
          .optional(),
        apple_pay_later: z
          .object({
            display_preference: z
              .object({
                preference: z.enum(['none', 'off', 'on']).optional(),
              })
              .optional(),
          })
          .optional(),
        au_becs_debit: z
          .object({
            display_preference: z
              .object({
                preference: z.enum(['none', 'off', 'on']).optional(),
              })
              .optional(),
          })
          .optional(),
        bacs_debit: z
          .object({
            display_preference: z
              .object({
                preference: z.enum(['none', 'off', 'on']).optional(),
              })
              .optional(),
          })
          .optional(),
        bancontact: z
          .object({
            display_preference: z
              .object({
                preference: z.enum(['none', 'off', 'on']).optional(),
              })
              .optional(),
          })
          .optional(),
        blik: z
          .object({
            display_preference: z
              .object({
                preference: z.enum(['none', 'off', 'on']).optional(),
              })
              .optional(),
          })
          .optional(),
        boleto: z
          .object({
            display_preference: z
              .object({
                preference: z.enum(['none', 'off', 'on']).optional(),
              })
              .optional(),
          })
          .optional(),
        card: z
          .object({
            display_preference: z
              .object({
                preference: z.enum(['none', 'off', 'on']).optional(),
              })
              .optional(),
          })
          .optional(),
        cartes_bancaires: z
          .object({
            display_preference: z
              .object({
                preference: z.enum(['none', 'off', 'on']).optional(),
              })
              .optional(),
          })
          .optional(),
        cashapp: z
          .object({
            display_preference: z
              .object({
                preference: z.enum(['none', 'off', 'on']).optional(),
              })
              .optional(),
          })
          .optional(),
        customer_balance: z
          .object({
            display_preference: z
              .object({
                preference: z.enum(['none', 'off', 'on']).optional(),
              })
              .optional(),
          })
          .optional(),
        eps: z
          .object({
            display_preference: z
              .object({
                preference: z.enum(['none', 'off', 'on']).optional(),
              })
              .optional(),
          })
          .optional(),
        expand: z.array(z.string()).optional(),
        fpx: z
          .object({
            display_preference: z
              .object({
                preference: z.enum(['none', 'off', 'on']).optional(),
              })
              .optional(),
          })
          .optional(),
        giropay: z
          .object({
            display_preference: z
              .object({
                preference: z.enum(['none', 'off', 'on']).optional(),
              })
              .optional(),
          })
          .optional(),
        google_pay: z
          .object({
            display_preference: z
              .object({
                preference: z.enum(['none', 'off', 'on']).optional(),
              })
              .optional(),
          })
          .optional(),
        grabpay: z
          .object({
            display_preference: z
              .object({
                preference: z.enum(['none', 'off', 'on']).optional(),
              })
              .optional(),
          })
          .optional(),
        ideal: z
          .object({
            display_preference: z
              .object({
                preference: z.enum(['none', 'off', 'on']).optional(),
              })
              .optional(),
          })
          .optional(),
        jcb: z
          .object({
            display_preference: z
              .object({
                preference: z.enum(['none', 'off', 'on']).optional(),
              })
              .optional(),
          })
          .optional(),
        klarna: z
          .object({
            display_preference: z
              .object({
                preference: z.enum(['none', 'off', 'on']).optional(),
              })
              .optional(),
          })
          .optional(),
        konbini: z
          .object({
            display_preference: z
              .object({
                preference: z.enum(['none', 'off', 'on']).optional(),
              })
              .optional(),
          })
          .optional(),
        link: z
          .object({
            display_preference: z
              .object({
                preference: z.enum(['none', 'off', 'on']).optional(),
              })
              .optional(),
          })
          .optional(),
        mobilepay: z
          .object({
            display_preference: z
              .object({
                preference: z.enum(['none', 'off', 'on']).optional(),
              })
              .optional(),
          })
          .optional(),
        multibanco: z
          .object({
            display_preference: z
              .object({
                preference: z.enum(['none', 'off', 'on']).optional(),
              })
              .optional(),
          })
          .optional(),
        name: z.string().optional(),
        oxxo: z
          .object({
            display_preference: z
              .object({
                preference: z.enum(['none', 'off', 'on']).optional(),
              })
              .optional(),
          })
          .optional(),
        p24: z
          .object({
            display_preference: z
              .object({
                preference: z.enum(['none', 'off', 'on']).optional(),
              })
              .optional(),
          })
          .optional(),
        paynow: z
          .object({
            display_preference: z
              .object({
                preference: z.enum(['none', 'off', 'on']).optional(),
              })
              .optional(),
          })
          .optional(),
        paypal: z
          .object({
            display_preference: z
              .object({
                preference: z.enum(['none', 'off', 'on']).optional(),
              })
              .optional(),
          })
          .optional(),
        promptpay: z
          .object({
            display_preference: z
              .object({
                preference: z.enum(['none', 'off', 'on']).optional(),
              })
              .optional(),
          })
          .optional(),
        revolut_pay: z
          .object({
            display_preference: z
              .object({
                preference: z.enum(['none', 'off', 'on']).optional(),
              })
              .optional(),
          })
          .optional(),
        sepa_debit: z
          .object({
            display_preference: z
              .object({
                preference: z.enum(['none', 'off', 'on']).optional(),
              })
              .optional(),
          })
          .optional(),
        sofort: z
          .object({
            display_preference: z
              .object({
                preference: z.enum(['none', 'off', 'on']).optional(),
              })
              .optional(),
          })
          .optional(),
        swish: z
          .object({
            display_preference: z
              .object({
                preference: z.enum(['none', 'off', 'on']).optional(),
              })
              .optional(),
          })
          .optional(),
        twint: z
          .object({
            display_preference: z
              .object({
                preference: z.enum(['none', 'off', 'on']).optional(),
              })
              .optional(),
          })
          .optional(),
        us_bank_account: z
          .object({
            display_preference: z
              .object({
                preference: z.enum(['none', 'off', 'on']).optional(),
              })
              .optional(),
          })
          .optional(),
        wechat_pay: z
          .object({
            display_preference: z
              .object({
                preference: z.enum(['none', 'off', 'on']).optional(),
              })
              .optional(),
          })
          .optional(),
        zip: z
          .object({
            display_preference: z
              .object({
                preference: z.enum(['none', 'off', 'on']).optional(),
              })
              .optional(),
          })
          .optional(),
      }),
    },
  },
  responseByStatus: {
    '200': {
      bodyByContentType: {
        'application/json': {
          zodSchema: z_Payment_method_configuration,
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

export type PostPaymentMethodConfigurationsConfigurationRequest = RequestUnion<
  RequestBodyData<
    'application/x-www-form-urlencoded',
    {
      acss_debit?: {
        display_preference?: {
          preference?: 'none' | 'off' | 'on';
        };
      };
      active?: boolean;
      affirm?: {
        display_preference?: {
          preference?: 'none' | 'off' | 'on';
        };
      };
      afterpay_clearpay?: {
        display_preference?: {
          preference?: 'none' | 'off' | 'on';
        };
      };
      alipay?: {
        display_preference?: {
          preference?: 'none' | 'off' | 'on';
        };
      };
      amazon_pay?: {
        display_preference?: {
          preference?: 'none' | 'off' | 'on';
        };
      };
      apple_pay?: {
        display_preference?: {
          preference?: 'none' | 'off' | 'on';
        };
      };
      apple_pay_later?: {
        display_preference?: {
          preference?: 'none' | 'off' | 'on';
        };
      };
      au_becs_debit?: {
        display_preference?: {
          preference?: 'none' | 'off' | 'on';
        };
      };
      bacs_debit?: {
        display_preference?: {
          preference?: 'none' | 'off' | 'on';
        };
      };
      bancontact?: {
        display_preference?: {
          preference?: 'none' | 'off' | 'on';
        };
      };
      blik?: {
        display_preference?: {
          preference?: 'none' | 'off' | 'on';
        };
      };
      boleto?: {
        display_preference?: {
          preference?: 'none' | 'off' | 'on';
        };
      };
      card?: {
        display_preference?: {
          preference?: 'none' | 'off' | 'on';
        };
      };
      cartes_bancaires?: {
        display_preference?: {
          preference?: 'none' | 'off' | 'on';
        };
      };
      cashapp?: {
        display_preference?: {
          preference?: 'none' | 'off' | 'on';
        };
      };
      customer_balance?: {
        display_preference?: {
          preference?: 'none' | 'off' | 'on';
        };
      };
      eps?: {
        display_preference?: {
          preference?: 'none' | 'off' | 'on';
        };
      };
      expand?: string[];
      fpx?: {
        display_preference?: {
          preference?: 'none' | 'off' | 'on';
        };
      };
      giropay?: {
        display_preference?: {
          preference?: 'none' | 'off' | 'on';
        };
      };
      google_pay?: {
        display_preference?: {
          preference?: 'none' | 'off' | 'on';
        };
      };
      grabpay?: {
        display_preference?: {
          preference?: 'none' | 'off' | 'on';
        };
      };
      ideal?: {
        display_preference?: {
          preference?: 'none' | 'off' | 'on';
        };
      };
      jcb?: {
        display_preference?: {
          preference?: 'none' | 'off' | 'on';
        };
      };
      klarna?: {
        display_preference?: {
          preference?: 'none' | 'off' | 'on';
        };
      };
      konbini?: {
        display_preference?: {
          preference?: 'none' | 'off' | 'on';
        };
      };
      link?: {
        display_preference?: {
          preference?: 'none' | 'off' | 'on';
        };
      };
      mobilepay?: {
        display_preference?: {
          preference?: 'none' | 'off' | 'on';
        };
      };
      multibanco?: {
        display_preference?: {
          preference?: 'none' | 'off' | 'on';
        };
      };
      name?: string;
      oxxo?: {
        display_preference?: {
          preference?: 'none' | 'off' | 'on';
        };
      };
      p24?: {
        display_preference?: {
          preference?: 'none' | 'off' | 'on';
        };
      };
      paynow?: {
        display_preference?: {
          preference?: 'none' | 'off' | 'on';
        };
      };
      paypal?: {
        display_preference?: {
          preference?: 'none' | 'off' | 'on';
        };
      };
      promptpay?: {
        display_preference?: {
          preference?: 'none' | 'off' | 'on';
        };
      };
      revolut_pay?: {
        display_preference?: {
          preference?: 'none' | 'off' | 'on';
        };
      };
      sepa_debit?: {
        display_preference?: {
          preference?: 'none' | 'off' | 'on';
        };
      };
      sofort?: {
        display_preference?: {
          preference?: 'none' | 'off' | 'on';
        };
      };
      swish?: {
        display_preference?: {
          preference?: 'none' | 'off' | 'on';
        };
      };
      twint?: {
        display_preference?: {
          preference?: 'none' | 'off' | 'on';
        };
      };
      us_bank_account?: {
        display_preference?: {
          preference?: 'none' | 'off' | 'on';
        };
      };
      wechat_pay?: {
        display_preference?: {
          preference?: 'none' | 'off' | 'on';
        };
      };
      zip?: {
        display_preference?: {
          preference?: 'none' | 'off' | 'on';
        };
      };
    }
  >,
  {
    configuration: string;
  }
>;

export type PostPaymentMethodConfigurationsConfigurationResponse =
  | ResponseUnion<
      200,
      ResponseBodyData<'application/json', Payment_method_configuration>
    >
  | ResponseUnion<any, ResponseBodyData<'application/json', Error>>;

export type PostPaymentMethodConfigurationsConfigurationRequestResult =
  RequestResult<
    PostPaymentMethodConfigurationsConfigurationRequest,
    PostPaymentMethodConfigurationsConfigurationResponse
  >;

export function postPaymentMethodConfigurationsConfiguration(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<
    PostPaymentMethodConfigurationsConfigurationRequest,
    'pathParams' | 'contentType' | 'body',
    never
  >,
  config?: RequestHandlerExecutionConfig
): Promise<PostPaymentMethodConfigurationsConfigurationRequestResult> {
  return requestHandler.execute(
    createRequest(
      postPaymentMethodConfigurationsConfigurationEndpointSchema,
      payload
    ),
    config
  );
}
