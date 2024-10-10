import {
  Payment_pages_checkout_session_after_expiration,
  Payment_pages_checkout_session_automatic_tax,
  Payment_pages_checkout_session_consent,
  Payment_pages_checkout_session_consent_collection,
  Payment_pages_checkout_session_currency_conversion,
  Payment_pages_checkout_session_custom_fields,
  Payment_pages_checkout_session_custom_text,
  Customer,
  Deleted_customer,
  Payment_pages_checkout_session_customer_details,
  Invoice,
  Payment_pages_checkout_session_invoice_creation,
  Item,
  Payment_intent,
  Payment_link,
  Payment_method_config_biz_payment_method_configuration_details,
  Checkout_session_payment_method_options,
  Payment_pages_checkout_session_phone_number_collection,
  Payment_pages_checkout_session_saved_payment_method_options,
  Setup_intent,
  Payment_pages_checkout_session_shipping_address_collection,
  Payment_pages_checkout_session_shipping_cost,
  Shipping,
  Payment_pages_checkout_session_shipping_option,
  Subscription,
  Payment_pages_checkout_session_tax_id_collection,
  Payment_pages_checkout_session_total_details,
  z_Payment_pages_checkout_session_after_expiration,
  z_Payment_pages_checkout_session_automatic_tax,
  z_Payment_pages_checkout_session_consent,
  z_Payment_pages_checkout_session_consent_collection,
  z_Payment_pages_checkout_session_currency_conversion,
  z_Payment_pages_checkout_session_custom_fields,
  z_Payment_pages_checkout_session_custom_text,
  z_Customer,
  z_Deleted_customer,
  z_Payment_pages_checkout_session_customer_details,
  z_Invoice,
  z_Payment_pages_checkout_session_invoice_creation,
  z_Item,
  z_Payment_intent,
  z_Payment_link,
  z_Payment_method_config_biz_payment_method_configuration_details,
  z_Checkout_session_payment_method_options,
  z_Payment_pages_checkout_session_phone_number_collection,
  z_Payment_pages_checkout_session_saved_payment_method_options,
  z_Setup_intent,
  z_Payment_pages_checkout_session_shipping_address_collection,
  z_Payment_pages_checkout_session_shipping_cost,
  z_Shipping,
  z_Payment_pages_checkout_session_shipping_option,
  z_Subscription,
  z_Payment_pages_checkout_session_tax_id_collection,
  z_Payment_pages_checkout_session_total_details,
} from './schemas';
import {z} from 'zod';

