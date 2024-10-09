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
} from '@example-outputs/stripe/core';
import {Payment_method_configuration, Error} from '@example-outputs/stripe';

export const postPaymentMethodConfigurationsConfigurationEndpointSchema = {
  path: '/v1/payment_method_configurations/{configuration}',
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