export type Checkout_Session = {
  after_expiration?: Payment_pages_checkout_session_after_expiration &
    Partial<Payment_pages_checkout_session_after_expiration>;
  allow_promotion_codes?: null | boolean;
  amount_subtotal?: null | number; // int
  amount_total?: null | number; // int
  automatic_tax: Payment_pages_checkout_session_automatic_tax;
  billing_address_collection?: 'auto' | 'required' | null;
  cancel_url?: string | null;
  client_reference_id?: string | null;
  client_secret?: string | null;
  consent?: Payment_pages_checkout_session_consent &
    Partial<Payment_pages_checkout_session_consent>;
  consent_collection?: Payment_pages_checkout_session_consent_collection &
    Partial<Payment_pages_checkout_session_consent_collection>;
  created: number; // int
  currency?: string | null;
  currency_conversion?: Payment_pages_checkout_session_currency_conversion &
    Partial<Payment_pages_checkout_session_currency_conversion>;
  custom_fields: Payment_pages_checkout_session_custom_fields[];
  custom_text: Payment_pages_checkout_session_custom_text;
  customer?: (string | Customer | Deleted_customer) &
    (Partial<Customer> & Partial<Deleted_customer>);
  customer_creation?: 'always' | 'if_required' | null;
  customer_details?: Payment_pages_checkout_session_customer_details &
    Partial<Payment_pages_checkout_session_customer_details>;
  customer_email?: string | null;
  expires_at: number; // int
  id: string;
  invoice?: (string | Invoice) & Partial<Invoice>;
  invoice_creation?: Payment_pages_checkout_session_invoice_creation &
    Partial<Payment_pages_checkout_session_invoice_creation>;
  line_items?: {
    data: Item[];
    has_more: boolean;
    object: 'list';
    url: string;
  };
  livemode: boolean;
  locale?:
    | 'auto'
    | 'bg'
    | 'cs'
    | 'da'
    | 'de'
    | 'el'
    | 'en'
    | 'en-GB'
    | 'es'
    | 'es-419'
    | 'et'
    | 'fi'
    | 'fil'
    | 'fr'
    | 'fr-CA'
    | 'hr'
    | 'hu'
    | 'id'
    | 'it'
    | 'ja'
    | 'ko'
    | 'lt'
    | 'lv'
    | 'ms'
    | 'mt'
    | 'nb'
    | 'nl'
    | 'pl'
    | 'pt'
    | 'pt-BR'
    | 'ro'
    | 'ru'
    | 'sk'
    | 'sl'
    | 'sv'
    | 'th'
    | 'tr'
    | 'vi'
    | 'zh'
    | 'zh-HK'
    | 'zh-TW'
    | null;
  metadata?: {
    [key: string]: string;
  } | null;
  mode: 'payment' | 'setup' | 'subscription';
  object: 'checkout.session';
  payment_intent?: (string | Payment_intent) & Partial<Payment_intent>;
  payment_link?: (string | Payment_link) & Partial<Payment_link>;
  payment_method_collection?: 'always' | 'if_required' | null;
  payment_method_configuration_details?: Payment_method_config_biz_payment_method_configuration_details &
    Partial<Payment_method_config_biz_payment_method_configuration_details>;
  payment_method_options?: Checkout_session_payment_method_options &
    Partial<Checkout_session_payment_method_options>;
  payment_method_types: string[];
  payment_status: 'no_payment_required' | 'paid' | 'unpaid';
  phone_number_collection?: Payment_pages_checkout_session_phone_number_collection;
  recovered_from?: string | null;
  redirect_on_completion?: 'always' | 'if_required' | 'never';
  return_url?: string;
  saved_payment_method_options?: Payment_pages_checkout_session_saved_payment_method_options &
    Partial<Payment_pages_checkout_session_saved_payment_method_options>;
  setup_intent?: (string | Setup_intent) & Partial<Setup_intent>;
  shipping_address_collection?: Payment_pages_checkout_session_shipping_address_collection &
    Partial<Payment_pages_checkout_session_shipping_address_collection>;
  shipping_cost?: Payment_pages_checkout_session_shipping_cost &
    Partial<Payment_pages_checkout_session_shipping_cost>;
  shipping_details?: Shipping & Partial<Shipping>;
  shipping_options: Payment_pages_checkout_session_shipping_option[];
  status?: 'complete' | 'expired' | 'open' | null;
  submit_type?: 'auto' | 'book' | 'donate' | 'pay' | null;
  subscription?: (string | Subscription) & Partial<Subscription>;
  success_url?: string | null;
  tax_id_collection?: Payment_pages_checkout_session_tax_id_collection;
  total_details?: Payment_pages_checkout_session_total_details &
    Partial<Payment_pages_checkout_session_total_details>;
  ui_mode?: 'embedded' | 'hosted' | null;
  url?: string | null;
};

export const z_Checkout_Session = z.object({
  after_expiration:
    z_Payment_pages_checkout_session_after_expiration.optional(),
  allow_promotion_codes: z.boolean().nullable().optional(),
  amount_subtotal: z.number().int().safe().finite().nullable().optional(),
  amount_total: z.number().int().safe().finite().nullable().optional(),
  automatic_tax: z_Payment_pages_checkout_session_automatic_tax,
  billing_address_collection: z
    .enum(['auto', 'required'])
    .nullable()
    .optional(),
  cancel_url: z.string().nullable().optional(),
  client_reference_id: z.string().nullable().optional(),
  client_secret: z.string().nullable().optional(),
  consent: z_Payment_pages_checkout_session_consent.optional(),
  consent_collection:
    z_Payment_pages_checkout_session_consent_collection.optional(),
  created: z.number().int().safe().finite(),
  currency: z.string().nullable().optional(),
  currency_conversion:
    z_Payment_pages_checkout_session_currency_conversion.optional(),
  custom_fields: z.array(z_Payment_pages_checkout_session_custom_fields),
  custom_text: z_Payment_pages_checkout_session_custom_text,
  customer: z.union([z.string(), z_Customer, z_Deleted_customer]).optional(),
  customer_creation: z.enum(['always', 'if_required']).nullable().optional(),
  customer_details:
    z_Payment_pages_checkout_session_customer_details.optional(),
  customer_email: z.string().nullable().optional(),
  expires_at: z.number().int().safe().finite(),
  id: z.string(),
  invoice: z.union([z.string(), z_Invoice]).optional(),
  invoice_creation:
    z_Payment_pages_checkout_session_invoice_creation.optional(),
  line_items: z
    .object({
      data: z.array(z_Item),
      has_more: z.boolean(),
      object: z.enum(['list']),
      url: z.string(),
    })
    .optional(),
  livemode: z.boolean(),
  locale: z
    .enum([
      'auto',
      'bg',
      'cs',
      'da',
      'de',
      'el',
      'en',
      'en-GB',
      'es',
      'es-419',
      'et',
      'fi',
      'fil',
      'fr',
      'fr-CA',
      'hr',
      'hu',
      'id',
      'it',
      'ja',
      'ko',
      'lt',
      'lv',
      'ms',
      'mt',
      'nb',
      'nl',
      'pl',
      'pt',
      'pt-BR',
      'ro',
      'ru',
      'sk',
      'sl',
      'sv',
      'th',
      'tr',
      'vi',
      'zh',
      'zh-HK',
      'zh-TW',
    ])
    .nullable()
    .optional(),
  metadata: z.record(z.string()).nullable().optional(),
  mode: z.enum(['payment', 'setup', 'subscription']),
  object: z.enum(['checkout.session']),
  payment_intent: z.union([z.string(), z_Payment_intent]).optional(),
  payment_link: z.union([z.string(), z_Payment_link]).optional(),
  payment_method_collection: z
    .enum(['always', 'if_required'])
    .nullable()
    .optional(),
  payment_method_configuration_details:
    z_Payment_method_config_biz_payment_method_configuration_details.optional(),
  payment_method_options: z_Checkout_session_payment_method_options.optional(),
  payment_method_types: z.array(z.string()),
  payment_status: z.enum(['no_payment_required', 'paid', 'unpaid']),
  phone_number_collection:
    z_Payment_pages_checkout_session_phone_number_collection.optional(),
  recovered_from: z.string().nullable().optional(),
  redirect_on_completion: z.enum(['always', 'if_required', 'never']).optional(),
  return_url: z.string().optional(),
  saved_payment_method_options:
    z_Payment_pages_checkout_session_saved_payment_method_options.optional(),
  setup_intent: z.union([z.string(), z_Setup_intent]).optional(),
  shipping_address_collection:
    z_Payment_pages_checkout_session_shipping_address_collection.optional(),
  shipping_cost: z_Payment_pages_checkout_session_shipping_cost.optional(),
  shipping_details: z_Shipping.optional(),
  shipping_options: z.array(z_Payment_pages_checkout_session_shipping_option),
  status: z.enum(['complete', 'expired', 'open']).nullable().optional(),
  submit_type: z.enum(['auto', 'book', 'donate', 'pay']).nullable().optional(),
  subscription: z.union([z.string(), z_Subscription]).optional(),
  success_url: z.string().nullable().optional(),
  tax_id_collection:
    z_Payment_pages_checkout_session_tax_id_collection.optional(),
  total_details: z_Payment_pages_checkout_session_total_details.optional(),
  ui_mode: z.enum(['embedded', 'hosted']).nullable().optional(),
  url: z.string().nullable().optional(),
});
