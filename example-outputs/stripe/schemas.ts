import {
  Issuing_Authorization,
  Issuing_Dispute,
  Issuing_Transaction,
  Test_helpers_Test_clock,
  Billing_Meter,
  Climate_Supplier,
  Entitlements_Feature,
  Treasury_Credit_reversal,
  Treasury_Debit_reversal,
  Treasury_Inbound_transfer,
  Treasury_Outbound_payment,
  Treasury_Transaction,
  Treasury_Outbound_transfer,
  Treasury_Received_credit,
  Treasury_Received_debit,
} from '@example-outputs/stripe';

export type Account_annual_revenue = {
  amount?: null | number; // int
  currency?: string | null;
  fiscal_year_end?: string | null;
};

export type Account_monthly_estimated_revenue = {
  amount: number; // int
  currency: string;
};

export type Address = {
  city?: string | null;
  country?: string | null;
  line1?: string | null;
  line2?: string | null;
  postal_code?: string | null;
  state?: string | null;
};

export type Account_business_profile = {
  annual_revenue?: Account_annual_revenue & Partial<Account_annual_revenue>;
  estimated_worker_count?: null | number; // int
  mcc?: string | null;
  monthly_estimated_revenue?: Account_monthly_estimated_revenue;
  name?: string | null;
  product_description?: string | null;
  support_address?: Address & Partial<Address>;
  support_email?: string | null;
  support_phone?: string | null;
  support_url?: string | null;
  url?: string | null;
};

export type Account_capabilities = {
  acss_debit_payments?: 'active' | 'inactive' | 'pending';
  affirm_payments?: 'active' | 'inactive' | 'pending';
  afterpay_clearpay_payments?: 'active' | 'inactive' | 'pending';
  amazon_pay_payments?: 'active' | 'inactive' | 'pending';
  au_becs_debit_payments?: 'active' | 'inactive' | 'pending';
  bacs_debit_payments?: 'active' | 'inactive' | 'pending';
  bancontact_payments?: 'active' | 'inactive' | 'pending';
  bank_transfer_payments?: 'active' | 'inactive' | 'pending';
  blik_payments?: 'active' | 'inactive' | 'pending';
  boleto_payments?: 'active' | 'inactive' | 'pending';
  card_issuing?: 'active' | 'inactive' | 'pending';
  card_payments?: 'active' | 'inactive' | 'pending';
  cartes_bancaires_payments?: 'active' | 'inactive' | 'pending';
  cashapp_payments?: 'active' | 'inactive' | 'pending';
  eps_payments?: 'active' | 'inactive' | 'pending';
  fpx_payments?: 'active' | 'inactive' | 'pending';
  gb_bank_transfer_payments?: 'active' | 'inactive' | 'pending';
  giropay_payments?: 'active' | 'inactive' | 'pending';
  grabpay_payments?: 'active' | 'inactive' | 'pending';
  ideal_payments?: 'active' | 'inactive' | 'pending';
  india_international_payments?: 'active' | 'inactive' | 'pending';
  jcb_payments?: 'active' | 'inactive' | 'pending';
  jp_bank_transfer_payments?: 'active' | 'inactive' | 'pending';
  klarna_payments?: 'active' | 'inactive' | 'pending';
  konbini_payments?: 'active' | 'inactive' | 'pending';
  legacy_payments?: 'active' | 'inactive' | 'pending';
  link_payments?: 'active' | 'inactive' | 'pending';
  mobilepay_payments?: 'active' | 'inactive' | 'pending';
  multibanco_payments?: 'active' | 'inactive' | 'pending';
  mx_bank_transfer_payments?: 'active' | 'inactive' | 'pending';
  oxxo_payments?: 'active' | 'inactive' | 'pending';
  p24_payments?: 'active' | 'inactive' | 'pending';
  paynow_payments?: 'active' | 'inactive' | 'pending';
  promptpay_payments?: 'active' | 'inactive' | 'pending';
  revolut_pay_payments?: 'active' | 'inactive' | 'pending';
  sepa_bank_transfer_payments?: 'active' | 'inactive' | 'pending';
  sepa_debit_payments?: 'active' | 'inactive' | 'pending';
  sofort_payments?: 'active' | 'inactive' | 'pending';
  swish_payments?: 'active' | 'inactive' | 'pending';
  tax_reporting_us_1099_k?: 'active' | 'inactive' | 'pending';
  tax_reporting_us_1099_misc?: 'active' | 'inactive' | 'pending';
  transfers?: 'active' | 'inactive' | 'pending';
  treasury?: 'active' | 'inactive' | 'pending';
  twint_payments?: 'active' | 'inactive' | 'pending';
  us_bank_account_ach_payments?: 'active' | 'inactive' | 'pending';
  us_bank_transfer_payments?: 'active' | 'inactive' | 'pending';
  zip_payments?: 'active' | 'inactive' | 'pending';
};

export type Legal_entity_japan_address = {
  city?: string | null;
  country?: string | null;
  line1?: string | null;
  line2?: string | null;
  postal_code?: string | null;
  state?: string | null;
  town?: string | null;
};

export type Legal_entity_ubo_declaration = {
  date?: null | number; // int
  ip?: string | null;
  user_agent?: string | null;
};

export type File_link = {
  created: number; // int
  expired: boolean;
  expires_at?: null | number; // int
  file: (string | File) & Partial<File>;
  id: string;
  livemode: boolean;
  metadata: {
    [key: string]: string;
  };
  object: 'file_link';
  url?: string | null;
};

export type File = {
  created: number; // int
  expires_at?: null | number; // int
  filename?: string | null;
  id: string;
  links?: {
    data: File_link[];
    has_more: boolean;
    object: 'list';
    url: string;
  } | null;
  object: 'file';
  purpose:
    | 'account_requirement'
    | 'additional_verification'
    | 'business_icon'
    | 'business_logo'
    | 'customer_signature'
    | 'dispute_evidence'
    | 'document_provider_identity_document'
    | 'finance_report_run'
    | 'identity_document'
    | 'identity_document_downloadable'
    | 'issuing_regulatory_reporting'
    | 'pci_document'
    | 'selfie'
    | 'sigma_scheduled_query'
    | 'tax_document_user_upload'
    | 'terminal_reader_splashscreen';
  size: number; // int
  title?: string | null;
  type?: string | null;
  url?: string | null;
};

export type Legal_entity_company_verification_document = {
  back?: (string | File) & Partial<File>;
  details?: string | null;
  details_code?: string | null;
  front?: (string | File) & Partial<File>;
};

export type Legal_entity_company_verification = {
  document: Legal_entity_company_verification_document;
};

export type Legal_entity_company = {
  address?: Address;
  address_kana?: Legal_entity_japan_address &
    Partial<Legal_entity_japan_address>;
  address_kanji?: Legal_entity_japan_address &
    Partial<Legal_entity_japan_address>;
  directors_provided?: boolean;
  executives_provided?: boolean;
  export_license_id?: string;
  export_purpose_code?: string;
  name?: string | null;
  name_kana?: string | null;
  name_kanji?: string | null;
  owners_provided?: boolean;
  ownership_declaration?: Legal_entity_ubo_declaration &
    Partial<Legal_entity_ubo_declaration>;
  phone?: string | null;
  structure?:
    | 'free_zone_establishment'
    | 'free_zone_llc'
    | 'government_instrumentality'
    | 'governmental_unit'
    | 'incorporated_non_profit'
    | 'incorporated_partnership'
    | 'limited_liability_partnership'
    | 'llc'
    | 'multi_member_llc'
    | 'private_company'
    | 'private_corporation'
    | 'private_partnership'
    | 'public_company'
    | 'public_corporation'
    | 'public_partnership'
    | 'registered_charity'
    | 'single_member_llc'
    | 'sole_establishment'
    | 'sole_proprietorship'
    | 'tax_exempt_government_instrumentality'
    | 'unincorporated_association'
    | 'unincorporated_non_profit'
    | 'unincorporated_partnership';
  tax_id_provided?: boolean;
  tax_id_registrar?: string;
  vat_id_provided?: boolean;
  verification?: Legal_entity_company_verification &
    Partial<Legal_entity_company_verification>;
};

export type Account_unification_account_controller_fees = {
  payer:
    | 'account'
    | 'application'
    | 'application_custom'
    | 'application_express';
};

export type Account_unification_account_controller_losses = {
  payments: 'application' | 'stripe';
};

export type Account_unification_account_controller_stripe_dashboard = {
  type: 'express' | 'full' | 'none';
};

export type Account_unification_account_controller = {
  fees?: Account_unification_account_controller_fees;
  is_controller?: boolean;
  losses?: Account_unification_account_controller_losses;
  requirement_collection?: 'application' | 'stripe';
  stripe_dashboard?: Account_unification_account_controller_stripe_dashboard;
  type: 'account' | 'application';
};

export type Customer_balance_customer_balance_settings = {
  reconciliation_mode: 'automatic' | 'manual';
  using_merchant_default: boolean;
};

export type Cash_balance = {
  available?: {
    [key: string]: number; // int
  } | null;
  customer: string;
  livemode: boolean;
  object: 'cash_balance';
  settings: Customer_balance_customer_balance_settings;
};

export type Deleted_customer = {
  deleted: boolean;
  id: string;
  object: 'customer';
};

export type Token_card_networks = {
  preferred?: string | null;
};

export type Card = {
  account?: (string | Account) & Partial<Account>;
  address_city?: string | null;
  address_country?: string | null;
  address_line1?: string | null;
  address_line1_check?: string | null;
  address_line2?: string | null;
  address_state?: string | null;
  address_zip?: string | null;
  address_zip_check?: string | null;
  available_payout_methods?: ('instant' | 'standard')[] | null;
  brand: string;
  country?: string | null;
  currency?: string | null;
  customer?: (string | Customer | Deleted_customer) &
    (Partial<Customer> & Partial<Deleted_customer>);
  cvc_check?: string | null;
  default_for_currency?: null | boolean;
  dynamic_last4?: string | null;
  exp_month: number; // int
  exp_year: number; // int
  fingerprint?: string | null;
  funding: string;
  id: string;
  last4: string;
  metadata?: {
    [key: string]: string;
  } | null;
  name?: string | null;
  networks?: Token_card_networks;
  object: 'card';
  status?: string | null;
  tokenization_method?: string | null;
};

export type Source_type_ach_credit_transfer = {
  account_number?: string | null;
  bank_name?: string | null;
  fingerprint?: string | null;
  refund_account_holder_name?: string | null;
  refund_account_holder_type?: string | null;
  refund_routing_number?: string | null;
  routing_number?: string | null;
  swift_code?: string | null;
};

export type Source_type_ach_debit = {
  bank_name?: string | null;
  country?: string | null;
  fingerprint?: string | null;
  last4?: string | null;
  routing_number?: string | null;
  type?: string | null;
};

export type Source_type_acss_debit = {
  bank_address_city?: string | null;
  bank_address_line_1?: string | null;
  bank_address_line_2?: string | null;
  bank_address_postal_code?: string | null;
  bank_name?: string | null;
  category?: string | null;
  country?: string | null;
  fingerprint?: string | null;
  last4?: string | null;
  routing_number?: string | null;
};

export type Source_type_alipay = {
  data_string?: string | null;
  native_url?: string | null;
  statement_descriptor?: string | null;
};

export type Source_type_au_becs_debit = {
  bsb_number?: string | null;
  fingerprint?: string | null;
  last4?: string | null;
};

export type Source_type_bancontact = {
  bank_code?: string | null;
  bank_name?: string | null;
  bic?: string | null;
  iban_last4?: string | null;
  preferred_language?: string | null;
  statement_descriptor?: string | null;
};

export type Source_type_card = {
  address_line1_check?: string | null;
  address_zip_check?: string | null;
  brand?: string | null;
  country?: string | null;
  cvc_check?: string | null;
  dynamic_last4?: string | null;
  exp_month?: null | number; // int
  exp_year?: null | number; // int
  fingerprint?: string;
  funding?: string | null;
  last4?: string | null;
  name?: string | null;
  three_d_secure?: string;
  tokenization_method?: string | null;
};

export type Source_type_card_present = {
  application_cryptogram?: string;
  application_preferred_name?: string;
  authorization_code?: string | null;
  authorization_response_code?: string;
  brand?: string | null;
  country?: string | null;
  cvm_type?: string;
  data_type?: string | null;
  dedicated_file_name?: string;
  emv_auth_data?: string;
  evidence_customer_signature?: string | null;
  evidence_transaction_certificate?: string | null;
  exp_month?: null | number; // int
  exp_year?: null | number; // int
  fingerprint?: string;
  funding?: string | null;
  last4?: string | null;
  pos_device_id?: string | null;
  pos_entry_mode?: string;
  read_method?: string | null;
  reader?: string | null;
  terminal_verification_results?: string;
  transaction_status_information?: string;
};

export type Source_code_verification_flow = {
  attempts_remaining: number; // int
  status: string;
};

export type Source_type_eps = {
  reference?: string | null;
  statement_descriptor?: string | null;
};

export type Source_type_giropay = {
  bank_code?: string | null;
  bank_name?: string | null;
  bic?: string | null;
  statement_descriptor?: string | null;
};

export type Source_type_ideal = {
  bank?: string | null;
  bic?: string | null;
  iban_last4?: string | null;
  statement_descriptor?: string | null;
};

export type Source_type_klarna = {
  background_image_url?: string;
  client_token?: string | null;
  first_name?: string;
  last_name?: string;
  locale?: string;
  logo_url?: string;
  page_title?: string;
  pay_later_asset_urls_descriptive?: string;
  pay_later_asset_urls_standard?: string;
  pay_later_name?: string;
  pay_later_redirect_url?: string;
  pay_now_asset_urls_descriptive?: string;
  pay_now_asset_urls_standard?: string;
  pay_now_name?: string;
  pay_now_redirect_url?: string;
  pay_over_time_asset_urls_descriptive?: string;
  pay_over_time_asset_urls_standard?: string;
  pay_over_time_name?: string;
  pay_over_time_redirect_url?: string;
  payment_method_categories?: string;
  purchase_country?: string;
  purchase_type?: string;
  redirect_url?: string;
  shipping_delay?: number; // int
  shipping_first_name?: string;
  shipping_last_name?: string;
};

export type Source_type_multibanco = {
  entity?: string | null;
  reference?: string | null;
  refund_account_holder_address_city?: string | null;
  refund_account_holder_address_country?: string | null;
  refund_account_holder_address_line1?: string | null;
  refund_account_holder_address_line2?: string | null;
  refund_account_holder_address_postal_code?: string | null;
  refund_account_holder_address_state?: string | null;
  refund_account_holder_name?: string | null;
  refund_iban?: string | null;
};

export type Source_owner = {
  address?: Address & Partial<Address>;
  email?: string | null;
  name?: string | null;
  phone?: string | null;
  verified_address?: Address & Partial<Address>;
  verified_email?: string | null;
  verified_name?: string | null;
  verified_phone?: string | null;
};

export type Source_type_p24 = {
  reference?: string | null;
};

export type Source_receiver_flow = {
  address?: string | null;
  amount_charged: number; // int
  amount_received: number; // int
  amount_returned: number; // int
  refund_attributes_method: string;
  refund_attributes_status: string;
};

export type Source_redirect_flow = {
  failure_reason?: string | null;
  return_url: string;
  status: string;
  url: string;
};

export type Source_type_sepa_debit = {
  bank_code?: string | null;
  branch_code?: string | null;
  country?: string | null;
  fingerprint?: string | null;
  last4?: string | null;
  mandate_reference?: string | null;
  mandate_url?: string | null;
};

export type Source_type_sofort = {
  bank_code?: string | null;
  bank_name?: string | null;
  bic?: string | null;
  country?: string | null;
  iban_last4?: string | null;
  preferred_language?: string | null;
  statement_descriptor?: string | null;
};

export type Source_order_item = {
  amount?: null | number; // int
  currency?: string | null;
  description?: string | null;
  parent?: string | null;
  quantity?: number; // int
  type?: string | null;
};

export type Shipping = {
  address?: Address;
  carrier?: string | null;
  name?: string;
  phone?: string | null;
  tracking_number?: string | null;
};

export type Source_order = {
  amount: number; // int
  currency: string;
  email?: string;
  items?: Source_order_item[] | null;
  shipping?: Shipping;
};

export type Source_type_three_d_secure = {
  address_line1_check?: string | null;
  address_zip_check?: string | null;
  authenticated?: null | boolean;
  brand?: string | null;
  card?: string | null;
  country?: string | null;
  customer?: string | null;
  cvc_check?: string | null;
  dynamic_last4?: string | null;
  exp_month?: null | number; // int
  exp_year?: null | number; // int
  fingerprint?: string;
  funding?: string | null;
  last4?: string | null;
  name?: string | null;
  three_d_secure?: string;
  tokenization_method?: string | null;
};

export type Source_type_wechat = {
  prepay_id?: string;
  qr_code_url?: string | null;
  statement_descriptor?: string;
};

export type Source = {
  ach_credit_transfer?: Source_type_ach_credit_transfer;
  ach_debit?: Source_type_ach_debit;
  acss_debit?: Source_type_acss_debit;
  alipay?: Source_type_alipay;
  amount?: null | number; // int
  au_becs_debit?: Source_type_au_becs_debit;
  bancontact?: Source_type_bancontact;
  card?: Source_type_card;
  card_present?: Source_type_card_present;
  client_secret: string;
  code_verification?: Source_code_verification_flow;
  created: number; // int
  currency?: string | null;
  customer?: string;
  eps?: Source_type_eps;
  flow: string;
  giropay?: Source_type_giropay;
  id: string;
  ideal?: Source_type_ideal;
  klarna?: Source_type_klarna;
  livemode: boolean;
  metadata?: {
    [key: string]: string;
  } | null;
  multibanco?: Source_type_multibanco;
  object: 'source';
  owner?: Source_owner & Partial<Source_owner>;
  p24?: Source_type_p24;
  receiver?: Source_receiver_flow;
  redirect?: Source_redirect_flow;
  sepa_debit?: Source_type_sepa_debit;
  sofort?: Source_type_sofort;
  source_order?: Source_order;
  statement_descriptor?: string | null;
  status: string;
  three_d_secure?: Source_type_three_d_secure;
  type:
    | 'ach_credit_transfer'
    | 'ach_debit'
    | 'acss_debit'
    | 'alipay'
    | 'au_becs_debit'
    | 'bancontact'
    | 'card'
    | 'card_present'
    | 'eps'
    | 'giropay'
    | 'ideal'
    | 'klarna'
    | 'multibanco'
    | 'p24'
    | 'sepa_debit'
    | 'sofort'
    | 'three_d_secure'
    | 'wechat';
  usage?: string | null;
  wechat?: Source_type_wechat;
};

export type Coupon_applies_to = {
  products: string[];
};

export type Coupon_currency_option = {
  amount_off: number; // int
};

export type Coupon = {
  amount_off?: null | number; // int
  applies_to?: Coupon_applies_to;
  created: number; // int
  currency?: string | null;
  currency_options?: {
    [key: string]: Coupon_currency_option;
  };
  duration: 'forever' | 'once' | 'repeating';
  duration_in_months?: null | number; // int
  id: string;
  livemode: boolean;
  max_redemptions?: null | number; // int
  metadata?: {
    [key: string]: string;
  } | null;
  name?: string | null;
  object: 'coupon';
  percent_off?: null | number;
  redeem_by?: null | number; // int
  times_redeemed: number; // int
  valid: boolean;
};

export type Promotion_code_currency_option = {
  minimum_amount: number; // int
};

export type Promotion_codes_resource_restrictions = {
  currency_options?: {
    [key: string]: Promotion_code_currency_option;
  };
  first_time_transaction: boolean;
  minimum_amount?: null | number; // int
  minimum_amount_currency?: string | null;
};

export type Promotion_code = {
  active: boolean;
  code: string;
  coupon: Coupon;
  created: number; // int
  customer?: (string | Customer | Deleted_customer) &
    (Partial<Customer> & Partial<Deleted_customer>);
  expires_at?: null | number; // int
  id: string;
  livemode: boolean;
  max_redemptions?: null | number; // int
  metadata?: {
    [key: string]: string;
  } | null;
  object: 'promotion_code';
  restrictions: Promotion_codes_resource_restrictions;
  times_redeemed: number; // int
};

export type Discount = {
  checkout_session?: string | null;
  coupon: Coupon;
  customer?: (string | Customer | Deleted_customer) &
    (Partial<Customer> & Partial<Deleted_customer>);
  end?: null | number; // int
  id: string;
  invoice?: string | null;
  invoice_item?: string | null;
  object: 'discount';
  promotion_code?: (string | Promotion_code) & Partial<Promotion_code>;
  start: number; // int
  subscription?: string | null;
  subscription_item?: string | null;
};

export type Invoice_setting_custom_field = {
  name: string;
  value: string;
};

export type Payment_method_acss_debit = {
  bank_name?: string | null;
  fingerprint?: string | null;
  institution_number?: string | null;
  last4?: string | null;
  transit_number?: string | null;
};

export type Payment_method_affirm = {};

export type Payment_method_afterpay_clearpay = {};

export type Payment_flows_private_payment_methods_alipay = {};

export type Payment_method_amazon_pay = {};

export type Payment_method_au_becs_debit = {
  bsb_number?: string | null;
  fingerprint?: string | null;
  last4?: string | null;
};

export type Payment_method_bacs_debit = {
  fingerprint?: string | null;
  last4?: string | null;
  sort_code?: string | null;
};

export type Payment_method_bancontact = {};

export type Billing_details = {
  address?: Address & Partial<Address>;
  email?: string | null;
  name?: string | null;
  phone?: string | null;
};

export type Payment_method_blik = {};

export type Payment_method_boleto = {
  tax_id: string;
};

export type Payment_method_card_checks = {
  address_line1_check?: string | null;
  address_postal_code_check?: string | null;
  cvc_check?: string | null;
};

export type Payment_method_details_card_present_offline = {
  stored_at?: null | number; // int
  type?: 'deferred' | null;
};

export type Payment_method_details_card_present_receipt = {
  account_type?: 'checking' | 'credit' | 'prepaid' | 'unknown';
  application_cryptogram?: string | null;
  application_preferred_name?: string | null;
  authorization_code?: string | null;
  authorization_response_code?: string | null;
  cardholder_verification_method?: string | null;
  dedicated_file_name?: string | null;
  terminal_verification_results?: string | null;
  transaction_status_information?: string | null;
};

export type Payment_flows_private_payment_methods_card_present_common_wallet = {
  type: 'apple_pay' | 'google_pay' | 'samsung_pay' | 'unknown';
};

export type Payment_method_details_card_present = {
  amount_authorized?: null | number; // int
  brand?: string | null;
  brand_product?: string | null;
  capture_before?: number; // int
  cardholder_name?: string | null;
  country?: string | null;
  description?: string | null;
  emv_auth_data?: string | null;
  exp_month: number; // int
  exp_year: number; // int
  fingerprint?: string | null;
  funding?: string | null;
  generated_card?: string | null;
  incremental_authorization_supported: boolean;
  issuer?: string | null;
  last4?: string | null;
  network?: string | null;
  network_transaction_id?: string | null;
  offline?: Payment_method_details_card_present_offline &
    Partial<Payment_method_details_card_present_offline>;
  overcapture_supported: boolean;
  preferred_locales?: string[] | null;
  read_method?:
    | 'contact_emv'
    | 'contactless_emv'
    | 'contactless_magstripe_mode'
    | 'magnetic_stripe_fallback'
    | 'magnetic_stripe_track2'
    | null;
  receipt?: Payment_method_details_card_present_receipt &
    Partial<Payment_method_details_card_present_receipt>;
  wallet?: Payment_flows_private_payment_methods_card_present_common_wallet;
};

export type Card_generated_from_payment_method_details = {
  card_present?: Payment_method_details_card_present;
  type: string;
};

export type Application = {
  id: string;
  name?: string | null;
  object: 'application';
};

export type Setup_attempt_payment_method_details_acss_debit = {};

export type Setup_attempt_payment_method_details_amazon_pay = {};

export type Setup_attempt_payment_method_details_au_becs_debit = {};

export type Setup_attempt_payment_method_details_bacs_debit = {};

export type Offline_acceptance = {};

export type Online_acceptance = {
  ip_address?: string | null;
  user_agent?: string | null;
};

export type Customer_acceptance = {
  accepted_at?: null | number; // int
  offline?: Offline_acceptance;
  online?: Online_acceptance;
  type: 'offline' | 'online';
};

export type Mandate_multi_use = {};

export type Mandate_acss_debit = {
  default_for?: ('invoice' | 'subscription')[];
  interval_description?: string | null;
  payment_schedule: 'combined' | 'interval' | 'sporadic';
  transaction_type: 'business' | 'personal';
};

export type Mandate_amazon_pay = {};

export type Mandate_au_becs_debit = {
  url: string;
};

export type Mandate_bacs_debit = {
  network_status: 'accepted' | 'pending' | 'refused' | 'revoked';
  reference: string;
  revocation_reason?:
    | 'account_closed'
    | 'bank_account_restricted'
    | 'bank_ownership_changed'
    | 'could_not_process'
    | 'debit_not_authorized'
    | null;
  url: string;
};

export type Card_mandate_payment_method_details = {};

export type Mandate_cashapp = {};

export type Mandate_link = {};

export type Mandate_paypal = {
  billing_agreement_id?: string | null;
  payer_id?: string | null;
};

export type Mandate_revolut_pay = {};

export type Mandate_sepa_debit = {
  reference: string;
  url: string;
};

export type Mandate_us_bank_account = {
  collection_method?: 'paper';
};

export type Mandate_payment_method_details = {
  acss_debit?: Mandate_acss_debit;
  amazon_pay?: Mandate_amazon_pay;
  au_becs_debit?: Mandate_au_becs_debit;
  bacs_debit?: Mandate_bacs_debit;
  card?: Card_mandate_payment_method_details;
  cashapp?: Mandate_cashapp;
  link?: Mandate_link;
  paypal?: Mandate_paypal;
  revolut_pay?: Mandate_revolut_pay;
  sepa_debit?: Mandate_sepa_debit;
  type: string;
  us_bank_account?: Mandate_us_bank_account;
};

export type Mandate_single_use = {
  amount: number; // int
  currency: string;
};

export type Mandate = {
  customer_acceptance: Customer_acceptance;
  id: string;
  livemode: boolean;
  multi_use?: Mandate_multi_use;
  object: 'mandate';
  on_behalf_of?: string;
  payment_method: (string | Payment_method) & Partial<Payment_method>;
  payment_method_details: Mandate_payment_method_details;
  single_use?: Mandate_single_use;
  status: 'active' | 'inactive' | 'pending';
  type: 'multi_use' | 'single_use';
};

export type Setup_attempt_payment_method_details_bancontact = {
  bank_code?: string | null;
  bank_name?: string | null;
  bic?: string | null;
  generated_sepa_debit?: (string | Payment_method) & Partial<Payment_method>;
  generated_sepa_debit_mandate?: (string | Mandate) & Partial<Mandate>;
  iban_last4?: string | null;
  preferred_language?: 'de' | 'en' | 'fr' | 'nl' | null;
  verified_name?: string | null;
};

export type Setup_attempt_payment_method_details_boleto = {};

export type Setup_attempt_payment_method_details_card_checks = {
  address_line1_check?: string | null;
  address_postal_code_check?: string | null;
  cvc_check?: string | null;
};

export type Three_d_secure_details = {
  authentication_flow?: 'challenge' | 'frictionless' | null;
  electronic_commerce_indicator?: '01' | '02' | '05' | '06' | '07' | null;
  result?:
    | 'attempt_acknowledged'
    | 'authenticated'
    | 'exempted'
    | 'failed'
    | 'not_supported'
    | 'processing_error'
    | null;
  result_reason?:
    | 'abandoned'
    | 'bypassed'
    | 'canceled'
    | 'card_not_enrolled'
    | 'network_not_supported'
    | 'protocol_error'
    | 'rejected'
    | null;
  transaction_id?: string | null;
  version?: '1.0.2' | '2.1.0' | '2.2.0' | null;
};

export type Payment_method_details_card_wallet_apple_pay = {};

export type Payment_method_details_card_wallet_google_pay = {};

export type Setup_attempt_payment_method_details_card_wallet = {
  apple_pay?: Payment_method_details_card_wallet_apple_pay;
  google_pay?: Payment_method_details_card_wallet_google_pay;
  type: 'apple_pay' | 'google_pay' | 'link';
};

export type Setup_attempt_payment_method_details_card = {
  brand?: string | null;
  checks?: Setup_attempt_payment_method_details_card_checks &
    Partial<Setup_attempt_payment_method_details_card_checks>;
  country?: string | null;
  exp_month?: null | number; // int
  exp_year?: null | number; // int
  fingerprint?: string | null;
  funding?: string | null;
  last4?: string | null;
  network?: string | null;
  three_d_secure?: Three_d_secure_details & Partial<Three_d_secure_details>;
  wallet?: Setup_attempt_payment_method_details_card_wallet &
    Partial<Setup_attempt_payment_method_details_card_wallet>;
};

export type Setup_attempt_payment_method_details_card_present = {
  generated_card?: (string | Payment_method) & Partial<Payment_method>;
  offline?: Payment_method_details_card_present_offline &
    Partial<Payment_method_details_card_present_offline>;
};

export type Setup_attempt_payment_method_details_cashapp = {};

export type Setup_attempt_payment_method_details_ideal = {
  bank?:
    | 'abn_amro'
    | 'asn_bank'
    | 'bunq'
    | 'handelsbanken'
    | 'ing'
    | 'knab'
    | 'moneyou'
    | 'n26'
    | 'nn'
    | 'rabobank'
    | 'regiobank'
    | 'revolut'
    | 'sns_bank'
    | 'triodos_bank'
    | 'van_lanschot'
    | 'yoursafe'
    | null;
  bic?:
    | 'ABNANL2A'
    | 'ASNBNL21'
    | 'BITSNL2A'
    | 'BUNQNL2A'
    | 'FVLBNL22'
    | 'HANDNL2A'
    | 'INGBNL2A'
    | 'KNABNL2H'
    | 'MOYONL21'
    | 'NNBANL2G'
    | 'NTSBDEB1'
    | 'RABONL2U'
    | 'RBRBNL21'
    | 'REVOIE23'
    | 'REVOLT21'
    | 'SNSBNL2A'
    | 'TRIONL2U'
    | null;
  generated_sepa_debit?: (string | Payment_method) & Partial<Payment_method>;
  generated_sepa_debit_mandate?: (string | Mandate) & Partial<Mandate>;
  iban_last4?: string | null;
  verified_name?: string | null;
};

export type Setup_attempt_payment_method_details_klarna = {};

export type Setup_attempt_payment_method_details_link = {};

export type Setup_attempt_payment_method_details_paypal = {};

export type Setup_attempt_payment_method_details_revolut_pay = {};

export type Setup_attempt_payment_method_details_sepa_debit = {};

export type Setup_attempt_payment_method_details_sofort = {
  bank_code?: string | null;
  bank_name?: string | null;
  bic?: string | null;
  generated_sepa_debit?: (string | Payment_method) & Partial<Payment_method>;
  generated_sepa_debit_mandate?: (string | Mandate) & Partial<Mandate>;
  iban_last4?: string | null;
  preferred_language?: 'de' | 'en' | 'fr' | 'nl' | null;
  verified_name?: string | null;
};

export type Setup_attempt_payment_method_details_us_bank_account = {};

export type Setup_attempt_payment_method_details = {
  acss_debit?: Setup_attempt_payment_method_details_acss_debit;
  amazon_pay?: Setup_attempt_payment_method_details_amazon_pay;
  au_becs_debit?: Setup_attempt_payment_method_details_au_becs_debit;
  bacs_debit?: Setup_attempt_payment_method_details_bacs_debit;
  bancontact?: Setup_attempt_payment_method_details_bancontact;
  boleto?: Setup_attempt_payment_method_details_boleto;
  card?: Setup_attempt_payment_method_details_card;
  card_present?: Setup_attempt_payment_method_details_card_present;
  cashapp?: Setup_attempt_payment_method_details_cashapp;
  ideal?: Setup_attempt_payment_method_details_ideal;
  klarna?: Setup_attempt_payment_method_details_klarna;
  link?: Setup_attempt_payment_method_details_link;
  paypal?: Setup_attempt_payment_method_details_paypal;
  revolut_pay?: Setup_attempt_payment_method_details_revolut_pay;
  sepa_debit?: Setup_attempt_payment_method_details_sepa_debit;
  sofort?: Setup_attempt_payment_method_details_sofort;
  type: string;
  us_bank_account?: Setup_attempt_payment_method_details_us_bank_account;
};

export type Payment_flows_amount_details_resource_tip = {
  amount?: number; // int
};

export type Payment_flows_amount_details = {
  tip?: Payment_flows_amount_details_resource_tip;
};

export type Payment_flows_automatic_payment_methods_payment_intent = {
  allow_redirects?: 'always' | 'never';
  enabled: boolean;
};

export type Tax_i_ds_owner = {
  account?: (string | Account) & Partial<Account>;
  application?: (string | Application) & Partial<Application>;
  customer?: (string | Customer) & Partial<Customer>;
  type: 'account' | 'application' | 'customer' | 'self';
};

export type Tax_id_verification = {
  status: 'pending' | 'unavailable' | 'unverified' | 'verified';
  verified_address?: string | null;
  verified_name?: string | null;
};

export type Tax_id = {
  country?: string | null;
  created: number; // int
  customer?: (string | Customer) & Partial<Customer>;
  id: string;
  livemode: boolean;
  object: 'tax_id';
  owner?: Tax_i_ds_owner & Partial<Tax_i_ds_owner>;
  type:
    | 'ad_nrt'
    | 'ae_trn'
    | 'ar_cuit'
    | 'au_abn'
    | 'au_arn'
    | 'bg_uic'
    | 'bh_vat'
    | 'bo_tin'
    | 'br_cnpj'
    | 'br_cpf'
    | 'ca_bn'
    | 'ca_gst_hst'
    | 'ca_pst_bc'
    | 'ca_pst_mb'
    | 'ca_pst_sk'
    | 'ca_qst'
    | 'ch_uid'
    | 'ch_vat'
    | 'cl_tin'
    | 'cn_tin'
    | 'co_nit'
    | 'cr_tin'
    | 'de_stn'
    | 'do_rcn'
    | 'ec_ruc'
    | 'eg_tin'
    | 'es_cif'
    | 'eu_oss_vat'
    | 'eu_vat'
    | 'gb_vat'
    | 'ge_vat'
    | 'hk_br'
    | 'hr_oib'
    | 'hu_tin'
    | 'id_npwp'
    | 'il_vat'
    | 'in_gst'
    | 'is_vat'
    | 'jp_cn'
    | 'jp_rn'
    | 'jp_trn'
    | 'ke_pin'
    | 'kr_brn'
    | 'kz_bin'
    | 'li_uid'
    | 'mx_rfc'
    | 'my_frp'
    | 'my_itn'
    | 'my_sst'
    | 'ng_tin'
    | 'no_vat'
    | 'no_voec'
    | 'nz_gst'
    | 'om_vat'
    | 'pe_ruc'
    | 'ph_tin'
    | 'ro_tin'
    | 'rs_pib'
    | 'ru_inn'
    | 'ru_kpp'
    | 'sa_vat'
    | 'sg_gst'
    | 'sg_uen'
    | 'si_tin'
    | 'sv_nit'
    | 'th_vat'
    | 'tr_tin'
    | 'tw_vat'
    | 'ua_vat'
    | 'unknown'
    | 'us_ein'
    | 'uy_ruc'
    | 've_rif'
    | 'vn_tin'
    | 'za_vat';
  value: string;
  verification?: Tax_id_verification & Partial<Tax_id_verification>;
};

export type Deleted_tax_id = {
  deleted: boolean;
  id: string;
  object: 'tax_id';
};

export type Deleted_application = {
  deleted: boolean;
  id: string;
  name?: string | null;
  object: 'application';
};

export type Connect_account_reference = {
  account?: (string | Account) & Partial<Account>;
  type: 'account' | 'self';
};

export type Automatic_tax = {
  enabled: boolean;
  liability?: Connect_account_reference & Partial<Connect_account_reference>;
  status?: 'complete' | 'failed' | 'requires_location_inputs' | null;
};

export type Fee = {
  amount: number; // int
  application?: string | null;
  currency: string;
  description?: string | null;
  type: string;
};

export type Connect_collection_transfer = {
  amount: number; // int
  currency: string;
  destination: (string | Account) & Partial<Account>;
  id: string;
  livemode: boolean;
  object: 'connect_collection_transfer';
};

export type Customer_balance_resource_cash_balance_transaction_resource_adjusted_for_overdraft =
  {
    balance_transaction: (string | Balance_transaction) &
      Partial<Balance_transaction>;
    linked_transaction: (string | Customer_cash_balance_transaction) &
      Partial<Customer_cash_balance_transaction>;
  };

export type Customer_balance_resource_cash_balance_transaction_resource_applied_to_payment_transaction =
  {
    payment_intent: (string | Payment_intent) & Partial<Payment_intent>;
  };

export type Customer_balance_resource_cash_balance_transaction_resource_funded_transaction_resource_bank_transfer_resource_eu_bank_transfer =
  {
    bic?: string | null;
    iban_last4?: string | null;
    sender_name?: string | null;
  };

export type Customer_balance_resource_cash_balance_transaction_resource_funded_transaction_resource_bank_transfer_resource_gb_bank_transfer =
  {
    account_number_last4?: string | null;
    sender_name?: string | null;
    sort_code?: string | null;
  };

export type Customer_balance_resource_cash_balance_transaction_resource_funded_transaction_resource_bank_transfer_resource_jp_bank_transfer =
  {
    sender_bank?: string | null;
    sender_branch?: string | null;
    sender_name?: string | null;
  };

export type Customer_balance_resource_cash_balance_transaction_resource_funded_transaction_resource_bank_transfer_resource_us_bank_transfer =
  {
    network?: 'ach' | 'domestic_wire_us' | 'swift';
    sender_name?: string | null;
  };

export type Customer_balance_resource_cash_balance_transaction_resource_funded_transaction_resource_bank_transfer =
  {
    eu_bank_transfer?: Customer_balance_resource_cash_balance_transaction_resource_funded_transaction_resource_bank_transfer_resource_eu_bank_transfer;
    gb_bank_transfer?: Customer_balance_resource_cash_balance_transaction_resource_funded_transaction_resource_bank_transfer_resource_gb_bank_transfer;
    jp_bank_transfer?: Customer_balance_resource_cash_balance_transaction_resource_funded_transaction_resource_bank_transfer_resource_jp_bank_transfer;
    reference?: string | null;
    type:
      | 'eu_bank_transfer'
      | 'gb_bank_transfer'
      | 'jp_bank_transfer'
      | 'mx_bank_transfer'
      | 'us_bank_transfer';
    us_bank_transfer?: Customer_balance_resource_cash_balance_transaction_resource_funded_transaction_resource_bank_transfer_resource_us_bank_transfer;
  };

export type Customer_balance_resource_cash_balance_transaction_resource_funded_transaction =
  {
    bank_transfer: Customer_balance_resource_cash_balance_transaction_resource_funded_transaction_resource_bank_transfer;
  };

export type Destination_details_unimplemented = {};

export type Refund_destination_details_generic = {
  reference?: string | null;
  reference_status?: string | null;
};

export type Refund_destination_details_card = {
  reference?: string;
  reference_status?: string;
  reference_type?: string;
  type: 'pending' | 'refund' | 'reversal';
};

export type Refund_destination_details = {
  affirm?: Destination_details_unimplemented;
  afterpay_clearpay?: Destination_details_unimplemented;
  alipay?: Destination_details_unimplemented;
  amazon_pay?: Destination_details_unimplemented;
  au_bank_transfer?: Destination_details_unimplemented;
  blik?: Refund_destination_details_generic;
  br_bank_transfer?: Refund_destination_details_generic;
  card?: Refund_destination_details_card;
  cashapp?: Destination_details_unimplemented;
  customer_cash_balance?: Destination_details_unimplemented;
  eps?: Destination_details_unimplemented;
  eu_bank_transfer?: Refund_destination_details_generic;
  gb_bank_transfer?: Refund_destination_details_generic;
  giropay?: Destination_details_unimplemented;
  grabpay?: Destination_details_unimplemented;
  jp_bank_transfer?: Refund_destination_details_generic;
  klarna?: Destination_details_unimplemented;
  multibanco?: Refund_destination_details_generic;
  mx_bank_transfer?: Refund_destination_details_generic;
  p24?: Refund_destination_details_generic;
  paynow?: Destination_details_unimplemented;
  paypal?: Destination_details_unimplemented;
  pix?: Destination_details_unimplemented;
  revolut?: Destination_details_unimplemented;
  sofort?: Destination_details_unimplemented;
  swish?: Refund_destination_details_generic;
  th_bank_transfer?: Refund_destination_details_generic;
  type: string;
  us_bank_transfer?: Refund_destination_details_generic;
  wechat_pay?: Destination_details_unimplemented;
  zip?: Destination_details_unimplemented;
};

export type Email_sent = {
  email_sent_at: number; // int
  email_sent_to: string;
};

export type Refund_next_action_display_details = {
  email_sent: Email_sent;
  expires_at: number; // int
};

export type Refund_next_action = {
  display_details?: Refund_next_action_display_details &
    Partial<Refund_next_action_display_details>;
  type: string;
};

export type Transfer = {
  amount: number; // int
  amount_reversed: number; // int
  balance_transaction?: (string | Balance_transaction) &
    Partial<Balance_transaction>;
  created: number; // int
  currency: string;
  description?: string | null;
  destination?: (string | Account) & Partial<Account>;
  destination_payment?: (string | Charge) & Partial<Charge>;
  id: string;
  livemode: boolean;
  metadata: {
    [key: string]: string;
  };
  object: 'transfer';
  reversals: {
    data: Transfer_reversal[];
    has_more: boolean;
    object: 'list';
    url: string;
  };
  reversed: boolean;
  source_transaction?: (string | Charge) & Partial<Charge>;
  source_type?: string;
  transfer_group?: string | null;
};

export type Transfer_reversal = {
  amount: number; // int
  balance_transaction?: (string | Balance_transaction) &
    Partial<Balance_transaction>;
  created: number; // int
  currency: string;
  destination_payment_refund?: (string | Refund) & Partial<Refund>;
  id: string;
  metadata?: {
    [key: string]: string;
  } | null;
  object: 'transfer_reversal';
  source_refund?: (string | Refund) & Partial<Refund>;
  transfer: (string | Transfer) & Partial<Transfer>;
};

export type Refund = {
  amount: number; // int
  balance_transaction?: (string | Balance_transaction) &
    Partial<Balance_transaction>;
  charge?: (string | Charge) & Partial<Charge>;
  created: number; // int
  currency: string;
  description?: string;
  destination_details?: Refund_destination_details;
  failure_balance_transaction?: (string | Balance_transaction) &
    Partial<Balance_transaction>;
  failure_reason?: string;
  id: string;
  instructions_email?: string;
  metadata?: {
    [key: string]: string;
  } | null;
  next_action?: Refund_next_action;
  object: 'refund';
  payment_intent?: (string | Payment_intent) & Partial<Payment_intent>;
  reason?:
    | 'duplicate'
    | 'expired_uncaptured_charge'
    | 'fraudulent'
    | 'requested_by_customer'
    | null;
  receipt_number?: string | null;
  source_transfer_reversal?: (string | Transfer_reversal) &
    Partial<Transfer_reversal>;
  status?: string | null;
  transfer_reversal?: (string | Transfer_reversal) & Partial<Transfer_reversal>;
};

export type Customer_balance_resource_cash_balance_transaction_resource_refunded_from_payment_transaction =
  {
    refund: (string | Refund) & Partial<Refund>;
  };

export type Customer_balance_resource_cash_balance_transaction_resource_transferred_to_balance =
  {
    balance_transaction: (string | Balance_transaction) &
      Partial<Balance_transaction>;
  };

export type Customer_balance_resource_cash_balance_transaction_resource_unapplied_from_payment_transaction =
  {
    payment_intent: (string | Payment_intent) & Partial<Payment_intent>;
  };

export type Customer_cash_balance_transaction = {
  adjusted_for_overdraft?: Customer_balance_resource_cash_balance_transaction_resource_adjusted_for_overdraft;
  applied_to_payment?: Customer_balance_resource_cash_balance_transaction_resource_applied_to_payment_transaction;
  created: number; // int
  currency: string;
  customer: (string | Customer) & Partial<Customer>;
  ending_balance: number; // int
  funded?: Customer_balance_resource_cash_balance_transaction_resource_funded_transaction;
  id: string;
  livemode: boolean;
  net_amount: number; // int
  object: 'customer_cash_balance_transaction';
  refunded_from_payment?: Customer_balance_resource_cash_balance_transaction_resource_refunded_from_payment_transaction;
  transferred_to_balance?: Customer_balance_resource_cash_balance_transaction_resource_transferred_to_balance;
  type:
    | 'adjusted_for_overdraft'
    | 'applied_to_payment'
    | 'funded'
    | 'funding_reversed'
    | 'refunded_from_payment'
    | 'return_canceled'
    | 'return_initiated'
    | 'transferred_to_balance'
    | 'unapplied_from_payment';
  unapplied_from_payment?: Customer_balance_resource_cash_balance_transaction_resource_unapplied_from_payment_transaction;
};

export type Dispute_evidence = {
  access_activity_log?: string | null;
  billing_address?: string | null;
  cancellation_policy?: (string | File) & Partial<File>;
  cancellation_policy_disclosure?: string | null;
  cancellation_rebuttal?: string | null;
  customer_communication?: (string | File) & Partial<File>;
  customer_email_address?: string | null;
  customer_name?: string | null;
  customer_purchase_ip?: string | null;
  customer_signature?: (string | File) & Partial<File>;
  duplicate_charge_documentation?: (string | File) & Partial<File>;
  duplicate_charge_explanation?: string | null;
  duplicate_charge_id?: string | null;
  product_description?: string | null;
  receipt?: (string | File) & Partial<File>;
  refund_policy?: (string | File) & Partial<File>;
  refund_policy_disclosure?: string | null;
  refund_refusal_explanation?: string | null;
  service_date?: string | null;
  service_documentation?: (string | File) & Partial<File>;
  shipping_address?: string | null;
  shipping_carrier?: string | null;
  shipping_date?: string | null;
  shipping_documentation?: (string | File) & Partial<File>;
  shipping_tracking_number?: string | null;
  uncategorized_file?: (string | File) & Partial<File>;
  uncategorized_text?: string | null;
};

export type Dispute_evidence_details = {
  due_by?: null | number; // int
  has_evidence: boolean;
  past_due: boolean;
  submission_count: number; // int
};

export type Dispute_payment_method_details_amazon_pay = {
  dispute_type?: 'chargeback' | 'claim' | null;
};

export type Dispute_payment_method_details_card = {
  brand: string;
  case_type: 'chargeback' | 'inquiry';
  network_reason_code?: string | null;
};

export type Dispute_payment_method_details_klarna = {
  reason_code?: string | null;
};

export type Dispute_payment_method_details_paypal = {
  case_id?: string | null;
  reason_code?: string | null;
};

export type Dispute_payment_method_details = {
  amazon_pay?: Dispute_payment_method_details_amazon_pay;
  card?: Dispute_payment_method_details_card;
  klarna?: Dispute_payment_method_details_klarna;
  paypal?: Dispute_payment_method_details_paypal;
  type: 'amazon_pay' | 'card' | 'klarna' | 'paypal';
};

export type Dispute = {
  amount: number; // int
  balance_transactions: Balance_transaction[];
  charge: (string | Charge) & Partial<Charge>;
  created: number; // int
  currency: string;
  evidence: Dispute_evidence;
  evidence_details: Dispute_evidence_details;
  id: string;
  is_charge_refundable: boolean;
  livemode: boolean;
  metadata: {
    [key: string]: string;
  };
  object: 'dispute';
  payment_intent?: (string | Payment_intent) & Partial<Payment_intent>;
  payment_method_details?: Dispute_payment_method_details;
  reason: string;
  status:
    | 'lost'
    | 'needs_response'
    | 'under_review'
    | 'warning_closed'
    | 'warning_needs_response'
    | 'warning_under_review'
    | 'won';
};

export type Fee_refund = {
  amount: number; // int
  balance_transaction?: (string | Balance_transaction) &
    Partial<Balance_transaction>;
  created: number; // int
  currency: string;
  fee: (string | Application_fee) & Partial<Application_fee>;
  id: string;
  metadata?: {
    [key: string]: string;
  } | null;
  object: 'fee_refund';
};

export type Issuing_authorization_amount_details = {
  atm_fee?: null | number; // int
  cashback_amount?: null | number; // int
};

export type Issuing_cardholder_address = {
  address: Address;
};

export type Issuing_cardholder_company = {
  tax_id_provided: boolean;
};

export type Issuing_cardholder_user_terms_acceptance = {
  date?: null | number; // int
  ip?: string | null;
  user_agent?: string | null;
};

export type Issuing_cardholder_card_issuing = {
  user_terms_acceptance?: Issuing_cardholder_user_terms_acceptance &
    Partial<Issuing_cardholder_user_terms_acceptance>;
};

export type Issuing_cardholder_individual_dob = {
  day?: null | number; // int
  month?: null | number; // int
  year?: null | number; // int
};

export type Issuing_cardholder_id_document = {
  back?: (string | File) & Partial<File>;
  front?: (string | File) & Partial<File>;
};

export type Issuing_cardholder_verification = {
  document?: Issuing_cardholder_id_document &
    Partial<Issuing_cardholder_id_document>;
};

export type Issuing_cardholder_individual = {
  card_issuing?: Issuing_cardholder_card_issuing &
    Partial<Issuing_cardholder_card_issuing>;
  dob?: Issuing_cardholder_individual_dob &
    Partial<Issuing_cardholder_individual_dob>;
  first_name?: string | null;
  last_name?: string | null;
  verification?: Issuing_cardholder_verification &
    Partial<Issuing_cardholder_verification>;
};

export type Issuing_cardholder_requirements = {
  disabled_reason?:
    | 'listed'
    | 'rejected.listed'
    | 'requirements.past_due'
    | 'under_review'
    | null;
  past_due?:
    | (
        | 'company.tax_id'
        | 'individual.card_issuing.user_terms_acceptance.date'
        | 'individual.card_issuing.user_terms_acceptance.ip'
        | 'individual.dob.day'
        | 'individual.dob.month'
        | 'individual.dob.year'
        | 'individual.first_name'
        | 'individual.last_name'
        | 'individual.verification.document'
      )[]
    | null;
};

export type Issuing_cardholder_spending_limit = {
  amount: number; // int
  categories?:
    | (
        | 'ac_refrigeration_repair'
        | 'accounting_bookkeeping_services'
        | 'advertising_services'
        | 'agricultural_cooperative'
        | 'airlines_air_carriers'
        | 'airports_flying_fields'
        | 'ambulance_services'
        | 'amusement_parks_carnivals'
        | 'antique_reproductions'
        | 'antique_shops'
        | 'aquariums'
        | 'architectural_surveying_services'
        | 'art_dealers_and_galleries'
        | 'artists_supply_and_craft_shops'
        | 'auto_and_home_supply_stores'
        | 'auto_body_repair_shops'
        | 'auto_paint_shops'
        | 'auto_service_shops'
        | 'automated_cash_disburse'
        | 'automated_fuel_dispensers'
        | 'automobile_associations'
        | 'automotive_parts_and_accessories_stores'
        | 'automotive_tire_stores'
        | 'bail_and_bond_payments'
        | 'bakeries'
        | 'bands_orchestras'
        | 'barber_and_beauty_shops'
        | 'betting_casino_gambling'
        | 'bicycle_shops'
        | 'billiard_pool_establishments'
        | 'boat_dealers'
        | 'boat_rentals_and_leases'
        | 'book_stores'
        | 'books_periodicals_and_newspapers'
        | 'bowling_alleys'
        | 'bus_lines'
        | 'business_secretarial_schools'
        | 'buying_shopping_services'
        | 'cable_satellite_and_other_pay_television_and_radio'
        | 'camera_and_photographic_supply_stores'
        | 'candy_nut_and_confectionery_stores'
        | 'car_and_truck_dealers_new_used'
        | 'car_and_truck_dealers_used_only'
        | 'car_rental_agencies'
        | 'car_washes'
        | 'carpentry_services'
        | 'carpet_upholstery_cleaning'
        | 'caterers'
        | 'charitable_and_social_service_organizations_fundraising'
        | 'chemicals_and_allied_products'
        | 'child_care_services'
        | 'childrens_and_infants_wear_stores'
        | 'chiropodists_podiatrists'
        | 'chiropractors'
        | 'cigar_stores_and_stands'
        | 'civic_social_fraternal_associations'
        | 'cleaning_and_maintenance'
        | 'clothing_rental'
        | 'colleges_universities'
        | 'commercial_equipment'
        | 'commercial_footwear'
        | 'commercial_photography_art_and_graphics'
        | 'commuter_transport_and_ferries'
        | 'computer_network_services'
        | 'computer_programming'
        | 'computer_repair'
        | 'computer_software_stores'
        | 'computers_peripherals_and_software'
        | 'concrete_work_services'
        | 'construction_materials'
        | 'consulting_public_relations'
        | 'correspondence_schools'
        | 'cosmetic_stores'
        | 'counseling_services'
        | 'country_clubs'
        | 'courier_services'
        | 'court_costs'
        | 'credit_reporting_agencies'
        | 'cruise_lines'
        | 'dairy_products_stores'
        | 'dance_hall_studios_schools'
        | 'dating_escort_services'
        | 'dentists_orthodontists'
        | 'department_stores'
        | 'detective_agencies'
        | 'digital_goods_applications'
        | 'digital_goods_games'
        | 'digital_goods_large_volume'
        | 'digital_goods_media'
        | 'direct_marketing_catalog_merchant'
        | 'direct_marketing_combination_catalog_and_retail_merchant'
        | 'direct_marketing_inbound_telemarketing'
        | 'direct_marketing_insurance_services'
        | 'direct_marketing_other'
        | 'direct_marketing_outbound_telemarketing'
        | 'direct_marketing_subscription'
        | 'direct_marketing_travel'
        | 'discount_stores'
        | 'doctors'
        | 'door_to_door_sales'
        | 'drapery_window_covering_and_upholstery_stores'
        | 'drinking_places'
        | 'drug_stores_and_pharmacies'
        | 'drugs_drug_proprietaries_and_druggist_sundries'
        | 'dry_cleaners'
        | 'durable_goods'
        | 'duty_free_stores'
        | 'eating_places_restaurants'
        | 'educational_services'
        | 'electric_razor_stores'
        | 'electric_vehicle_charging'
        | 'electrical_parts_and_equipment'
        | 'electrical_services'
        | 'electronics_repair_shops'
        | 'electronics_stores'
        | 'elementary_secondary_schools'
        | 'emergency_services_gcas_visa_use_only'
        | 'employment_temp_agencies'
        | 'equipment_rental'
        | 'exterminating_services'
        | 'family_clothing_stores'
        | 'fast_food_restaurants'
        | 'financial_institutions'
        | 'fines_government_administrative_entities'
        | 'fireplace_fireplace_screens_and_accessories_stores'
        | 'floor_covering_stores'
        | 'florists'
        | 'florists_supplies_nursery_stock_and_flowers'
        | 'freezer_and_locker_meat_provisioners'
        | 'fuel_dealers_non_automotive'
        | 'funeral_services_crematories'
        | 'furniture_home_furnishings_and_equipment_stores_except_appliances'
        | 'furniture_repair_refinishing'
        | 'furriers_and_fur_shops'
        | 'general_services'
        | 'gift_card_novelty_and_souvenir_shops'
        | 'glass_paint_and_wallpaper_stores'
        | 'glassware_crystal_stores'
        | 'golf_courses_public'
        | 'government_licensed_horse_dog_racing_us_region_only'
        | 'government_licensed_online_casions_online_gambling_us_region_only'
        | 'government_owned_lotteries_non_us_region'
        | 'government_owned_lotteries_us_region_only'
        | 'government_services'
        | 'grocery_stores_supermarkets'
        | 'hardware_equipment_and_supplies'
        | 'hardware_stores'
        | 'health_and_beauty_spas'
        | 'hearing_aids_sales_and_supplies'
        | 'heating_plumbing_a_c'
        | 'hobby_toy_and_game_shops'
        | 'home_supply_warehouse_stores'
        | 'hospitals'
        | 'hotels_motels_and_resorts'
        | 'household_appliance_stores'
        | 'industrial_supplies'
        | 'information_retrieval_services'
        | 'insurance_default'
        | 'insurance_underwriting_premiums'
        | 'intra_company_purchases'
        | 'jewelry_stores_watches_clocks_and_silverware_stores'
        | 'landscaping_services'
        | 'laundries'
        | 'laundry_cleaning_services'
        | 'legal_services_attorneys'
        | 'luggage_and_leather_goods_stores'
        | 'lumber_building_materials_stores'
        | 'manual_cash_disburse'
        | 'marinas_service_and_supplies'
        | 'marketplaces'
        | 'masonry_stonework_and_plaster'
        | 'massage_parlors'
        | 'medical_and_dental_labs'
        | 'medical_dental_ophthalmic_and_hospital_equipment_and_supplies'
        | 'medical_services'
        | 'membership_organizations'
        | 'mens_and_boys_clothing_and_accessories_stores'
        | 'mens_womens_clothing_stores'
        | 'metal_service_centers'
        | 'miscellaneous'
        | 'miscellaneous_apparel_and_accessory_shops'
        | 'miscellaneous_auto_dealers'
        | 'miscellaneous_business_services'
        | 'miscellaneous_food_stores'
        | 'miscellaneous_general_merchandise'
        | 'miscellaneous_general_services'
        | 'miscellaneous_home_furnishing_specialty_stores'
        | 'miscellaneous_publishing_and_printing'
        | 'miscellaneous_recreation_services'
        | 'miscellaneous_repair_shops'
        | 'miscellaneous_specialty_retail'
        | 'mobile_home_dealers'
        | 'motion_picture_theaters'
        | 'motor_freight_carriers_and_trucking'
        | 'motor_homes_dealers'
        | 'motor_vehicle_supplies_and_new_parts'
        | 'motorcycle_shops_and_dealers'
        | 'motorcycle_shops_dealers'
        | 'music_stores_musical_instruments_pianos_and_sheet_music'
        | 'news_dealers_and_newsstands'
        | 'non_fi_money_orders'
        | 'non_fi_stored_value_card_purchase_load'
        | 'nondurable_goods'
        | 'nurseries_lawn_and_garden_supply_stores'
        | 'nursing_personal_care'
        | 'office_and_commercial_furniture'
        | 'opticians_eyeglasses'
        | 'optometrists_ophthalmologist'
        | 'orthopedic_goods_prosthetic_devices'
        | 'osteopaths'
        | 'package_stores_beer_wine_and_liquor'
        | 'paints_varnishes_and_supplies'
        | 'parking_lots_garages'
        | 'passenger_railways'
        | 'pawn_shops'
        | 'pet_shops_pet_food_and_supplies'
        | 'petroleum_and_petroleum_products'
        | 'photo_developing'
        | 'photographic_photocopy_microfilm_equipment_and_supplies'
        | 'photographic_studios'
        | 'picture_video_production'
        | 'piece_goods_notions_and_other_dry_goods'
        | 'plumbing_heating_equipment_and_supplies'
        | 'political_organizations'
        | 'postal_services_government_only'
        | 'precious_stones_and_metals_watches_and_jewelry'
        | 'professional_services'
        | 'public_warehousing_and_storage'
        | 'quick_copy_repro_and_blueprint'
        | 'railroads'
        | 'real_estate_agents_and_managers_rentals'
        | 'record_stores'
        | 'recreational_vehicle_rentals'
        | 'religious_goods_stores'
        | 'religious_organizations'
        | 'roofing_siding_sheet_metal'
        | 'secretarial_support_services'
        | 'security_brokers_dealers'
        | 'service_stations'
        | 'sewing_needlework_fabric_and_piece_goods_stores'
        | 'shoe_repair_hat_cleaning'
        | 'shoe_stores'
        | 'small_appliance_repair'
        | 'snowmobile_dealers'
        | 'special_trade_services'
        | 'specialty_cleaning'
        | 'sporting_goods_stores'
        | 'sporting_recreation_camps'
        | 'sports_and_riding_apparel_stores'
        | 'sports_clubs_fields'
        | 'stamp_and_coin_stores'
        | 'stationary_office_supplies_printing_and_writing_paper'
        | 'stationery_stores_office_and_school_supply_stores'
        | 'swimming_pools_sales'
        | 't_ui_travel_germany'
        | 'tailors_alterations'
        | 'tax_payments_government_agencies'
        | 'tax_preparation_services'
        | 'taxicabs_limousines'
        | 'telecommunication_equipment_and_telephone_sales'
        | 'telecommunication_services'
        | 'telegraph_services'
        | 'tent_and_awning_shops'
        | 'testing_laboratories'
        | 'theatrical_ticket_agencies'
        | 'timeshares'
        | 'tire_retreading_and_repair'
        | 'tolls_bridge_fees'
        | 'tourist_attractions_and_exhibits'
        | 'towing_services'
        | 'trailer_parks_campgrounds'
        | 'transportation_services'
        | 'travel_agencies_tour_operators'
        | 'truck_stop_iteration'
        | 'truck_utility_trailer_rentals'
        | 'typesetting_plate_making_and_related_services'
        | 'typewriter_stores'
        | 'u_s_federal_government_agencies_or_departments'
        | 'uniforms_commercial_clothing'
        | 'used_merchandise_and_secondhand_stores'
        | 'utilities'
        | 'variety_stores'
        | 'veterinary_services'
        | 'video_amusement_game_supplies'
        | 'video_game_arcades'
        | 'video_tape_rental_stores'
        | 'vocational_trade_schools'
        | 'watch_jewelry_repair'
        | 'welding_repair'
        | 'wholesale_clubs'
        | 'wig_and_toupee_stores'
        | 'wires_money_orders'
        | 'womens_accessory_and_specialty_shops'
        | 'womens_ready_to_wear_stores'
        | 'wrecking_and_salvage_yards'
      )[]
    | null;
  interval:
    | 'all_time'
    | 'daily'
    | 'monthly'
    | 'per_authorization'
    | 'weekly'
    | 'yearly';
};

export type Issuing_cardholder_authorization_controls = {
  allowed_categories?:
    | (
        | 'ac_refrigeration_repair'
        | 'accounting_bookkeeping_services'
        | 'advertising_services'
        | 'agricultural_cooperative'
        | 'airlines_air_carriers'
        | 'airports_flying_fields'
        | 'ambulance_services'
        | 'amusement_parks_carnivals'
        | 'antique_reproductions'
        | 'antique_shops'
        | 'aquariums'
        | 'architectural_surveying_services'
        | 'art_dealers_and_galleries'
        | 'artists_supply_and_craft_shops'
        | 'auto_and_home_supply_stores'
        | 'auto_body_repair_shops'
        | 'auto_paint_shops'
        | 'auto_service_shops'
        | 'automated_cash_disburse'
        | 'automated_fuel_dispensers'
        | 'automobile_associations'
        | 'automotive_parts_and_accessories_stores'
        | 'automotive_tire_stores'
        | 'bail_and_bond_payments'
        | 'bakeries'
        | 'bands_orchestras'
        | 'barber_and_beauty_shops'
        | 'betting_casino_gambling'
        | 'bicycle_shops'
        | 'billiard_pool_establishments'
        | 'boat_dealers'
        | 'boat_rentals_and_leases'
        | 'book_stores'
        | 'books_periodicals_and_newspapers'
        | 'bowling_alleys'
        | 'bus_lines'
        | 'business_secretarial_schools'
        | 'buying_shopping_services'
        | 'cable_satellite_and_other_pay_television_and_radio'
        | 'camera_and_photographic_supply_stores'
        | 'candy_nut_and_confectionery_stores'
        | 'car_and_truck_dealers_new_used'
        | 'car_and_truck_dealers_used_only'
        | 'car_rental_agencies'
        | 'car_washes'
        | 'carpentry_services'
        | 'carpet_upholstery_cleaning'
        | 'caterers'
        | 'charitable_and_social_service_organizations_fundraising'
        | 'chemicals_and_allied_products'
        | 'child_care_services'
        | 'childrens_and_infants_wear_stores'
        | 'chiropodists_podiatrists'
        | 'chiropractors'
        | 'cigar_stores_and_stands'
        | 'civic_social_fraternal_associations'
        | 'cleaning_and_maintenance'
        | 'clothing_rental'
        | 'colleges_universities'
        | 'commercial_equipment'
        | 'commercial_footwear'
        | 'commercial_photography_art_and_graphics'
        | 'commuter_transport_and_ferries'
        | 'computer_network_services'
        | 'computer_programming'
        | 'computer_repair'
        | 'computer_software_stores'
        | 'computers_peripherals_and_software'
        | 'concrete_work_services'
        | 'construction_materials'
        | 'consulting_public_relations'
        | 'correspondence_schools'
        | 'cosmetic_stores'
        | 'counseling_services'
        | 'country_clubs'
        | 'courier_services'
        | 'court_costs'
        | 'credit_reporting_agencies'
        | 'cruise_lines'
        | 'dairy_products_stores'
        | 'dance_hall_studios_schools'
        | 'dating_escort_services'
        | 'dentists_orthodontists'
        | 'department_stores'
        | 'detective_agencies'
        | 'digital_goods_applications'
        | 'digital_goods_games'
        | 'digital_goods_large_volume'
        | 'digital_goods_media'
        | 'direct_marketing_catalog_merchant'
        | 'direct_marketing_combination_catalog_and_retail_merchant'
        | 'direct_marketing_inbound_telemarketing'
        | 'direct_marketing_insurance_services'
        | 'direct_marketing_other'
        | 'direct_marketing_outbound_telemarketing'
        | 'direct_marketing_subscription'
        | 'direct_marketing_travel'
        | 'discount_stores'
        | 'doctors'
        | 'door_to_door_sales'
        | 'drapery_window_covering_and_upholstery_stores'
        | 'drinking_places'
        | 'drug_stores_and_pharmacies'
        | 'drugs_drug_proprietaries_and_druggist_sundries'
        | 'dry_cleaners'
        | 'durable_goods'
        | 'duty_free_stores'
        | 'eating_places_restaurants'
        | 'educational_services'
        | 'electric_razor_stores'
        | 'electric_vehicle_charging'
        | 'electrical_parts_and_equipment'
        | 'electrical_services'
        | 'electronics_repair_shops'
        | 'electronics_stores'
        | 'elementary_secondary_schools'
        | 'emergency_services_gcas_visa_use_only'
        | 'employment_temp_agencies'
        | 'equipment_rental'
        | 'exterminating_services'
        | 'family_clothing_stores'
        | 'fast_food_restaurants'
        | 'financial_institutions'
        | 'fines_government_administrative_entities'
        | 'fireplace_fireplace_screens_and_accessories_stores'
        | 'floor_covering_stores'
        | 'florists'
        | 'florists_supplies_nursery_stock_and_flowers'
        | 'freezer_and_locker_meat_provisioners'
        | 'fuel_dealers_non_automotive'
        | 'funeral_services_crematories'
        | 'furniture_home_furnishings_and_equipment_stores_except_appliances'
        | 'furniture_repair_refinishing'
        | 'furriers_and_fur_shops'
        | 'general_services'
        | 'gift_card_novelty_and_souvenir_shops'
        | 'glass_paint_and_wallpaper_stores'
        | 'glassware_crystal_stores'
        | 'golf_courses_public'
        | 'government_licensed_horse_dog_racing_us_region_only'
        | 'government_licensed_online_casions_online_gambling_us_region_only'
        | 'government_owned_lotteries_non_us_region'
        | 'government_owned_lotteries_us_region_only'
        | 'government_services'
        | 'grocery_stores_supermarkets'
        | 'hardware_equipment_and_supplies'
        | 'hardware_stores'
        | 'health_and_beauty_spas'
        | 'hearing_aids_sales_and_supplies'
        | 'heating_plumbing_a_c'
        | 'hobby_toy_and_game_shops'
        | 'home_supply_warehouse_stores'
        | 'hospitals'
        | 'hotels_motels_and_resorts'
        | 'household_appliance_stores'
        | 'industrial_supplies'
        | 'information_retrieval_services'
        | 'insurance_default'
        | 'insurance_underwriting_premiums'
        | 'intra_company_purchases'
        | 'jewelry_stores_watches_clocks_and_silverware_stores'
        | 'landscaping_services'
        | 'laundries'
        | 'laundry_cleaning_services'
        | 'legal_services_attorneys'
        | 'luggage_and_leather_goods_stores'
        | 'lumber_building_materials_stores'
        | 'manual_cash_disburse'
        | 'marinas_service_and_supplies'
        | 'marketplaces'
        | 'masonry_stonework_and_plaster'
        | 'massage_parlors'
        | 'medical_and_dental_labs'
        | 'medical_dental_ophthalmic_and_hospital_equipment_and_supplies'
        | 'medical_services'
        | 'membership_organizations'
        | 'mens_and_boys_clothing_and_accessories_stores'
        | 'mens_womens_clothing_stores'
        | 'metal_service_centers'
        | 'miscellaneous'
        | 'miscellaneous_apparel_and_accessory_shops'
        | 'miscellaneous_auto_dealers'
        | 'miscellaneous_business_services'
        | 'miscellaneous_food_stores'
        | 'miscellaneous_general_merchandise'
        | 'miscellaneous_general_services'
        | 'miscellaneous_home_furnishing_specialty_stores'
        | 'miscellaneous_publishing_and_printing'
        | 'miscellaneous_recreation_services'
        | 'miscellaneous_repair_shops'
        | 'miscellaneous_specialty_retail'
        | 'mobile_home_dealers'
        | 'motion_picture_theaters'
        | 'motor_freight_carriers_and_trucking'
        | 'motor_homes_dealers'
        | 'motor_vehicle_supplies_and_new_parts'
        | 'motorcycle_shops_and_dealers'
        | 'motorcycle_shops_dealers'
        | 'music_stores_musical_instruments_pianos_and_sheet_music'
        | 'news_dealers_and_newsstands'
        | 'non_fi_money_orders'
        | 'non_fi_stored_value_card_purchase_load'
        | 'nondurable_goods'
        | 'nurseries_lawn_and_garden_supply_stores'
        | 'nursing_personal_care'
        | 'office_and_commercial_furniture'
        | 'opticians_eyeglasses'
        | 'optometrists_ophthalmologist'
        | 'orthopedic_goods_prosthetic_devices'
        | 'osteopaths'
        | 'package_stores_beer_wine_and_liquor'
        | 'paints_varnishes_and_supplies'
        | 'parking_lots_garages'
        | 'passenger_railways'
        | 'pawn_shops'
        | 'pet_shops_pet_food_and_supplies'
        | 'petroleum_and_petroleum_products'
        | 'photo_developing'
        | 'photographic_photocopy_microfilm_equipment_and_supplies'
        | 'photographic_studios'
        | 'picture_video_production'
        | 'piece_goods_notions_and_other_dry_goods'
        | 'plumbing_heating_equipment_and_supplies'
        | 'political_organizations'
        | 'postal_services_government_only'
        | 'precious_stones_and_metals_watches_and_jewelry'
        | 'professional_services'
        | 'public_warehousing_and_storage'
        | 'quick_copy_repro_and_blueprint'
        | 'railroads'
        | 'real_estate_agents_and_managers_rentals'
        | 'record_stores'
        | 'recreational_vehicle_rentals'
        | 'religious_goods_stores'
        | 'religious_organizations'
        | 'roofing_siding_sheet_metal'
        | 'secretarial_support_services'
        | 'security_brokers_dealers'
        | 'service_stations'
        | 'sewing_needlework_fabric_and_piece_goods_stores'
        | 'shoe_repair_hat_cleaning'
        | 'shoe_stores'
        | 'small_appliance_repair'
        | 'snowmobile_dealers'
        | 'special_trade_services'
        | 'specialty_cleaning'
        | 'sporting_goods_stores'
        | 'sporting_recreation_camps'
        | 'sports_and_riding_apparel_stores'
        | 'sports_clubs_fields'
        | 'stamp_and_coin_stores'
        | 'stationary_office_supplies_printing_and_writing_paper'
        | 'stationery_stores_office_and_school_supply_stores'
        | 'swimming_pools_sales'
        | 't_ui_travel_germany'
        | 'tailors_alterations'
        | 'tax_payments_government_agencies'
        | 'tax_preparation_services'
        | 'taxicabs_limousines'
        | 'telecommunication_equipment_and_telephone_sales'
        | 'telecommunication_services'
        | 'telegraph_services'
        | 'tent_and_awning_shops'
        | 'testing_laboratories'
        | 'theatrical_ticket_agencies'
        | 'timeshares'
        | 'tire_retreading_and_repair'
        | 'tolls_bridge_fees'
        | 'tourist_attractions_and_exhibits'
        | 'towing_services'
        | 'trailer_parks_campgrounds'
        | 'transportation_services'
        | 'travel_agencies_tour_operators'
        | 'truck_stop_iteration'
        | 'truck_utility_trailer_rentals'
        | 'typesetting_plate_making_and_related_services'
        | 'typewriter_stores'
        | 'u_s_federal_government_agencies_or_departments'
        | 'uniforms_commercial_clothing'
        | 'used_merchandise_and_secondhand_stores'
        | 'utilities'
        | 'variety_stores'
        | 'veterinary_services'
        | 'video_amusement_game_supplies'
        | 'video_game_arcades'
        | 'video_tape_rental_stores'
        | 'vocational_trade_schools'
        | 'watch_jewelry_repair'
        | 'welding_repair'
        | 'wholesale_clubs'
        | 'wig_and_toupee_stores'
        | 'wires_money_orders'
        | 'womens_accessory_and_specialty_shops'
        | 'womens_ready_to_wear_stores'
        | 'wrecking_and_salvage_yards'
      )[]
    | null;
  allowed_merchant_countries?: string[] | null;
  blocked_categories?:
    | (
        | 'ac_refrigeration_repair'
        | 'accounting_bookkeeping_services'
        | 'advertising_services'
        | 'agricultural_cooperative'
        | 'airlines_air_carriers'
        | 'airports_flying_fields'
        | 'ambulance_services'
        | 'amusement_parks_carnivals'
        | 'antique_reproductions'
        | 'antique_shops'
        | 'aquariums'
        | 'architectural_surveying_services'
        | 'art_dealers_and_galleries'
        | 'artists_supply_and_craft_shops'
        | 'auto_and_home_supply_stores'
        | 'auto_body_repair_shops'
        | 'auto_paint_shops'
        | 'auto_service_shops'
        | 'automated_cash_disburse'
        | 'automated_fuel_dispensers'
        | 'automobile_associations'
        | 'automotive_parts_and_accessories_stores'
        | 'automotive_tire_stores'
        | 'bail_and_bond_payments'
        | 'bakeries'
        | 'bands_orchestras'
        | 'barber_and_beauty_shops'
        | 'betting_casino_gambling'
        | 'bicycle_shops'
        | 'billiard_pool_establishments'
        | 'boat_dealers'
        | 'boat_rentals_and_leases'
        | 'book_stores'
        | 'books_periodicals_and_newspapers'
        | 'bowling_alleys'
        | 'bus_lines'
        | 'business_secretarial_schools'
        | 'buying_shopping_services'
        | 'cable_satellite_and_other_pay_television_and_radio'
        | 'camera_and_photographic_supply_stores'
        | 'candy_nut_and_confectionery_stores'
        | 'car_and_truck_dealers_new_used'
        | 'car_and_truck_dealers_used_only'
        | 'car_rental_agencies'
        | 'car_washes'
        | 'carpentry_services'
        | 'carpet_upholstery_cleaning'
        | 'caterers'
        | 'charitable_and_social_service_organizations_fundraising'
        | 'chemicals_and_allied_products'
        | 'child_care_services'
        | 'childrens_and_infants_wear_stores'
        | 'chiropodists_podiatrists'
        | 'chiropractors'
        | 'cigar_stores_and_stands'
        | 'civic_social_fraternal_associations'
        | 'cleaning_and_maintenance'
        | 'clothing_rental'
        | 'colleges_universities'
        | 'commercial_equipment'
        | 'commercial_footwear'
        | 'commercial_photography_art_and_graphics'
        | 'commuter_transport_and_ferries'
        | 'computer_network_services'
        | 'computer_programming'
        | 'computer_repair'
        | 'computer_software_stores'
        | 'computers_peripherals_and_software'
        | 'concrete_work_services'
        | 'construction_materials'
        | 'consulting_public_relations'
        | 'correspondence_schools'
        | 'cosmetic_stores'
        | 'counseling_services'
        | 'country_clubs'
        | 'courier_services'
        | 'court_costs'
        | 'credit_reporting_agencies'
        | 'cruise_lines'
        | 'dairy_products_stores'
        | 'dance_hall_studios_schools'
        | 'dating_escort_services'
        | 'dentists_orthodontists'
        | 'department_stores'
        | 'detective_agencies'
        | 'digital_goods_applications'
        | 'digital_goods_games'
        | 'digital_goods_large_volume'
        | 'digital_goods_media'
        | 'direct_marketing_catalog_merchant'
        | 'direct_marketing_combination_catalog_and_retail_merchant'
        | 'direct_marketing_inbound_telemarketing'
        | 'direct_marketing_insurance_services'
        | 'direct_marketing_other'
        | 'direct_marketing_outbound_telemarketing'
        | 'direct_marketing_subscription'
        | 'direct_marketing_travel'
        | 'discount_stores'
        | 'doctors'
        | 'door_to_door_sales'
        | 'drapery_window_covering_and_upholstery_stores'
        | 'drinking_places'
        | 'drug_stores_and_pharmacies'
        | 'drugs_drug_proprietaries_and_druggist_sundries'
        | 'dry_cleaners'
        | 'durable_goods'
        | 'duty_free_stores'
        | 'eating_places_restaurants'
        | 'educational_services'
        | 'electric_razor_stores'
        | 'electric_vehicle_charging'
        | 'electrical_parts_and_equipment'
        | 'electrical_services'
        | 'electronics_repair_shops'
        | 'electronics_stores'
        | 'elementary_secondary_schools'
        | 'emergency_services_gcas_visa_use_only'
        | 'employment_temp_agencies'
        | 'equipment_rental'
        | 'exterminating_services'
        | 'family_clothing_stores'
        | 'fast_food_restaurants'
        | 'financial_institutions'
        | 'fines_government_administrative_entities'
        | 'fireplace_fireplace_screens_and_accessories_stores'
        | 'floor_covering_stores'
        | 'florists'
        | 'florists_supplies_nursery_stock_and_flowers'
        | 'freezer_and_locker_meat_provisioners'
        | 'fuel_dealers_non_automotive'
        | 'funeral_services_crematories'
        | 'furniture_home_furnishings_and_equipment_stores_except_appliances'
        | 'furniture_repair_refinishing'
        | 'furriers_and_fur_shops'
        | 'general_services'
        | 'gift_card_novelty_and_souvenir_shops'
        | 'glass_paint_and_wallpaper_stores'
        | 'glassware_crystal_stores'
        | 'golf_courses_public'
        | 'government_licensed_horse_dog_racing_us_region_only'
        | 'government_licensed_online_casions_online_gambling_us_region_only'
        | 'government_owned_lotteries_non_us_region'
        | 'government_owned_lotteries_us_region_only'
        | 'government_services'
        | 'grocery_stores_supermarkets'
        | 'hardware_equipment_and_supplies'
        | 'hardware_stores'
        | 'health_and_beauty_spas'
        | 'hearing_aids_sales_and_supplies'
        | 'heating_plumbing_a_c'
        | 'hobby_toy_and_game_shops'
        | 'home_supply_warehouse_stores'
        | 'hospitals'
        | 'hotels_motels_and_resorts'
        | 'household_appliance_stores'
        | 'industrial_supplies'
        | 'information_retrieval_services'
        | 'insurance_default'
        | 'insurance_underwriting_premiums'
        | 'intra_company_purchases'
        | 'jewelry_stores_watches_clocks_and_silverware_stores'
        | 'landscaping_services'
        | 'laundries'
        | 'laundry_cleaning_services'
        | 'legal_services_attorneys'
        | 'luggage_and_leather_goods_stores'
        | 'lumber_building_materials_stores'
        | 'manual_cash_disburse'
        | 'marinas_service_and_supplies'
        | 'marketplaces'
        | 'masonry_stonework_and_plaster'
        | 'massage_parlors'
        | 'medical_and_dental_labs'
        | 'medical_dental_ophthalmic_and_hospital_equipment_and_supplies'
        | 'medical_services'
        | 'membership_organizations'
        | 'mens_and_boys_clothing_and_accessories_stores'
        | 'mens_womens_clothing_stores'
        | 'metal_service_centers'
        | 'miscellaneous'
        | 'miscellaneous_apparel_and_accessory_shops'
        | 'miscellaneous_auto_dealers'
        | 'miscellaneous_business_services'
        | 'miscellaneous_food_stores'
        | 'miscellaneous_general_merchandise'
        | 'miscellaneous_general_services'
        | 'miscellaneous_home_furnishing_specialty_stores'
        | 'miscellaneous_publishing_and_printing'
        | 'miscellaneous_recreation_services'
        | 'miscellaneous_repair_shops'
        | 'miscellaneous_specialty_retail'
        | 'mobile_home_dealers'
        | 'motion_picture_theaters'
        | 'motor_freight_carriers_and_trucking'
        | 'motor_homes_dealers'
        | 'motor_vehicle_supplies_and_new_parts'
        | 'motorcycle_shops_and_dealers'
        | 'motorcycle_shops_dealers'
        | 'music_stores_musical_instruments_pianos_and_sheet_music'
        | 'news_dealers_and_newsstands'
        | 'non_fi_money_orders'
        | 'non_fi_stored_value_card_purchase_load'
        | 'nondurable_goods'
        | 'nurseries_lawn_and_garden_supply_stores'
        | 'nursing_personal_care'
        | 'office_and_commercial_furniture'
        | 'opticians_eyeglasses'
        | 'optometrists_ophthalmologist'
        | 'orthopedic_goods_prosthetic_devices'
        | 'osteopaths'
        | 'package_stores_beer_wine_and_liquor'
        | 'paints_varnishes_and_supplies'
        | 'parking_lots_garages'
        | 'passenger_railways'
        | 'pawn_shops'
        | 'pet_shops_pet_food_and_supplies'
        | 'petroleum_and_petroleum_products'
        | 'photo_developing'
        | 'photographic_photocopy_microfilm_equipment_and_supplies'
        | 'photographic_studios'
        | 'picture_video_production'
        | 'piece_goods_notions_and_other_dry_goods'
        | 'plumbing_heating_equipment_and_supplies'
        | 'political_organizations'
        | 'postal_services_government_only'
        | 'precious_stones_and_metals_watches_and_jewelry'
        | 'professional_services'
        | 'public_warehousing_and_storage'
        | 'quick_copy_repro_and_blueprint'
        | 'railroads'
        | 'real_estate_agents_and_managers_rentals'
        | 'record_stores'
        | 'recreational_vehicle_rentals'
        | 'religious_goods_stores'
        | 'religious_organizations'
        | 'roofing_siding_sheet_metal'
        | 'secretarial_support_services'
        | 'security_brokers_dealers'
        | 'service_stations'
        | 'sewing_needlework_fabric_and_piece_goods_stores'
        | 'shoe_repair_hat_cleaning'
        | 'shoe_stores'
        | 'small_appliance_repair'
        | 'snowmobile_dealers'
        | 'special_trade_services'
        | 'specialty_cleaning'
        | 'sporting_goods_stores'
        | 'sporting_recreation_camps'
        | 'sports_and_riding_apparel_stores'
        | 'sports_clubs_fields'
        | 'stamp_and_coin_stores'
        | 'stationary_office_supplies_printing_and_writing_paper'
        | 'stationery_stores_office_and_school_supply_stores'
        | 'swimming_pools_sales'
        | 't_ui_travel_germany'
        | 'tailors_alterations'
        | 'tax_payments_government_agencies'
        | 'tax_preparation_services'
        | 'taxicabs_limousines'
        | 'telecommunication_equipment_and_telephone_sales'
        | 'telecommunication_services'
        | 'telegraph_services'
        | 'tent_and_awning_shops'
        | 'testing_laboratories'
        | 'theatrical_ticket_agencies'
        | 'timeshares'
        | 'tire_retreading_and_repair'
        | 'tolls_bridge_fees'
        | 'tourist_attractions_and_exhibits'
        | 'towing_services'
        | 'trailer_parks_campgrounds'
        | 'transportation_services'
        | 'travel_agencies_tour_operators'
        | 'truck_stop_iteration'
        | 'truck_utility_trailer_rentals'
        | 'typesetting_plate_making_and_related_services'
        | 'typewriter_stores'
        | 'u_s_federal_government_agencies_or_departments'
        | 'uniforms_commercial_clothing'
        | 'used_merchandise_and_secondhand_stores'
        | 'utilities'
        | 'variety_stores'
        | 'veterinary_services'
        | 'video_amusement_game_supplies'
        | 'video_game_arcades'
        | 'video_tape_rental_stores'
        | 'vocational_trade_schools'
        | 'watch_jewelry_repair'
        | 'welding_repair'
        | 'wholesale_clubs'
        | 'wig_and_toupee_stores'
        | 'wires_money_orders'
        | 'womens_accessory_and_specialty_shops'
        | 'womens_ready_to_wear_stores'
        | 'wrecking_and_salvage_yards'
      )[]
    | null;
  blocked_merchant_countries?: string[] | null;
  spending_limits?: Issuing_cardholder_spending_limit[] | null;
  spending_limits_currency?: string | null;
};

export type Issuing_personalization_design_carrier_text = {
  footer_body?: string | null;
  footer_title?: string | null;
  header_body?: string | null;
  header_title?: string | null;
};

export type Issuing_physical_bundle_features = {
  card_logo: 'optional' | 'required' | 'unsupported';
  carrier_text: 'optional' | 'required' | 'unsupported';
  second_line: 'optional' | 'required' | 'unsupported';
};

export type Issuing_personalization_design_preferences = {
  is_default: boolean;
  is_platform_default?: null | boolean;
};

export type Issuing_personalization_design_rejection_reasons = {
  card_logo?:
    | (
        | 'geographic_location'
        | 'inappropriate'
        | 'network_name'
        | 'non_binary_image'
        | 'non_fiat_currency'
        | 'other'
        | 'other_entity'
        | 'promotional_material'
      )[]
    | null;
  carrier_text?:
    | (
        | 'geographic_location'
        | 'inappropriate'
        | 'network_name'
        | 'non_fiat_currency'
        | 'other'
        | 'other_entity'
        | 'promotional_material'
      )[]
    | null;
};

export type Issuing_card_shipping_address_validation = {
  mode: 'disabled' | 'normalization_only' | 'validation_and_normalization';
  normalized_address?: Address & Partial<Address>;
  result?:
    | 'indeterminate'
    | 'likely_deliverable'
    | 'likely_undeliverable'
    | null;
};

export type Issuing_card_shipping_customs = {
  eori_number?: string | null;
};

export type Issuing_card_shipping = {
  address: Address;
  address_validation?: Issuing_card_shipping_address_validation &
    Partial<Issuing_card_shipping_address_validation>;
  carrier?: 'dhl' | 'fedex' | 'royal_mail' | 'usps' | null;
  customs?: Issuing_card_shipping_customs &
    Partial<Issuing_card_shipping_customs>;
  eta?: null | number; // int
  name: string;
  phone_number?: string | null;
  require_signature?: null | boolean;
  service: 'express' | 'priority' | 'standard';
  status?:
    | 'canceled'
    | 'delivered'
    | 'failure'
    | 'pending'
    | 'returned'
    | 'shipped'
    | 'submitted'
    | null;
  tracking_number?: string | null;
  tracking_url?: string | null;
  type: 'bulk' | 'individual';
};

export type Issuing_card_spending_limit = {
  amount: number; // int
  categories?:
    | (
        | 'ac_refrigeration_repair'
        | 'accounting_bookkeeping_services'
        | 'advertising_services'
        | 'agricultural_cooperative'
        | 'airlines_air_carriers'
        | 'airports_flying_fields'
        | 'ambulance_services'
        | 'amusement_parks_carnivals'
        | 'antique_reproductions'
        | 'antique_shops'
        | 'aquariums'
        | 'architectural_surveying_services'
        | 'art_dealers_and_galleries'
        | 'artists_supply_and_craft_shops'
        | 'auto_and_home_supply_stores'
        | 'auto_body_repair_shops'
        | 'auto_paint_shops'
        | 'auto_service_shops'
        | 'automated_cash_disburse'
        | 'automated_fuel_dispensers'
        | 'automobile_associations'
        | 'automotive_parts_and_accessories_stores'
        | 'automotive_tire_stores'
        | 'bail_and_bond_payments'
        | 'bakeries'
        | 'bands_orchestras'
        | 'barber_and_beauty_shops'
        | 'betting_casino_gambling'
        | 'bicycle_shops'
        | 'billiard_pool_establishments'
        | 'boat_dealers'
        | 'boat_rentals_and_leases'
        | 'book_stores'
        | 'books_periodicals_and_newspapers'
        | 'bowling_alleys'
        | 'bus_lines'
        | 'business_secretarial_schools'
        | 'buying_shopping_services'
        | 'cable_satellite_and_other_pay_television_and_radio'
        | 'camera_and_photographic_supply_stores'
        | 'candy_nut_and_confectionery_stores'
        | 'car_and_truck_dealers_new_used'
        | 'car_and_truck_dealers_used_only'
        | 'car_rental_agencies'
        | 'car_washes'
        | 'carpentry_services'
        | 'carpet_upholstery_cleaning'
        | 'caterers'
        | 'charitable_and_social_service_organizations_fundraising'
        | 'chemicals_and_allied_products'
        | 'child_care_services'
        | 'childrens_and_infants_wear_stores'
        | 'chiropodists_podiatrists'
        | 'chiropractors'
        | 'cigar_stores_and_stands'
        | 'civic_social_fraternal_associations'
        | 'cleaning_and_maintenance'
        | 'clothing_rental'
        | 'colleges_universities'
        | 'commercial_equipment'
        | 'commercial_footwear'
        | 'commercial_photography_art_and_graphics'
        | 'commuter_transport_and_ferries'
        | 'computer_network_services'
        | 'computer_programming'
        | 'computer_repair'
        | 'computer_software_stores'
        | 'computers_peripherals_and_software'
        | 'concrete_work_services'
        | 'construction_materials'
        | 'consulting_public_relations'
        | 'correspondence_schools'
        | 'cosmetic_stores'
        | 'counseling_services'
        | 'country_clubs'
        | 'courier_services'
        | 'court_costs'
        | 'credit_reporting_agencies'
        | 'cruise_lines'
        | 'dairy_products_stores'
        | 'dance_hall_studios_schools'
        | 'dating_escort_services'
        | 'dentists_orthodontists'
        | 'department_stores'
        | 'detective_agencies'
        | 'digital_goods_applications'
        | 'digital_goods_games'
        | 'digital_goods_large_volume'
        | 'digital_goods_media'
        | 'direct_marketing_catalog_merchant'
        | 'direct_marketing_combination_catalog_and_retail_merchant'
        | 'direct_marketing_inbound_telemarketing'
        | 'direct_marketing_insurance_services'
        | 'direct_marketing_other'
        | 'direct_marketing_outbound_telemarketing'
        | 'direct_marketing_subscription'
        | 'direct_marketing_travel'
        | 'discount_stores'
        | 'doctors'
        | 'door_to_door_sales'
        | 'drapery_window_covering_and_upholstery_stores'
        | 'drinking_places'
        | 'drug_stores_and_pharmacies'
        | 'drugs_drug_proprietaries_and_druggist_sundries'
        | 'dry_cleaners'
        | 'durable_goods'
        | 'duty_free_stores'
        | 'eating_places_restaurants'
        | 'educational_services'
        | 'electric_razor_stores'
        | 'electric_vehicle_charging'
        | 'electrical_parts_and_equipment'
        | 'electrical_services'
        | 'electronics_repair_shops'
        | 'electronics_stores'
        | 'elementary_secondary_schools'
        | 'emergency_services_gcas_visa_use_only'
        | 'employment_temp_agencies'
        | 'equipment_rental'
        | 'exterminating_services'
        | 'family_clothing_stores'
        | 'fast_food_restaurants'
        | 'financial_institutions'
        | 'fines_government_administrative_entities'
        | 'fireplace_fireplace_screens_and_accessories_stores'
        | 'floor_covering_stores'
        | 'florists'
        | 'florists_supplies_nursery_stock_and_flowers'
        | 'freezer_and_locker_meat_provisioners'
        | 'fuel_dealers_non_automotive'
        | 'funeral_services_crematories'
        | 'furniture_home_furnishings_and_equipment_stores_except_appliances'
        | 'furniture_repair_refinishing'
        | 'furriers_and_fur_shops'
        | 'general_services'
        | 'gift_card_novelty_and_souvenir_shops'
        | 'glass_paint_and_wallpaper_stores'
        | 'glassware_crystal_stores'
        | 'golf_courses_public'
        | 'government_licensed_horse_dog_racing_us_region_only'
        | 'government_licensed_online_casions_online_gambling_us_region_only'
        | 'government_owned_lotteries_non_us_region'
        | 'government_owned_lotteries_us_region_only'
        | 'government_services'
        | 'grocery_stores_supermarkets'
        | 'hardware_equipment_and_supplies'
        | 'hardware_stores'
        | 'health_and_beauty_spas'
        | 'hearing_aids_sales_and_supplies'
        | 'heating_plumbing_a_c'
        | 'hobby_toy_and_game_shops'
        | 'home_supply_warehouse_stores'
        | 'hospitals'
        | 'hotels_motels_and_resorts'
        | 'household_appliance_stores'
        | 'industrial_supplies'
        | 'information_retrieval_services'
        | 'insurance_default'
        | 'insurance_underwriting_premiums'
        | 'intra_company_purchases'
        | 'jewelry_stores_watches_clocks_and_silverware_stores'
        | 'landscaping_services'
        | 'laundries'
        | 'laundry_cleaning_services'
        | 'legal_services_attorneys'
        | 'luggage_and_leather_goods_stores'
        | 'lumber_building_materials_stores'
        | 'manual_cash_disburse'
        | 'marinas_service_and_supplies'
        | 'marketplaces'
        | 'masonry_stonework_and_plaster'
        | 'massage_parlors'
        | 'medical_and_dental_labs'
        | 'medical_dental_ophthalmic_and_hospital_equipment_and_supplies'
        | 'medical_services'
        | 'membership_organizations'
        | 'mens_and_boys_clothing_and_accessories_stores'
        | 'mens_womens_clothing_stores'
        | 'metal_service_centers'
        | 'miscellaneous'
        | 'miscellaneous_apparel_and_accessory_shops'
        | 'miscellaneous_auto_dealers'
        | 'miscellaneous_business_services'
        | 'miscellaneous_food_stores'
        | 'miscellaneous_general_merchandise'
        | 'miscellaneous_general_services'
        | 'miscellaneous_home_furnishing_specialty_stores'
        | 'miscellaneous_publishing_and_printing'
        | 'miscellaneous_recreation_services'
        | 'miscellaneous_repair_shops'
        | 'miscellaneous_specialty_retail'
        | 'mobile_home_dealers'
        | 'motion_picture_theaters'
        | 'motor_freight_carriers_and_trucking'
        | 'motor_homes_dealers'
        | 'motor_vehicle_supplies_and_new_parts'
        | 'motorcycle_shops_and_dealers'
        | 'motorcycle_shops_dealers'
        | 'music_stores_musical_instruments_pianos_and_sheet_music'
        | 'news_dealers_and_newsstands'
        | 'non_fi_money_orders'
        | 'non_fi_stored_value_card_purchase_load'
        | 'nondurable_goods'
        | 'nurseries_lawn_and_garden_supply_stores'
        | 'nursing_personal_care'
        | 'office_and_commercial_furniture'
        | 'opticians_eyeglasses'
        | 'optometrists_ophthalmologist'
        | 'orthopedic_goods_prosthetic_devices'
        | 'osteopaths'
        | 'package_stores_beer_wine_and_liquor'
        | 'paints_varnishes_and_supplies'
        | 'parking_lots_garages'
        | 'passenger_railways'
        | 'pawn_shops'
        | 'pet_shops_pet_food_and_supplies'
        | 'petroleum_and_petroleum_products'
        | 'photo_developing'
        | 'photographic_photocopy_microfilm_equipment_and_supplies'
        | 'photographic_studios'
        | 'picture_video_production'
        | 'piece_goods_notions_and_other_dry_goods'
        | 'plumbing_heating_equipment_and_supplies'
        | 'political_organizations'
        | 'postal_services_government_only'
        | 'precious_stones_and_metals_watches_and_jewelry'
        | 'professional_services'
        | 'public_warehousing_and_storage'
        | 'quick_copy_repro_and_blueprint'
        | 'railroads'
        | 'real_estate_agents_and_managers_rentals'
        | 'record_stores'
        | 'recreational_vehicle_rentals'
        | 'religious_goods_stores'
        | 'religious_organizations'
        | 'roofing_siding_sheet_metal'
        | 'secretarial_support_services'
        | 'security_brokers_dealers'
        | 'service_stations'
        | 'sewing_needlework_fabric_and_piece_goods_stores'
        | 'shoe_repair_hat_cleaning'
        | 'shoe_stores'
        | 'small_appliance_repair'
        | 'snowmobile_dealers'
        | 'special_trade_services'
        | 'specialty_cleaning'
        | 'sporting_goods_stores'
        | 'sporting_recreation_camps'
        | 'sports_and_riding_apparel_stores'
        | 'sports_clubs_fields'
        | 'stamp_and_coin_stores'
        | 'stationary_office_supplies_printing_and_writing_paper'
        | 'stationery_stores_office_and_school_supply_stores'
        | 'swimming_pools_sales'
        | 't_ui_travel_germany'
        | 'tailors_alterations'
        | 'tax_payments_government_agencies'
        | 'tax_preparation_services'
        | 'taxicabs_limousines'
        | 'telecommunication_equipment_and_telephone_sales'
        | 'telecommunication_services'
        | 'telegraph_services'
        | 'tent_and_awning_shops'
        | 'testing_laboratories'
        | 'theatrical_ticket_agencies'
        | 'timeshares'
        | 'tire_retreading_and_repair'
        | 'tolls_bridge_fees'
        | 'tourist_attractions_and_exhibits'
        | 'towing_services'
        | 'trailer_parks_campgrounds'
        | 'transportation_services'
        | 'travel_agencies_tour_operators'
        | 'truck_stop_iteration'
        | 'truck_utility_trailer_rentals'
        | 'typesetting_plate_making_and_related_services'
        | 'typewriter_stores'
        | 'u_s_federal_government_agencies_or_departments'
        | 'uniforms_commercial_clothing'
        | 'used_merchandise_and_secondhand_stores'
        | 'utilities'
        | 'variety_stores'
        | 'veterinary_services'
        | 'video_amusement_game_supplies'
        | 'video_game_arcades'
        | 'video_tape_rental_stores'
        | 'vocational_trade_schools'
        | 'watch_jewelry_repair'
        | 'welding_repair'
        | 'wholesale_clubs'
        | 'wig_and_toupee_stores'
        | 'wires_money_orders'
        | 'womens_accessory_and_specialty_shops'
        | 'womens_ready_to_wear_stores'
        | 'wrecking_and_salvage_yards'
      )[]
    | null;
  interval:
    | 'all_time'
    | 'daily'
    | 'monthly'
    | 'per_authorization'
    | 'weekly'
    | 'yearly';
};

export type Issuing_card_authorization_controls = {
  allowed_categories?:
    | (
        | 'ac_refrigeration_repair'
        | 'accounting_bookkeeping_services'
        | 'advertising_services'
        | 'agricultural_cooperative'
        | 'airlines_air_carriers'
        | 'airports_flying_fields'
        | 'ambulance_services'
        | 'amusement_parks_carnivals'
        | 'antique_reproductions'
        | 'antique_shops'
        | 'aquariums'
        | 'architectural_surveying_services'
        | 'art_dealers_and_galleries'
        | 'artists_supply_and_craft_shops'
        | 'auto_and_home_supply_stores'
        | 'auto_body_repair_shops'
        | 'auto_paint_shops'
        | 'auto_service_shops'
        | 'automated_cash_disburse'
        | 'automated_fuel_dispensers'
        | 'automobile_associations'
        | 'automotive_parts_and_accessories_stores'
        | 'automotive_tire_stores'
        | 'bail_and_bond_payments'
        | 'bakeries'
        | 'bands_orchestras'
        | 'barber_and_beauty_shops'
        | 'betting_casino_gambling'
        | 'bicycle_shops'
        | 'billiard_pool_establishments'
        | 'boat_dealers'
        | 'boat_rentals_and_leases'
        | 'book_stores'
        | 'books_periodicals_and_newspapers'
        | 'bowling_alleys'
        | 'bus_lines'
        | 'business_secretarial_schools'
        | 'buying_shopping_services'
        | 'cable_satellite_and_other_pay_television_and_radio'
        | 'camera_and_photographic_supply_stores'
        | 'candy_nut_and_confectionery_stores'
        | 'car_and_truck_dealers_new_used'
        | 'car_and_truck_dealers_used_only'
        | 'car_rental_agencies'
        | 'car_washes'
        | 'carpentry_services'
        | 'carpet_upholstery_cleaning'
        | 'caterers'
        | 'charitable_and_social_service_organizations_fundraising'
        | 'chemicals_and_allied_products'
        | 'child_care_services'
        | 'childrens_and_infants_wear_stores'
        | 'chiropodists_podiatrists'
        | 'chiropractors'
        | 'cigar_stores_and_stands'
        | 'civic_social_fraternal_associations'
        | 'cleaning_and_maintenance'
        | 'clothing_rental'
        | 'colleges_universities'
        | 'commercial_equipment'
        | 'commercial_footwear'
        | 'commercial_photography_art_and_graphics'
        | 'commuter_transport_and_ferries'
        | 'computer_network_services'
        | 'computer_programming'
        | 'computer_repair'
        | 'computer_software_stores'
        | 'computers_peripherals_and_software'
        | 'concrete_work_services'
        | 'construction_materials'
        | 'consulting_public_relations'
        | 'correspondence_schools'
        | 'cosmetic_stores'
        | 'counseling_services'
        | 'country_clubs'
        | 'courier_services'
        | 'court_costs'
        | 'credit_reporting_agencies'
        | 'cruise_lines'
        | 'dairy_products_stores'
        | 'dance_hall_studios_schools'
        | 'dating_escort_services'
        | 'dentists_orthodontists'
        | 'department_stores'
        | 'detective_agencies'
        | 'digital_goods_applications'
        | 'digital_goods_games'
        | 'digital_goods_large_volume'
        | 'digital_goods_media'
        | 'direct_marketing_catalog_merchant'
        | 'direct_marketing_combination_catalog_and_retail_merchant'
        | 'direct_marketing_inbound_telemarketing'
        | 'direct_marketing_insurance_services'
        | 'direct_marketing_other'
        | 'direct_marketing_outbound_telemarketing'
        | 'direct_marketing_subscription'
        | 'direct_marketing_travel'
        | 'discount_stores'
        | 'doctors'
        | 'door_to_door_sales'
        | 'drapery_window_covering_and_upholstery_stores'
        | 'drinking_places'
        | 'drug_stores_and_pharmacies'
        | 'drugs_drug_proprietaries_and_druggist_sundries'
        | 'dry_cleaners'
        | 'durable_goods'
        | 'duty_free_stores'
        | 'eating_places_restaurants'
        | 'educational_services'
        | 'electric_razor_stores'
        | 'electric_vehicle_charging'
        | 'electrical_parts_and_equipment'
        | 'electrical_services'
        | 'electronics_repair_shops'
        | 'electronics_stores'
        | 'elementary_secondary_schools'
        | 'emergency_services_gcas_visa_use_only'
        | 'employment_temp_agencies'
        | 'equipment_rental'
        | 'exterminating_services'
        | 'family_clothing_stores'
        | 'fast_food_restaurants'
        | 'financial_institutions'
        | 'fines_government_administrative_entities'
        | 'fireplace_fireplace_screens_and_accessories_stores'
        | 'floor_covering_stores'
        | 'florists'
        | 'florists_supplies_nursery_stock_and_flowers'
        | 'freezer_and_locker_meat_provisioners'
        | 'fuel_dealers_non_automotive'
        | 'funeral_services_crematories'
        | 'furniture_home_furnishings_and_equipment_stores_except_appliances'
        | 'furniture_repair_refinishing'
        | 'furriers_and_fur_shops'
        | 'general_services'
        | 'gift_card_novelty_and_souvenir_shops'
        | 'glass_paint_and_wallpaper_stores'
        | 'glassware_crystal_stores'
        | 'golf_courses_public'
        | 'government_licensed_horse_dog_racing_us_region_only'
        | 'government_licensed_online_casions_online_gambling_us_region_only'
        | 'government_owned_lotteries_non_us_region'
        | 'government_owned_lotteries_us_region_only'
        | 'government_services'
        | 'grocery_stores_supermarkets'
        | 'hardware_equipment_and_supplies'
        | 'hardware_stores'
        | 'health_and_beauty_spas'
        | 'hearing_aids_sales_and_supplies'
        | 'heating_plumbing_a_c'
        | 'hobby_toy_and_game_shops'
        | 'home_supply_warehouse_stores'
        | 'hospitals'
        | 'hotels_motels_and_resorts'
        | 'household_appliance_stores'
        | 'industrial_supplies'
        | 'information_retrieval_services'
        | 'insurance_default'
        | 'insurance_underwriting_premiums'
        | 'intra_company_purchases'
        | 'jewelry_stores_watches_clocks_and_silverware_stores'
        | 'landscaping_services'
        | 'laundries'
        | 'laundry_cleaning_services'
        | 'legal_services_attorneys'
        | 'luggage_and_leather_goods_stores'
        | 'lumber_building_materials_stores'
        | 'manual_cash_disburse'
        | 'marinas_service_and_supplies'
        | 'marketplaces'
        | 'masonry_stonework_and_plaster'
        | 'massage_parlors'
        | 'medical_and_dental_labs'
        | 'medical_dental_ophthalmic_and_hospital_equipment_and_supplies'
        | 'medical_services'
        | 'membership_organizations'
        | 'mens_and_boys_clothing_and_accessories_stores'
        | 'mens_womens_clothing_stores'
        | 'metal_service_centers'
        | 'miscellaneous'
        | 'miscellaneous_apparel_and_accessory_shops'
        | 'miscellaneous_auto_dealers'
        | 'miscellaneous_business_services'
        | 'miscellaneous_food_stores'
        | 'miscellaneous_general_merchandise'
        | 'miscellaneous_general_services'
        | 'miscellaneous_home_furnishing_specialty_stores'
        | 'miscellaneous_publishing_and_printing'
        | 'miscellaneous_recreation_services'
        | 'miscellaneous_repair_shops'
        | 'miscellaneous_specialty_retail'
        | 'mobile_home_dealers'
        | 'motion_picture_theaters'
        | 'motor_freight_carriers_and_trucking'
        | 'motor_homes_dealers'
        | 'motor_vehicle_supplies_and_new_parts'
        | 'motorcycle_shops_and_dealers'
        | 'motorcycle_shops_dealers'
        | 'music_stores_musical_instruments_pianos_and_sheet_music'
        | 'news_dealers_and_newsstands'
        | 'non_fi_money_orders'
        | 'non_fi_stored_value_card_purchase_load'
        | 'nondurable_goods'
        | 'nurseries_lawn_and_garden_supply_stores'
        | 'nursing_personal_care'
        | 'office_and_commercial_furniture'
        | 'opticians_eyeglasses'
        | 'optometrists_ophthalmologist'
        | 'orthopedic_goods_prosthetic_devices'
        | 'osteopaths'
        | 'package_stores_beer_wine_and_liquor'
        | 'paints_varnishes_and_supplies'
        | 'parking_lots_garages'
        | 'passenger_railways'
        | 'pawn_shops'
        | 'pet_shops_pet_food_and_supplies'
        | 'petroleum_and_petroleum_products'
        | 'photo_developing'
        | 'photographic_photocopy_microfilm_equipment_and_supplies'
        | 'photographic_studios'
        | 'picture_video_production'
        | 'piece_goods_notions_and_other_dry_goods'
        | 'plumbing_heating_equipment_and_supplies'
        | 'political_organizations'
        | 'postal_services_government_only'
        | 'precious_stones_and_metals_watches_and_jewelry'
        | 'professional_services'
        | 'public_warehousing_and_storage'
        | 'quick_copy_repro_and_blueprint'
        | 'railroads'
        | 'real_estate_agents_and_managers_rentals'
        | 'record_stores'
        | 'recreational_vehicle_rentals'
        | 'religious_goods_stores'
        | 'religious_organizations'
        | 'roofing_siding_sheet_metal'
        | 'secretarial_support_services'
        | 'security_brokers_dealers'
        | 'service_stations'
        | 'sewing_needlework_fabric_and_piece_goods_stores'
        | 'shoe_repair_hat_cleaning'
        | 'shoe_stores'
        | 'small_appliance_repair'
        | 'snowmobile_dealers'
        | 'special_trade_services'
        | 'specialty_cleaning'
        | 'sporting_goods_stores'
        | 'sporting_recreation_camps'
        | 'sports_and_riding_apparel_stores'
        | 'sports_clubs_fields'
        | 'stamp_and_coin_stores'
        | 'stationary_office_supplies_printing_and_writing_paper'
        | 'stationery_stores_office_and_school_supply_stores'
        | 'swimming_pools_sales'
        | 't_ui_travel_germany'
        | 'tailors_alterations'
        | 'tax_payments_government_agencies'
        | 'tax_preparation_services'
        | 'taxicabs_limousines'
        | 'telecommunication_equipment_and_telephone_sales'
        | 'telecommunication_services'
        | 'telegraph_services'
        | 'tent_and_awning_shops'
        | 'testing_laboratories'
        | 'theatrical_ticket_agencies'
        | 'timeshares'
        | 'tire_retreading_and_repair'
        | 'tolls_bridge_fees'
        | 'tourist_attractions_and_exhibits'
        | 'towing_services'
        | 'trailer_parks_campgrounds'
        | 'transportation_services'
        | 'travel_agencies_tour_operators'
        | 'truck_stop_iteration'
        | 'truck_utility_trailer_rentals'
        | 'typesetting_plate_making_and_related_services'
        | 'typewriter_stores'
        | 'u_s_federal_government_agencies_or_departments'
        | 'uniforms_commercial_clothing'
        | 'used_merchandise_and_secondhand_stores'
        | 'utilities'
        | 'variety_stores'
        | 'veterinary_services'
        | 'video_amusement_game_supplies'
        | 'video_game_arcades'
        | 'video_tape_rental_stores'
        | 'vocational_trade_schools'
        | 'watch_jewelry_repair'
        | 'welding_repair'
        | 'wholesale_clubs'
        | 'wig_and_toupee_stores'
        | 'wires_money_orders'
        | 'womens_accessory_and_specialty_shops'
        | 'womens_ready_to_wear_stores'
        | 'wrecking_and_salvage_yards'
      )[]
    | null;
  allowed_merchant_countries?: string[] | null;
  blocked_categories?:
    | (
        | 'ac_refrigeration_repair'
        | 'accounting_bookkeeping_services'
        | 'advertising_services'
        | 'agricultural_cooperative'
        | 'airlines_air_carriers'
        | 'airports_flying_fields'
        | 'ambulance_services'
        | 'amusement_parks_carnivals'
        | 'antique_reproductions'
        | 'antique_shops'
        | 'aquariums'
        | 'architectural_surveying_services'
        | 'art_dealers_and_galleries'
        | 'artists_supply_and_craft_shops'
        | 'auto_and_home_supply_stores'
        | 'auto_body_repair_shops'
        | 'auto_paint_shops'
        | 'auto_service_shops'
        | 'automated_cash_disburse'
        | 'automated_fuel_dispensers'
        | 'automobile_associations'
        | 'automotive_parts_and_accessories_stores'
        | 'automotive_tire_stores'
        | 'bail_and_bond_payments'
        | 'bakeries'
        | 'bands_orchestras'
        | 'barber_and_beauty_shops'
        | 'betting_casino_gambling'
        | 'bicycle_shops'
        | 'billiard_pool_establishments'
        | 'boat_dealers'
        | 'boat_rentals_and_leases'
        | 'book_stores'
        | 'books_periodicals_and_newspapers'
        | 'bowling_alleys'
        | 'bus_lines'
        | 'business_secretarial_schools'
        | 'buying_shopping_services'
        | 'cable_satellite_and_other_pay_television_and_radio'
        | 'camera_and_photographic_supply_stores'
        | 'candy_nut_and_confectionery_stores'
        | 'car_and_truck_dealers_new_used'
        | 'car_and_truck_dealers_used_only'
        | 'car_rental_agencies'
        | 'car_washes'
        | 'carpentry_services'
        | 'carpet_upholstery_cleaning'
        | 'caterers'
        | 'charitable_and_social_service_organizations_fundraising'
        | 'chemicals_and_allied_products'
        | 'child_care_services'
        | 'childrens_and_infants_wear_stores'
        | 'chiropodists_podiatrists'
        | 'chiropractors'
        | 'cigar_stores_and_stands'
        | 'civic_social_fraternal_associations'
        | 'cleaning_and_maintenance'
        | 'clothing_rental'
        | 'colleges_universities'
        | 'commercial_equipment'
        | 'commercial_footwear'
        | 'commercial_photography_art_and_graphics'
        | 'commuter_transport_and_ferries'
        | 'computer_network_services'
        | 'computer_programming'
        | 'computer_repair'
        | 'computer_software_stores'
        | 'computers_peripherals_and_software'
        | 'concrete_work_services'
        | 'construction_materials'
        | 'consulting_public_relations'
        | 'correspondence_schools'
        | 'cosmetic_stores'
        | 'counseling_services'
        | 'country_clubs'
        | 'courier_services'
        | 'court_costs'
        | 'credit_reporting_agencies'
        | 'cruise_lines'
        | 'dairy_products_stores'
        | 'dance_hall_studios_schools'
        | 'dating_escort_services'
        | 'dentists_orthodontists'
        | 'department_stores'
        | 'detective_agencies'
        | 'digital_goods_applications'
        | 'digital_goods_games'
        | 'digital_goods_large_volume'
        | 'digital_goods_media'
        | 'direct_marketing_catalog_merchant'
        | 'direct_marketing_combination_catalog_and_retail_merchant'
        | 'direct_marketing_inbound_telemarketing'
        | 'direct_marketing_insurance_services'
        | 'direct_marketing_other'
        | 'direct_marketing_outbound_telemarketing'
        | 'direct_marketing_subscription'
        | 'direct_marketing_travel'
        | 'discount_stores'
        | 'doctors'
        | 'door_to_door_sales'
        | 'drapery_window_covering_and_upholstery_stores'
        | 'drinking_places'
        | 'drug_stores_and_pharmacies'
        | 'drugs_drug_proprietaries_and_druggist_sundries'
        | 'dry_cleaners'
        | 'durable_goods'
        | 'duty_free_stores'
        | 'eating_places_restaurants'
        | 'educational_services'
        | 'electric_razor_stores'
        | 'electric_vehicle_charging'
        | 'electrical_parts_and_equipment'
        | 'electrical_services'
        | 'electronics_repair_shops'
        | 'electronics_stores'
        | 'elementary_secondary_schools'
        | 'emergency_services_gcas_visa_use_only'
        | 'employment_temp_agencies'
        | 'equipment_rental'
        | 'exterminating_services'
        | 'family_clothing_stores'
        | 'fast_food_restaurants'
        | 'financial_institutions'
        | 'fines_government_administrative_entities'
        | 'fireplace_fireplace_screens_and_accessories_stores'
        | 'floor_covering_stores'
        | 'florists'
        | 'florists_supplies_nursery_stock_and_flowers'
        | 'freezer_and_locker_meat_provisioners'
        | 'fuel_dealers_non_automotive'
        | 'funeral_services_crematories'
        | 'furniture_home_furnishings_and_equipment_stores_except_appliances'
        | 'furniture_repair_refinishing'
        | 'furriers_and_fur_shops'
        | 'general_services'
        | 'gift_card_novelty_and_souvenir_shops'
        | 'glass_paint_and_wallpaper_stores'
        | 'glassware_crystal_stores'
        | 'golf_courses_public'
        | 'government_licensed_horse_dog_racing_us_region_only'
        | 'government_licensed_online_casions_online_gambling_us_region_only'
        | 'government_owned_lotteries_non_us_region'
        | 'government_owned_lotteries_us_region_only'
        | 'government_services'
        | 'grocery_stores_supermarkets'
        | 'hardware_equipment_and_supplies'
        | 'hardware_stores'
        | 'health_and_beauty_spas'
        | 'hearing_aids_sales_and_supplies'
        | 'heating_plumbing_a_c'
        | 'hobby_toy_and_game_shops'
        | 'home_supply_warehouse_stores'
        | 'hospitals'
        | 'hotels_motels_and_resorts'
        | 'household_appliance_stores'
        | 'industrial_supplies'
        | 'information_retrieval_services'
        | 'insurance_default'
        | 'insurance_underwriting_premiums'
        | 'intra_company_purchases'
        | 'jewelry_stores_watches_clocks_and_silverware_stores'
        | 'landscaping_services'
        | 'laundries'
        | 'laundry_cleaning_services'
        | 'legal_services_attorneys'
        | 'luggage_and_leather_goods_stores'
        | 'lumber_building_materials_stores'
        | 'manual_cash_disburse'
        | 'marinas_service_and_supplies'
        | 'marketplaces'
        | 'masonry_stonework_and_plaster'
        | 'massage_parlors'
        | 'medical_and_dental_labs'
        | 'medical_dental_ophthalmic_and_hospital_equipment_and_supplies'
        | 'medical_services'
        | 'membership_organizations'
        | 'mens_and_boys_clothing_and_accessories_stores'
        | 'mens_womens_clothing_stores'
        | 'metal_service_centers'
        | 'miscellaneous'
        | 'miscellaneous_apparel_and_accessory_shops'
        | 'miscellaneous_auto_dealers'
        | 'miscellaneous_business_services'
        | 'miscellaneous_food_stores'
        | 'miscellaneous_general_merchandise'
        | 'miscellaneous_general_services'
        | 'miscellaneous_home_furnishing_specialty_stores'
        | 'miscellaneous_publishing_and_printing'
        | 'miscellaneous_recreation_services'
        | 'miscellaneous_repair_shops'
        | 'miscellaneous_specialty_retail'
        | 'mobile_home_dealers'
        | 'motion_picture_theaters'
        | 'motor_freight_carriers_and_trucking'
        | 'motor_homes_dealers'
        | 'motor_vehicle_supplies_and_new_parts'
        | 'motorcycle_shops_and_dealers'
        | 'motorcycle_shops_dealers'
        | 'music_stores_musical_instruments_pianos_and_sheet_music'
        | 'news_dealers_and_newsstands'
        | 'non_fi_money_orders'
        | 'non_fi_stored_value_card_purchase_load'
        | 'nondurable_goods'
        | 'nurseries_lawn_and_garden_supply_stores'
        | 'nursing_personal_care'
        | 'office_and_commercial_furniture'
        | 'opticians_eyeglasses'
        | 'optometrists_ophthalmologist'
        | 'orthopedic_goods_prosthetic_devices'
        | 'osteopaths'
        | 'package_stores_beer_wine_and_liquor'
        | 'paints_varnishes_and_supplies'
        | 'parking_lots_garages'
        | 'passenger_railways'
        | 'pawn_shops'
        | 'pet_shops_pet_food_and_supplies'
        | 'petroleum_and_petroleum_products'
        | 'photo_developing'
        | 'photographic_photocopy_microfilm_equipment_and_supplies'
        | 'photographic_studios'
        | 'picture_video_production'
        | 'piece_goods_notions_and_other_dry_goods'
        | 'plumbing_heating_equipment_and_supplies'
        | 'political_organizations'
        | 'postal_services_government_only'
        | 'precious_stones_and_metals_watches_and_jewelry'
        | 'professional_services'
        | 'public_warehousing_and_storage'
        | 'quick_copy_repro_and_blueprint'
        | 'railroads'
        | 'real_estate_agents_and_managers_rentals'
        | 'record_stores'
        | 'recreational_vehicle_rentals'
        | 'religious_goods_stores'
        | 'religious_organizations'
        | 'roofing_siding_sheet_metal'
        | 'secretarial_support_services'
        | 'security_brokers_dealers'
        | 'service_stations'
        | 'sewing_needlework_fabric_and_piece_goods_stores'
        | 'shoe_repair_hat_cleaning'
        | 'shoe_stores'
        | 'small_appliance_repair'
        | 'snowmobile_dealers'
        | 'special_trade_services'
        | 'specialty_cleaning'
        | 'sporting_goods_stores'
        | 'sporting_recreation_camps'
        | 'sports_and_riding_apparel_stores'
        | 'sports_clubs_fields'
        | 'stamp_and_coin_stores'
        | 'stationary_office_supplies_printing_and_writing_paper'
        | 'stationery_stores_office_and_school_supply_stores'
        | 'swimming_pools_sales'
        | 't_ui_travel_germany'
        | 'tailors_alterations'
        | 'tax_payments_government_agencies'
        | 'tax_preparation_services'
        | 'taxicabs_limousines'
        | 'telecommunication_equipment_and_telephone_sales'
        | 'telecommunication_services'
        | 'telegraph_services'
        | 'tent_and_awning_shops'
        | 'testing_laboratories'
        | 'theatrical_ticket_agencies'
        | 'timeshares'
        | 'tire_retreading_and_repair'
        | 'tolls_bridge_fees'
        | 'tourist_attractions_and_exhibits'
        | 'towing_services'
        | 'trailer_parks_campgrounds'
        | 'transportation_services'
        | 'travel_agencies_tour_operators'
        | 'truck_stop_iteration'
        | 'truck_utility_trailer_rentals'
        | 'typesetting_plate_making_and_related_services'
        | 'typewriter_stores'
        | 'u_s_federal_government_agencies_or_departments'
        | 'uniforms_commercial_clothing'
        | 'used_merchandise_and_secondhand_stores'
        | 'utilities'
        | 'variety_stores'
        | 'veterinary_services'
        | 'video_amusement_game_supplies'
        | 'video_game_arcades'
        | 'video_tape_rental_stores'
        | 'vocational_trade_schools'
        | 'watch_jewelry_repair'
        | 'welding_repair'
        | 'wholesale_clubs'
        | 'wig_and_toupee_stores'
        | 'wires_money_orders'
        | 'womens_accessory_and_specialty_shops'
        | 'womens_ready_to_wear_stores'
        | 'wrecking_and_salvage_yards'
      )[]
    | null;
  blocked_merchant_countries?: string[] | null;
  spending_limits?: Issuing_card_spending_limit[] | null;
  spending_limits_currency?: string | null;
};

export type Issuing_card_apple_pay = {
  eligible: boolean;
  ineligible_reason?:
    | 'missing_agreement'
    | 'missing_cardholder_contact'
    | 'unsupported_region'
    | null;
};

export type Issuing_card_google_pay = {
  eligible: boolean;
  ineligible_reason?:
    | 'missing_agreement'
    | 'missing_cardholder_contact'
    | 'unsupported_region'
    | null;
};

export type Issuing_card_wallets = {
  apple_pay: Issuing_card_apple_pay;
  google_pay: Issuing_card_google_pay;
  primary_account_identifier?: string | null;
};

export type Issuing_authorization_fleet_cardholder_prompt_data = {
  alphanumeric_id?: string | null;
  driver_id?: string | null;
  odometer?: null | number; // int
  unspecified_id?: string | null;
  user_id?: string | null;
  vehicle_number?: string | null;
};

export type Issuing_authorization_fleet_fuel_price_data = {
  gross_amount_decimal?: string | null; // decimal
};

export type Issuing_authorization_fleet_non_fuel_price_data = {
  gross_amount_decimal?: string | null; // decimal
};

export type Issuing_authorization_fleet_tax_data = {
  local_amount_decimal?: string | null; // decimal
  national_amount_decimal?: string | null; // decimal
};

export type Issuing_authorization_fleet_reported_breakdown = {
  fuel?: Issuing_authorization_fleet_fuel_price_data &
    Partial<Issuing_authorization_fleet_fuel_price_data>;
  non_fuel?: Issuing_authorization_fleet_non_fuel_price_data &
    Partial<Issuing_authorization_fleet_non_fuel_price_data>;
  tax?: Issuing_authorization_fleet_tax_data &
    Partial<Issuing_authorization_fleet_tax_data>;
};

export type Issuing_authorization_fleet_data = {
  cardholder_prompt_data?: Issuing_authorization_fleet_cardholder_prompt_data &
    Partial<Issuing_authorization_fleet_cardholder_prompt_data>;
  purchase_type?:
    | 'fuel_and_non_fuel_purchase'
    | 'fuel_purchase'
    | 'non_fuel_purchase'
    | null;
  reported_breakdown?: Issuing_authorization_fleet_reported_breakdown &
    Partial<Issuing_authorization_fleet_reported_breakdown>;
  service_type?:
    | 'full_service'
    | 'non_fuel_transaction'
    | 'self_service'
    | null;
};

export type Issuing_authorization_fuel_data = {
  industry_product_code?: string | null;
  quantity_decimal?: string | null; // decimal
  type?:
    | 'diesel'
    | 'other'
    | 'unleaded_plus'
    | 'unleaded_regular'
    | 'unleaded_super'
    | null;
  unit?:
    | 'charging_minute'
    | 'imperial_gallon'
    | 'kilogram'
    | 'kilowatt_hour'
    | 'liter'
    | 'other'
    | 'pound'
    | 'us_gallon'
    | null;
  unit_cost_decimal?: string | null; // decimal
};

export type Issuing_authorization_merchant_data = {
  category: string;
  category_code: string;
  city?: string | null;
  country?: string | null;
  name?: string | null;
  network_id: string;
  postal_code?: string | null;
  state?: string | null;
  terminal_id?: string | null;
  url?: string | null;
};

export type Issuing_authorization_network_data = {
  acquiring_institution_id?: string | null;
  system_trace_audit_number?: string | null;
  transaction_id?: string | null;
};

export type Issuing_authorization_pending_request = {
  amount: number; // int
  amount_details?: Issuing_authorization_amount_details &
    Partial<Issuing_authorization_amount_details>;
  currency: string;
  is_amount_controllable: boolean;
  merchant_amount: number; // int
  merchant_currency: string;
  network_risk_score?: null | number; // int
};

export type Issuing_authorization_request = {
  amount: number; // int
  amount_details?: Issuing_authorization_amount_details &
    Partial<Issuing_authorization_amount_details>;
  approved: boolean;
  authorization_code?: string | null;
  created: number; // int
  currency: string;
  merchant_amount: number; // int
  merchant_currency: string;
  network_risk_score?: null | number; // int
  reason:
    | 'account_disabled'
    | 'card_active'
    | 'card_canceled'
    | 'card_expired'
    | 'card_inactive'
    | 'cardholder_blocked'
    | 'cardholder_inactive'
    | 'cardholder_verification_required'
    | 'insecure_authorization_method'
    | 'insufficient_funds'
    | 'not_allowed'
    | 'pin_blocked'
    | 'spending_controls'
    | 'suspected_fraud'
    | 'verification_failed'
    | 'webhook_approved'
    | 'webhook_declined'
    | 'webhook_error'
    | 'webhook_timeout';
  reason_message?: string | null;
  requested_at?: null | number; // int
};

export type Issuing_network_token_device = {
  device_fingerprint?: string;
  ip_address?: string;
  location?: string;
  name?: string;
  phone_number?: string;
  type?: 'other' | 'phone' | 'watch';
};

export type Issuing_network_token_mastercard = {
  card_reference_id?: string;
  token_reference_id: string;
  token_requestor_id: string;
  token_requestor_name?: string;
};

export type Issuing_network_token_visa = {
  card_reference_id: string;
  token_reference_id: string;
  token_requestor_id: string;
  token_risk_score?: string;
};

export type Issuing_network_token_address = {
  line1: string;
  postal_code: string;
};

export type Issuing_network_token_wallet_provider = {
  account_id?: string;
  account_trust_score?: number; // int
  card_number_source?: 'app' | 'manual' | 'on_file' | 'other';
  cardholder_address?: Issuing_network_token_address;
  cardholder_name?: string;
  device_trust_score?: number; // int
  hashed_account_email_address?: string;
  reason_codes?: (
    | 'account_card_too_new'
    | 'account_recently_changed'
    | 'account_too_new'
    | 'account_too_new_since_launch'
    | 'additional_device'
    | 'data_expired'
    | 'defer_id_v_decision'
    | 'device_recently_lost'
    | 'good_activity_history'
    | 'has_suspended_tokens'
    | 'high_risk'
    | 'inactive_account'
    | 'long_account_tenure'
    | 'low_account_score'
    | 'low_device_score'
    | 'low_phone_number_score'
    | 'network_service_error'
    | 'outside_home_territory'
    | 'provisioning_cardholder_mismatch'
    | 'provisioning_device_and_cardholder_mismatch'
    | 'provisioning_device_mismatch'
    | 'same_device_no_prior_authentication'
    | 'same_device_successful_prior_authentication'
    | 'software_update'
    | 'suspicious_activity'
    | 'too_many_different_cardholders'
    | 'too_many_recent_attempts'
    | 'too_many_recent_tokens'
  )[];
  suggested_decision?: 'approve' | 'decline' | 'require_auth';
  suggested_decision_version?: string;
};

export type Issuing_network_token_network_data = {
  device?: Issuing_network_token_device;
  mastercard?: Issuing_network_token_mastercard;
  type: 'mastercard' | 'visa';
  visa?: Issuing_network_token_visa;
  wallet_provider?: Issuing_network_token_wallet_provider;
};

export type Issuing_transaction_amount_details = {
  atm_fee?: null | number; // int
  cashback_amount?: null | number; // int
};

export type Issuing_dispute_canceled_evidence = {
  additional_documentation?: (string | File) & Partial<File>;
  canceled_at?: null | number; // int
  cancellation_policy_provided?: null | boolean;
  cancellation_reason?: string | null;
  expected_at?: null | number; // int
  explanation?: string | null;
  product_description?: string | null;
  product_type?: 'merchandise' | 'service' | null;
  return_status?: 'merchant_rejected' | 'successful' | null;
  returned_at?: null | number; // int
};

export type Issuing_dispute_duplicate_evidence = {
  additional_documentation?: (string | File) & Partial<File>;
  card_statement?: (string | File) & Partial<File>;
  cash_receipt?: (string | File) & Partial<File>;
  check_image?: (string | File) & Partial<File>;
  explanation?: string | null;
  original_transaction?: string | null;
};

export type Issuing_dispute_fraudulent_evidence = {
  additional_documentation?: (string | File) & Partial<File>;
  explanation?: string | null;
};

export type Issuing_dispute_merchandise_not_as_described_evidence = {
  additional_documentation?: (string | File) & Partial<File>;
  explanation?: string | null;
  received_at?: null | number; // int
  return_description?: string | null;
  return_status?: 'merchant_rejected' | 'successful' | null;
  returned_at?: null | number; // int
};

export type Issuing_dispute_no_valid_authorization_evidence = {
  additional_documentation?: (string | File) & Partial<File>;
  explanation?: string | null;
};

export type Issuing_dispute_not_received_evidence = {
  additional_documentation?: (string | File) & Partial<File>;
  expected_at?: null | number; // int
  explanation?: string | null;
  product_description?: string | null;
  product_type?: 'merchandise' | 'service' | null;
};

export type Issuing_dispute_other_evidence = {
  additional_documentation?: (string | File) & Partial<File>;
  explanation?: string | null;
  product_description?: string | null;
  product_type?: 'merchandise' | 'service' | null;
};

export type Issuing_dispute_service_not_as_described_evidence = {
  additional_documentation?: (string | File) & Partial<File>;
  canceled_at?: null | number; // int
  cancellation_reason?: string | null;
  explanation?: string | null;
  received_at?: null | number; // int
};

export type Issuing_dispute_evidence = {
  canceled?: Issuing_dispute_canceled_evidence;
  duplicate?: Issuing_dispute_duplicate_evidence;
  fraudulent?: Issuing_dispute_fraudulent_evidence;
  merchandise_not_as_described?: Issuing_dispute_merchandise_not_as_described_evidence;
  no_valid_authorization?: Issuing_dispute_no_valid_authorization_evidence;
  not_received?: Issuing_dispute_not_received_evidence;
  other?: Issuing_dispute_other_evidence;
  reason:
    | 'canceled'
    | 'duplicate'
    | 'fraudulent'
    | 'merchandise_not_as_described'
    | 'no_valid_authorization'
    | 'not_received'
    | 'other'
    | 'service_not_as_described';
  service_not_as_described?: Issuing_dispute_service_not_as_described_evidence;
};

export type Issuing_dispute_treasury = {
  debit_reversal?: string | null;
  received_debit: string;
};

export type Issuing_transaction_network_data = {
  authorization_code?: string | null;
  processing_date?: string | null;
  transaction_id?: string | null;
};

export type Issuing_transaction_fleet_cardholder_prompt_data = {
  driver_id?: string | null;
  odometer?: null | number; // int
  unspecified_id?: string | null;
  user_id?: string | null;
  vehicle_number?: string | null;
};

export type Issuing_transaction_fleet_fuel_price_data = {
  gross_amount_decimal?: string | null; // decimal
};

export type Issuing_transaction_fleet_non_fuel_price_data = {
  gross_amount_decimal?: string | null; // decimal
};

export type Issuing_transaction_fleet_tax_data = {
  local_amount_decimal?: string | null; // decimal
  national_amount_decimal?: string | null; // decimal
};

export type Issuing_transaction_fleet_reported_breakdown = {
  fuel?: Issuing_transaction_fleet_fuel_price_data &
    Partial<Issuing_transaction_fleet_fuel_price_data>;
  non_fuel?: Issuing_transaction_fleet_non_fuel_price_data &
    Partial<Issuing_transaction_fleet_non_fuel_price_data>;
  tax?: Issuing_transaction_fleet_tax_data &
    Partial<Issuing_transaction_fleet_tax_data>;
};

export type Issuing_transaction_fleet_data = {
  cardholder_prompt_data?: Issuing_transaction_fleet_cardholder_prompt_data &
    Partial<Issuing_transaction_fleet_cardholder_prompt_data>;
  purchase_type?: string | null;
  reported_breakdown?: Issuing_transaction_fleet_reported_breakdown &
    Partial<Issuing_transaction_fleet_reported_breakdown>;
  service_type?: string | null;
};

export type Issuing_transaction_flight_data_leg = {
  arrival_airport_code?: string | null;
  carrier?: string | null;
  departure_airport_code?: string | null;
  flight_number?: string | null;
  service_class?: string | null;
  stopover_allowed?: null | boolean;
};

export type Issuing_transaction_flight_data = {
  departure_at?: null | number; // int
  passenger_name?: string | null;
  refundable?: null | boolean;
  segments?: Issuing_transaction_flight_data_leg[] | null;
  travel_agency?: string | null;
};

export type Issuing_transaction_fuel_data = {
  industry_product_code?: string | null;
  quantity_decimal?: string | null; // decimal
  type: string;
  unit: string;
  unit_cost_decimal: string; // decimal
};

export type Issuing_transaction_lodging_data = {
  check_in_at?: null | number; // int
  nights?: null | number; // int
};

export type Issuing_transaction_receipt_data = {
  description?: string | null;
  quantity?: null | number;
  total?: null | number; // int
  unit_cost?: null | number; // int
};

export type Issuing_transaction_purchase_details = {
  fleet?: Issuing_transaction_fleet_data &
    Partial<Issuing_transaction_fleet_data>;
  flight?: Issuing_transaction_flight_data &
    Partial<Issuing_transaction_flight_data>;
  fuel?: Issuing_transaction_fuel_data & Partial<Issuing_transaction_fuel_data>;
  lodging?: Issuing_transaction_lodging_data &
    Partial<Issuing_transaction_lodging_data>;
  receipt?: Issuing_transaction_receipt_data[] | null;
  reference?: string | null;
};

export type Issuing_transaction_treasury = {
  received_credit?: string | null;
  received_debit?: string | null;
};

export type Issuing_authorization_treasury = {
  received_credits: string[];
  received_debits: string[];
  transaction?: string | null;
};

export type Issuing_authorization_authentication_exemption = {
  claimed_by: 'acquirer' | 'issuer';
  type: 'low_value_transaction' | 'transaction_risk_analysis' | 'unknown';
};

export type Issuing_authorization_three_d_secure = {
  result: 'attempt_acknowledged' | 'authenticated' | 'failed' | 'required';
};

export type Issuing_authorization_verification_data = {
  address_line1_check: 'match' | 'mismatch' | 'not_provided';
  address_postal_code_check: 'match' | 'mismatch' | 'not_provided';
  authentication_exemption?: Issuing_authorization_authentication_exemption &
    Partial<Issuing_authorization_authentication_exemption>;
  cvc_check: 'match' | 'mismatch' | 'not_provided';
  expiry_check: 'match' | 'mismatch' | 'not_provided';
  postal_code?: string | null;
  three_d_secure?: Issuing_authorization_three_d_secure &
    Partial<Issuing_authorization_three_d_secure>;
};

export type Deleted_bank_account = {
  currency?: string | null;
  deleted: boolean;
  id: string;
  object: 'bank_account';
};

export type Deleted_card = {
  currency?: string | null;
  deleted: boolean;
  id: string;
  object: 'card';
};

export type Payout = {
  amount: number; // int
  application_fee?: (string | Application_fee) & Partial<Application_fee>;
  application_fee_amount?: null | number; // int
  arrival_date: number; // int
  automatic: boolean;
  balance_transaction?: (string | Balance_transaction) &
    Partial<Balance_transaction>;
  created: number; // int
  currency: string;
  description?: string | null;
  destination?: (
    | string
    | Bank_account
    | Card
    | Deleted_bank_account
    | Deleted_card
  ) &
    (Partial<Bank_account> &
      Partial<Card> &
      Partial<Deleted_bank_account> &
      Partial<Deleted_card>);
  failure_balance_transaction?: (string | Balance_transaction) &
    Partial<Balance_transaction>;
  failure_code?: string | null;
  failure_message?: string | null;
  id: string;
  livemode: boolean;
  metadata?: {
    [key: string]: string;
  } | null;
  method: string;
  object: 'payout';
  original_payout?: (string | Payout) & Partial<Payout>;
  reconciliation_status: 'completed' | 'in_progress' | 'not_applicable';
  reversed_by?: (string | Payout) & Partial<Payout>;
  source_type: string;
  statement_descriptor?: string | null;
  status: string;
  type: 'bank_account' | 'card';
};

export type Reserve_transaction = {
  amount: number; // int
  currency: string;
  description?: string | null;
  id: string;
  object: 'reserve_transaction';
};

export type Tax_deducted_at_source = {
  id: string;
  object: 'tax_deducted_at_source';
  period_end: number; // int
  period_start: number; // int
  tax_deduction_account_number: string;
};

export type Topup = {
  amount: number; // int
  balance_transaction?: (string | Balance_transaction) &
    Partial<Balance_transaction>;
  created: number; // int
  currency: string;
  description?: string | null;
  expected_availability_date?: null | number; // int
  failure_code?: string | null;
  failure_message?: string | null;
  id: string;
  livemode: boolean;
  metadata: {
    [key: string]: string;
  };
  object: 'topup';
  source?: Source & Partial<Source>;
  statement_descriptor?: string | null;
  status: 'canceled' | 'failed' | 'pending' | 'reversed' | 'succeeded';
  transfer_group?: string | null;
};

export type Balance_transaction = {
  amount: number; // int
  available_on: number; // int
  created: number; // int
  currency: string;
  description?: string | null;
  exchange_rate?: null | number;
  fee: number; // int
  fee_details: Fee[];
  id: string;
  net: number; // int
  object: 'balance_transaction';
  reporting_category: string;
  source?: (
    | string
    | Application_fee
    | Charge
    | Connect_collection_transfer
    | Customer_cash_balance_transaction
    | Dispute
    | Fee_refund
    | Issuing_Authorization
    | Issuing_Dispute
    | Issuing_Transaction
    | Payout
    | Refund
    | Reserve_transaction
    | Tax_deducted_at_source
    | Topup
    | Transfer
    | Transfer_reversal
  ) &
    (Partial<Application_fee> &
      Partial<Charge> &
      Partial<Connect_collection_transfer> &
      Partial<Customer_cash_balance_transaction> &
      Partial<Dispute> &
      Partial<Fee_refund> &
      Partial<Issuing_Authorization> &
      Partial<Issuing_Dispute> &
      Partial<Issuing_Transaction> &
      Partial<Payout> &
      Partial<Refund> &
      Partial<Reserve_transaction> &
      Partial<Tax_deducted_at_source> &
      Partial<Topup> &
      Partial<Transfer> &
      Partial<Transfer_reversal>);
  status: string;
  type:
    | 'adjustment'
    | 'advance'
    | 'advance_funding'
    | 'anticipation_repayment'
    | 'application_fee'
    | 'application_fee_refund'
    | 'charge'
    | 'climate_order_purchase'
    | 'climate_order_refund'
    | 'connect_collection_transfer'
    | 'contribution'
    | 'issuing_authorization_hold'
    | 'issuing_authorization_release'
    | 'issuing_dispute'
    | 'issuing_transaction'
    | 'obligation_outbound'
    | 'obligation_reversal_inbound'
    | 'payment'
    | 'payment_failure_refund'
    | 'payment_network_reserve_hold'
    | 'payment_network_reserve_release'
    | 'payment_refund'
    | 'payment_reversal'
    | 'payment_unreconciled'
    | 'payout'
    | 'payout_cancel'
    | 'payout_failure'
    | 'refund'
    | 'refund_failure'
    | 'reserve_transaction'
    | 'reserved_funds'
    | 'stripe_fee'
    | 'stripe_fx_fee'
    | 'tax_fee'
    | 'topup'
    | 'topup_reversal'
    | 'transfer'
    | 'transfer_cancel'
    | 'transfer_failure'
    | 'transfer_refund';
};

export type Platform_earning_fee_source = {
  charge?: string;
  payout?: string;
  type: 'charge' | 'payout';
};

export type Application_fee = {
  account: (string | Account) & Partial<Account>;
  amount: number; // int
  amount_refunded: number; // int
  application: (string | Application) & Partial<Application>;
  balance_transaction?: (string | Balance_transaction) &
    Partial<Balance_transaction>;
  charge: (string | Charge) & Partial<Charge>;
  created: number; // int
  currency: string;
  fee_source?: Platform_earning_fee_source &
    Partial<Platform_earning_fee_source>;
  id: string;
  livemode: boolean;
  object: 'application_fee';
  originating_transaction?: (string | Charge) & Partial<Charge>;
  refunded: boolean;
  refunds: {
    data: Fee_refund[];
    has_more: boolean;
    object: 'list';
    url: string;
  };
};

export type Charge_fraud_details = {
  stripe_report?: string;
  user_report?: string;
};

export type Rule = {
  action: string;
  id: string;
  predicate: string;
};

export type Charge_outcome = {
  network_status?: string | null;
  reason?: string | null;
  risk_level?: string;
  risk_score?: number; // int
  rule?: (string | Rule) & Partial<Rule>;
  seller_message?: string | null;
  type: string;
};

export type Payment_method_details_ach_credit_transfer = {
  account_number?: string | null;
  bank_name?: string | null;
  routing_number?: string | null;
  swift_code?: string | null;
};

export type Payment_method_details_ach_debit = {
  account_holder_type?: 'company' | 'individual' | null;
  bank_name?: string | null;
  country?: string | null;
  fingerprint?: string | null;
  last4?: string | null;
  routing_number?: string | null;
};

export type Payment_method_details_acss_debit = {
  bank_name?: string | null;
  fingerprint?: string | null;
  institution_number?: string | null;
  last4?: string | null;
  mandate?: string;
  transit_number?: string | null;
};

export type Payment_method_details_affirm = {
  transaction_id?: string | null;
};

export type Payment_method_details_afterpay_clearpay = {
  order_id?: string | null;
  reference?: string | null;
};

export type Payment_flows_private_payment_methods_alipay_details = {
  buyer_id?: string;
  fingerprint?: string | null;
  transaction_id?: string | null;
};

export type Payment_method_details_amazon_pay = {};

export type Payment_method_details_au_becs_debit = {
  bsb_number?: string | null;
  fingerprint?: string | null;
  last4?: string | null;
  mandate?: string;
};

export type Payment_method_details_bacs_debit = {
  fingerprint?: string | null;
  last4?: string | null;
  mandate?: string | null;
  sort_code?: string | null;
};

export type Payment_method_details_bancontact = {
  bank_code?: string | null;
  bank_name?: string | null;
  bic?: string | null;
  generated_sepa_debit?: (string | Payment_method) & Partial<Payment_method>;
  generated_sepa_debit_mandate?: (string | Mandate) & Partial<Mandate>;
  iban_last4?: string | null;
  preferred_language?: 'de' | 'en' | 'fr' | 'nl' | null;
  verified_name?: string | null;
};

export type Payment_method_details_blik = {
  buyer_id?: string | null;
};

export type Payment_method_details_boleto = {
  tax_id: string;
};

export type Payment_method_details_card_checks = {
  address_line1_check?: string | null;
  address_postal_code_check?: string | null;
  cvc_check?: string | null;
};

export type Payment_flows_private_payment_methods_card_details_api_resource_enterprise_features_extended_authorization_extended_authorization =
  {
    status: 'disabled' | 'enabled';
  };

export type Payment_flows_private_payment_methods_card_details_api_resource_enterprise_features_incremental_authorization_incremental_authorization =
  {
    status: 'available' | 'unavailable';
  };

export type Payment_method_details_card_installments_plan = {
  count?: null | number; // int
  interval?: 'month' | null;
  type: 'fixed_count';
};

export type Payment_method_details_card_installments = {
  plan?: Payment_method_details_card_installments_plan &
    Partial<Payment_method_details_card_installments_plan>;
};

export type Payment_flows_private_payment_methods_card_details_api_resource_multicapture =
  {
    status: 'available' | 'unavailable';
  };

export type Payment_method_details_card_network_token = {
  used: boolean;
};

export type Payment_flows_private_payment_methods_card_details_api_resource_enterprise_features_overcapture_overcapture =
  {
    maximum_amount_capturable: number; // int
    status: 'available' | 'unavailable';
  };

export type Three_d_secure_details_charge = {
  authentication_flow?: 'challenge' | 'frictionless' | null;
  electronic_commerce_indicator?: '01' | '02' | '05' | '06' | '07' | null;
  exemption_indicator?: 'low_risk' | 'none' | null;
  exemption_indicator_applied?: boolean;
  result?:
    | 'attempt_acknowledged'
    | 'authenticated'
    | 'exempted'
    | 'failed'
    | 'not_supported'
    | 'processing_error'
    | null;
  result_reason?:
    | 'abandoned'
    | 'bypassed'
    | 'canceled'
    | 'card_not_enrolled'
    | 'network_not_supported'
    | 'protocol_error'
    | 'rejected'
    | null;
  transaction_id?: string | null;
  version?: '1.0.2' | '2.1.0' | '2.2.0' | null;
};

export type Payment_method_details_card_wallet_amex_express_checkout = {};

export type Payment_method_details_card_wallet_link = {};

export type Payment_method_details_card_wallet_masterpass = {
  billing_address?: Address & Partial<Address>;
  email?: string | null;
  name?: string | null;
  shipping_address?: Address & Partial<Address>;
};

export type Payment_method_details_card_wallet_samsung_pay = {};

export type Payment_method_details_card_wallet_visa_checkout = {
  billing_address?: Address & Partial<Address>;
  email?: string | null;
  name?: string | null;
  shipping_address?: Address & Partial<Address>;
};

export type Payment_method_details_card_wallet = {
  amex_express_checkout?: Payment_method_details_card_wallet_amex_express_checkout;
  apple_pay?: Payment_method_details_card_wallet_apple_pay;
  dynamic_last4?: string | null;
  google_pay?: Payment_method_details_card_wallet_google_pay;
  link?: Payment_method_details_card_wallet_link;
  masterpass?: Payment_method_details_card_wallet_masterpass;
  samsung_pay?: Payment_method_details_card_wallet_samsung_pay;
  type:
    | 'amex_express_checkout'
    | 'apple_pay'
    | 'google_pay'
    | 'link'
    | 'masterpass'
    | 'samsung_pay'
    | 'visa_checkout';
  visa_checkout?: Payment_method_details_card_wallet_visa_checkout;
};

export type Payment_method_details_card = {
  amount_authorized?: null | number; // int
  authorization_code?: string | null;
  brand?: string | null;
  capture_before?: number; // int
  checks?: Payment_method_details_card_checks &
    Partial<Payment_method_details_card_checks>;
  country?: string | null;
  exp_month: number; // int
  exp_year: number; // int
  extended_authorization?: Payment_flows_private_payment_methods_card_details_api_resource_enterprise_features_extended_authorization_extended_authorization;
  fingerprint?: string | null;
  funding?: string | null;
  incremental_authorization?: Payment_flows_private_payment_methods_card_details_api_resource_enterprise_features_incremental_authorization_incremental_authorization;
  installments?: Payment_method_details_card_installments &
    Partial<Payment_method_details_card_installments>;
  last4?: string | null;
  mandate?: string | null;
  multicapture?: Payment_flows_private_payment_methods_card_details_api_resource_multicapture;
  network?: string | null;
  network_token?: Payment_method_details_card_network_token &
    Partial<Payment_method_details_card_network_token>;
  overcapture?: Payment_flows_private_payment_methods_card_details_api_resource_enterprise_features_overcapture_overcapture;
  three_d_secure?: Three_d_secure_details_charge &
    Partial<Three_d_secure_details_charge>;
  wallet?: Payment_method_details_card_wallet &
    Partial<Payment_method_details_card_wallet>;
};

export type Payment_method_details_cashapp = {
  buyer_id?: string | null;
  cashtag?: string | null;
};

export type Payment_method_details_customer_balance = {};

export type Payment_method_details_eps = {
  bank?:
    | 'arzte_und_apotheker_bank'
    | 'austrian_anadi_bank_ag'
    | 'bank_austria'
    | 'bankhaus_carl_spangler'
    | 'bankhaus_schelhammer_und_schattera_ag'
    | 'bawag_psk_ag'
    | 'bks_bank_ag'
    | 'brull_kallmus_bank_ag'
    | 'btv_vier_lander_bank'
    | 'capital_bank_grawe_gruppe_ag'
    | 'deutsche_bank_ag'
    | 'dolomitenbank'
    | 'easybank_ag'
    | 'erste_bank_und_sparkassen'
    | 'hypo_alpeadriabank_international_ag'
    | 'hypo_bank_burgenland_aktiengesellschaft'
    | 'hypo_noe_lb_fur_niederosterreich_u_wien'
    | 'hypo_oberosterreich_salzburg_steiermark'
    | 'hypo_tirol_bank_ag'
    | 'hypo_vorarlberg_bank_ag'
    | 'marchfelder_bank'
    | 'oberbank_ag'
    | 'raiffeisen_bankengruppe_osterreich'
    | 'schoellerbank_ag'
    | 'sparda_bank_wien'
    | 'volksbank_gruppe'
    | 'volkskreditbank_ag'
    | 'vr_bank_braunau'
    | null;
  verified_name?: string | null;
};

export type Payment_method_details_fpx = {
  bank:
    | 'affin_bank'
    | 'agrobank'
    | 'alliance_bank'
    | 'ambank'
    | 'bank_islam'
    | 'bank_muamalat'
    | 'bank_of_china'
    | 'bank_rakyat'
    | 'bsn'
    | 'cimb'
    | 'deutsche_bank'
    | 'hong_leong_bank'
    | 'hsbc'
    | 'kfh'
    | 'maybank2e'
    | 'maybank2u'
    | 'ocbc'
    | 'pb_enterprise'
    | 'public_bank'
    | 'rhb'
    | 'standard_chartered'
    | 'uob';
  transaction_id?: string | null;
};

export type Payment_method_details_giropay = {
  bank_code?: string | null;
  bank_name?: string | null;
  bic?: string | null;
  verified_name?: string | null;
};

export type Payment_method_details_grabpay = {
  transaction_id?: string | null;
};

export type Payment_method_details_ideal = {
  bank?:
    | 'abn_amro'
    | 'asn_bank'
    | 'bunq'
    | 'handelsbanken'
    | 'ing'
    | 'knab'
    | 'moneyou'
    | 'n26'
    | 'nn'
    | 'rabobank'
    | 'regiobank'
    | 'revolut'
    | 'sns_bank'
    | 'triodos_bank'
    | 'van_lanschot'
    | 'yoursafe'
    | null;
  bic?:
    | 'ABNANL2A'
    | 'ASNBNL21'
    | 'BITSNL2A'
    | 'BUNQNL2A'
    | 'FVLBNL22'
    | 'HANDNL2A'
    | 'INGBNL2A'
    | 'KNABNL2H'
    | 'MOYONL21'
    | 'NNBANL2G'
    | 'NTSBDEB1'
    | 'RABONL2U'
    | 'RBRBNL21'
    | 'REVOIE23'
    | 'REVOLT21'
    | 'SNSBNL2A'
    | 'TRIONL2U'
    | null;
  generated_sepa_debit?: (string | Payment_method) & Partial<Payment_method>;
  generated_sepa_debit_mandate?: (string | Mandate) & Partial<Mandate>;
  iban_last4?: string | null;
  verified_name?: string | null;
};

export type Payment_method_details_interac_present_receipt = {
  account_type?: 'checking' | 'savings' | 'unknown';
  application_cryptogram?: string | null;
  application_preferred_name?: string | null;
  authorization_code?: string | null;
  authorization_response_code?: string | null;
  cardholder_verification_method?: string | null;
  dedicated_file_name?: string | null;
  terminal_verification_results?: string | null;
  transaction_status_information?: string | null;
};

export type Payment_method_details_interac_present = {
  brand?: string | null;
  cardholder_name?: string | null;
  country?: string | null;
  description?: string | null;
  emv_auth_data?: string | null;
  exp_month: number; // int
  exp_year: number; // int
  fingerprint?: string | null;
  funding?: string | null;
  generated_card?: string | null;
  issuer?: string | null;
  last4?: string | null;
  network?: string | null;
  network_transaction_id?: string | null;
  preferred_locales?: string[] | null;
  read_method?:
    | 'contact_emv'
    | 'contactless_emv'
    | 'contactless_magstripe_mode'
    | 'magnetic_stripe_fallback'
    | 'magnetic_stripe_track2'
    | null;
  receipt?: Payment_method_details_interac_present_receipt &
    Partial<Payment_method_details_interac_present_receipt>;
};

export type Klarna_address = {
  country?: string | null;
};

export type Klarna_payer_details = {
  address?: Klarna_address & Partial<Klarna_address>;
};

export type Payment_method_details_klarna = {
  payer_details?: Klarna_payer_details & Partial<Klarna_payer_details>;
  payment_method_category?: string | null;
  preferred_locale?: string | null;
};

export type Payment_method_details_konbini_store = {
  chain?: 'familymart' | 'lawson' | 'ministop' | 'seicomart' | null;
};

export type Payment_method_details_konbini = {
  store?: Payment_method_details_konbini_store &
    Partial<Payment_method_details_konbini_store>;
};

export type Payment_method_details_link = {
  country?: string | null;
};

export type Internal_card = {
  brand?: string | null;
  country?: string | null;
  exp_month?: null | number; // int
  exp_year?: null | number; // int
  last4?: string | null;
};

export type Payment_method_details_mobilepay = {
  card?: Internal_card & Partial<Internal_card>;
};

export type Payment_method_details_multibanco = {
  entity?: string | null;
  reference?: string | null;
};

export type Payment_method_details_oxxo = {
  number?: string | null;
};

export type Payment_method_details_p24 = {
  bank?:
    | 'alior_bank'
    | 'bank_millennium'
    | 'bank_nowy_bfg_sa'
    | 'bank_pekao_sa'
    | 'banki_spbdzielcze'
    | 'blik'
    | 'bnp_paribas'
    | 'boz'
    | 'citi_handlowy'
    | 'credit_agricole'
    | 'envelobank'
    | 'etransfer_pocztowy24'
    | 'getin_bank'
    | 'ideabank'
    | 'ing'
    | 'inteligo'
    | 'mbank_mtransfer'
    | 'nest_przelew'
    | 'noble_pay'
    | 'pbac_z_ipko'
    | 'plus_bank'
    | 'santander_przelew24'
    | 'tmobile_usbugi_bankowe'
    | 'toyota_bank'
    | 'velobank'
    | 'volkswagen_bank'
    | null;
  reference?: string | null;
  verified_name?: string | null;
};

export type Payment_method_details_paynow = {
  reference?: string | null;
};

export type Paypal_seller_protection = {
  dispute_categories?: ('fraudulent' | 'product_not_received')[] | null;
  status: 'eligible' | 'not_eligible' | 'partially_eligible';
};

export type Payment_method_details_paypal = {
  payer_email?: string | null;
  payer_id?: string | null;
  payer_name?: string | null;
  seller_protection?: Paypal_seller_protection &
    Partial<Paypal_seller_protection>;
  transaction_id?: string | null;
};

export type Payment_method_details_pix = {
  bank_transaction_id?: string | null;
};

export type Payment_method_details_promptpay = {
  reference?: string | null;
};

export type Payment_method_details_revolut_pay = {};

export type Payment_method_details_sepa_debit = {
  bank_code?: string | null;
  branch_code?: string | null;
  country?: string | null;
  fingerprint?: string | null;
  last4?: string | null;
  mandate?: string | null;
};

export type Payment_method_details_sofort = {
  bank_code?: string | null;
  bank_name?: string | null;
  bic?: string | null;
  country?: string | null;
  generated_sepa_debit?: (string | Payment_method) & Partial<Payment_method>;
  generated_sepa_debit_mandate?: (string | Mandate) & Partial<Mandate>;
  iban_last4?: string | null;
  preferred_language?: 'de' | 'en' | 'es' | 'fr' | 'it' | 'nl' | 'pl' | null;
  verified_name?: string | null;
};

export type Payment_method_details_stripe_account = {};

export type Payment_method_details_swish = {
  fingerprint?: string | null;
  payment_reference?: string | null;
  verified_phone_last4?: string | null;
};

export type Payment_method_details_twint = {};

export type Payment_method_details_us_bank_account = {
  account_holder_type?: 'company' | 'individual' | null;
  account_type?: 'checking' | 'savings' | null;
  bank_name?: string | null;
  fingerprint?: string | null;
  last4?: string | null;
  mandate?: (string | Mandate) & Partial<Mandate>;
  payment_reference?: string | null;
  routing_number?: string | null;
};

export type Payment_method_details_wechat = {};

export type Payment_method_details_wechat_pay = {
  fingerprint?: string | null;
  transaction_id?: string | null;
};

export type Payment_method_details_zip = {};

export type Payment_method_details = {
  ach_credit_transfer?: Payment_method_details_ach_credit_transfer;
  ach_debit?: Payment_method_details_ach_debit;
  acss_debit?: Payment_method_details_acss_debit;
  affirm?: Payment_method_details_affirm;
  afterpay_clearpay?: Payment_method_details_afterpay_clearpay;
  alipay?: Payment_flows_private_payment_methods_alipay_details;
  amazon_pay?: Payment_method_details_amazon_pay;
  au_becs_debit?: Payment_method_details_au_becs_debit;
  bacs_debit?: Payment_method_details_bacs_debit;
  bancontact?: Payment_method_details_bancontact;
  blik?: Payment_method_details_blik;
  boleto?: Payment_method_details_boleto;
  card?: Payment_method_details_card;
  card_present?: Payment_method_details_card_present;
  cashapp?: Payment_method_details_cashapp;
  customer_balance?: Payment_method_details_customer_balance;
  eps?: Payment_method_details_eps;
  fpx?: Payment_method_details_fpx;
  giropay?: Payment_method_details_giropay;
  grabpay?: Payment_method_details_grabpay;
  ideal?: Payment_method_details_ideal;
  interac_present?: Payment_method_details_interac_present;
  klarna?: Payment_method_details_klarna;
  konbini?: Payment_method_details_konbini;
  link?: Payment_method_details_link;
  mobilepay?: Payment_method_details_mobilepay;
  multibanco?: Payment_method_details_multibanco;
  oxxo?: Payment_method_details_oxxo;
  p24?: Payment_method_details_p24;
  paynow?: Payment_method_details_paynow;
  paypal?: Payment_method_details_paypal;
  pix?: Payment_method_details_pix;
  promptpay?: Payment_method_details_promptpay;
  revolut_pay?: Payment_method_details_revolut_pay;
  sepa_debit?: Payment_method_details_sepa_debit;
  sofort?: Payment_method_details_sofort;
  stripe_account?: Payment_method_details_stripe_account;
  swish?: Payment_method_details_swish;
  twint?: Payment_method_details_twint;
  type: string;
  us_bank_account?: Payment_method_details_us_bank_account;
  wechat?: Payment_method_details_wechat;
  wechat_pay?: Payment_method_details_wechat_pay;
  zip?: Payment_method_details_zip;
};

export type Radar_radar_options = {
  session?: string;
};

export type Radar_review_resource_location = {
  city?: string | null;
  country?: string | null;
  latitude?: null | number;
  longitude?: null | number;
  region?: string | null;
};

export type Radar_review_resource_session = {
  browser?: string | null;
  device?: string | null;
  platform?: string | null;
  version?: string | null;
};

export type Review = {
  billing_zip?: string | null;
  charge?: (string | Charge) & Partial<Charge>;
  closed_reason?:
    | 'approved'
    | 'disputed'
    | 'redacted'
    | 'refunded'
    | 'refunded_as_fraud'
    | null;
  created: number; // int
  id: string;
  ip_address?: string | null;
  ip_address_location?: Radar_review_resource_location &
    Partial<Radar_review_resource_location>;
  livemode: boolean;
  object: 'review';
  open: boolean;
  opened_reason: 'manual' | 'rule';
  payment_intent?: (string | Payment_intent) & Partial<Payment_intent>;
  reason: string;
  session?: Radar_review_resource_session &
    Partial<Radar_review_resource_session>;
};

export type Charge_transfer_data = {
  amount?: null | number; // int
  destination: (string | Account) & Partial<Account>;
};

export type Charge = {
  amount: number; // int
  amount_captured: number; // int
  amount_refunded: number; // int
  application?: (string | Application) & Partial<Application>;
  application_fee?: (string | Application_fee) & Partial<Application_fee>;
  application_fee_amount?: null | number; // int
  balance_transaction?: (string | Balance_transaction) &
    Partial<Balance_transaction>;
  billing_details: Billing_details;
  calculated_statement_descriptor?: string | null;
  captured: boolean;
  created: number; // int
  currency: string;
  customer?: (string | Customer | Deleted_customer) &
    (Partial<Customer> & Partial<Deleted_customer>);
  description?: string | null;
  disputed: boolean;
  failure_balance_transaction?: (string | Balance_transaction) &
    Partial<Balance_transaction>;
  failure_code?: string | null;
  failure_message?: string | null;
  fraud_details?: Charge_fraud_details & Partial<Charge_fraud_details>;
  id: string;
  invoice?: (string | Invoice) & Partial<Invoice>;
  livemode: boolean;
  metadata: {
    [key: string]: string;
  };
  object: 'charge';
  on_behalf_of?: (string | Account) & Partial<Account>;
  outcome?: Charge_outcome & Partial<Charge_outcome>;
  paid: boolean;
  payment_intent?: (string | Payment_intent) & Partial<Payment_intent>;
  payment_method?: string | null;
  payment_method_details?: Payment_method_details &
    Partial<Payment_method_details>;
  radar_options?: Radar_radar_options;
  receipt_email?: string | null;
  receipt_number?: string | null;
  receipt_url?: string | null;
  refunded: boolean;
  refunds?: {
    data: Refund[];
    has_more: boolean;
    object: 'list';
    url: string;
  } | null;
  review?: (string | Review) & Partial<Review>;
  shipping?: Shipping & Partial<Shipping>;
  source_transfer?: (string | Transfer) & Partial<Transfer>;
  statement_descriptor?: string | null;
  statement_descriptor_suffix?: string | null;
  status: 'failed' | 'pending' | 'succeeded';
  transfer?: (string | Transfer) & Partial<Transfer>;
  transfer_data?: Charge_transfer_data & Partial<Charge_transfer_data>;
  transfer_group?: string | null;
};

export type Invoices_resource_invoice_tax_id = {
  type:
    | 'ad_nrt'
    | 'ae_trn'
    | 'ar_cuit'
    | 'au_abn'
    | 'au_arn'
    | 'bg_uic'
    | 'bh_vat'
    | 'bo_tin'
    | 'br_cnpj'
    | 'br_cpf'
    | 'ca_bn'
    | 'ca_gst_hst'
    | 'ca_pst_bc'
    | 'ca_pst_mb'
    | 'ca_pst_sk'
    | 'ca_qst'
    | 'ch_uid'
    | 'ch_vat'
    | 'cl_tin'
    | 'cn_tin'
    | 'co_nit'
    | 'cr_tin'
    | 'de_stn'
    | 'do_rcn'
    | 'ec_ruc'
    | 'eg_tin'
    | 'es_cif'
    | 'eu_oss_vat'
    | 'eu_vat'
    | 'gb_vat'
    | 'ge_vat'
    | 'hk_br'
    | 'hr_oib'
    | 'hu_tin'
    | 'id_npwp'
    | 'il_vat'
    | 'in_gst'
    | 'is_vat'
    | 'jp_cn'
    | 'jp_rn'
    | 'jp_trn'
    | 'ke_pin'
    | 'kr_brn'
    | 'kz_bin'
    | 'li_uid'
    | 'mx_rfc'
    | 'my_frp'
    | 'my_itn'
    | 'my_sst'
    | 'ng_tin'
    | 'no_vat'
    | 'no_voec'
    | 'nz_gst'
    | 'om_vat'
    | 'pe_ruc'
    | 'ph_tin'
    | 'ro_tin'
    | 'rs_pib'
    | 'ru_inn'
    | 'ru_kpp'
    | 'sa_vat'
    | 'sg_gst'
    | 'sg_uen'
    | 'si_tin'
    | 'sv_nit'
    | 'th_vat'
    | 'tr_tin'
    | 'tw_vat'
    | 'ua_vat'
    | 'unknown'
    | 'us_ein'
    | 'uy_ruc'
    | 've_rif'
    | 'vn_tin'
    | 'za_vat';
  value?: string | null;
};

export type Tax_rate = {
  active: boolean;
  country?: string | null;
  created: number; // int
  description?: string | null;
  display_name: string;
  effective_percentage?: null | number;
  id: string;
  inclusive: boolean;
  jurisdiction?: string | null;
  jurisdiction_level?:
    | 'city'
    | 'country'
    | 'county'
    | 'district'
    | 'multiple'
    | 'state'
    | null;
  livemode: boolean;
  metadata?: {
    [key: string]: string;
  } | null;
  object: 'tax_rate';
  percentage: number;
  state?: string | null;
  tax_type?:
    | 'amusement_tax'
    | 'communications_tax'
    | 'gst'
    | 'hst'
    | 'igst'
    | 'jct'
    | 'lease_tax'
    | 'pst'
    | 'qst'
    | 'rst'
    | 'sales_tax'
    | 'vat'
    | null;
};

export type Deleted_discount = {
  checkout_session?: string | null;
  coupon: Coupon;
  customer?: (string | Customer | Deleted_customer) &
    (Partial<Customer> & Partial<Deleted_customer>);
  deleted: boolean;
  id: string;
  invoice?: string | null;
  invoice_item?: string | null;
  object: 'discount';
  promotion_code?: (string | Promotion_code) & Partial<Promotion_code>;
  start: number; // int
  subscription?: string | null;
  subscription_item?: string | null;
};

export type Invoices_resource_from_invoice = {
  action: string;
  invoice: (string | Invoice) & Partial<Invoice>;
};

export type Discounts_resource_discount_amount = {
  amount: number; // int
  discount: (string | Discount | Deleted_discount) &
    (Partial<Discount> & Partial<Deleted_discount>);
};

export type Invoice_line_item_period = {
  end: number; // int
  start: number; // int
};

export type Custom_unit_amount = {
  maximum?: null | number; // int
  minimum?: null | number; // int
  preset?: null | number; // int
};

export type Price_tier = {
  flat_amount?: null | number; // int
  flat_amount_decimal?: string | null; // decimal
  unit_amount?: null | number; // int
  unit_amount_decimal?: string | null; // decimal
  up_to?: null | number; // int
};

export type Currency_option = {
  custom_unit_amount?: Custom_unit_amount & Partial<Custom_unit_amount>;
  tax_behavior?: 'exclusive' | 'inclusive' | 'unspecified' | null;
  tiers?: Price_tier[];
  unit_amount?: null | number; // int
  unit_amount_decimal?: string | null; // decimal
};

export type Product_marketing_feature = {
  name?: string;
};

export type Package_dimensions = {
  height: number;
  length: number;
  weight: number;
  width: number;
};

export type Tax_code = {
  description: string;
  id: string;
  name: string;
  object: 'tax_code';
};

export type Product = {
  active: boolean;
  created: number; // int
  default_price?: (string | Price) & Partial<Price>;
  description?: string | null;
  id: string;
  images: string[];
  livemode: boolean;
  marketing_features: Product_marketing_feature[];
  metadata: {
    [key: string]: string;
  };
  name: string;
  object: 'product';
  package_dimensions?: Package_dimensions & Partial<Package_dimensions>;
  shippable?: null | boolean;
  statement_descriptor?: string | null;
  tax_code?: (string | Tax_code) & Partial<Tax_code>;
  unit_label?: string | null;
  updated: number; // int
  url?: string | null;
};

export type Deleted_product = {
  deleted: boolean;
  id: string;
  object: 'product';
};

export type Recurring = {
  aggregate_usage?: 'last_during_period' | 'last_ever' | 'max' | 'sum' | null;
  interval: 'day' | 'month' | 'week' | 'year';
  interval_count: number; // int
  meter?: string | null;
  usage_type: 'licensed' | 'metered';
};

export type Transform_quantity = {
  divide_by: number; // int
  round: 'down' | 'up';
};

export type Price = {
  active: boolean;
  billing_scheme: 'per_unit' | 'tiered';
  created: number; // int
  currency: string;
  currency_options?: {
    [key: string]: Currency_option;
  };
  custom_unit_amount?: Custom_unit_amount & Partial<Custom_unit_amount>;
  id: string;
  livemode: boolean;
  lookup_key?: string | null;
  metadata: {
    [key: string]: string;
  };
  nickname?: string | null;
  object: 'price';
  product: (string | Product | Deleted_product) &
    (Partial<Product> & Partial<Deleted_product>);
  recurring?: Recurring & Partial<Recurring>;
  tax_behavior?: 'exclusive' | 'inclusive' | 'unspecified' | null;
  tiers?: Price_tier[];
  tiers_mode?: 'graduated' | 'volume' | null;
  transform_quantity?: Transform_quantity & Partial<Transform_quantity>;
  type: 'one_time' | 'recurring';
  unit_amount?: null | number; // int
  unit_amount_decimal?: string | null; // decimal
};

export type Subscription_automatic_tax = {
  enabled: boolean;
  liability?: Connect_account_reference & Partial<Connect_account_reference>;
};

export type Subscriptions_resource_billing_cycle_anchor_config = {
  day_of_month: number; // int
  hour?: null | number; // int
  minute?: null | number; // int
  month?: null | number; // int
  second?: null | number; // int
};

export type Subscription_billing_thresholds = {
  amount_gte?: null | number; // int
  reset_billing_cycle_anchor?: null | boolean;
};

export type Cancellation_details = {
  comment?: string | null;
  feedback?:
    | 'customer_service'
    | 'low_quality'
    | 'missing_features'
    | 'other'
    | 'switched_service'
    | 'too_complex'
    | 'too_expensive'
    | 'unused'
    | null;
  reason?:
    | 'cancellation_requested'
    | 'payment_disputed'
    | 'payment_failed'
    | null;
};

export type Subscriptions_resource_subscription_invoice_settings = {
  account_tax_ids?:
    | ((string | Tax_id | Deleted_tax_id) &
        (Partial<Tax_id> & Partial<Deleted_tax_id>))[]
    | null;
  issuer: Connect_account_reference;
};

export type Subscription_item_billing_thresholds = {
  usage_gte?: null | number; // int
};

export type Subscription_item = {
  billing_thresholds?: Subscription_item_billing_thresholds &
    Partial<Subscription_item_billing_thresholds>;
  created: number; // int
  discounts: ((string | Discount) & Partial<Discount>)[];
  id: string;
  metadata: {
    [key: string]: string;
  };
  object: 'subscription_item';
  price: Price;
  quantity?: number; // int
  subscription: string;
  tax_rates?: Tax_rate[] | null;
};

export type Subscriptions_resource_pause_collection = {
  behavior: 'keep_as_draft' | 'mark_uncollectible' | 'void';
  resumes_at?: null | number; // int
};

export type Invoice_payment_method_options_acss_debit_mandate_options = {
  transaction_type?: 'business' | 'personal' | null;
};

export type Invoice_payment_method_options_acss_debit = {
  mandate_options?: Invoice_payment_method_options_acss_debit_mandate_options;
  verification_method?: 'automatic' | 'instant' | 'microdeposits';
};

export type Invoice_payment_method_options_bancontact = {
  preferred_language: 'de' | 'en' | 'fr' | 'nl';
};

export type Invoice_mandate_options_card = {
  amount?: null | number; // int
  amount_type?: 'fixed' | 'maximum' | null;
  description?: string | null;
};

export type Subscription_payment_method_options_card = {
  mandate_options?: Invoice_mandate_options_card;
  network?:
    | 'amex'
    | 'cartes_bancaires'
    | 'diners'
    | 'discover'
    | 'eftpos_au'
    | 'girocard'
    | 'interac'
    | 'jcb'
    | 'mastercard'
    | 'unionpay'
    | 'unknown'
    | 'visa'
    | null;
  request_three_d_secure?: 'any' | 'automatic' | 'challenge' | null;
};

export type Invoice_payment_method_options_customer_balance_bank_transfer_eu_bank_transfer =
  {
    country: 'BE' | 'DE' | 'ES' | 'FR' | 'IE' | 'NL';
  };

export type Invoice_payment_method_options_customer_balance_bank_transfer = {
  eu_bank_transfer?: Invoice_payment_method_options_customer_balance_bank_transfer_eu_bank_transfer;
  type?: string | null;
};

export type Invoice_payment_method_options_customer_balance = {
  bank_transfer?: Invoice_payment_method_options_customer_balance_bank_transfer;
  funding_type?: 'bank_transfer' | null;
};

export type Invoice_payment_method_options_konbini = {};

export type Invoice_payment_method_options_sepa_debit = {};

export type Invoice_payment_method_options_us_bank_account_linked_account_options_filters =
  {
    account_subcategories?: ('checking' | 'savings')[];
  };

export type Invoice_payment_method_options_us_bank_account_linked_account_options =
  {
    filters?: Invoice_payment_method_options_us_bank_account_linked_account_options_filters;
    permissions?: (
      | 'balances'
      | 'ownership'
      | 'payment_method'
      | 'transactions'
    )[];
    prefetch?: ('balances' | 'ownership' | 'transactions')[] | null;
  };

export type Invoice_payment_method_options_us_bank_account = {
  financial_connections?: Invoice_payment_method_options_us_bank_account_linked_account_options;
  verification_method?: 'automatic' | 'instant' | 'microdeposits';
};

export type Subscriptions_resource_payment_method_options = {
  acss_debit?: Invoice_payment_method_options_acss_debit &
    Partial<Invoice_payment_method_options_acss_debit>;
  bancontact?: Invoice_payment_method_options_bancontact &
    Partial<Invoice_payment_method_options_bancontact>;
  card?: Subscription_payment_method_options_card &
    Partial<Subscription_payment_method_options_card>;
  customer_balance?: Invoice_payment_method_options_customer_balance &
    Partial<Invoice_payment_method_options_customer_balance>;
  konbini?: Invoice_payment_method_options_konbini;
  sepa_debit?: Invoice_payment_method_options_sepa_debit;
  us_bank_account?: Invoice_payment_method_options_us_bank_account &
    Partial<Invoice_payment_method_options_us_bank_account>;
};

export type Subscriptions_resource_payment_settings = {
  payment_method_options?: Subscriptions_resource_payment_method_options &
    Partial<Subscriptions_resource_payment_method_options>;
  payment_method_types?:
    | (
        | 'ach_credit_transfer'
        | 'ach_debit'
        | 'acss_debit'
        | 'amazon_pay'
        | 'au_becs_debit'
        | 'bacs_debit'
        | 'bancontact'
        | 'boleto'
        | 'card'
        | 'cashapp'
        | 'customer_balance'
        | 'eps'
        | 'fpx'
        | 'giropay'
        | 'grabpay'
        | 'ideal'
        | 'konbini'
        | 'link'
        | 'multibanco'
        | 'p24'
        | 'paynow'
        | 'paypal'
        | 'promptpay'
        | 'revolut_pay'
        | 'sepa_debit'
        | 'sofort'
        | 'swish'
        | 'us_bank_account'
        | 'wechat_pay'
      )[]
    | null;
  save_default_payment_method?: 'off' | 'on_subscription' | null;
};

export type Subscription_pending_invoice_item_interval = {
  interval: 'day' | 'month' | 'week' | 'year';
  interval_count: number; // int
};

export type Payment_flows_automatic_payment_methods_setup_intent = {
  allow_redirects?: 'always' | 'never';
  enabled?: null | boolean;
};

export type Payment_intent_next_action_cashapp_qr_code = {
  expires_at: number; // int
  image_url_png: string;
  image_url_svg: string;
};

export type Payment_intent_next_action_cashapp_handle_redirect_or_display_qr_code =
  {
    hosted_instructions_url: string;
    mobile_auth_url: string;
    qr_code: Payment_intent_next_action_cashapp_qr_code;
  };

export type Setup_intent_next_action_redirect_to_url = {
  return_url?: string | null;
  url?: string | null;
};

export type Setup_intent_next_action_verify_with_microdeposits = {
  arrival_date: number; // int
  hosted_verification_url: string;
  microdeposit_type?: 'amounts' | 'descriptor_code' | null;
};

export type Setup_intent_next_action = {
  cashapp_handle_redirect_or_display_qr_code?: Payment_intent_next_action_cashapp_handle_redirect_or_display_qr_code;
  redirect_to_url?: Setup_intent_next_action_redirect_to_url;
  type: string;
  use_stripe_sdk?: {};
  verify_with_microdeposits?: Setup_intent_next_action_verify_with_microdeposits;
};

export type Payment_method_config_biz_payment_method_configuration_details = {
  id: string;
  parent?: string | null;
};

export type Setup_intent_payment_method_options_mandate_options_acss_debit = {
  custom_mandate_url?: string;
  default_for?: ('invoice' | 'subscription')[];
  interval_description?: string | null;
  payment_schedule?: 'combined' | 'interval' | 'sporadic' | null;
  transaction_type?: 'business' | 'personal' | null;
};

export type Setup_intent_payment_method_options_acss_debit = {
  currency?: 'cad' | 'usd' | null;
  mandate_options?: Setup_intent_payment_method_options_mandate_options_acss_debit;
  verification_method?: 'automatic' | 'instant' | 'microdeposits';
};

export type Setup_intent_type_specific_payment_method_options_client = {
  verification_method?: 'automatic' | 'instant' | 'microdeposits';
};

export type Setup_intent_payment_method_options_amazon_pay = {};

export type Setup_intent_payment_method_options_mandate_options_bacs_debit = {};

export type Setup_intent_payment_method_options_bacs_debit = {
  mandate_options?: Setup_intent_payment_method_options_mandate_options_bacs_debit;
};

export type Setup_intent_payment_method_options_card_mandate_options = {
  amount: number; // int
  amount_type: 'fixed' | 'maximum';
  currency: string;
  description?: string | null;
  end_date?: null | number; // int
  interval: 'day' | 'month' | 'sporadic' | 'week' | 'year';
  interval_count?: null | number; // int
  reference: string;
  start_date: number; // int
  supported_types?: 'india'[] | null;
};

export type Setup_intent_payment_method_options_card = {
  mandate_options?: Setup_intent_payment_method_options_card_mandate_options &
    Partial<Setup_intent_payment_method_options_card_mandate_options>;
  network?:
    | 'amex'
    | 'cartes_bancaires'
    | 'diners'
    | 'discover'
    | 'eftpos_au'
    | 'girocard'
    | 'interac'
    | 'jcb'
    | 'mastercard'
    | 'unionpay'
    | 'unknown'
    | 'visa'
    | null;
  request_three_d_secure?: 'any' | 'automatic' | 'challenge' | null;
};

export type Setup_intent_payment_method_options_card_present = {};

export type Setup_intent_payment_method_options_link = {};

export type Setup_intent_payment_method_options_paypal = {
  billing_agreement_id?: string | null;
};

export type Setup_intent_payment_method_options_mandate_options_sepa_debit = {};

export type Setup_intent_payment_method_options_sepa_debit = {
  mandate_options?: Setup_intent_payment_method_options_mandate_options_sepa_debit;
};

export type Payment_flows_private_payment_methods_us_bank_account_linked_account_options_filters =
  {
    account_subcategories?: ('checking' | 'savings')[];
  };

export type Linked_account_options_us_bank_account = {
  filters?: Payment_flows_private_payment_methods_us_bank_account_linked_account_options_filters;
  permissions?: (
    | 'balances'
    | 'ownership'
    | 'payment_method'
    | 'transactions'
  )[];
  prefetch?: ('balances' | 'ownership' | 'transactions')[] | null;
  return_url?: string;
};

export type Payment_method_options_us_bank_account_mandate_options = {
  collection_method?: 'paper';
};

export type Setup_intent_payment_method_options_us_bank_account = {
  financial_connections?: Linked_account_options_us_bank_account;
  mandate_options?: Payment_method_options_us_bank_account_mandate_options;
  verification_method?: 'automatic' | 'instant' | 'microdeposits';
};

export type Setup_intent_payment_method_options = {
  acss_debit?: (
    | Setup_intent_payment_method_options_acss_debit
    | Setup_intent_type_specific_payment_method_options_client
  ) &
    (Partial<Setup_intent_payment_method_options_acss_debit> &
      Partial<Setup_intent_type_specific_payment_method_options_client>);
  amazon_pay?: (
    | Setup_intent_payment_method_options_amazon_pay
    | Setup_intent_type_specific_payment_method_options_client
  ) &
    Partial<Setup_intent_type_specific_payment_method_options_client>;
  bacs_debit?: (
    | Setup_intent_payment_method_options_bacs_debit
    | Setup_intent_type_specific_payment_method_options_client
  ) &
    (Partial<Setup_intent_payment_method_options_bacs_debit> &
      Partial<Setup_intent_type_specific_payment_method_options_client>);
  card?: (
    | Setup_intent_payment_method_options_card
    | Setup_intent_type_specific_payment_method_options_client
  ) &
    (Partial<Setup_intent_payment_method_options_card> &
      Partial<Setup_intent_type_specific_payment_method_options_client>);
  card_present?: (
    | Setup_intent_payment_method_options_card_present
    | Setup_intent_type_specific_payment_method_options_client
  ) &
    Partial<Setup_intent_type_specific_payment_method_options_client>;
  link?: (
    | Setup_intent_payment_method_options_link
    | Setup_intent_type_specific_payment_method_options_client
  ) &
    Partial<Setup_intent_type_specific_payment_method_options_client>;
  paypal?: (
    | Setup_intent_payment_method_options_paypal
    | Setup_intent_type_specific_payment_method_options_client
  ) &
    (Partial<Setup_intent_payment_method_options_paypal> &
      Partial<Setup_intent_type_specific_payment_method_options_client>);
  sepa_debit?: (
    | Setup_intent_payment_method_options_sepa_debit
    | Setup_intent_type_specific_payment_method_options_client
  ) &
    (Partial<Setup_intent_payment_method_options_sepa_debit> &
      Partial<Setup_intent_type_specific_payment_method_options_client>);
  us_bank_account?: (
    | Setup_intent_payment_method_options_us_bank_account
    | Setup_intent_type_specific_payment_method_options_client
  ) &
    (Partial<Setup_intent_payment_method_options_us_bank_account> &
      Partial<Setup_intent_type_specific_payment_method_options_client>);
};

export type Setup_intent = {
  application?: (string | Application) & Partial<Application>;
  attach_to_self?: boolean;
  automatic_payment_methods?: Payment_flows_automatic_payment_methods_setup_intent &
    Partial<Payment_flows_automatic_payment_methods_setup_intent>;
  cancellation_reason?:
    | 'abandoned'
    | 'duplicate'
    | 'requested_by_customer'
    | null;
  client_secret?: string | null;
  created: number; // int
  customer?: (string | Customer | Deleted_customer) &
    (Partial<Customer> & Partial<Deleted_customer>);
  description?: string | null;
  flow_directions?: ('inbound' | 'outbound')[] | null;
  id: string;
  last_setup_error?: Api_errors & Partial<Api_errors>;
  latest_attempt?: (string | Setup_attempt) & Partial<Setup_attempt>;
  livemode: boolean;
  mandate?: (string | Mandate) & Partial<Mandate>;
  metadata?: {
    [key: string]: string;
  } | null;
  next_action?: Setup_intent_next_action & Partial<Setup_intent_next_action>;
  object: 'setup_intent';
  on_behalf_of?: (string | Account) & Partial<Account>;
  payment_method?: (string | Payment_method) & Partial<Payment_method>;
  payment_method_configuration_details?: Payment_method_config_biz_payment_method_configuration_details &
    Partial<Payment_method_config_biz_payment_method_configuration_details>;
  payment_method_options?: Setup_intent_payment_method_options &
    Partial<Setup_intent_payment_method_options>;
  payment_method_types: string[];
  single_use_mandate?: (string | Mandate) & Partial<Mandate>;
  status:
    | 'canceled'
    | 'processing'
    | 'requires_action'
    | 'requires_confirmation'
    | 'requires_payment_method'
    | 'succeeded';
  usage: string;
};

export type Subscriptions_resource_pending_update = {
  billing_cycle_anchor?: null | number; // int
  expires_at: number; // int
  subscription_items?: Subscription_item[] | null;
  trial_end?: null | number; // int
  trial_from_plan?: null | boolean;
};

export type Subscription_schedule_current_phase = {
  end_date: number; // int
  start_date: number; // int
};

export type Subscription_schedules_resource_default_settings_automatic_tax = {
  enabled: boolean;
  liability?: Connect_account_reference & Partial<Connect_account_reference>;
};

export type Invoice_setting_subscription_schedule_setting = {
  account_tax_ids?:
    | ((string | Tax_id | Deleted_tax_id) &
        (Partial<Tax_id> & Partial<Deleted_tax_id>))[]
    | null;
  days_until_due?: null | number; // int
  issuer: Connect_account_reference;
};

export type Subscription_transfer_data = {
  amount_percent?: null | number;
  destination: (string | Account) & Partial<Account>;
};

export type Subscription_schedules_resource_default_settings = {
  application_fee_percent?: null | number;
  automatic_tax?: Subscription_schedules_resource_default_settings_automatic_tax;
  billing_cycle_anchor: 'automatic' | 'phase_start';
  billing_thresholds?: Subscription_billing_thresholds &
    Partial<Subscription_billing_thresholds>;
  collection_method?: 'charge_automatically' | 'send_invoice' | null;
  default_payment_method?: (string | Payment_method) & Partial<Payment_method>;
  description?: string | null;
  invoice_settings: Invoice_setting_subscription_schedule_setting;
  on_behalf_of?: (string | Account) & Partial<Account>;
  transfer_data?: Subscription_transfer_data &
    Partial<Subscription_transfer_data>;
};

export type Discounts_resource_stackable_discount = {
  coupon?: (string | Coupon) & Partial<Coupon>;
  discount?: (string | Discount) & Partial<Discount>;
  promotion_code?: (string | Promotion_code) & Partial<Promotion_code>;
};

export type Deleted_price = {
  deleted: boolean;
  id: string;
  object: 'price';
};

export type Subscription_schedule_add_invoice_item = {
  discounts: Discounts_resource_stackable_discount[];
  price: (string | Price | Deleted_price) &
    (Partial<Price> & Partial<Deleted_price>);
  quantity?: null | number; // int
  tax_rates?: Tax_rate[] | null;
};

export type Schedules_phase_automatic_tax = {
  enabled: boolean;
  liability?: Connect_account_reference & Partial<Connect_account_reference>;
};

export type Deleted_coupon = {
  deleted: boolean;
  id: string;
  object: 'coupon';
};

export type Invoice_setting_subscription_schedule_phase_setting = {
  account_tax_ids?:
    | ((string | Tax_id | Deleted_tax_id) &
        (Partial<Tax_id> & Partial<Deleted_tax_id>))[]
    | null;
  days_until_due?: null | number; // int
  issuer?: Connect_account_reference & Partial<Connect_account_reference>;
};

export type Subscription_schedule_configuration_item = {
  billing_thresholds?: Subscription_item_billing_thresholds &
    Partial<Subscription_item_billing_thresholds>;
  discounts: Discounts_resource_stackable_discount[];
  metadata?: {
    [key: string]: string;
  } | null;
  price: (string | Price | Deleted_price) &
    (Partial<Price> & Partial<Deleted_price>);
  quantity?: number; // int
  tax_rates?: Tax_rate[] | null;
};

export type Subscription_schedule_phase_configuration = {
  add_invoice_items: Subscription_schedule_add_invoice_item[];
  application_fee_percent?: null | number;
  automatic_tax?: Schedules_phase_automatic_tax;
  billing_cycle_anchor?: 'automatic' | 'phase_start' | null;
  billing_thresholds?: Subscription_billing_thresholds &
    Partial<Subscription_billing_thresholds>;
  collection_method?: 'charge_automatically' | 'send_invoice' | null;
  coupon?: (string | Coupon | Deleted_coupon) &
    (Partial<Coupon> & Partial<Deleted_coupon>);
  currency: string;
  default_payment_method?: (string | Payment_method) & Partial<Payment_method>;
  default_tax_rates?: Tax_rate[] | null;
  description?: string | null;
  discounts: Discounts_resource_stackable_discount[];
  end_date: number; // int
  invoice_settings?: Invoice_setting_subscription_schedule_phase_setting &
    Partial<Invoice_setting_subscription_schedule_phase_setting>;
  items: Subscription_schedule_configuration_item[];
  metadata?: {
    [key: string]: string;
  } | null;
  on_behalf_of?: (string | Account) & Partial<Account>;
  proration_behavior: 'always_invoice' | 'create_prorations' | 'none';
  start_date: number; // int
  transfer_data?: Subscription_transfer_data &
    Partial<Subscription_transfer_data>;
  trial_end?: null | number; // int
};

export type Billing_clocks_resource_status_details_advancing_status_details = {
  target_frozen_time: number; // int
};

export type Billing_clocks_resource_status_details_status_details = {
  advancing?: Billing_clocks_resource_status_details_advancing_status_details;
};

export type Subscription_schedule = {
  application?: (string | Application | Deleted_application) &
    (Partial<Application> & Partial<Deleted_application>);
  canceled_at?: null | number; // int
  completed_at?: null | number; // int
  created: number; // int
  current_phase?: Subscription_schedule_current_phase &
    Partial<Subscription_schedule_current_phase>;
  customer: (string | Customer | Deleted_customer) &
    (Partial<Customer> & Partial<Deleted_customer>);
  default_settings: Subscription_schedules_resource_default_settings;
  end_behavior: 'cancel' | 'none' | 'release' | 'renew';
  id: string;
  livemode: boolean;
  metadata?: {
    [key: string]: string;
  } | null;
  object: 'subscription_schedule';
  phases: Subscription_schedule_phase_configuration[];
  released_at?: null | number; // int
  released_subscription?: string | null;
  status: 'active' | 'canceled' | 'completed' | 'not_started' | 'released';
  subscription?: (string | Subscription) & Partial<Subscription>;
  test_clock?: (string | Test_helpers_Test_clock) &
    Partial<Test_helpers_Test_clock>;
};

export type Subscriptions_trials_resource_end_behavior = {
  missing_payment_method: 'cancel' | 'create_invoice' | 'pause';
};

export type Subscriptions_trials_resource_trial_settings = {
  end_behavior: Subscriptions_trials_resource_end_behavior;
};

export type Subscription = {
  application?: (string | Application | Deleted_application) &
    (Partial<Application> & Partial<Deleted_application>);
  application_fee_percent?: null | number;
  automatic_tax: Subscription_automatic_tax;
  billing_cycle_anchor: number; // int
  billing_cycle_anchor_config?: Subscriptions_resource_billing_cycle_anchor_config &
    Partial<Subscriptions_resource_billing_cycle_anchor_config>;
  billing_thresholds?: Subscription_billing_thresholds &
    Partial<Subscription_billing_thresholds>;
  cancel_at?: null | number; // int
  cancel_at_period_end: boolean;
  canceled_at?: null | number; // int
  cancellation_details?: Cancellation_details & Partial<Cancellation_details>;
  collection_method: 'charge_automatically' | 'send_invoice';
  created: number; // int
  currency: string;
  current_period_end: number; // int
  current_period_start: number; // int
  customer: (string | Customer | Deleted_customer) &
    (Partial<Customer> & Partial<Deleted_customer>);
  days_until_due?: null | number; // int
  default_payment_method?: (string | Payment_method) & Partial<Payment_method>;
  default_source?: (string | Bank_account | Card | Source) &
    (Partial<Bank_account> & Partial<Card> & Partial<Source>);
  default_tax_rates?: Tax_rate[] | null;
  description?: string | null;
  discount?: Discount & Partial<Discount>;
  discounts: ((string | Discount) & Partial<Discount>)[];
  ended_at?: null | number; // int
  id: string;
  invoice_settings: Subscriptions_resource_subscription_invoice_settings;
  items: {
    data: Subscription_item[];
    has_more: boolean;
    object: 'list';
    url: string;
  };
  latest_invoice?: (string | Invoice) & Partial<Invoice>;
  livemode: boolean;
  metadata: {
    [key: string]: string;
  };
  next_pending_invoice_item_invoice?: null | number; // int
  object: 'subscription';
  on_behalf_of?: (string | Account) & Partial<Account>;
  pause_collection?: Subscriptions_resource_pause_collection &
    Partial<Subscriptions_resource_pause_collection>;
  payment_settings?: Subscriptions_resource_payment_settings &
    Partial<Subscriptions_resource_payment_settings>;
  pending_invoice_item_interval?: Subscription_pending_invoice_item_interval &
    Partial<Subscription_pending_invoice_item_interval>;
  pending_setup_intent?: (string | Setup_intent) & Partial<Setup_intent>;
  pending_update?: Subscriptions_resource_pending_update &
    Partial<Subscriptions_resource_pending_update>;
  schedule?: (string | Subscription_schedule) & Partial<Subscription_schedule>;
  start_date: number; // int
  status:
    | 'active'
    | 'canceled'
    | 'incomplete'
    | 'incomplete_expired'
    | 'past_due'
    | 'paused'
    | 'trialing'
    | 'unpaid';
  test_clock?: (string | Test_helpers_Test_clock) &
    Partial<Test_helpers_Test_clock>;
  transfer_data?: Subscription_transfer_data &
    Partial<Subscription_transfer_data>;
  trial_end?: null | number; // int
  trial_settings?: Subscriptions_trials_resource_trial_settings &
    Partial<Subscriptions_trials_resource_trial_settings>;
  trial_start?: null | number; // int
};

export type Invoiceitem = {
  amount: number; // int
  currency: string;
  customer: (string | Customer | Deleted_customer) &
    (Partial<Customer> & Partial<Deleted_customer>);
  date: number; // int
  description?: string | null;
  discountable: boolean;
  discounts?: ((string | Discount) & Partial<Discount>)[] | null;
  id: string;
  invoice?: (string | Invoice) & Partial<Invoice>;
  livemode: boolean;
  metadata?: {
    [key: string]: string;
  } | null;
  object: 'invoiceitem';
  period: Invoice_line_item_period;
  price?: Price & Partial<Price>;
  proration: boolean;
  quantity: number; // int
  subscription?: (string | Subscription) & Partial<Subscription>;
  subscription_item?: string;
  tax_rates?: Tax_rate[] | null;
  test_clock?: (string | Test_helpers_Test_clock) &
    Partial<Test_helpers_Test_clock>;
  unit_amount?: null | number; // int
  unit_amount_decimal?: string | null; // decimal
};

export type Invoices_resource_line_items_credited_items = {
  invoice: string;
  invoice_line_items: string[];
};

export type Invoices_resource_line_items_proration_details = {
  credited_items?: Invoices_resource_line_items_credited_items &
    Partial<Invoices_resource_line_items_credited_items>;
};

export type Invoice_tax_amount = {
  amount: number; // int
  inclusive: boolean;
  tax_rate: (string | Tax_rate) & Partial<Tax_rate>;
  taxability_reason?:
    | 'customer_exempt'
    | 'not_collecting'
    | 'not_subject_to_tax'
    | 'not_supported'
    | 'portion_product_exempt'
    | 'portion_reduced_rated'
    | 'portion_standard_rated'
    | 'product_exempt'
    | 'product_exempt_holiday'
    | 'proportionally_rated'
    | 'reduced_rated'
    | 'reverse_charge'
    | 'standard_rated'
    | 'taxable_basis_reduced'
    | 'zero_rated'
    | null;
  taxable_amount?: null | number; // int
};

export type Line_item = {
  amount: number; // int
  amount_excluding_tax?: null | number; // int
  currency: string;
  description?: string | null;
  discount_amounts?: Discounts_resource_discount_amount[] | null;
  discountable: boolean;
  discounts: ((string | Discount) & Partial<Discount>)[];
  id: string;
  invoice?: string | null;
  invoice_item?: (string | Invoiceitem) & Partial<Invoiceitem>;
  livemode: boolean;
  metadata: {
    [key: string]: string;
  };
  object: 'line_item';
  period: Invoice_line_item_period;
  price?: Price & Partial<Price>;
  proration: boolean;
  proration_details?: Invoices_resource_line_items_proration_details &
    Partial<Invoices_resource_line_items_proration_details>;
  quantity?: null | number; // int
  subscription?: (string | Subscription) & Partial<Subscription>;
  subscription_item?: (string | Subscription_item) & Partial<Subscription_item>;
  tax_amounts: Invoice_tax_amount[];
  tax_rates: Tax_rate[];
  type: 'invoiceitem' | 'subscription';
  unit_amount_excluding_tax?: string | null; // decimal
};

export type Invoice_installments_card = {
  enabled?: null | boolean;
};

export type Invoice_payment_method_options_card = {
  installments?: Invoice_installments_card;
  request_three_d_secure?: 'any' | 'automatic' | 'challenge' | null;
};

export type Invoices_payment_method_options = {
  acss_debit?: Invoice_payment_method_options_acss_debit &
    Partial<Invoice_payment_method_options_acss_debit>;
  bancontact?: Invoice_payment_method_options_bancontact &
    Partial<Invoice_payment_method_options_bancontact>;
  card?: Invoice_payment_method_options_card &
    Partial<Invoice_payment_method_options_card>;
  customer_balance?: Invoice_payment_method_options_customer_balance &
    Partial<Invoice_payment_method_options_customer_balance>;
  konbini?: Invoice_payment_method_options_konbini;
  sepa_debit?: Invoice_payment_method_options_sepa_debit;
  us_bank_account?: Invoice_payment_method_options_us_bank_account &
    Partial<Invoice_payment_method_options_us_bank_account>;
};

export type Invoices_payment_settings = {
  default_mandate?: string | null;
  payment_method_options?: Invoices_payment_method_options &
    Partial<Invoices_payment_method_options>;
  payment_method_types?:
    | (
        | 'ach_credit_transfer'
        | 'ach_debit'
        | 'acss_debit'
        | 'amazon_pay'
        | 'au_becs_debit'
        | 'bacs_debit'
        | 'bancontact'
        | 'boleto'
        | 'card'
        | 'cashapp'
        | 'customer_balance'
        | 'eps'
        | 'fpx'
        | 'giropay'
        | 'grabpay'
        | 'ideal'
        | 'konbini'
        | 'link'
        | 'multibanco'
        | 'p24'
        | 'paynow'
        | 'paypal'
        | 'promptpay'
        | 'revolut_pay'
        | 'sepa_debit'
        | 'sofort'
        | 'swish'
        | 'us_bank_account'
        | 'wechat_pay'
      )[]
    | null;
};

export type Quotes_resource_automatic_tax = {
  enabled: boolean;
  liability?: Connect_account_reference & Partial<Connect_account_reference>;
  status?: 'complete' | 'failed' | 'requires_location_inputs' | null;
};

export type Line_items_discount_amount = {
  amount: number; // int
  discount: Discount;
};

export type Line_items_tax_amount = {
  amount: number; // int
  rate: Tax_rate;
  taxability_reason?:
    | 'customer_exempt'
    | 'not_collecting'
    | 'not_subject_to_tax'
    | 'not_supported'
    | 'portion_product_exempt'
    | 'portion_reduced_rated'
    | 'portion_standard_rated'
    | 'product_exempt'
    | 'product_exempt_holiday'
    | 'proportionally_rated'
    | 'reduced_rated'
    | 'reverse_charge'
    | 'standard_rated'
    | 'taxable_basis_reduced'
    | 'zero_rated'
    | null;
  taxable_amount?: null | number; // int
};

export type Quotes_resource_total_details_resource_breakdown = {
  discounts: Line_items_discount_amount[];
  taxes: Line_items_tax_amount[];
};

export type Quotes_resource_total_details = {
  amount_discount: number; // int
  amount_shipping?: null | number; // int
  amount_tax: number; // int
  breakdown?: Quotes_resource_total_details_resource_breakdown;
};

export type Quotes_resource_recurring = {
  amount_subtotal: number; // int
  amount_total: number; // int
  interval: 'day' | 'month' | 'week' | 'year';
  interval_count: number; // int
  total_details: Quotes_resource_total_details;
};

export type Item = {
  amount_discount: number; // int
  amount_subtotal: number; // int
  amount_tax: number; // int
  amount_total: number; // int
  currency: string;
  description?: string;
  discounts?: Line_items_discount_amount[];
  id: string;
  object: 'item';
  price?: Price & Partial<Price>;
  quantity?: null | number; // int
  taxes?: Line_items_tax_amount[];
};

export type Quotes_resource_upfront = {
  amount_subtotal: number; // int
  amount_total: number; // int
  line_items?: {
    data: Item[];
    has_more: boolean;
    object: 'list';
    url: string;
  };
  total_details: Quotes_resource_total_details;
};

export type Quotes_resource_computed = {
  recurring?: Quotes_resource_recurring & Partial<Quotes_resource_recurring>;
  upfront: Quotes_resource_upfront;
};

export type Quotes_resource_from_quote = {
  is_revision: boolean;
  quote: (string | Quote) & Partial<Quote>;
};

export type Deleted_invoice = {
  deleted: boolean;
  id: string;
  object: 'invoice';
};

export type Invoice_setting_quote_setting = {
  days_until_due?: null | number; // int
  issuer: Connect_account_reference;
};

export type Quotes_resource_status_transitions = {
  accepted_at?: null | number; // int
  canceled_at?: null | number; // int
  finalized_at?: null | number; // int
};

export type Quotes_resource_subscription_data_subscription_data = {
  description?: string | null;
  effective_date?: null | number; // int
  metadata?: {
    [key: string]: string;
  } | null;
  trial_period_days?: null | number; // int
};

export type Quotes_resource_transfer_data = {
  amount?: null | number; // int
  amount_percent?: null | number;
  destination: (string | Account) & Partial<Account>;
};

export type Quote = {
  amount_subtotal: number; // int
  amount_total: number; // int
  application?: (string | Application | Deleted_application) &
    (Partial<Application> & Partial<Deleted_application>);
  application_fee_amount?: null | number; // int
  application_fee_percent?: null | number;
  automatic_tax: Quotes_resource_automatic_tax;
  collection_method: 'charge_automatically' | 'send_invoice';
  computed: Quotes_resource_computed;
  created: number; // int
  currency?: string | null;
  customer?: (string | Customer | Deleted_customer) &
    (Partial<Customer> & Partial<Deleted_customer>);
  default_tax_rates?: ((string | Tax_rate) & Partial<Tax_rate>)[];
  description?: string | null;
  discounts: ((string | Discount) & Partial<Discount>)[];
  expires_at: number; // int
  footer?: string | null;
  from_quote?: Quotes_resource_from_quote & Partial<Quotes_resource_from_quote>;
  header?: string | null;
  id: string;
  invoice?: (string | Invoice | Deleted_invoice) &
    (Partial<Invoice> & Partial<Deleted_invoice>);
  invoice_settings: Invoice_setting_quote_setting;
  line_items?: {
    data: Item[];
    has_more: boolean;
    object: 'list';
    url: string;
  };
  livemode: boolean;
  metadata: {
    [key: string]: string;
  };
  number?: string | null;
  object: 'quote';
  on_behalf_of?: (string | Account) & Partial<Account>;
  status: 'accepted' | 'canceled' | 'draft' | 'open';
  status_transitions: Quotes_resource_status_transitions;
  subscription?: (string | Subscription) & Partial<Subscription>;
  subscription_data: Quotes_resource_subscription_data_subscription_data;
  subscription_schedule?: (string | Subscription_schedule) &
    Partial<Subscription_schedule>;
  test_clock?: (string | Test_helpers_Test_clock) &
    Partial<Test_helpers_Test_clock>;
  total_details: Quotes_resource_total_details;
  transfer_data?: Quotes_resource_transfer_data &
    Partial<Quotes_resource_transfer_data>;
};

export type Invoice_rendering_pdf = {
  page_size?: 'a4' | 'auto' | 'letter' | null;
};

export type Invoices_resource_invoice_rendering = {
  amount_tax_display?: string | null;
  pdf?: Invoice_rendering_pdf & Partial<Invoice_rendering_pdf>;
  template?: string | null;
  template_version?: null | number; // int
};

export type Shipping_rate_delivery_estimate_bound = {
  unit: 'business_day' | 'day' | 'hour' | 'month' | 'week';
  value: number; // int
};

export type Shipping_rate_delivery_estimate = {
  maximum?: Shipping_rate_delivery_estimate_bound &
    Partial<Shipping_rate_delivery_estimate_bound>;
  minimum?: Shipping_rate_delivery_estimate_bound &
    Partial<Shipping_rate_delivery_estimate_bound>;
};

export type Shipping_rate_currency_option = {
  amount: number; // int
  tax_behavior: 'exclusive' | 'inclusive' | 'unspecified';
};

export type Shipping_rate_fixed_amount = {
  amount: number; // int
  currency: string;
  currency_options?: {
    [key: string]: Shipping_rate_currency_option;
  };
};

export type Shipping_rate = {
  active: boolean;
  created: number; // int
  delivery_estimate?: Shipping_rate_delivery_estimate &
    Partial<Shipping_rate_delivery_estimate>;
  display_name?: string | null;
  fixed_amount?: Shipping_rate_fixed_amount;
  id: string;
  livemode: boolean;
  metadata: {
    [key: string]: string;
  };
  object: 'shipping_rate';
  tax_behavior?: 'exclusive' | 'inclusive' | 'unspecified' | null;
  tax_code?: (string | Tax_code) & Partial<Tax_code>;
  type: 'fixed_amount';
};

export type Invoices_resource_shipping_cost = {
  amount_subtotal: number; // int
  amount_tax: number; // int
  amount_total: number; // int
  shipping_rate?: (string | Shipping_rate) & Partial<Shipping_rate>;
  taxes?: Line_items_tax_amount[];
};

export type Invoices_resource_status_transitions = {
  finalized_at?: null | number; // int
  marked_uncollectible_at?: null | number; // int
  paid_at?: null | number; // int
  voided_at?: null | number; // int
};

export type Subscription_details_data = {
  metadata?: {
    [key: string]: string;
  } | null;
};

export type Invoice_item_threshold_reason = {
  line_item_ids: string[];
  usage_gte: number; // int
};

export type Invoice_threshold_reason = {
  amount_gte?: null | number; // int
  item_reasons: Invoice_item_threshold_reason[];
};

export type Invoice_transfer_data = {
  amount?: null | number; // int
  destination: (string | Account) & Partial<Account>;
};

export type Invoice = {
  account_country?: string | null;
  account_name?: string | null;
  account_tax_ids?:
    | ((string | Tax_id | Deleted_tax_id) &
        (Partial<Tax_id> & Partial<Deleted_tax_id>))[]
    | null;
  amount_due: number; // int
  amount_paid: number; // int
  amount_remaining: number; // int
  amount_shipping: number; // int
  application?: (string | Application | Deleted_application) &
    (Partial<Application> & Partial<Deleted_application>);
  application_fee_amount?: null | number; // int
  attempt_count: number; // int
  attempted: boolean;
  auto_advance?: boolean;
  automatic_tax: Automatic_tax;
  automatically_finalizes_at?: null | number; // int
  billing_reason?:
    | 'automatic_pending_invoice_item_invoice'
    | 'manual'
    | 'quote_accept'
    | 'subscription'
    | 'subscription_create'
    | 'subscription_cycle'
    | 'subscription_threshold'
    | 'subscription_update'
    | 'upcoming'
    | null;
  charge?: (string | Charge) & Partial<Charge>;
  collection_method: 'charge_automatically' | 'send_invoice';
  created: number; // int
  currency: string;
  custom_fields?: Invoice_setting_custom_field[] | null;
  customer?: (string | Customer | Deleted_customer) &
    (Partial<Customer> & Partial<Deleted_customer>);
  customer_address?: Address & Partial<Address>;
  customer_email?: string | null;
  customer_name?: string | null;
  customer_phone?: string | null;
  customer_shipping?: Shipping & Partial<Shipping>;
  customer_tax_exempt?: 'exempt' | 'none' | 'reverse' | null;
  customer_tax_ids?: Invoices_resource_invoice_tax_id[] | null;
  default_payment_method?: (string | Payment_method) & Partial<Payment_method>;
  default_source?: (string | Bank_account | Card | Source) &
    (Partial<Bank_account> & Partial<Card> & Partial<Source>);
  default_tax_rates: Tax_rate[];
  description?: string | null;
  discount?: Discount & Partial<Discount>;
  discounts: ((string | Discount | Deleted_discount) &
    (Partial<Discount> & Partial<Deleted_discount>))[];
  due_date?: null | number; // int
  effective_at?: null | number; // int
  ending_balance?: null | number; // int
  footer?: string | null;
  from_invoice?: Invoices_resource_from_invoice &
    Partial<Invoices_resource_from_invoice>;
  hosted_invoice_url?: string | null;
  id?: string;
  invoice_pdf?: string | null;
  issuer: Connect_account_reference;
  last_finalization_error?: Api_errors & Partial<Api_errors>;
  latest_revision?: (string | Invoice) & Partial<Invoice>;
  lines: {
    data: Line_item[];
    has_more: boolean;
    object: 'list';
    url: string;
  };
  livemode: boolean;
  metadata?: {
    [key: string]: string;
  } | null;
  next_payment_attempt?: null | number; // int
  number?: string | null;
  object: 'invoice';
  on_behalf_of?: (string | Account) & Partial<Account>;
  paid: boolean;
  paid_out_of_band: boolean;
  payment_intent?: (string | Payment_intent) & Partial<Payment_intent>;
  payment_settings: Invoices_payment_settings;
  period_end: number; // int
  period_start: number; // int
  post_payment_credit_notes_amount: number; // int
  pre_payment_credit_notes_amount: number; // int
  quote?: (string | Quote) & Partial<Quote>;
  receipt_number?: string | null;
  rendering?: Invoices_resource_invoice_rendering &
    Partial<Invoices_resource_invoice_rendering>;
  shipping_cost?: Invoices_resource_shipping_cost &
    Partial<Invoices_resource_shipping_cost>;
  shipping_details?: Shipping & Partial<Shipping>;
  starting_balance: number; // int
  statement_descriptor?: string | null;
  status?: 'draft' | 'open' | 'paid' | 'uncollectible' | 'void' | null;
  status_transitions: Invoices_resource_status_transitions;
  subscription?: (string | Subscription) & Partial<Subscription>;
  subscription_details?: Subscription_details_data &
    Partial<Subscription_details_data>;
  subscription_proration_date?: number; // int
  subtotal: number; // int
  subtotal_excluding_tax?: null | number; // int
  tax?: null | number; // int
  test_clock?: (string | Test_helpers_Test_clock) &
    Partial<Test_helpers_Test_clock>;
  threshold_reason?: Invoice_threshold_reason;
  total: number; // int
  total_discount_amounts?: Discounts_resource_discount_amount[] | null;
  total_excluding_tax?: null | number; // int
  total_tax_amounts: Invoice_tax_amount[];
  transfer_data?: Invoice_transfer_data & Partial<Invoice_transfer_data>;
  webhooks_delivered_at?: null | number; // int
};

export type Payment_intent_next_action_alipay_handle_redirect = {
  native_data?: string | null;
  native_url?: string | null;
  return_url?: string | null;
  url?: string | null;
};

export type Payment_intent_next_action_boleto = {
  expires_at?: null | number; // int
  hosted_voucher_url?: string | null;
  number?: string | null;
  pdf?: string | null;
};

export type Payment_intent_next_action_card_await_notification = {
  charge_attempt_at?: null | number; // int
  customer_approval_required?: null | boolean;
};

export type Funding_instructions_bank_transfer_aba_record = {
  account_number: string;
  bank_name: string;
  routing_number: string;
};

export type Funding_instructions_bank_transfer_iban_record = {
  account_holder_name: string;
  bic: string;
  country: string;
  iban: string;
};

export type Funding_instructions_bank_transfer_sort_code_record = {
  account_holder_name: string;
  account_number: string;
  sort_code: string;
};

export type Funding_instructions_bank_transfer_spei_record = {
  bank_code: string;
  bank_name: string;
  clabe: string;
};

export type Funding_instructions_bank_transfer_swift_record = {
  account_number: string;
  bank_name: string;
  swift_code: string;
};

export type Funding_instructions_bank_transfer_zengin_record = {
  account_holder_name?: string | null;
  account_number?: string | null;
  account_type?: string | null;
  bank_code?: string | null;
  bank_name?: string | null;
  branch_code?: string | null;
  branch_name?: string | null;
};

export type Funding_instructions_bank_transfer_financial_address = {
  aba?: Funding_instructions_bank_transfer_aba_record;
  iban?: Funding_instructions_bank_transfer_iban_record;
  sort_code?: Funding_instructions_bank_transfer_sort_code_record;
  spei?: Funding_instructions_bank_transfer_spei_record;
  supported_networks?: (
    | 'ach'
    | 'bacs'
    | 'domestic_wire_us'
    | 'fps'
    | 'sepa'
    | 'spei'
    | 'swift'
    | 'zengin'
  )[];
  swift?: Funding_instructions_bank_transfer_swift_record;
  type: 'aba' | 'iban' | 'sort_code' | 'spei' | 'swift' | 'zengin';
  zengin?: Funding_instructions_bank_transfer_zengin_record;
};

export type Payment_intent_next_action_display_bank_transfer_instructions = {
  amount_remaining?: null | number; // int
  currency?: string | null;
  financial_addresses?: Funding_instructions_bank_transfer_financial_address[];
  hosted_instructions_url?: string | null;
  reference?: string | null;
  type:
    | 'eu_bank_transfer'
    | 'gb_bank_transfer'
    | 'jp_bank_transfer'
    | 'mx_bank_transfer'
    | 'us_bank_transfer';
};

export type Payment_intent_next_action_konbini_familymart = {
  confirmation_number?: string;
  payment_code: string;
};

export type Payment_intent_next_action_konbini_lawson = {
  confirmation_number?: string;
  payment_code: string;
};

export type Payment_intent_next_action_konbini_ministop = {
  confirmation_number?: string;
  payment_code: string;
};

export type Payment_intent_next_action_konbini_seicomart = {
  confirmation_number?: string;
  payment_code: string;
};

export type Payment_intent_next_action_konbini_stores = {
  familymart?: Payment_intent_next_action_konbini_familymart &
    Partial<Payment_intent_next_action_konbini_familymart>;
  lawson?: Payment_intent_next_action_konbini_lawson &
    Partial<Payment_intent_next_action_konbini_lawson>;
  ministop?: Payment_intent_next_action_konbini_ministop &
    Partial<Payment_intent_next_action_konbini_ministop>;
  seicomart?: Payment_intent_next_action_konbini_seicomart &
    Partial<Payment_intent_next_action_konbini_seicomart>;
};

export type Payment_intent_next_action_konbini = {
  expires_at: number; // int
  hosted_voucher_url?: string | null;
  stores: Payment_intent_next_action_konbini_stores;
};

export type Payment_intent_next_action_display_multibanco_details = {
  entity?: string | null;
  expires_at?: null | number; // int
  hosted_voucher_url?: string | null;
  reference?: string | null;
};

export type Payment_intent_next_action_display_oxxo_details = {
  expires_after?: null | number; // int
  hosted_voucher_url?: string | null;
  number?: string | null;
};

export type Payment_intent_next_action_paynow_display_qr_code = {
  data: string;
  hosted_instructions_url?: string | null;
  image_url_png: string;
  image_url_svg: string;
};

export type Payment_intent_next_action_pix_display_qr_code = {
  data?: string;
  expires_at?: number; // int
  hosted_instructions_url?: string;
  image_url_png?: string;
  image_url_svg?: string;
};

export type Payment_intent_next_action_promptpay_display_qr_code = {
  data: string;
  hosted_instructions_url: string;
  image_url_png: string;
  image_url_svg: string;
};

export type Payment_intent_next_action_redirect_to_url = {
  return_url?: string | null;
  url?: string | null;
};

export type Payment_intent_next_action_swish_qr_code = {
  data: string;
  image_url_png: string;
  image_url_svg: string;
};

export type Payment_intent_next_action_swish_handle_redirect_or_display_qr_code =
  {
    hosted_instructions_url: string;
    qr_code: Payment_intent_next_action_swish_qr_code;
  };

export type Payment_intent_next_action_verify_with_microdeposits = {
  arrival_date: number; // int
  hosted_verification_url: string;
  microdeposit_type?: 'amounts' | 'descriptor_code' | null;
};

export type Payment_intent_next_action_wechat_pay_display_qr_code = {
  data: string;
  hosted_instructions_url: string;
  image_data_url: string;
  image_url_png: string;
  image_url_svg: string;
};

export type Payment_intent_next_action_wechat_pay_redirect_to_android_app = {
  app_id: string;
  nonce_str: string;
  package: string;
  partner_id: string;
  prepay_id: string;
  sign: string;
  timestamp: string;
};

export type Payment_intent_next_action_wechat_pay_redirect_to_ios_app = {
  native_url: string;
};

export type Payment_intent_next_action = {
  alipay_handle_redirect?: Payment_intent_next_action_alipay_handle_redirect;
  boleto_display_details?: Payment_intent_next_action_boleto;
  card_await_notification?: Payment_intent_next_action_card_await_notification;
  cashapp_handle_redirect_or_display_qr_code?: Payment_intent_next_action_cashapp_handle_redirect_or_display_qr_code;
  display_bank_transfer_instructions?: Payment_intent_next_action_display_bank_transfer_instructions;
  konbini_display_details?: Payment_intent_next_action_konbini;
  multibanco_display_details?: Payment_intent_next_action_display_multibanco_details;
  oxxo_display_details?: Payment_intent_next_action_display_oxxo_details;
  paynow_display_qr_code?: Payment_intent_next_action_paynow_display_qr_code;
  pix_display_qr_code?: Payment_intent_next_action_pix_display_qr_code;
  promptpay_display_qr_code?: Payment_intent_next_action_promptpay_display_qr_code;
  redirect_to_url?: Payment_intent_next_action_redirect_to_url;
  swish_handle_redirect_or_display_qr_code?: Payment_intent_next_action_swish_handle_redirect_or_display_qr_code;
  type: string;
  use_stripe_sdk?: {};
  verify_with_microdeposits?: Payment_intent_next_action_verify_with_microdeposits;
  wechat_pay_display_qr_code?: Payment_intent_next_action_wechat_pay_display_qr_code;
  wechat_pay_redirect_to_android_app?: Payment_intent_next_action_wechat_pay_redirect_to_android_app;
  wechat_pay_redirect_to_ios_app?: Payment_intent_next_action_wechat_pay_redirect_to_ios_app;
};

export type Payment_intent_payment_method_options_mandate_options_acss_debit = {
  custom_mandate_url?: string;
  interval_description?: string | null;
  payment_schedule?: 'combined' | 'interval' | 'sporadic' | null;
  transaction_type?: 'business' | 'personal' | null;
};

export type Payment_intent_payment_method_options_acss_debit = {
  mandate_options?: Payment_intent_payment_method_options_mandate_options_acss_debit;
  setup_future_usage?: 'none' | 'off_session' | 'on_session';
  verification_method?: 'automatic' | 'instant' | 'microdeposits';
};

export type Payment_flows_installment_options = {
  enabled: boolean;
  plan?: Payment_method_details_card_installments_plan;
};

export type Payment_method_options_card_present_routing = {
  requested_priority?: 'domestic' | 'international' | null;
};

export type Payment_intent_type_specific_payment_method_options_client = {
  capture_method?: 'manual' | 'manual_preferred';
  installments?: Payment_flows_installment_options;
  request_incremental_authorization_support?: boolean;
  require_cvc_recollection?: boolean;
  routing?: Payment_method_options_card_present_routing;
  setup_future_usage?: 'none' | 'off_session' | 'on_session';
  verification_method?: 'automatic' | 'instant' | 'microdeposits';
};

export type Payment_method_options_affirm = {
  capture_method?: 'manual';
  preferred_locale?: string;
  setup_future_usage?: 'none';
};

export type Payment_method_options_afterpay_clearpay = {
  capture_method?: 'manual';
  reference?: string | null;
  setup_future_usage?: 'none';
};

export type Payment_method_options_alipay = {
  setup_future_usage?: 'none' | 'off_session';
};

export type Payment_method_options_amazon_pay = {
  capture_method?: 'manual';
  setup_future_usage?: 'none' | 'off_session';
};

export type Payment_intent_payment_method_options_au_becs_debit = {
  setup_future_usage?: 'none' | 'off_session' | 'on_session';
};

export type Payment_intent_payment_method_options_mandate_options_bacs_debit =
  {};

export type Payment_intent_payment_method_options_bacs_debit = {
  mandate_options?: Payment_intent_payment_method_options_mandate_options_bacs_debit;
  setup_future_usage?: 'none' | 'off_session' | 'on_session';
};

export type Payment_method_options_bancontact = {
  preferred_language: 'de' | 'en' | 'fr' | 'nl';
  setup_future_usage?: 'none' | 'off_session';
};

export type Payment_intent_payment_method_options_blik = {
  setup_future_usage?: 'none';
};

export type Payment_method_options_boleto = {
  expires_after_days: number; // int
  setup_future_usage?: 'none' | 'off_session' | 'on_session';
};

export type Payment_method_options_card_installments = {
  available_plans?: Payment_method_details_card_installments_plan[] | null;
  enabled: boolean;
  plan?: Payment_method_details_card_installments_plan &
    Partial<Payment_method_details_card_installments_plan>;
};

export type Payment_method_options_card_mandate_options = {
  amount: number; // int
  amount_type: 'fixed' | 'maximum';
  description?: string | null;
  end_date?: null | number; // int
  interval: 'day' | 'month' | 'sporadic' | 'week' | 'year';
  interval_count?: null | number; // int
  reference: string;
  start_date: number; // int
  supported_types?: 'india'[] | null;
};

export type Payment_intent_payment_method_options_card = {
  capture_method?: 'manual';
  installments?: Payment_method_options_card_installments &
    Partial<Payment_method_options_card_installments>;
  mandate_options?: Payment_method_options_card_mandate_options &
    Partial<Payment_method_options_card_mandate_options>;
  network?:
    | 'amex'
    | 'cartes_bancaires'
    | 'diners'
    | 'discover'
    | 'eftpos_au'
    | 'girocard'
    | 'interac'
    | 'jcb'
    | 'mastercard'
    | 'unionpay'
    | 'unknown'
    | 'visa'
    | null;
  request_extended_authorization?: 'if_available' | 'never';
  request_incremental_authorization?: 'if_available' | 'never';
  request_multicapture?: 'if_available' | 'never';
  request_overcapture?: 'if_available' | 'never';
  request_three_d_secure?: 'any' | 'automatic' | 'challenge' | null;
  require_cvc_recollection?: boolean;
  setup_future_usage?: 'none' | 'off_session' | 'on_session';
  statement_descriptor_suffix_kana?: string;
  statement_descriptor_suffix_kanji?: string;
};

export type Payment_method_options_card_present = {
  request_extended_authorization?: null | boolean;
  request_incremental_authorization_support?: null | boolean;
  routing?: Payment_method_options_card_present_routing;
};

export type Payment_method_options_cashapp = {
  capture_method?: 'manual';
  setup_future_usage?: 'none' | 'off_session' | 'on_session';
};

export type Payment_method_options_customer_balance_eu_bank_account = {
  country: 'BE' | 'DE' | 'ES' | 'FR' | 'IE' | 'NL';
};

export type Payment_method_options_customer_balance_bank_transfer = {
  eu_bank_transfer?: Payment_method_options_customer_balance_eu_bank_account;
  requested_address_types?: (
    | 'aba'
    | 'iban'
    | 'sepa'
    | 'sort_code'
    | 'spei'
    | 'swift'
    | 'zengin'
  )[];
  type?:
    | 'eu_bank_transfer'
    | 'gb_bank_transfer'
    | 'jp_bank_transfer'
    | 'mx_bank_transfer'
    | 'us_bank_transfer'
    | null;
};

export type Payment_method_options_customer_balance = {
  bank_transfer?: Payment_method_options_customer_balance_bank_transfer;
  funding_type?: 'bank_transfer' | null;
  setup_future_usage?: 'none';
};

export type Payment_intent_payment_method_options_eps = {
  setup_future_usage?: 'none';
};

export type Payment_method_options_fpx = {
  setup_future_usage?: 'none';
};

export type Payment_method_options_giropay = {
  setup_future_usage?: 'none';
};

export type Payment_method_options_grabpay = {
  setup_future_usage?: 'none';
};

export type Payment_method_options_ideal = {
  setup_future_usage?: 'none' | 'off_session';
};

export type Payment_method_options_interac_present = {};

export type Payment_method_options_klarna = {
  capture_method?: 'manual';
  preferred_locale?: string | null;
  setup_future_usage?: 'none';
};

export type Payment_method_options_konbini = {
  confirmation_number?: string | null;
  expires_after_days?: null | number; // int
  expires_at?: null | number; // int
  product_description?: string | null;
  setup_future_usage?: 'none';
};

export type Payment_intent_payment_method_options_link = {
  capture_method?: 'manual';
  setup_future_usage?: 'none' | 'off_session';
};

export type Payment_intent_payment_method_options_mobilepay = {
  capture_method?: 'manual';
  setup_future_usage?: 'none';
};

export type Payment_method_options_multibanco = {
  setup_future_usage?: 'none';
};

export type Payment_method_options_oxxo = {
  expires_after_days: number; // int
  setup_future_usage?: 'none';
};

export type Payment_method_options_p24 = {
  setup_future_usage?: 'none';
};

export type Payment_method_options_paynow = {
  setup_future_usage?: 'none';
};

export type Payment_method_options_paypal = {
  capture_method?: 'manual';
  preferred_locale?: string | null;
  reference?: string | null;
  setup_future_usage?: 'none' | 'off_session';
};

export type Payment_method_options_pix = {
  expires_after_seconds?: null | number; // int
  expires_at?: null | number; // int
  setup_future_usage?: 'none';
};

export type Payment_method_options_promptpay = {
  setup_future_usage?: 'none';
};

export type Payment_method_options_revolut_pay = {
  capture_method?: 'manual';
  setup_future_usage?: 'none' | 'off_session';
};

export type Payment_intent_payment_method_options_mandate_options_sepa_debit =
  {};

export type Payment_intent_payment_method_options_sepa_debit = {
  mandate_options?: Payment_intent_payment_method_options_mandate_options_sepa_debit;
  setup_future_usage?: 'none' | 'off_session' | 'on_session';
};

export type Payment_method_options_sofort = {
  preferred_language?: 'de' | 'en' | 'es' | 'fr' | 'it' | 'nl' | 'pl' | null;
  setup_future_usage?: 'none' | 'off_session';
};

export type Payment_intent_payment_method_options_swish = {
  reference?: string | null;
  setup_future_usage?: 'none';
};

export type Payment_method_options_twint = {
  setup_future_usage?: 'none';
};

export type Payment_intent_payment_method_options_us_bank_account = {
  financial_connections?: Linked_account_options_us_bank_account;
  mandate_options?: Payment_method_options_us_bank_account_mandate_options;
  preferred_settlement_speed?: 'fastest' | 'standard';
  setup_future_usage?: 'none' | 'off_session' | 'on_session';
  verification_method?: 'automatic' | 'instant' | 'microdeposits';
};

export type Payment_method_options_wechat_pay = {
  app_id?: string | null;
  client?: 'android' | 'ios' | 'web' | null;
  setup_future_usage?: 'none';
};

export type Payment_method_options_zip = {
  setup_future_usage?: 'none';
};

export type Payment_intent_payment_method_options = {
  acss_debit?: (
    | Payment_intent_payment_method_options_acss_debit
    | Payment_intent_type_specific_payment_method_options_client
  ) &
    (Partial<Payment_intent_payment_method_options_acss_debit> &
      Partial<Payment_intent_type_specific_payment_method_options_client>);
  affirm?: (
    | Payment_method_options_affirm
    | Payment_intent_type_specific_payment_method_options_client
  ) &
    (Partial<Payment_method_options_affirm> &
      Partial<Payment_intent_type_specific_payment_method_options_client>);
  afterpay_clearpay?: (
    | Payment_method_options_afterpay_clearpay
    | Payment_intent_type_specific_payment_method_options_client
  ) &
    (Partial<Payment_method_options_afterpay_clearpay> &
      Partial<Payment_intent_type_specific_payment_method_options_client>);
  alipay?: (
    | Payment_method_options_alipay
    | Payment_intent_type_specific_payment_method_options_client
  ) &
    (Partial<Payment_method_options_alipay> &
      Partial<Payment_intent_type_specific_payment_method_options_client>);
  amazon_pay?: (
    | Payment_method_options_amazon_pay
    | Payment_intent_type_specific_payment_method_options_client
  ) &
    (Partial<Payment_method_options_amazon_pay> &
      Partial<Payment_intent_type_specific_payment_method_options_client>);
  au_becs_debit?: (
    | Payment_intent_payment_method_options_au_becs_debit
    | Payment_intent_type_specific_payment_method_options_client
  ) &
    (Partial<Payment_intent_payment_method_options_au_becs_debit> &
      Partial<Payment_intent_type_specific_payment_method_options_client>);
  bacs_debit?: (
    | Payment_intent_payment_method_options_bacs_debit
    | Payment_intent_type_specific_payment_method_options_client
  ) &
    (Partial<Payment_intent_payment_method_options_bacs_debit> &
      Partial<Payment_intent_type_specific_payment_method_options_client>);
  bancontact?: (
    | Payment_method_options_bancontact
    | Payment_intent_type_specific_payment_method_options_client
  ) &
    (Partial<Payment_method_options_bancontact> &
      Partial<Payment_intent_type_specific_payment_method_options_client>);
  blik?: (
    | Payment_intent_payment_method_options_blik
    | Payment_intent_type_specific_payment_method_options_client
  ) &
    (Partial<Payment_intent_payment_method_options_blik> &
      Partial<Payment_intent_type_specific_payment_method_options_client>);
  boleto?: (
    | Payment_method_options_boleto
    | Payment_intent_type_specific_payment_method_options_client
  ) &
    (Partial<Payment_method_options_boleto> &
      Partial<Payment_intent_type_specific_payment_method_options_client>);
  card?: (
    | Payment_intent_payment_method_options_card
    | Payment_intent_type_specific_payment_method_options_client
  ) &
    (Partial<Payment_intent_payment_method_options_card> &
      Partial<Payment_intent_type_specific_payment_method_options_client>);
  card_present?: (
    | Payment_method_options_card_present
    | Payment_intent_type_specific_payment_method_options_client
  ) &
    (Partial<Payment_method_options_card_present> &
      Partial<Payment_intent_type_specific_payment_method_options_client>);
  cashapp?: (
    | Payment_method_options_cashapp
    | Payment_intent_type_specific_payment_method_options_client
  ) &
    (Partial<Payment_method_options_cashapp> &
      Partial<Payment_intent_type_specific_payment_method_options_client>);
  customer_balance?: (
    | Payment_method_options_customer_balance
    | Payment_intent_type_specific_payment_method_options_client
  ) &
    (Partial<Payment_method_options_customer_balance> &
      Partial<Payment_intent_type_specific_payment_method_options_client>);
  eps?: (
    | Payment_intent_payment_method_options_eps
    | Payment_intent_type_specific_payment_method_options_client
  ) &
    (Partial<Payment_intent_payment_method_options_eps> &
      Partial<Payment_intent_type_specific_payment_method_options_client>);
  fpx?: (
    | Payment_method_options_fpx
    | Payment_intent_type_specific_payment_method_options_client
  ) &
    (Partial<Payment_method_options_fpx> &
      Partial<Payment_intent_type_specific_payment_method_options_client>);
  giropay?: (
    | Payment_method_options_giropay
    | Payment_intent_type_specific_payment_method_options_client
  ) &
    (Partial<Payment_method_options_giropay> &
      Partial<Payment_intent_type_specific_payment_method_options_client>);
  grabpay?: (
    | Payment_method_options_grabpay
    | Payment_intent_type_specific_payment_method_options_client
  ) &
    (Partial<Payment_method_options_grabpay> &
      Partial<Payment_intent_type_specific_payment_method_options_client>);
  ideal?: (
    | Payment_method_options_ideal
    | Payment_intent_type_specific_payment_method_options_client
  ) &
    (Partial<Payment_method_options_ideal> &
      Partial<Payment_intent_type_specific_payment_method_options_client>);
  interac_present?: (
    | Payment_method_options_interac_present
    | Payment_intent_type_specific_payment_method_options_client
  ) &
    Partial<Payment_intent_type_specific_payment_method_options_client>;
  klarna?: (
    | Payment_method_options_klarna
    | Payment_intent_type_specific_payment_method_options_client
  ) &
    (Partial<Payment_method_options_klarna> &
      Partial<Payment_intent_type_specific_payment_method_options_client>);
  konbini?: (
    | Payment_method_options_konbini
    | Payment_intent_type_specific_payment_method_options_client
  ) &
    (Partial<Payment_method_options_konbini> &
      Partial<Payment_intent_type_specific_payment_method_options_client>);
  link?: (
    | Payment_intent_payment_method_options_link
    | Payment_intent_type_specific_payment_method_options_client
  ) &
    (Partial<Payment_intent_payment_method_options_link> &
      Partial<Payment_intent_type_specific_payment_method_options_client>);
  mobilepay?: (
    | Payment_intent_payment_method_options_mobilepay
    | Payment_intent_type_specific_payment_method_options_client
  ) &
    (Partial<Payment_intent_payment_method_options_mobilepay> &
      Partial<Payment_intent_type_specific_payment_method_options_client>);
  multibanco?: (
    | Payment_method_options_multibanco
    | Payment_intent_type_specific_payment_method_options_client
  ) &
    (Partial<Payment_method_options_multibanco> &
      Partial<Payment_intent_type_specific_payment_method_options_client>);
  oxxo?: (
    | Payment_method_options_oxxo
    | Payment_intent_type_specific_payment_method_options_client
  ) &
    (Partial<Payment_method_options_oxxo> &
      Partial<Payment_intent_type_specific_payment_method_options_client>);
  p24?: (
    | Payment_method_options_p24
    | Payment_intent_type_specific_payment_method_options_client
  ) &
    (Partial<Payment_method_options_p24> &
      Partial<Payment_intent_type_specific_payment_method_options_client>);
  paynow?: (
    | Payment_method_options_paynow
    | Payment_intent_type_specific_payment_method_options_client
  ) &
    (Partial<Payment_method_options_paynow> &
      Partial<Payment_intent_type_specific_payment_method_options_client>);
  paypal?: (
    | Payment_method_options_paypal
    | Payment_intent_type_specific_payment_method_options_client
  ) &
    (Partial<Payment_method_options_paypal> &
      Partial<Payment_intent_type_specific_payment_method_options_client>);
  pix?: (
    | Payment_method_options_pix
    | Payment_intent_type_specific_payment_method_options_client
  ) &
    (Partial<Payment_method_options_pix> &
      Partial<Payment_intent_type_specific_payment_method_options_client>);
  promptpay?: (
    | Payment_method_options_promptpay
    | Payment_intent_type_specific_payment_method_options_client
  ) &
    (Partial<Payment_method_options_promptpay> &
      Partial<Payment_intent_type_specific_payment_method_options_client>);
  revolut_pay?: (
    | Payment_method_options_revolut_pay
    | Payment_intent_type_specific_payment_method_options_client
  ) &
    (Partial<Payment_method_options_revolut_pay> &
      Partial<Payment_intent_type_specific_payment_method_options_client>);
  sepa_debit?: (
    | Payment_intent_payment_method_options_sepa_debit
    | Payment_intent_type_specific_payment_method_options_client
  ) &
    (Partial<Payment_intent_payment_method_options_sepa_debit> &
      Partial<Payment_intent_type_specific_payment_method_options_client>);
  sofort?: (
    | Payment_method_options_sofort
    | Payment_intent_type_specific_payment_method_options_client
  ) &
    (Partial<Payment_method_options_sofort> &
      Partial<Payment_intent_type_specific_payment_method_options_client>);
  swish?: (
    | Payment_intent_payment_method_options_swish
    | Payment_intent_type_specific_payment_method_options_client
  ) &
    (Partial<Payment_intent_payment_method_options_swish> &
      Partial<Payment_intent_type_specific_payment_method_options_client>);
  twint?: (
    | Payment_method_options_twint
    | Payment_intent_type_specific_payment_method_options_client
  ) &
    (Partial<Payment_method_options_twint> &
      Partial<Payment_intent_type_specific_payment_method_options_client>);
  us_bank_account?: (
    | Payment_intent_payment_method_options_us_bank_account
    | Payment_intent_type_specific_payment_method_options_client
  ) &
    (Partial<Payment_intent_payment_method_options_us_bank_account> &
      Partial<Payment_intent_type_specific_payment_method_options_client>);
  wechat_pay?: (
    | Payment_method_options_wechat_pay
    | Payment_intent_type_specific_payment_method_options_client
  ) &
    (Partial<Payment_method_options_wechat_pay> &
      Partial<Payment_intent_type_specific_payment_method_options_client>);
  zip?: (
    | Payment_method_options_zip
    | Payment_intent_type_specific_payment_method_options_client
  ) &
    (Partial<Payment_method_options_zip> &
      Partial<Payment_intent_type_specific_payment_method_options_client>);
};

export type Payment_intent_processing_customer_notification = {
  approval_requested?: null | boolean;
  completes_at?: null | number; // int
};

export type Payment_intent_card_processing = {
  customer_notification?: Payment_intent_processing_customer_notification;
};

export type Payment_intent_processing = {
  card?: Payment_intent_card_processing;
  type: 'card';
};

export type Transfer_data = {
  amount?: number; // int
  destination: (string | Account) & Partial<Account>;
};

export type Payment_intent = {
  amount: number; // int
  amount_capturable?: number; // int
  amount_details?: Payment_flows_amount_details;
  amount_received?: number; // int
  application?: (string | Application) & Partial<Application>;
  application_fee_amount?: null | number; // int
  automatic_payment_methods?: Payment_flows_automatic_payment_methods_payment_intent &
    Partial<Payment_flows_automatic_payment_methods_payment_intent>;
  canceled_at?: null | number; // int
  cancellation_reason?:
    | 'abandoned'
    | 'automatic'
    | 'duplicate'
    | 'failed_invoice'
    | 'fraudulent'
    | 'requested_by_customer'
    | 'void_invoice'
    | null;
  capture_method: 'automatic' | 'automatic_async' | 'manual';
  client_secret?: string | null;
  confirmation_method: 'automatic' | 'manual';
  created: number; // int
  currency: string;
  customer?: (string | Customer | Deleted_customer) &
    (Partial<Customer> & Partial<Deleted_customer>);
  description?: string | null;
  id: string;
  invoice?: (string | Invoice) & Partial<Invoice>;
  last_payment_error?: Api_errors & Partial<Api_errors>;
  latest_charge?: (string | Charge) & Partial<Charge>;
  livemode: boolean;
  metadata?: {
    [key: string]: string;
  };
  next_action?: Payment_intent_next_action &
    Partial<Payment_intent_next_action>;
  object: 'payment_intent';
  on_behalf_of?: (string | Account) & Partial<Account>;
  payment_method?: (string | Payment_method) & Partial<Payment_method>;
  payment_method_configuration_details?: Payment_method_config_biz_payment_method_configuration_details &
    Partial<Payment_method_config_biz_payment_method_configuration_details>;
  payment_method_options?: Payment_intent_payment_method_options &
    Partial<Payment_intent_payment_method_options>;
  payment_method_types: string[];
  processing?: Payment_intent_processing & Partial<Payment_intent_processing>;
  receipt_email?: string | null;
  review?: (string | Review) & Partial<Review>;
  setup_future_usage?: 'off_session' | 'on_session' | null;
  shipping?: Shipping & Partial<Shipping>;
  statement_descriptor?: string | null;
  statement_descriptor_suffix?: string | null;
  status:
    | 'canceled'
    | 'processing'
    | 'requires_action'
    | 'requires_capture'
    | 'requires_confirmation'
    | 'requires_payment_method'
    | 'succeeded';
  transfer_data?: Transfer_data & Partial<Transfer_data>;
  transfer_group?: string | null;
};

export type Api_errors = {
  charge?: string;
  code?: string;
  decline_code?: string;
  doc_url?: string;
  message?: string;
  param?: string;
  payment_intent?: Payment_intent;
  payment_method?: Payment_method;
  payment_method_type?: string;
  request_log_url?: string;
  setup_intent?: Setup_intent;
  source?: (Bank_account | Card | Source) &
    (Partial<Bank_account> & Partial<Card> & Partial<Source>);
  type:
    | 'api_error'
    | 'card_error'
    | 'idempotency_error'
    | 'invalid_request_error';
};

export type Setup_attempt = {
  application?: (string | Application) & Partial<Application>;
  attach_to_self?: boolean;
  created: number; // int
  customer?: (string | Customer | Deleted_customer) &
    (Partial<Customer> & Partial<Deleted_customer>);
  flow_directions?: ('inbound' | 'outbound')[] | null;
  id: string;
  livemode: boolean;
  object: 'setup_attempt';
  on_behalf_of?: (string | Account) & Partial<Account>;
  payment_method: (string | Payment_method) & Partial<Payment_method>;
  payment_method_details: Setup_attempt_payment_method_details;
  setup_error?: Api_errors & Partial<Api_errors>;
  setup_intent: (string | Setup_intent) & Partial<Setup_intent>;
  status: string;
  usage: string;
};

export type Payment_method_card_generated_card = {
  charge?: string | null;
  payment_method_details?: Card_generated_from_payment_method_details &
    Partial<Card_generated_from_payment_method_details>;
  setup_attempt?: (string | Setup_attempt) & Partial<Setup_attempt>;
};

export type Networks = {
  available: string[];
  preferred?: string | null;
};

export type Three_d_secure_usage = {
  supported: boolean;
};

export type Payment_method_card_wallet_amex_express_checkout = {};

export type Payment_method_card_wallet_apple_pay = {};

export type Payment_method_card_wallet_google_pay = {};

export type Payment_method_card_wallet_link = {};

export type Payment_method_card_wallet_masterpass = {
  billing_address?: Address & Partial<Address>;
  email?: string | null;
  name?: string | null;
  shipping_address?: Address & Partial<Address>;
};

export type Payment_method_card_wallet_samsung_pay = {};

export type Payment_method_card_wallet_visa_checkout = {
  billing_address?: Address & Partial<Address>;
  email?: string | null;
  name?: string | null;
  shipping_address?: Address & Partial<Address>;
};

export type Payment_method_card_wallet = {
  amex_express_checkout?: Payment_method_card_wallet_amex_express_checkout;
  apple_pay?: Payment_method_card_wallet_apple_pay;
  dynamic_last4?: string | null;
  google_pay?: Payment_method_card_wallet_google_pay;
  link?: Payment_method_card_wallet_link;
  masterpass?: Payment_method_card_wallet_masterpass;
  samsung_pay?: Payment_method_card_wallet_samsung_pay;
  type:
    | 'amex_express_checkout'
    | 'apple_pay'
    | 'google_pay'
    | 'link'
    | 'masterpass'
    | 'samsung_pay'
    | 'visa_checkout';
  visa_checkout?: Payment_method_card_wallet_visa_checkout;
};

export type Payment_method_card = {
  brand: string;
  checks?: Payment_method_card_checks & Partial<Payment_method_card_checks>;
  country?: string | null;
  display_brand?: string | null;
  exp_month: number; // int
  exp_year: number; // int
  fingerprint?: string | null;
  funding: string;
  generated_from?: Payment_method_card_generated_card &
    Partial<Payment_method_card_generated_card>;
  last4: string;
  networks?: Networks & Partial<Networks>;
  three_d_secure_usage?: Three_d_secure_usage & Partial<Three_d_secure_usage>;
  wallet?: Payment_method_card_wallet & Partial<Payment_method_card_wallet>;
};

export type Payment_method_card_present_networks = {
  available: string[];
  preferred?: string | null;
};

export type Payment_method_card_present = {
  brand?: string | null;
  brand_product?: string | null;
  cardholder_name?: string | null;
  country?: string | null;
  description?: string | null;
  exp_month: number; // int
  exp_year: number; // int
  fingerprint?: string | null;
  funding?: string | null;
  issuer?: string | null;
  last4?: string | null;
  networks?: Payment_method_card_present_networks &
    Partial<Payment_method_card_present_networks>;
  offline?: Payment_method_details_card_present_offline &
    Partial<Payment_method_details_card_present_offline>;
  preferred_locales?: string[] | null;
  read_method?:
    | 'contact_emv'
    | 'contactless_emv'
    | 'contactless_magstripe_mode'
    | 'magnetic_stripe_fallback'
    | 'magnetic_stripe_track2'
    | null;
  wallet?: Payment_flows_private_payment_methods_card_present_common_wallet;
};

export type Payment_method_cashapp = {
  buyer_id?: string | null;
  cashtag?: string | null;
};

export type Payment_method_customer_balance = {};

export type Payment_method_eps = {
  bank?:
    | 'arzte_und_apotheker_bank'
    | 'austrian_anadi_bank_ag'
    | 'bank_austria'
    | 'bankhaus_carl_spangler'
    | 'bankhaus_schelhammer_und_schattera_ag'
    | 'bawag_psk_ag'
    | 'bks_bank_ag'
    | 'brull_kallmus_bank_ag'
    | 'btv_vier_lander_bank'
    | 'capital_bank_grawe_gruppe_ag'
    | 'deutsche_bank_ag'
    | 'dolomitenbank'
    | 'easybank_ag'
    | 'erste_bank_und_sparkassen'
    | 'hypo_alpeadriabank_international_ag'
    | 'hypo_bank_burgenland_aktiengesellschaft'
    | 'hypo_noe_lb_fur_niederosterreich_u_wien'
    | 'hypo_oberosterreich_salzburg_steiermark'
    | 'hypo_tirol_bank_ag'
    | 'hypo_vorarlberg_bank_ag'
    | 'marchfelder_bank'
    | 'oberbank_ag'
    | 'raiffeisen_bankengruppe_osterreich'
    | 'schoellerbank_ag'
    | 'sparda_bank_wien'
    | 'volksbank_gruppe'
    | 'volkskreditbank_ag'
    | 'vr_bank_braunau'
    | null;
};

export type Payment_method_fpx = {
  bank:
    | 'affin_bank'
    | 'agrobank'
    | 'alliance_bank'
    | 'ambank'
    | 'bank_islam'
    | 'bank_muamalat'
    | 'bank_of_china'
    | 'bank_rakyat'
    | 'bsn'
    | 'cimb'
    | 'deutsche_bank'
    | 'hong_leong_bank'
    | 'hsbc'
    | 'kfh'
    | 'maybank2e'
    | 'maybank2u'
    | 'ocbc'
    | 'pb_enterprise'
    | 'public_bank'
    | 'rhb'
    | 'standard_chartered'
    | 'uob';
};

export type Payment_method_giropay = {};

export type Payment_method_grabpay = {};

export type Payment_method_ideal = {
  bank?:
    | 'abn_amro'
    | 'asn_bank'
    | 'bunq'
    | 'handelsbanken'
    | 'ing'
    | 'knab'
    | 'moneyou'
    | 'n26'
    | 'nn'
    | 'rabobank'
    | 'regiobank'
    | 'revolut'
    | 'sns_bank'
    | 'triodos_bank'
    | 'van_lanschot'
    | 'yoursafe'
    | null;
  bic?:
    | 'ABNANL2A'
    | 'ASNBNL21'
    | 'BITSNL2A'
    | 'BUNQNL2A'
    | 'FVLBNL22'
    | 'HANDNL2A'
    | 'INGBNL2A'
    | 'KNABNL2H'
    | 'MOYONL21'
    | 'NNBANL2G'
    | 'NTSBDEB1'
    | 'RABONL2U'
    | 'RBRBNL21'
    | 'REVOIE23'
    | 'REVOLT21'
    | 'SNSBNL2A'
    | 'TRIONL2U'
    | null;
};

export type Payment_method_interac_present = {
  brand?: string | null;
  cardholder_name?: string | null;
  country?: string | null;
  description?: string | null;
  exp_month: number; // int
  exp_year: number; // int
  fingerprint?: string | null;
  funding?: string | null;
  issuer?: string | null;
  last4?: string | null;
  networks?: Payment_method_card_present_networks &
    Partial<Payment_method_card_present_networks>;
  preferred_locales?: string[] | null;
  read_method?:
    | 'contact_emv'
    | 'contactless_emv'
    | 'contactless_magstripe_mode'
    | 'magnetic_stripe_fallback'
    | 'magnetic_stripe_track2'
    | null;
};

export type Payment_flows_private_payment_methods_klarna_dob = {
  day?: null | number; // int
  month?: null | number; // int
  year?: null | number; // int
};

export type Payment_method_klarna = {
  dob?: Payment_flows_private_payment_methods_klarna_dob &
    Partial<Payment_flows_private_payment_methods_klarna_dob>;
};

export type Payment_method_konbini = {};

export type Payment_method_link = {
  email?: string | null;
};

export type Payment_method_mobilepay = {};

export type Payment_method_multibanco = {};

export type Payment_method_oxxo = {};

export type Payment_method_p24 = {
  bank?:
    | 'alior_bank'
    | 'bank_millennium'
    | 'bank_nowy_bfg_sa'
    | 'bank_pekao_sa'
    | 'banki_spbdzielcze'
    | 'blik'
    | 'bnp_paribas'
    | 'boz'
    | 'citi_handlowy'
    | 'credit_agricole'
    | 'envelobank'
    | 'etransfer_pocztowy24'
    | 'getin_bank'
    | 'ideabank'
    | 'ing'
    | 'inteligo'
    | 'mbank_mtransfer'
    | 'nest_przelew'
    | 'noble_pay'
    | 'pbac_z_ipko'
    | 'plus_bank'
    | 'santander_przelew24'
    | 'tmobile_usbugi_bankowe'
    | 'toyota_bank'
    | 'velobank'
    | 'volkswagen_bank'
    | null;
};

export type Payment_method_paynow = {};

export type Payment_method_paypal = {
  payer_email?: string | null;
  payer_id?: string | null;
};

export type Payment_method_pix = {};

export type Payment_method_promptpay = {};

export type Payment_method_revolut_pay = {};

export type Sepa_debit_generated_from = {
  charge?: (string | Charge) & Partial<Charge>;
  setup_attempt?: (string | Setup_attempt) & Partial<Setup_attempt>;
};

export type Payment_method_sepa_debit = {
  bank_code?: string | null;
  branch_code?: string | null;
  country?: string | null;
  fingerprint?: string | null;
  generated_from?: Sepa_debit_generated_from &
    Partial<Sepa_debit_generated_from>;
  last4?: string | null;
};

export type Payment_method_sofort = {
  country?: string | null;
};

export type Payment_method_swish = {};

export type Payment_method_twint = {};

export type Us_bank_account_networks = {
  preferred?: string | null;
  supported: ('ach' | 'us_domestic_wire')[];
};

export type Payment_method_us_bank_account_blocked = {
  network_code?:
    | 'R02'
    | 'R03'
    | 'R04'
    | 'R05'
    | 'R07'
    | 'R08'
    | 'R10'
    | 'R11'
    | 'R16'
    | 'R20'
    | 'R29'
    | 'R31'
    | null;
  reason?:
    | 'bank_account_closed'
    | 'bank_account_frozen'
    | 'bank_account_invalid_details'
    | 'bank_account_restricted'
    | 'bank_account_unusable'
    | 'debit_not_authorized'
    | null;
};

export type Payment_method_us_bank_account_status_details = {
  blocked?: Payment_method_us_bank_account_blocked;
};

export type Payment_method_us_bank_account = {
  account_holder_type?: 'company' | 'individual' | null;
  account_type?: 'checking' | 'savings' | null;
  bank_name?: string | null;
  financial_connections_account?: string | null;
  fingerprint?: string | null;
  last4?: string | null;
  networks?: Us_bank_account_networks & Partial<Us_bank_account_networks>;
  routing_number?: string | null;
  status_details?: Payment_method_us_bank_account_status_details &
    Partial<Payment_method_us_bank_account_status_details>;
};

export type Payment_method_wechat_pay = {};

export type Payment_method_zip = {};

export type Payment_method = {
  acss_debit?: Payment_method_acss_debit;
  affirm?: Payment_method_affirm;
  afterpay_clearpay?: Payment_method_afterpay_clearpay;
  alipay?: Payment_flows_private_payment_methods_alipay;
  allow_redisplay?: 'always' | 'limited' | 'unspecified';
  amazon_pay?: Payment_method_amazon_pay;
  au_becs_debit?: Payment_method_au_becs_debit;
  bacs_debit?: Payment_method_bacs_debit;
  bancontact?: Payment_method_bancontact;
  billing_details: Billing_details;
  blik?: Payment_method_blik;
  boleto?: Payment_method_boleto;
  card?: Payment_method_card;
  card_present?: Payment_method_card_present;
  cashapp?: Payment_method_cashapp;
  created: number; // int
  customer?: (string | Customer) & Partial<Customer>;
  customer_balance?: Payment_method_customer_balance;
  eps?: Payment_method_eps;
  fpx?: Payment_method_fpx;
  giropay?: Payment_method_giropay;
  grabpay?: Payment_method_grabpay;
  id: string;
  ideal?: Payment_method_ideal;
  interac_present?: Payment_method_interac_present;
  klarna?: Payment_method_klarna;
  konbini?: Payment_method_konbini;
  link?: Payment_method_link;
  livemode: boolean;
  metadata?: {
    [key: string]: string;
  } | null;
  mobilepay?: Payment_method_mobilepay;
  multibanco?: Payment_method_multibanco;
  object: 'payment_method';
  oxxo?: Payment_method_oxxo;
  p24?: Payment_method_p24;
  paynow?: Payment_method_paynow;
  paypal?: Payment_method_paypal;
  pix?: Payment_method_pix;
  promptpay?: Payment_method_promptpay;
  radar_options?: Radar_radar_options;
  revolut_pay?: Payment_method_revolut_pay;
  sepa_debit?: Payment_method_sepa_debit;
  sofort?: Payment_method_sofort;
  swish?: Payment_method_swish;
  twint?: Payment_method_twint;
  type:
    | 'acss_debit'
    | 'affirm'
    | 'afterpay_clearpay'
    | 'alipay'
    | 'amazon_pay'
    | 'au_becs_debit'
    | 'bacs_debit'
    | 'bancontact'
    | 'blik'
    | 'boleto'
    | 'card'
    | 'card_present'
    | 'cashapp'
    | 'customer_balance'
    | 'eps'
    | 'fpx'
    | 'giropay'
    | 'grabpay'
    | 'ideal'
    | 'interac_present'
    | 'klarna'
    | 'konbini'
    | 'link'
    | 'mobilepay'
    | 'multibanco'
    | 'oxxo'
    | 'p24'
    | 'paynow'
    | 'paypal'
    | 'pix'
    | 'promptpay'
    | 'revolut_pay'
    | 'sepa_debit'
    | 'sofort'
    | 'swish'
    | 'twint'
    | 'us_bank_account'
    | 'wechat_pay'
    | 'zip';
  us_bank_account?: Payment_method_us_bank_account;
  wechat_pay?: Payment_method_wechat_pay;
  zip?: Payment_method_zip;
};

export type Invoice_setting_customer_rendering_options = {
  amount_tax_display?: string | null;
  template?: string | null;
};

export type Invoice_setting_customer_setting = {
  custom_fields?: Invoice_setting_custom_field[] | null;
  default_payment_method?: (string | Payment_method) & Partial<Payment_method>;
  footer?: string | null;
  rendering_options?: Invoice_setting_customer_rendering_options &
    Partial<Invoice_setting_customer_rendering_options>;
};

export type Customer_tax_location = {
  country: string;
  source:
    | 'billing_address'
    | 'ip_address'
    | 'payment_method'
    | 'shipping_destination';
  state?: string | null;
};

export type Customer_tax = {
  automatic_tax:
    | 'failed'
    | 'not_collecting'
    | 'supported'
    | 'unrecognized_location';
  ip_address?: string | null;
  location?: Customer_tax_location & Partial<Customer_tax_location>;
};

export type Customer = {
  address?: Address & Partial<Address>;
  balance?: number; // int
  cash_balance?: Cash_balance & Partial<Cash_balance>;
  created: number; // int
  currency?: string | null;
  default_source?: (string | Bank_account | Card | Source) &
    (Partial<Bank_account> & Partial<Card> & Partial<Source>);
  delinquent?: null | boolean;
  description?: string | null;
  discount?: Discount & Partial<Discount>;
  email?: string | null;
  id: string;
  invoice_credit_balance?: {
    [key: string]: number; // int
  };
  invoice_prefix?: string | null;
  invoice_settings?: Invoice_setting_customer_setting;
  livemode: boolean;
  metadata?: {
    [key: string]: string;
  };
  name?: string | null;
  next_invoice_sequence?: number; // int
  object: 'customer';
  phone?: string | null;
  preferred_locales?: string[] | null;
  shipping?: Shipping & Partial<Shipping>;
  sources?: {
    data: ((Bank_account | Card | Source) &
      (Partial<Bank_account> & Partial<Card> & Partial<Source>))[];
    has_more: boolean;
    object: 'list';
    url: string;
  };
  subscriptions?: {
    data: Subscription[];
    has_more: boolean;
    object: 'list';
    url: string;
  };
  tax?: Customer_tax;
  tax_exempt?: 'exempt' | 'none' | 'reverse' | null;
  tax_ids?: {
    data: Tax_id[];
    has_more: boolean;
    object: 'list';
    url: string;
  };
  test_clock?: (string | Test_helpers_Test_clock) &
    Partial<Test_helpers_Test_clock>;
};

export type Account_requirements_error = {
  code:
    | 'invalid_address_city_state_postal_code'
    | 'invalid_address_highway_contract_box'
    | 'invalid_address_private_mailbox'
    | 'invalid_business_profile_name'
    | 'invalid_business_profile_name_denylisted'
    | 'invalid_company_name_denylisted'
    | 'invalid_dob_age_over_maximum'
    | 'invalid_dob_age_under_18'
    | 'invalid_dob_age_under_minimum'
    | 'invalid_product_description_length'
    | 'invalid_product_description_url_match'
    | 'invalid_representative_country'
    | 'invalid_statement_descriptor_business_mismatch'
    | 'invalid_statement_descriptor_denylisted'
    | 'invalid_statement_descriptor_length'
    | 'invalid_statement_descriptor_prefix_denylisted'
    | 'invalid_statement_descriptor_prefix_mismatch'
    | 'invalid_street_address'
    | 'invalid_tax_id'
    | 'invalid_tax_id_format'
    | 'invalid_tos_acceptance'
    | 'invalid_url_denylisted'
    | 'invalid_url_format'
    | 'invalid_url_web_presence_detected'
    | 'invalid_url_website_business_information_mismatch'
    | 'invalid_url_website_empty'
    | 'invalid_url_website_inaccessible'
    | 'invalid_url_website_inaccessible_geoblocked'
    | 'invalid_url_website_inaccessible_password_protected'
    | 'invalid_url_website_incomplete'
    | 'invalid_url_website_incomplete_cancellation_policy'
    | 'invalid_url_website_incomplete_customer_service_details'
    | 'invalid_url_website_incomplete_legal_restrictions'
    | 'invalid_url_website_incomplete_refund_policy'
    | 'invalid_url_website_incomplete_return_policy'
    | 'invalid_url_website_incomplete_terms_and_conditions'
    | 'invalid_url_website_incomplete_under_construction'
    | 'invalid_url_website_other'
    | 'invalid_value_other'
    | 'verification_directors_mismatch'
    | 'verification_document_address_mismatch'
    | 'verification_document_address_missing'
    | 'verification_document_corrupt'
    | 'verification_document_country_not_supported'
    | 'verification_document_directors_mismatch'
    | 'verification_document_dob_mismatch'
    | 'verification_document_duplicate_type'
    | 'verification_document_expired'
    | 'verification_document_failed_copy'
    | 'verification_document_failed_greyscale'
    | 'verification_document_failed_other'
    | 'verification_document_failed_test_mode'
    | 'verification_document_fraudulent'
    | 'verification_document_id_number_mismatch'
    | 'verification_document_id_number_missing'
    | 'verification_document_incomplete'
    | 'verification_document_invalid'
    | 'verification_document_issue_or_expiry_date_missing'
    | 'verification_document_manipulated'
    | 'verification_document_missing_back'
    | 'verification_document_missing_front'
    | 'verification_document_name_mismatch'
    | 'verification_document_name_missing'
    | 'verification_document_nationality_mismatch'
    | 'verification_document_not_readable'
    | 'verification_document_not_signed'
    | 'verification_document_not_uploaded'
    | 'verification_document_photo_mismatch'
    | 'verification_document_too_large'
    | 'verification_document_type_not_supported'
    | 'verification_extraneous_directors'
    | 'verification_failed_address_match'
    | 'verification_failed_business_iec_number'
    | 'verification_failed_document_match'
    | 'verification_failed_id_number_match'
    | 'verification_failed_keyed_identity'
    | 'verification_failed_keyed_match'
    | 'verification_failed_name_match'
    | 'verification_failed_other'
    | 'verification_failed_representative_authority'
    | 'verification_failed_residential_address'
    | 'verification_failed_tax_id_match'
    | 'verification_failed_tax_id_not_issued'
    | 'verification_missing_directors'
    | 'verification_missing_executives'
    | 'verification_missing_owners'
    | 'verification_requires_additional_memorandum_of_associations'
    | 'verification_requires_additional_proof_of_registration'
    | 'verification_supportability';
  reason: string;
  requirement: string;
};

export type External_account_requirements = {
  currently_due?: string[] | null;
  errors?: Account_requirements_error[] | null;
  past_due?: string[] | null;
  pending_verification?: string[] | null;
};

export type Bank_account = {
  account?: (string | Account) & Partial<Account>;
  account_holder_name?: string | null;
  account_holder_type?: string | null;
  account_type?: string | null;
  available_payout_methods?: ('instant' | 'standard')[] | null;
  bank_name?: string | null;
  country: string;
  currency: string;
  customer?: (string | Customer | Deleted_customer) &
    (Partial<Customer> & Partial<Deleted_customer>);
  default_for_currency?: null | boolean;
  fingerprint?: string | null;
  future_requirements?: External_account_requirements &
    Partial<External_account_requirements>;
  id: string;
  last4: string;
  metadata?: {
    [key: string]: string;
  } | null;
  object: 'bank_account';
  requirements?: External_account_requirements &
    Partial<External_account_requirements>;
  routing_number?: string | null;
  status: string;
};

export type Account_requirements_alternative = {
  alternative_fields_due: string[];
  original_fields_due: string[];
};

export type Account_future_requirements = {
  alternatives?: Account_requirements_alternative[] | null;
  current_deadline?: null | number; // int
  currently_due?: string[] | null;
  disabled_reason?: string | null;
  errors?: Account_requirements_error[] | null;
  eventually_due?: string[] | null;
  past_due?: string[] | null;
  pending_verification?: string[] | null;
};

export type Person_additional_tos_acceptance = {
  date?: null | number; // int
  ip?: string | null;
  user_agent?: string | null;
};

export type Person_additional_tos_acceptances = {
  account?: Person_additional_tos_acceptance &
    Partial<Person_additional_tos_acceptance>;
};

export type Legal_entity_dob = {
  day?: null | number; // int
  month?: null | number; // int
  year?: null | number; // int
};

export type Person_future_requirements = {
  alternatives?: Account_requirements_alternative[] | null;
  currently_due: string[];
  errors: Account_requirements_error[];
  eventually_due: string[];
  past_due: string[];
  pending_verification: string[];
};

export type Person_relationship = {
  director?: null | boolean;
  executive?: null | boolean;
  legal_guardian?: null | boolean;
  owner?: null | boolean;
  percent_ownership?: null | number;
  representative?: null | boolean;
  title?: string | null;
};

export type Person_requirements = {
  alternatives?: Account_requirements_alternative[] | null;
  currently_due: string[];
  errors: Account_requirements_error[];
  eventually_due: string[];
  past_due: string[];
  pending_verification: string[];
};

export type Legal_entity_person_verification_document = {
  back?: (string | File) & Partial<File>;
  details?: string | null;
  details_code?: string | null;
  front?: (string | File) & Partial<File>;
};

export type Legal_entity_person_verification = {
  additional_document?: Legal_entity_person_verification_document &
    Partial<Legal_entity_person_verification_document>;
  details?: string | null;
  details_code?: string | null;
  document?: Legal_entity_person_verification_document;
  status: string;
};

export type Person = {
  account: string;
  additional_tos_acceptances?: Person_additional_tos_acceptances;
  address?: Address;
  address_kana?: Legal_entity_japan_address &
    Partial<Legal_entity_japan_address>;
  address_kanji?: Legal_entity_japan_address &
    Partial<Legal_entity_japan_address>;
  created: number; // int
  dob?: Legal_entity_dob;
  email?: string | null;
  first_name?: string | null;
  first_name_kana?: string | null;
  first_name_kanji?: string | null;
  full_name_aliases?: string[];
  future_requirements?: Person_future_requirements &
    Partial<Person_future_requirements>;
  gender?: string | null;
  id: string;
  id_number_provided?: boolean;
  id_number_secondary_provided?: boolean;
  last_name?: string | null;
  last_name_kana?: string | null;
  last_name_kanji?: string | null;
  maiden_name?: string | null;
  metadata?: {
    [key: string]: string;
  };
  nationality?: string | null;
  object: 'person';
  phone?: string | null;
  political_exposure?: 'existing' | 'none';
  registered_address?: Address;
  relationship?: Person_relationship;
  requirements?: Person_requirements & Partial<Person_requirements>;
  ssn_last_4_provided?: boolean;
  verification?: Legal_entity_person_verification;
};

export type Account_requirements = {
  alternatives?: Account_requirements_alternative[] | null;
  current_deadline?: null | number; // int
  currently_due?: string[] | null;
  disabled_reason?: string | null;
  errors?: Account_requirements_error[] | null;
  eventually_due?: string[] | null;
  past_due?: string[] | null;
  pending_verification?: string[] | null;
};

export type Account_bacs_debit_payments_settings = {
  display_name?: string | null;
  service_user_number?: string | null;
};

export type Account_branding_settings = {
  icon?: (string | File) & Partial<File>;
  logo?: (string | File) & Partial<File>;
  primary_color?: string | null;
  secondary_color?: string | null;
};

export type Card_issuing_account_terms_of_service = {
  date?: null | number; // int
  ip?: string | null;
  user_agent?: string;
};

export type Account_card_issuing_settings = {
  tos_acceptance?: Card_issuing_account_terms_of_service;
};

export type Account_decline_charge_on = {
  avs_failure: boolean;
  cvc_failure: boolean;
};

export type Account_card_payments_settings = {
  decline_on?: Account_decline_charge_on;
  statement_descriptor_prefix?: string | null;
  statement_descriptor_prefix_kana?: string | null;
  statement_descriptor_prefix_kanji?: string | null;
};

export type Account_dashboard_settings = {
  display_name?: string | null;
  timezone?: string | null;
};

export type Account_invoices_settings = {
  default_account_tax_ids?: ((string | Tax_id) & Partial<Tax_id>)[] | null;
};

export type Account_payments_settings = {
  statement_descriptor?: string | null;
  statement_descriptor_kana?: string | null;
  statement_descriptor_kanji?: string | null;
  statement_descriptor_prefix_kana?: string | null;
  statement_descriptor_prefix_kanji?: string | null;
};

export type Transfer_schedule = {
  delay_days: number; // int
  interval: string;
  monthly_anchor?: number; // int
  weekly_anchor?: string;
};

export type Account_payout_settings = {
  debit_negative_balances: boolean;
  schedule: Transfer_schedule;
  statement_descriptor?: string | null;
};

export type Account_sepa_debit_payments_settings = {
  creditor_id?: string;
};

export type Account_terms_of_service = {
  date?: null | number; // int
  ip?: string | null;
  user_agent?: string;
};

export type Account_treasury_settings = {
  tos_acceptance?: Account_terms_of_service;
};

export type Account_settings = {
  bacs_debit_payments?: Account_bacs_debit_payments_settings;
  branding: Account_branding_settings;
  card_issuing?: Account_card_issuing_settings;
  card_payments: Account_card_payments_settings;
  dashboard: Account_dashboard_settings;
  invoices?: Account_invoices_settings;
  payments: Account_payments_settings;
  payouts?: Account_payout_settings;
  sepa_debit_payments?: Account_sepa_debit_payments_settings;
  treasury?: Account_treasury_settings;
};

export type Account_tos_acceptance = {
  date?: null | number; // int
  ip?: string | null;
  service_agreement?: string;
  user_agent?: string | null;
};

export type Account = {
  business_profile?: Account_business_profile &
    Partial<Account_business_profile>;
  business_type?:
    | 'company'
    | 'government_entity'
    | 'individual'
    | 'non_profit'
    | null;
  capabilities?: Account_capabilities;
  charges_enabled?: boolean;
  company?: Legal_entity_company;
  controller?: Account_unification_account_controller;
  country?: string;
  created?: number; // int
  default_currency?: string;
  details_submitted?: boolean;
  email?: string | null;
  external_accounts?: {
    data: ((Bank_account | Card) & (Partial<Bank_account> & Partial<Card>))[];
    has_more: boolean;
    object: 'list';
    url: string;
  };
  future_requirements?: Account_future_requirements;
  id: string;
  individual?: Person;
  metadata?: {
    [key: string]: string;
  };
  object: 'account';
  payouts_enabled?: boolean;
  requirements?: Account_requirements;
  settings?: Account_settings & Partial<Account_settings>;
  tos_acceptance?: Account_tos_acceptance;
  type?: 'custom' | 'express' | 'none' | 'standard';
};

export type Error = {
  error: Api_errors;
};

export type Account_link = {
  created: number; // int
  expires_at: number; // int
  object: 'account_link';
  url: string;
};

export type Connect_embedded_account_features_claim = {
  external_account_collection: boolean;
};

export type Connect_embedded_account_config_claim = {
  enabled: boolean;
  features: Connect_embedded_account_features_claim;
};

export type Connect_embedded_payouts_features = {
  edit_payout_schedule: boolean;
  external_account_collection: boolean;
  instant_payouts: boolean;
  standard_payouts: boolean;
};

export type Connect_embedded_payouts_config_claim = {
  enabled: boolean;
  features: Connect_embedded_payouts_features;
};

export type Connect_embedded_base_features = {};

export type Connect_embedded_base_config_claim = {
  enabled: boolean;
  features: Connect_embedded_base_features;
};

export type Connect_embedded_payments_features = {
  capture_payments: boolean;
  destination_on_behalf_of_charge_management: boolean;
  dispute_management: boolean;
  refund_management: boolean;
};

export type Connect_embedded_payments_config_claim = {
  enabled: boolean;
  features: Connect_embedded_payments_features;
};

export type Connect_embedded_account_session_create_components = {
  account_management: Connect_embedded_account_config_claim;
  account_onboarding: Connect_embedded_account_config_claim;
  balances: Connect_embedded_payouts_config_claim;
  documents: Connect_embedded_base_config_claim;
  notification_banner: Connect_embedded_account_config_claim;
  payment_details: Connect_embedded_payments_config_claim;
  payments: Connect_embedded_payments_config_claim;
  payouts: Connect_embedded_payouts_config_claim;
  payouts_list: Connect_embedded_base_config_claim;
  tax_registrations: Connect_embedded_base_config_claim;
  tax_settings: Connect_embedded_base_config_claim;
};

export type Account_session = {
  account: string;
  client_secret: string;
  components: Connect_embedded_account_session_create_components;
  expires_at: number; // int
  livemode: boolean;
  object: 'account_session';
};

export type Deleted_account = {
  deleted: boolean;
  id: string;
  object: 'account';
};

export type External_account = (Bank_account | Card) &
  (Partial<Bank_account> & Partial<Card>);

export type Deleted_external_account = (Deleted_bank_account | Deleted_card) &
  (Partial<Deleted_bank_account> & Partial<Deleted_card>);

export type Account_capability_future_requirements = {
  alternatives?: Account_requirements_alternative[] | null;
  current_deadline?: null | number; // int
  currently_due: string[];
  disabled_reason?:
    | 'other'
    | 'paused.inactivity'
    | 'pending.onboarding'
    | 'pending.review'
    | 'platform_disabled'
    | 'platform_paused'
    | 'rejected.inactivity'
    | 'rejected.other'
    | 'rejected.unsupported_business'
    | 'requirements.fields_needed'
    | null;
  errors: Account_requirements_error[];
  eventually_due: string[];
  past_due: string[];
  pending_verification: string[];
};

export type Account_capability_requirements = {
  alternatives?: Account_requirements_alternative[] | null;
  current_deadline?: null | number; // int
  currently_due: string[];
  disabled_reason?:
    | 'other'
    | 'paused.inactivity'
    | 'pending.onboarding'
    | 'pending.review'
    | 'platform_disabled'
    | 'platform_paused'
    | 'rejected.inactivity'
    | 'rejected.other'
    | 'rejected.unsupported_business'
    | 'requirements.fields_needed'
    | null;
  errors: Account_requirements_error[];
  eventually_due: string[];
  past_due: string[];
  pending_verification: string[];
};

export type Capability = {
  account: (string | Account) & Partial<Account>;
  future_requirements?: Account_capability_future_requirements;
  id: string;
  object: 'capability';
  requested: boolean;
  requested_at?: null | number; // int
  requirements?: Account_capability_requirements;
  status: 'active' | 'disabled' | 'inactive' | 'pending' | 'unrequested';
};

export type Login_link = {
  created: number; // int
  object: 'login_link';
  url: string;
};

export type Deleted_person = {
  deleted: boolean;
  id: string;
  object: 'person';
};

export type Apple_pay_domain = {
  created: number; // int
  domain_name: string;
  id: string;
  livemode: boolean;
  object: 'apple_pay_domain';
};

export type Deleted_apple_pay_domain = {
  deleted: boolean;
  id: string;
  object: 'apple_pay_domain';
};

export type Secret_service_resource_scope = {
  type: 'account' | 'user';
  user?: string;
};

export type Balance_amount_by_source_type = {
  bank_account?: number; // int
  card?: number; // int
  fpx?: number; // int
};

export type Balance_amount = {
  amount: number; // int
  currency: string;
  source_types?: Balance_amount_by_source_type;
};

export type Balance_net_available = {
  amount: number; // int
  destination: string;
  source_types?: Balance_amount_by_source_type;
};

export type Balance_amount_net = {
  amount: number; // int
  currency: string;
  net_available?: Balance_net_available[];
  source_types?: Balance_amount_by_source_type;
};

export type Balance_detail = {
  available: Balance_amount[];
};

export type Balance = {
  available: Balance_amount[];
  connect_reserved?: Balance_amount[];
  instant_available?: Balance_amount_net[];
  issuing?: Balance_detail;
  livemode: boolean;
  object: 'balance';
  pending: Balance_amount[];
};

export type Thresholds_resource_alert_filter = {
  customer?: (string | Customer) & Partial<Customer>;
};

export type Billing_meter_resource_customer_mapping_settings = {
  event_payload_key: string;
  type: 'by_id';
};

export type Billing_meter_resource_aggregation_settings = {
  formula: 'count' | 'sum';
};

export type Billing_meter_resource_billing_meter_status_transitions = {
  deactivated_at?: null | number; // int
};

export type Billing_meter_resource_billing_meter_value = {
  event_payload_key: string;
};

export type Thresholds_resource_usage_threshold_config = {
  gte: number; // int
  meter: (string | Billing_Meter) & Partial<Billing_Meter>;
  recurrence: 'one_time';
};

export type Billing_meter_resource_billing_meter_event_adjustment_cancel = {
  identifier?: string | null;
};

export type Portal_business_profile = {
  headline?: string | null;
  privacy_policy_url?: string | null;
  terms_of_service_url?: string | null;
};

export type Portal_customer_update = {
  allowed_updates: (
    | 'address'
    | 'email'
    | 'name'
    | 'phone'
    | 'shipping'
    | 'tax_id'
  )[];
  enabled: boolean;
};

export type Portal_invoice_list = {
  enabled: boolean;
};

export type Portal_payment_method_update = {
  enabled: boolean;
};

export type Portal_subscription_cancellation_reason = {
  enabled: boolean;
  options: (
    | 'customer_service'
    | 'low_quality'
    | 'missing_features'
    | 'other'
    | 'switched_service'
    | 'too_complex'
    | 'too_expensive'
    | 'unused'
  )[];
};

export type Portal_subscription_cancel = {
  cancellation_reason: Portal_subscription_cancellation_reason;
  enabled: boolean;
  mode: 'at_period_end' | 'immediately';
  proration_behavior: 'always_invoice' | 'create_prorations' | 'none';
};

export type Portal_subscription_update_product = {
  prices: string[];
  product: string;
};

export type Portal_subscription_update = {
  default_allowed_updates: ('price' | 'promotion_code' | 'quantity')[];
  enabled: boolean;
  products?: Portal_subscription_update_product[] | null;
  proration_behavior: 'always_invoice' | 'create_prorations' | 'none';
};

export type Portal_features = {
  customer_update: Portal_customer_update;
  invoice_history: Portal_invoice_list;
  payment_method_update: Portal_payment_method_update;
  subscription_cancel: Portal_subscription_cancel;
  subscription_update: Portal_subscription_update;
};

export type Portal_login_page = {
  enabled: boolean;
  url?: string | null;
};

export type Portal_flows_after_completion_hosted_confirmation = {
  custom_message?: string | null;
};

export type Portal_flows_after_completion_redirect = {
  return_url: string;
};

export type Portal_flows_flow_after_completion = {
  hosted_confirmation?: Portal_flows_after_completion_hosted_confirmation &
    Partial<Portal_flows_after_completion_hosted_confirmation>;
  redirect?: Portal_flows_after_completion_redirect &
    Partial<Portal_flows_after_completion_redirect>;
  type: 'hosted_confirmation' | 'portal_homepage' | 'redirect';
};

export type Portal_flows_coupon_offer = {
  coupon: string;
};

export type Portal_flows_retention = {
  coupon_offer?: Portal_flows_coupon_offer & Partial<Portal_flows_coupon_offer>;
  type: 'coupon_offer';
};

export type Portal_flows_flow_subscription_cancel = {
  retention?: Portal_flows_retention & Partial<Portal_flows_retention>;
  subscription: string;
};

export type Portal_flows_flow_subscription_update = {
  subscription: string;
};

export type Portal_flows_subscription_update_confirm_discount = {
  coupon?: string | null;
  promotion_code?: string | null;
};

export type Portal_flows_subscription_update_confirm_item = {
  id?: string | null;
  price?: string | null;
  quantity?: number; // int
};

export type Portal_flows_flow_subscription_update_confirm = {
  discounts?: Portal_flows_subscription_update_confirm_discount[] | null;
  items: Portal_flows_subscription_update_confirm_item[];
  subscription: string;
};

export type Portal_flows_flow = {
  after_completion: Portal_flows_flow_after_completion;
  subscription_cancel?: Portal_flows_flow_subscription_cancel &
    Partial<Portal_flows_flow_subscription_cancel>;
  subscription_update?: Portal_flows_flow_subscription_update &
    Partial<Portal_flows_flow_subscription_update>;
  subscription_update_confirm?: Portal_flows_flow_subscription_update_confirm &
    Partial<Portal_flows_flow_subscription_update_confirm>;
  type:
    | 'payment_method_update'
    | 'subscription_cancel'
    | 'subscription_update'
    | 'subscription_update_confirm';
};

export type Payment_pages_checkout_session_after_expiration_recovery = {
  allow_promotion_codes: boolean;
  enabled: boolean;
  expires_at?: null | number; // int
  url?: string | null;
};

export type Payment_pages_checkout_session_after_expiration = {
  recovery?: Payment_pages_checkout_session_after_expiration_recovery &
    Partial<Payment_pages_checkout_session_after_expiration_recovery>;
};

export type Payment_pages_checkout_session_automatic_tax = {
  enabled: boolean;
  liability?: Connect_account_reference & Partial<Connect_account_reference>;
  status?: 'complete' | 'failed' | 'requires_location_inputs' | null;
};

export type Payment_pages_checkout_session_consent = {
  promotions?: 'opt_in' | 'opt_out' | null;
  terms_of_service?: 'accepted' | null;
};

export type Payment_pages_checkout_session_payment_method_reuse_agreement = {
  position: 'auto' | 'hidden';
};

export type Payment_pages_checkout_session_consent_collection = {
  payment_method_reuse_agreement?: Payment_pages_checkout_session_payment_method_reuse_agreement &
    Partial<Payment_pages_checkout_session_payment_method_reuse_agreement>;
  promotions?: 'auto' | 'none' | null;
  terms_of_service?: 'none' | 'required' | null;
};

export type Payment_pages_checkout_session_currency_conversion = {
  amount_subtotal: number; // int
  amount_total: number; // int
  fx_rate: string; // decimal
  source_currency: string;
};

export type Payment_pages_checkout_session_custom_fields_option = {
  label: string;
  value: string;
};

export type Payment_pages_checkout_session_custom_fields_dropdown = {
  default_value?: string | null;
  options: Payment_pages_checkout_session_custom_fields_option[];
  value?: string | null;
};

export type Payment_pages_checkout_session_custom_fields_label = {
  custom?: string | null;
  type: 'custom';
};

export type Payment_pages_checkout_session_custom_fields_numeric = {
  default_value?: string | null;
  maximum_length?: null | number; // int
  minimum_length?: null | number; // int
  value?: string | null;
};

export type Payment_pages_checkout_session_custom_fields_text = {
  default_value?: string | null;
  maximum_length?: null | number; // int
  minimum_length?: null | number; // int
  value?: string | null;
};

export type Payment_pages_checkout_session_custom_fields = {
  dropdown?: Payment_pages_checkout_session_custom_fields_dropdown;
  key: string;
  label: Payment_pages_checkout_session_custom_fields_label;
  numeric?: Payment_pages_checkout_session_custom_fields_numeric;
  optional: boolean;
  text?: Payment_pages_checkout_session_custom_fields_text;
  type: 'dropdown' | 'numeric' | 'text';
};

export type Payment_pages_checkout_session_custom_text_position = {
  message: string;
};

export type Payment_pages_checkout_session_custom_text = {
  after_submit?: Payment_pages_checkout_session_custom_text_position &
    Partial<Payment_pages_checkout_session_custom_text_position>;
  shipping_address?: Payment_pages_checkout_session_custom_text_position &
    Partial<Payment_pages_checkout_session_custom_text_position>;
  submit?: Payment_pages_checkout_session_custom_text_position &
    Partial<Payment_pages_checkout_session_custom_text_position>;
  terms_of_service_acceptance?: Payment_pages_checkout_session_custom_text_position &
    Partial<Payment_pages_checkout_session_custom_text_position>;
};

export type Payment_pages_checkout_session_tax_id = {
  type:
    | 'ad_nrt'
    | 'ae_trn'
    | 'ar_cuit'
    | 'au_abn'
    | 'au_arn'
    | 'bg_uic'
    | 'bh_vat'
    | 'bo_tin'
    | 'br_cnpj'
    | 'br_cpf'
    | 'ca_bn'
    | 'ca_gst_hst'
    | 'ca_pst_bc'
    | 'ca_pst_mb'
    | 'ca_pst_sk'
    | 'ca_qst'
    | 'ch_uid'
    | 'ch_vat'
    | 'cl_tin'
    | 'cn_tin'
    | 'co_nit'
    | 'cr_tin'
    | 'de_stn'
    | 'do_rcn'
    | 'ec_ruc'
    | 'eg_tin'
    | 'es_cif'
    | 'eu_oss_vat'
    | 'eu_vat'
    | 'gb_vat'
    | 'ge_vat'
    | 'hk_br'
    | 'hr_oib'
    | 'hu_tin'
    | 'id_npwp'
    | 'il_vat'
    | 'in_gst'
    | 'is_vat'
    | 'jp_cn'
    | 'jp_rn'
    | 'jp_trn'
    | 'ke_pin'
    | 'kr_brn'
    | 'kz_bin'
    | 'li_uid'
    | 'mx_rfc'
    | 'my_frp'
    | 'my_itn'
    | 'my_sst'
    | 'ng_tin'
    | 'no_vat'
    | 'no_voec'
    | 'nz_gst'
    | 'om_vat'
    | 'pe_ruc'
    | 'ph_tin'
    | 'ro_tin'
    | 'rs_pib'
    | 'ru_inn'
    | 'ru_kpp'
    | 'sa_vat'
    | 'sg_gst'
    | 'sg_uen'
    | 'si_tin'
    | 'sv_nit'
    | 'th_vat'
    | 'tr_tin'
    | 'tw_vat'
    | 'ua_vat'
    | 'unknown'
    | 'us_ein'
    | 'uy_ruc'
    | 've_rif'
    | 'vn_tin'
    | 'za_vat';
  value?: string | null;
};

export type Payment_pages_checkout_session_customer_details = {
  address?: Address & Partial<Address>;
  email?: string | null;
  name?: string | null;
  phone?: string | null;
  tax_exempt?: 'exempt' | 'none' | 'reverse' | null;
  tax_ids?: Payment_pages_checkout_session_tax_id[] | null;
};

export type Invoice_setting_rendering_options = {
  amount_tax_display?: string | null;
};

export type Payment_pages_checkout_session_invoice_settings = {
  account_tax_ids?:
    | ((string | Tax_id | Deleted_tax_id) &
        (Partial<Tax_id> & Partial<Deleted_tax_id>))[]
    | null;
  custom_fields?: Invoice_setting_custom_field[] | null;
  description?: string | null;
  footer?: string | null;
  issuer?: Connect_account_reference & Partial<Connect_account_reference>;
  metadata?: {
    [key: string]: string;
  } | null;
  rendering_options?: Invoice_setting_rendering_options &
    Partial<Invoice_setting_rendering_options>;
};

export type Payment_pages_checkout_session_invoice_creation = {
  enabled: boolean;
  invoice_data: Payment_pages_checkout_session_invoice_settings;
};

export type Payment_links_resource_completion_behavior_confirmation_page = {
  custom_message?: string | null;
};

export type Payment_links_resource_completion_behavior_redirect = {
  url: string;
};

export type Payment_links_resource_after_completion = {
  hosted_confirmation?: Payment_links_resource_completion_behavior_confirmation_page;
  redirect?: Payment_links_resource_completion_behavior_redirect;
  type: 'hosted_confirmation' | 'redirect';
};

export type Payment_links_resource_automatic_tax = {
  enabled: boolean;
  liability?: Connect_account_reference & Partial<Connect_account_reference>;
};

export type Payment_links_resource_payment_method_reuse_agreement = {
  position: 'auto' | 'hidden';
};

export type Payment_links_resource_consent_collection = {
  payment_method_reuse_agreement?: Payment_links_resource_payment_method_reuse_agreement &
    Partial<Payment_links_resource_payment_method_reuse_agreement>;
  promotions?: 'auto' | 'none' | null;
  terms_of_service?: 'none' | 'required' | null;
};

export type Payment_links_resource_custom_fields_dropdown_option = {
  label: string;
  value: string;
};

export type Payment_links_resource_custom_fields_dropdown = {
  options: Payment_links_resource_custom_fields_dropdown_option[];
};

export type Payment_links_resource_custom_fields_label = {
  custom?: string | null;
  type: 'custom';
};

export type Payment_links_resource_custom_fields_numeric = {
  maximum_length?: null | number; // int
  minimum_length?: null | number; // int
};

export type Payment_links_resource_custom_fields_text = {
  maximum_length?: null | number; // int
  minimum_length?: null | number; // int
};

export type Payment_links_resource_custom_fields = {
  dropdown?: Payment_links_resource_custom_fields_dropdown;
  key: string;
  label: Payment_links_resource_custom_fields_label;
  numeric?: Payment_links_resource_custom_fields_numeric;
  optional: boolean;
  text?: Payment_links_resource_custom_fields_text;
  type: 'dropdown' | 'numeric' | 'text';
};

export type Payment_links_resource_custom_text_position = {
  message: string;
};

export type Payment_links_resource_custom_text = {
  after_submit?: Payment_links_resource_custom_text_position &
    Partial<Payment_links_resource_custom_text_position>;
  shipping_address?: Payment_links_resource_custom_text_position &
    Partial<Payment_links_resource_custom_text_position>;
  submit?: Payment_links_resource_custom_text_position &
    Partial<Payment_links_resource_custom_text_position>;
  terms_of_service_acceptance?: Payment_links_resource_custom_text_position &
    Partial<Payment_links_resource_custom_text_position>;
};

export type Payment_links_resource_invoice_settings = {
  account_tax_ids?:
    | ((string | Tax_id | Deleted_tax_id) &
        (Partial<Tax_id> & Partial<Deleted_tax_id>))[]
    | null;
  custom_fields?: Invoice_setting_custom_field[] | null;
  description?: string | null;
  footer?: string | null;
  issuer?: Connect_account_reference & Partial<Connect_account_reference>;
  metadata?: {
    [key: string]: string;
  } | null;
  rendering_options?: Invoice_setting_rendering_options &
    Partial<Invoice_setting_rendering_options>;
};

export type Payment_links_resource_invoice_creation = {
  enabled: boolean;
  invoice_data?: Payment_links_resource_invoice_settings &
    Partial<Payment_links_resource_invoice_settings>;
};

export type Payment_links_resource_payment_intent_data = {
  capture_method?: 'automatic' | 'automatic_async' | 'manual' | null;
  description?: string | null;
  metadata: {
    [key: string]: string;
  };
  setup_future_usage?: 'off_session' | 'on_session' | null;
  statement_descriptor?: string | null;
  statement_descriptor_suffix?: string | null;
  transfer_group?: string | null;
};

export type Payment_links_resource_phone_number_collection = {
  enabled: boolean;
};

export type Payment_links_resource_completed_sessions = {
  count: number; // int
  limit: number; // int
};

export type Payment_links_resource_restrictions = {
  completed_sessions: Payment_links_resource_completed_sessions;
};

export type Payment_links_resource_shipping_address_collection = {
  allowed_countries: (
    | 'AC'
    | 'AD'
    | 'AE'
    | 'AF'
    | 'AG'
    | 'AI'
    | 'AL'
    | 'AM'
    | 'AO'
    | 'AQ'
    | 'AR'
    | 'AT'
    | 'AU'
    | 'AW'
    | 'AX'
    | 'AZ'
    | 'BA'
    | 'BB'
    | 'BD'
    | 'BE'
    | 'BF'
    | 'BG'
    | 'BH'
    | 'BI'
    | 'BJ'
    | 'BL'
    | 'BM'
    | 'BN'
    | 'BO'
    | 'BQ'
    | 'BR'
    | 'BS'
    | 'BT'
    | 'BV'
    | 'BW'
    | 'BY'
    | 'BZ'
    | 'CA'
    | 'CD'
    | 'CF'
    | 'CG'
    | 'CH'
    | 'CI'
    | 'CK'
    | 'CL'
    | 'CM'
    | 'CN'
    | 'CO'
    | 'CR'
    | 'CV'
    | 'CW'
    | 'CY'
    | 'CZ'
    | 'DE'
    | 'DJ'
    | 'DK'
    | 'DM'
    | 'DO'
    | 'DZ'
    | 'EC'
    | 'EE'
    | 'EG'
    | 'EH'
    | 'ER'
    | 'ES'
    | 'ET'
    | 'FI'
    | 'FJ'
    | 'FK'
    | 'FO'
    | 'FR'
    | 'GA'
    | 'GB'
    | 'GD'
    | 'GE'
    | 'GF'
    | 'GG'
    | 'GH'
    | 'GI'
    | 'GL'
    | 'GM'
    | 'GN'
    | 'GP'
    | 'GQ'
    | 'GR'
    | 'GS'
    | 'GT'
    | 'GU'
    | 'GW'
    | 'GY'
    | 'HK'
    | 'HN'
    | 'HR'
    | 'HT'
    | 'HU'
    | 'ID'
    | 'IE'
    | 'IL'
    | 'IM'
    | 'IN'
    | 'IO'
    | 'IQ'
    | 'IS'
    | 'IT'
    | 'JE'
    | 'JM'
    | 'JO'
    | 'JP'
    | 'KE'
    | 'KG'
    | 'KH'
    | 'KI'
    | 'KM'
    | 'KN'
    | 'KR'
    | 'KW'
    | 'KY'
    | 'KZ'
    | 'LA'
    | 'LB'
    | 'LC'
    | 'LI'
    | 'LK'
    | 'LR'
    | 'LS'
    | 'LT'
    | 'LU'
    | 'LV'
    | 'LY'
    | 'MA'
    | 'MC'
    | 'MD'
    | 'ME'
    | 'MF'
    | 'MG'
    | 'MK'
    | 'ML'
    | 'MM'
    | 'MN'
    | 'MO'
    | 'MQ'
    | 'MR'
    | 'MS'
    | 'MT'
    | 'MU'
    | 'MV'
    | 'MW'
    | 'MX'
    | 'MY'
    | 'MZ'
    | 'NA'
    | 'NC'
    | 'NE'
    | 'NG'
    | 'NI'
    | 'NL'
    | 'NO'
    | 'NP'
    | 'NR'
    | 'NU'
    | 'NZ'
    | 'OM'
    | 'PA'
    | 'PE'
    | 'PF'
    | 'PG'
    | 'PH'
    | 'PK'
    | 'PL'
    | 'PM'
    | 'PN'
    | 'PR'
    | 'PS'
    | 'PT'
    | 'PY'
    | 'QA'
    | 'RE'
    | 'RO'
    | 'RS'
    | 'RU'
    | 'RW'
    | 'SA'
    | 'SB'
    | 'SC'
    | 'SE'
    | 'SG'
    | 'SH'
    | 'SI'
    | 'SJ'
    | 'SK'
    | 'SL'
    | 'SM'
    | 'SN'
    | 'SO'
    | 'SR'
    | 'SS'
    | 'ST'
    | 'SV'
    | 'SX'
    | 'SZ'
    | 'TA'
    | 'TC'
    | 'TD'
    | 'TF'
    | 'TG'
    | 'TH'
    | 'TJ'
    | 'TK'
    | 'TL'
    | 'TM'
    | 'TN'
    | 'TO'
    | 'TR'
    | 'TT'
    | 'TV'
    | 'TW'
    | 'TZ'
    | 'UA'
    | 'UG'
    | 'US'
    | 'UY'
    | 'UZ'
    | 'VA'
    | 'VC'
    | 'VE'
    | 'VG'
    | 'VN'
    | 'VU'
    | 'WF'
    | 'WS'
    | 'XK'
    | 'YE'
    | 'YT'
    | 'ZA'
    | 'ZM'
    | 'ZW'
    | 'ZZ'
  )[];
};

export type Payment_links_resource_shipping_option = {
  shipping_amount: number; // int
  shipping_rate: (string | Shipping_rate) & Partial<Shipping_rate>;
};

export type Payment_links_resource_subscription_data_invoice_settings = {
  issuer: Connect_account_reference;
};

export type Payment_links_resource_subscription_data = {
  description?: string | null;
  invoice_settings: Payment_links_resource_subscription_data_invoice_settings;
  metadata: {
    [key: string]: string;
  };
  trial_period_days?: null | number; // int
  trial_settings?: Subscriptions_trials_resource_trial_settings &
    Partial<Subscriptions_trials_resource_trial_settings>;
};

export type Payment_links_resource_tax_id_collection = {
  enabled: boolean;
  required: 'if_supported' | 'never';
};

export type Payment_links_resource_transfer_data = {
  amount?: null | number; // int
  destination: (string | Account) & Partial<Account>;
};

export type Payment_link = {
  active: boolean;
  after_completion: Payment_links_resource_after_completion;
  allow_promotion_codes: boolean;
  application?: (string | Application | Deleted_application) &
    (Partial<Application> & Partial<Deleted_application>);
  application_fee_amount?: null | number; // int
  application_fee_percent?: null | number;
  automatic_tax: Payment_links_resource_automatic_tax;
  billing_address_collection: 'auto' | 'required';
  consent_collection?: Payment_links_resource_consent_collection &
    Partial<Payment_links_resource_consent_collection>;
  currency: string;
  custom_fields: Payment_links_resource_custom_fields[];
  custom_text: Payment_links_resource_custom_text;
  customer_creation: 'always' | 'if_required';
  id: string;
  inactive_message?: string | null;
  invoice_creation?: Payment_links_resource_invoice_creation &
    Partial<Payment_links_resource_invoice_creation>;
  line_items?: {
    data: Item[];
    has_more: boolean;
    object: 'list';
    url: string;
  };
  livemode: boolean;
  metadata: {
    [key: string]: string;
  };
  object: 'payment_link';
  on_behalf_of?: (string | Account) & Partial<Account>;
  payment_intent_data?: Payment_links_resource_payment_intent_data &
    Partial<Payment_links_resource_payment_intent_data>;
  payment_method_collection: 'always' | 'if_required';
  payment_method_types?:
    | (
        | 'affirm'
        | 'afterpay_clearpay'
        | 'alipay'
        | 'au_becs_debit'
        | 'bacs_debit'
        | 'bancontact'
        | 'blik'
        | 'boleto'
        | 'card'
        | 'cashapp'
        | 'eps'
        | 'fpx'
        | 'giropay'
        | 'grabpay'
        | 'ideal'
        | 'klarna'
        | 'konbini'
        | 'link'
        | 'mobilepay'
        | 'multibanco'
        | 'oxxo'
        | 'p24'
        | 'paynow'
        | 'paypal'
        | 'pix'
        | 'promptpay'
        | 'sepa_debit'
        | 'sofort'
        | 'swish'
        | 'twint'
        | 'us_bank_account'
        | 'wechat_pay'
        | 'zip'
      )[]
    | null;
  phone_number_collection: Payment_links_resource_phone_number_collection;
  restrictions?: Payment_links_resource_restrictions &
    Partial<Payment_links_resource_restrictions>;
  shipping_address_collection?: Payment_links_resource_shipping_address_collection &
    Partial<Payment_links_resource_shipping_address_collection>;
  shipping_options: Payment_links_resource_shipping_option[];
  submit_type: 'auto' | 'book' | 'donate' | 'pay';
  subscription_data?: Payment_links_resource_subscription_data &
    Partial<Payment_links_resource_subscription_data>;
  tax_id_collection: Payment_links_resource_tax_id_collection;
  transfer_data?: Payment_links_resource_transfer_data &
    Partial<Payment_links_resource_transfer_data>;
  url: string;
};

export type Checkout_acss_debit_mandate_options = {
  custom_mandate_url?: string;
  default_for?: ('invoice' | 'subscription')[];
  interval_description?: string | null;
  payment_schedule?: 'combined' | 'interval' | 'sporadic' | null;
  transaction_type?: 'business' | 'personal' | null;
};

export type Checkout_acss_debit_payment_method_options = {
  currency?: 'cad' | 'usd';
  mandate_options?: Checkout_acss_debit_mandate_options;
  setup_future_usage?: 'none' | 'off_session' | 'on_session';
  verification_method?: 'automatic' | 'instant' | 'microdeposits';
};

export type Checkout_affirm_payment_method_options = {
  setup_future_usage?: 'none';
};

export type Checkout_afterpay_clearpay_payment_method_options = {
  setup_future_usage?: 'none';
};

export type Checkout_alipay_payment_method_options = {
  setup_future_usage?: 'none';
};

export type Checkout_amazon_pay_payment_method_options = {
  setup_future_usage?: 'none' | 'off_session';
};

export type Checkout_au_becs_debit_payment_method_options = {
  setup_future_usage?: 'none';
};

export type Checkout_bacs_debit_payment_method_options = {
  setup_future_usage?: 'none' | 'off_session' | 'on_session';
};

export type Checkout_bancontact_payment_method_options = {
  setup_future_usage?: 'none';
};

export type Checkout_boleto_payment_method_options = {
  expires_after_days: number; // int
  setup_future_usage?: 'none' | 'off_session' | 'on_session';
};

export type Checkout_card_installments_options = {
  enabled?: boolean;
};

export type Checkout_card_payment_method_options = {
  installments?: Checkout_card_installments_options;
  request_three_d_secure: 'any' | 'automatic' | 'challenge';
  setup_future_usage?: 'none' | 'off_session' | 'on_session';
  statement_descriptor_suffix_kana?: string;
  statement_descriptor_suffix_kanji?: string;
};

export type Checkout_cashapp_payment_method_options = {
  setup_future_usage?: 'none';
};

export type Checkout_customer_balance_bank_transfer_payment_method_options = {
  eu_bank_transfer?: Payment_method_options_customer_balance_eu_bank_account;
  requested_address_types?: (
    | 'aba'
    | 'iban'
    | 'sepa'
    | 'sort_code'
    | 'spei'
    | 'swift'
    | 'zengin'
  )[];
  type?:
    | 'eu_bank_transfer'
    | 'gb_bank_transfer'
    | 'jp_bank_transfer'
    | 'mx_bank_transfer'
    | 'us_bank_transfer'
    | null;
};

export type Checkout_customer_balance_payment_method_options = {
  bank_transfer?: Checkout_customer_balance_bank_transfer_payment_method_options;
  funding_type?: 'bank_transfer' | null;
  setup_future_usage?: 'none';
};

export type Checkout_eps_payment_method_options = {
  setup_future_usage?: 'none';
};

export type Checkout_fpx_payment_method_options = {
  setup_future_usage?: 'none';
};

export type Checkout_giropay_payment_method_options = {
  setup_future_usage?: 'none';
};

export type Checkout_grab_pay_payment_method_options = {
  setup_future_usage?: 'none';
};

export type Checkout_ideal_payment_method_options = {
  setup_future_usage?: 'none';
};

export type Checkout_klarna_payment_method_options = {
  setup_future_usage?: 'none' | 'off_session' | 'on_session';
};

export type Checkout_konbini_payment_method_options = {
  expires_after_days?: null | number; // int
  setup_future_usage?: 'none';
};

export type Checkout_link_payment_method_options = {
  setup_future_usage?: 'none' | 'off_session';
};

export type Checkout_mobilepay_payment_method_options = {
  setup_future_usage?: 'none';
};

export type Checkout_multibanco_payment_method_options = {
  setup_future_usage?: 'none';
};

export type Checkout_oxxo_payment_method_options = {
  expires_after_days: number; // int
  setup_future_usage?: 'none';
};

export type Checkout_p24_payment_method_options = {
  setup_future_usage?: 'none';
};

export type Checkout_paynow_payment_method_options = {
  setup_future_usage?: 'none';
};

export type Checkout_paypal_payment_method_options = {
  capture_method?: 'manual';
  preferred_locale?: string | null;
  reference?: string | null;
  setup_future_usage?: 'none' | 'off_session';
};

export type Checkout_pix_payment_method_options = {
  expires_after_seconds?: null | number; // int
};

export type Checkout_revolut_pay_payment_method_options = {
  setup_future_usage?: 'none' | 'off_session';
};

export type Checkout_sepa_debit_payment_method_options = {
  setup_future_usage?: 'none' | 'off_session' | 'on_session';
};

export type Checkout_sofort_payment_method_options = {
  setup_future_usage?: 'none';
};

export type Checkout_swish_payment_method_options = {
  reference?: string | null;
};

export type Checkout_us_bank_account_payment_method_options = {
  financial_connections?: Linked_account_options_us_bank_account;
  setup_future_usage?: 'none' | 'off_session' | 'on_session';
  verification_method?: 'automatic' | 'instant';
};

export type Checkout_session_payment_method_options = {
  acss_debit?: Checkout_acss_debit_payment_method_options;
  affirm?: Checkout_affirm_payment_method_options;
  afterpay_clearpay?: Checkout_afterpay_clearpay_payment_method_options;
  alipay?: Checkout_alipay_payment_method_options;
  amazon_pay?: Checkout_amazon_pay_payment_method_options;
  au_becs_debit?: Checkout_au_becs_debit_payment_method_options;
  bacs_debit?: Checkout_bacs_debit_payment_method_options;
  bancontact?: Checkout_bancontact_payment_method_options;
  boleto?: Checkout_boleto_payment_method_options;
  card?: Checkout_card_payment_method_options;
  cashapp?: Checkout_cashapp_payment_method_options;
  customer_balance?: Checkout_customer_balance_payment_method_options;
  eps?: Checkout_eps_payment_method_options;
  fpx?: Checkout_fpx_payment_method_options;
  giropay?: Checkout_giropay_payment_method_options;
  grabpay?: Checkout_grab_pay_payment_method_options;
  ideal?: Checkout_ideal_payment_method_options;
  klarna?: Checkout_klarna_payment_method_options;
  konbini?: Checkout_konbini_payment_method_options;
  link?: Checkout_link_payment_method_options;
  mobilepay?: Checkout_mobilepay_payment_method_options;
  multibanco?: Checkout_multibanco_payment_method_options;
  oxxo?: Checkout_oxxo_payment_method_options;
  p24?: Checkout_p24_payment_method_options;
  paynow?: Checkout_paynow_payment_method_options;
  paypal?: Checkout_paypal_payment_method_options;
  pix?: Checkout_pix_payment_method_options;
  revolut_pay?: Checkout_revolut_pay_payment_method_options;
  sepa_debit?: Checkout_sepa_debit_payment_method_options;
  sofort?: Checkout_sofort_payment_method_options;
  swish?: Checkout_swish_payment_method_options;
  us_bank_account?: Checkout_us_bank_account_payment_method_options;
};

export type Payment_pages_checkout_session_phone_number_collection = {
  enabled: boolean;
};

export type Payment_pages_checkout_session_saved_payment_method_options = {
  allow_redisplay_filters?: ('always' | 'limited' | 'unspecified')[] | null;
  payment_method_remove?: 'disabled' | 'enabled' | null;
  payment_method_save?: 'disabled' | 'enabled' | null;
};

export type Payment_pages_checkout_session_shipping_address_collection = {
  allowed_countries: (
    | 'AC'
    | 'AD'
    | 'AE'
    | 'AF'
    | 'AG'
    | 'AI'
    | 'AL'
    | 'AM'
    | 'AO'
    | 'AQ'
    | 'AR'
    | 'AT'
    | 'AU'
    | 'AW'
    | 'AX'
    | 'AZ'
    | 'BA'
    | 'BB'
    | 'BD'
    | 'BE'
    | 'BF'
    | 'BG'
    | 'BH'
    | 'BI'
    | 'BJ'
    | 'BL'
    | 'BM'
    | 'BN'
    | 'BO'
    | 'BQ'
    | 'BR'
    | 'BS'
    | 'BT'
    | 'BV'
    | 'BW'
    | 'BY'
    | 'BZ'
    | 'CA'
    | 'CD'
    | 'CF'
    | 'CG'
    | 'CH'
    | 'CI'
    | 'CK'
    | 'CL'
    | 'CM'
    | 'CN'
    | 'CO'
    | 'CR'
    | 'CV'
    | 'CW'
    | 'CY'
    | 'CZ'
    | 'DE'
    | 'DJ'
    | 'DK'
    | 'DM'
    | 'DO'
    | 'DZ'
    | 'EC'
    | 'EE'
    | 'EG'
    | 'EH'
    | 'ER'
    | 'ES'
    | 'ET'
    | 'FI'
    | 'FJ'
    | 'FK'
    | 'FO'
    | 'FR'
    | 'GA'
    | 'GB'
    | 'GD'
    | 'GE'
    | 'GF'
    | 'GG'
    | 'GH'
    | 'GI'
    | 'GL'
    | 'GM'
    | 'GN'
    | 'GP'
    | 'GQ'
    | 'GR'
    | 'GS'
    | 'GT'
    | 'GU'
    | 'GW'
    | 'GY'
    | 'HK'
    | 'HN'
    | 'HR'
    | 'HT'
    | 'HU'
    | 'ID'
    | 'IE'
    | 'IL'
    | 'IM'
    | 'IN'
    | 'IO'
    | 'IQ'
    | 'IS'
    | 'IT'
    | 'JE'
    | 'JM'
    | 'JO'
    | 'JP'
    | 'KE'
    | 'KG'
    | 'KH'
    | 'KI'
    | 'KM'
    | 'KN'
    | 'KR'
    | 'KW'
    | 'KY'
    | 'KZ'
    | 'LA'
    | 'LB'
    | 'LC'
    | 'LI'
    | 'LK'
    | 'LR'
    | 'LS'
    | 'LT'
    | 'LU'
    | 'LV'
    | 'LY'
    | 'MA'
    | 'MC'
    | 'MD'
    | 'ME'
    | 'MF'
    | 'MG'
    | 'MK'
    | 'ML'
    | 'MM'
    | 'MN'
    | 'MO'
    | 'MQ'
    | 'MR'
    | 'MS'
    | 'MT'
    | 'MU'
    | 'MV'
    | 'MW'
    | 'MX'
    | 'MY'
    | 'MZ'
    | 'NA'
    | 'NC'
    | 'NE'
    | 'NG'
    | 'NI'
    | 'NL'
    | 'NO'
    | 'NP'
    | 'NR'
    | 'NU'
    | 'NZ'
    | 'OM'
    | 'PA'
    | 'PE'
    | 'PF'
    | 'PG'
    | 'PH'
    | 'PK'
    | 'PL'
    | 'PM'
    | 'PN'
    | 'PR'
    | 'PS'
    | 'PT'
    | 'PY'
    | 'QA'
    | 'RE'
    | 'RO'
    | 'RS'
    | 'RU'
    | 'RW'
    | 'SA'
    | 'SB'
    | 'SC'
    | 'SE'
    | 'SG'
    | 'SH'
    | 'SI'
    | 'SJ'
    | 'SK'
    | 'SL'
    | 'SM'
    | 'SN'
    | 'SO'
    | 'SR'
    | 'SS'
    | 'ST'
    | 'SV'
    | 'SX'
    | 'SZ'
    | 'TA'
    | 'TC'
    | 'TD'
    | 'TF'
    | 'TG'
    | 'TH'
    | 'TJ'
    | 'TK'
    | 'TL'
    | 'TM'
    | 'TN'
    | 'TO'
    | 'TR'
    | 'TT'
    | 'TV'
    | 'TW'
    | 'TZ'
    | 'UA'
    | 'UG'
    | 'US'
    | 'UY'
    | 'UZ'
    | 'VA'
    | 'VC'
    | 'VE'
    | 'VG'
    | 'VN'
    | 'VU'
    | 'WF'
    | 'WS'
    | 'XK'
    | 'YE'
    | 'YT'
    | 'ZA'
    | 'ZM'
    | 'ZW'
    | 'ZZ'
  )[];
};

export type Payment_pages_checkout_session_shipping_cost = {
  amount_subtotal: number; // int
  amount_tax: number; // int
  amount_total: number; // int
  shipping_rate?: (string | Shipping_rate) & Partial<Shipping_rate>;
  taxes?: Line_items_tax_amount[];
};

export type Payment_pages_checkout_session_shipping_option = {
  shipping_amount: number; // int
  shipping_rate: (string | Shipping_rate) & Partial<Shipping_rate>;
};

export type Payment_pages_checkout_session_tax_id_collection = {
  enabled: boolean;
  required: 'if_supported' | 'never';
};

export type Payment_pages_checkout_session_total_details_resource_breakdown = {
  discounts: Line_items_discount_amount[];
  taxes: Line_items_tax_amount[];
};

export type Payment_pages_checkout_session_total_details = {
  amount_discount: number; // int
  amount_shipping?: null | number; // int
  amount_tax: number; // int
  breakdown?: Payment_pages_checkout_session_total_details_resource_breakdown;
};

export type Climate_removals_beneficiary = {
  public_name: string;
};

export type Climate_removals_location = {
  city?: string | null;
  country: string;
  latitude?: null | number;
  longitude?: null | number;
  region?: string | null;
};

export type Climate_removals_order_deliveries = {
  delivered_at: number; // int
  location?: Climate_removals_location & Partial<Climate_removals_location>;
  metric_tons: string;
  registry_url?: string | null;
  supplier: Climate_Supplier;
};

export type Climate_removals_products_price = {
  amount_fees: number; // int
  amount_subtotal: number; // int
  amount_total: number; // int
};

export type Confirmation_tokens_resource_mandate_data_resource_customer_acceptance_resource_online =
  {
    ip_address?: string | null;
    user_agent?: string | null;
  };

export type Confirmation_tokens_resource_mandate_data_resource_customer_acceptance =
  {
    online?: Confirmation_tokens_resource_mandate_data_resource_customer_acceptance_resource_online &
      Partial<Confirmation_tokens_resource_mandate_data_resource_customer_acceptance_resource_online>;
    type: string;
  };

export type Confirmation_tokens_resource_mandate_data = {
  customer_acceptance: Confirmation_tokens_resource_mandate_data_resource_customer_acceptance;
};

export type Confirmation_tokens_resource_payment_method_options_resource_card =
  {
    cvc_token?: string | null;
  };

export type Confirmation_tokens_resource_payment_method_options = {
  card?: Confirmation_tokens_resource_payment_method_options_resource_card &
    Partial<Confirmation_tokens_resource_payment_method_options_resource_card>;
};

export type Confirmation_tokens_resource_payment_method_preview = {
  acss_debit?: Payment_method_acss_debit;
  affirm?: Payment_method_affirm;
  afterpay_clearpay?: Payment_method_afterpay_clearpay;
  alipay?: Payment_flows_private_payment_methods_alipay;
  allow_redisplay?: 'always' | 'limited' | 'unspecified';
  amazon_pay?: Payment_method_amazon_pay;
  au_becs_debit?: Payment_method_au_becs_debit;
  bacs_debit?: Payment_method_bacs_debit;
  bancontact?: Payment_method_bancontact;
  billing_details: Billing_details;
  blik?: Payment_method_blik;
  boleto?: Payment_method_boleto;
  card?: Payment_method_card;
  card_present?: Payment_method_card_present;
  cashapp?: Payment_method_cashapp;
  customer?: (string | Customer) & Partial<Customer>;
  customer_balance?: Payment_method_customer_balance;
  eps?: Payment_method_eps;
  fpx?: Payment_method_fpx;
  giropay?: Payment_method_giropay;
  grabpay?: Payment_method_grabpay;
  ideal?: Payment_method_ideal;
  interac_present?: Payment_method_interac_present;
  klarna?: Payment_method_klarna;
  konbini?: Payment_method_konbini;
  link?: Payment_method_link;
  mobilepay?: Payment_method_mobilepay;
  multibanco?: Payment_method_multibanco;
  oxxo?: Payment_method_oxxo;
  p24?: Payment_method_p24;
  paynow?: Payment_method_paynow;
  paypal?: Payment_method_paypal;
  pix?: Payment_method_pix;
  promptpay?: Payment_method_promptpay;
  revolut_pay?: Payment_method_revolut_pay;
  sepa_debit?: Payment_method_sepa_debit;
  sofort?: Payment_method_sofort;
  swish?: Payment_method_swish;
  twint?: Payment_method_twint;
  type:
    | 'acss_debit'
    | 'affirm'
    | 'afterpay_clearpay'
    | 'alipay'
    | 'amazon_pay'
    | 'au_becs_debit'
    | 'bacs_debit'
    | 'bancontact'
    | 'blik'
    | 'boleto'
    | 'card'
    | 'card_present'
    | 'cashapp'
    | 'customer_balance'
    | 'eps'
    | 'fpx'
    | 'giropay'
    | 'grabpay'
    | 'ideal'
    | 'interac_present'
    | 'klarna'
    | 'konbini'
    | 'link'
    | 'mobilepay'
    | 'multibanco'
    | 'oxxo'
    | 'p24'
    | 'paynow'
    | 'paypal'
    | 'pix'
    | 'promptpay'
    | 'revolut_pay'
    | 'sepa_debit'
    | 'sofort'
    | 'swish'
    | 'twint'
    | 'us_bank_account'
    | 'wechat_pay'
    | 'zip';
  us_bank_account?: Payment_method_us_bank_account;
  wechat_pay?: Payment_method_wechat_pay;
  zip?: Payment_method_zip;
};

export type Confirmation_tokens_resource_shipping = {
  address: Address;
  name: string;
  phone?: string | null;
};

export type Confirmation_token = {
  created: number; // int
  expires_at?: null | number; // int
  id: string;
  livemode: boolean;
  mandate_data?: Confirmation_tokens_resource_mandate_data &
    Partial<Confirmation_tokens_resource_mandate_data>;
  object: 'confirmation_token';
  payment_intent?: string | null;
  payment_method_options?: Confirmation_tokens_resource_payment_method_options &
    Partial<Confirmation_tokens_resource_payment_method_options>;
  payment_method_preview?: Confirmation_tokens_resource_payment_method_preview &
    Partial<Confirmation_tokens_resource_payment_method_preview>;
  return_url?: string | null;
  setup_future_usage?: 'off_session' | 'on_session' | null;
  setup_intent?: string | null;
  shipping?: Confirmation_tokens_resource_shipping &
    Partial<Confirmation_tokens_resource_shipping>;
  use_stripe_sdk: boolean;
};

export type Country_spec_verification_field_details = {
  additional: string[];
  minimum: string[];
};

export type Country_spec_verification_fields = {
  company: Country_spec_verification_field_details;
  individual: Country_spec_verification_field_details;
};

export type Country_spec = {
  default_currency: string;
  id: string;
  object: 'country_spec';
  supported_bank_account_currencies: {
    [key: string]: string[];
  };
  supported_payment_currencies: string[];
  supported_payment_methods: string[];
  supported_transfer_countries: string[];
  verification_fields: Country_spec_verification_fields;
};

export type Customer_balance_transaction = {
  amount: number; // int
  created: number; // int
  credit_note?: (string | Credit_note) & Partial<Credit_note>;
  currency: string;
  customer: (string | Customer) & Partial<Customer>;
  description?: string | null;
  ending_balance: number; // int
  id: string;
  invoice?: (string | Invoice) & Partial<Invoice>;
  livemode: boolean;
  metadata?: {
    [key: string]: string;
  } | null;
  object: 'customer_balance_transaction';
  type:
    | 'adjustment'
    | 'applied_to_invoice'
    | 'credit_note'
    | 'initial'
    | 'invoice_overpaid'
    | 'invoice_too_large'
    | 'invoice_too_small'
    | 'migration'
    | 'unapplied_from_invoice'
    | 'unspent_receiver_credit';
};

export type Credit_note_tax_amount = {
  amount: number; // int
  inclusive: boolean;
  tax_rate: (string | Tax_rate) & Partial<Tax_rate>;
  taxability_reason?:
    | 'customer_exempt'
    | 'not_collecting'
    | 'not_subject_to_tax'
    | 'not_supported'
    | 'portion_product_exempt'
    | 'portion_reduced_rated'
    | 'portion_standard_rated'
    | 'product_exempt'
    | 'product_exempt_holiday'
    | 'proportionally_rated'
    | 'reduced_rated'
    | 'reverse_charge'
    | 'standard_rated'
    | 'taxable_basis_reduced'
    | 'zero_rated'
    | null;
  taxable_amount?: null | number; // int
};

export type Credit_note_line_item = {
  amount: number; // int
  amount_excluding_tax?: null | number; // int
  description?: string | null;
  discount_amount: number; // int
  discount_amounts: Discounts_resource_discount_amount[];
  id: string;
  invoice_line_item?: string;
  livemode: boolean;
  object: 'credit_note_line_item';
  quantity?: null | number; // int
  tax_amounts: Credit_note_tax_amount[];
  tax_rates: Tax_rate[];
  type: 'custom_line_item' | 'invoice_line_item';
  unit_amount?: null | number; // int
  unit_amount_decimal?: string | null; // decimal
  unit_amount_excluding_tax?: string | null; // decimal
};

export type Credit_note = {
  amount: number; // int
  amount_shipping: number; // int
  created: number; // int
  currency: string;
  customer: (string | Customer | Deleted_customer) &
    (Partial<Customer> & Partial<Deleted_customer>);
  customer_balance_transaction?: (string | Customer_balance_transaction) &
    Partial<Customer_balance_transaction>;
  discount_amount: number; // int
  discount_amounts: Discounts_resource_discount_amount[];
  effective_at?: null | number; // int
  id: string;
  invoice: (string | Invoice) & Partial<Invoice>;
  lines: {
    data: Credit_note_line_item[];
    has_more: boolean;
    object: 'list';
    url: string;
  };
  livemode: boolean;
  memo?: string | null;
  metadata?: {
    [key: string]: string;
  } | null;
  number: string;
  object: 'credit_note';
  out_of_band_amount?: null | number; // int
  pdf: string;
  reason?:
    | 'duplicate'
    | 'fraudulent'
    | 'order_change'
    | 'product_unsatisfactory'
    | null;
  refund?: (string | Refund) & Partial<Refund>;
  shipping_cost?: Invoices_resource_shipping_cost &
    Partial<Invoices_resource_shipping_cost>;
  status: 'issued' | 'void';
  subtotal: number; // int
  subtotal_excluding_tax?: null | number; // int
  tax_amounts: Credit_note_tax_amount[];
  total: number; // int
  total_excluding_tax?: null | number; // int
  type: 'post_payment' | 'pre_payment';
  voided_at?: null | number; // int
};

export type Customer_session_resource_components_resource_buy_button = {
  enabled: boolean;
};

export type Customer_session_resource_components_resource_payment_element_resource_features =
  {
    payment_method_allow_redisplay_filters: (
      | 'always'
      | 'limited'
      | 'unspecified'
    )[];
    payment_method_redisplay: 'disabled' | 'enabled';
    payment_method_redisplay_limit?: null | number; // int
    payment_method_remove: 'disabled' | 'enabled';
    payment_method_save: 'disabled' | 'enabled';
    payment_method_save_usage?: 'off_session' | 'on_session' | null;
  };

export type Customer_session_resource_components_resource_payment_element = {
  enabled: boolean;
  features?: Customer_session_resource_components_resource_payment_element_resource_features &
    Partial<Customer_session_resource_components_resource_payment_element_resource_features>;
};

export type Customer_session_resource_components_resource_pricing_table = {
  enabled: boolean;
};

export type Customer_session_resource_components = {
  buy_button: Customer_session_resource_components_resource_buy_button;
  payment_element: Customer_session_resource_components_resource_payment_element;
  pricing_table: Customer_session_resource_components_resource_pricing_table;
};

export type Customer_session = {
  client_secret: string;
  components?: Customer_session_resource_components;
  created: number; // int
  customer: (string | Customer) & Partial<Customer>;
  expires_at: number; // int
  livemode: boolean;
  object: 'customer_session';
};

export type Payment_source = (Account | Bank_account | Card | Source) &
  (Partial<Account> & Partial<Bank_account> & Partial<Card> & Partial<Source>);

export type Deleted_payment_source = (Deleted_bank_account | Deleted_card) &
  (Partial<Deleted_bank_account> & Partial<Deleted_card>);

export type Funding_instructions_bank_transfer = {
  country: string;
  financial_addresses: Funding_instructions_bank_transfer_financial_address[];
  type: 'eu_bank_transfer' | 'jp_bank_transfer';
};

export type Funding_instructions = {
  bank_transfer: Funding_instructions_bank_transfer;
  currency: string;
  funding_type: 'bank_transfer';
  livemode: boolean;
  object: 'funding_instructions';
};

export type Ephemeral_key = {
  created: number; // int
  expires: number; // int
  id: string;
  livemode: boolean;
  object: 'ephemeral_key';
  secret?: string;
};

export type Notification_event_data = {
  object: {};
  previous_attributes?: {};
};

export type Notification_event_request = {
  id?: string | null;
  idempotency_key?: string | null;
};

export type Event = {
  account?: string;
  api_version?: string | null;
  created: number; // int
  data: Notification_event_data;
  id: string;
  livemode: boolean;
  object: 'event';
  pending_webhooks: number; // int
  request?: Notification_event_request & Partial<Notification_event_request>;
  type: string;
};

export type Exchange_rate = {
  id: string;
  object: 'exchange_rate';
  rates: {
    [key: string]: number;
  };
};

export type Bank_connections_resource_accountholder = {
  account?: (string | Account) & Partial<Account>;
  customer?: (string | Customer) & Partial<Customer>;
  type: 'account' | 'customer';
};

export type Bank_connections_resource_balance_api_resource_cash_balance = {
  available?: {
    [key: string]: number; // int
  } | null;
};

export type Bank_connections_resource_balance_api_resource_credit_balance = {
  used?: {
    [key: string]: number; // int
  } | null;
};

export type Bank_connections_resource_balance = {
  as_of: number; // int
  cash?: Bank_connections_resource_balance_api_resource_cash_balance;
  credit?: Bank_connections_resource_balance_api_resource_credit_balance;
  current: {
    [key: string]: number; // int
  };
  type: 'cash' | 'credit';
};

export type Bank_connections_resource_balance_refresh = {
  last_attempted_at: number; // int
  next_refresh_available_at?: null | number; // int
  status: 'failed' | 'pending' | 'succeeded';
};

export type Bank_connections_resource_ownership_refresh = {
  last_attempted_at: number; // int
  next_refresh_available_at?: null | number; // int
  status: 'failed' | 'pending' | 'succeeded';
};

export type Bank_connections_resource_transaction_refresh = {
  id: string;
  last_attempted_at: number; // int
  next_refresh_available_at?: null | number; // int
  status: 'failed' | 'pending' | 'succeeded';
};

export type Bank_connections_resource_link_account_session_filters = {
  account_subcategories?:
    | ('checking' | 'credit_card' | 'line_of_credit' | 'mortgage' | 'savings')[]
    | null;
  countries?: string[] | null;
};

export type Bank_connections_resource_transaction_resource_status_transitions =
  {
    posted_at?: null | number; // int
    void_at?: null | number; // int
  };

export type Forwarded_request_context = {
  destination_duration: number; // int
  destination_ip_address: string;
};

export type Forwarded_request_header = {
  name: string;
  value: string;
};

export type Forwarded_request_details = {
  body: string;
  headers: Forwarded_request_header[];
  http_method: 'POST';
};

export type Forwarded_response_details = {
  body: string;
  headers: Forwarded_request_header[];
  status: number; // int
};

export type Gelato_data_document_report_date_of_birth = {
  day?: null | number; // int
  month?: null | number; // int
  year?: null | number; // int
};

export type Gelato_document_report_error = {
  code?:
    | 'document_expired'
    | 'document_type_not_supported'
    | 'document_unverified_other'
    | null;
  reason?: string | null;
};

export type Gelato_data_document_report_expiration_date = {
  day?: null | number; // int
  month?: null | number; // int
  year?: null | number; // int
};

export type Gelato_data_document_report_issued_date = {
  day?: null | number; // int
  month?: null | number; // int
  year?: null | number; // int
};

export type Gelato_document_report = {
  address?: Address & Partial<Address>;
  dob?: Gelato_data_document_report_date_of_birth &
    Partial<Gelato_data_document_report_date_of_birth>;
  error?: Gelato_document_report_error & Partial<Gelato_document_report_error>;
  expiration_date?: Gelato_data_document_report_expiration_date &
    Partial<Gelato_data_document_report_expiration_date>;
  files?: string[] | null;
  first_name?: string | null;
  issued_date?: Gelato_data_document_report_issued_date &
    Partial<Gelato_data_document_report_issued_date>;
  issuing_country?: string | null;
  last_name?: string | null;
  number?: string | null;
  status: 'unverified' | 'verified';
  type?: 'driving_license' | 'id_card' | 'passport' | null;
};

export type Gelato_email_report_error = {
  code?: 'email_unverified_other' | 'email_verification_declined' | null;
  reason?: string | null;
};

export type Gelato_email_report = {
  email?: string | null;
  error?: Gelato_email_report_error & Partial<Gelato_email_report_error>;
  status: 'unverified' | 'verified';
};

export type Gelato_data_id_number_report_date = {
  day?: null | number; // int
  month?: null | number; // int
  year?: null | number; // int
};

export type Gelato_id_number_report_error = {
  code?:
    | 'id_number_insufficient_document_data'
    | 'id_number_mismatch'
    | 'id_number_unverified_other'
    | null;
  reason?: string | null;
};

export type Gelato_id_number_report = {
  dob?: Gelato_data_id_number_report_date &
    Partial<Gelato_data_id_number_report_date>;
  error?: Gelato_id_number_report_error &
    Partial<Gelato_id_number_report_error>;
  first_name?: string | null;
  id_number?: string | null;
  id_number_type?: 'br_cpf' | 'sg_nric' | 'us_ssn' | null;
  last_name?: string | null;
  status: 'unverified' | 'verified';
};

export type Gelato_report_document_options = {
  allowed_types?: ('driving_license' | 'id_card' | 'passport')[];
  require_id_number?: boolean;
  require_live_capture?: boolean;
  require_matching_selfie?: boolean;
};

export type Gelato_report_id_number_options = {};

export type Gelato_verification_report_options = {
  document?: Gelato_report_document_options;
  id_number?: Gelato_report_id_number_options;
};

export type Gelato_phone_report_error = {
  code?: 'phone_unverified_other' | 'phone_verification_declined' | null;
  reason?: string | null;
};

export type Gelato_phone_report = {
  error?: Gelato_phone_report_error & Partial<Gelato_phone_report_error>;
  phone?: string | null;
  status: 'unverified' | 'verified';
};

export type Gelato_selfie_report_error = {
  code?:
    | 'selfie_document_missing_photo'
    | 'selfie_face_mismatch'
    | 'selfie_manipulated'
    | 'selfie_unverified_other'
    | null;
  reason?: string | null;
};

export type Gelato_selfie_report = {
  document?: string | null;
  error?: Gelato_selfie_report_error & Partial<Gelato_selfie_report_error>;
  selfie?: string | null;
  status: 'unverified' | 'verified';
};

export type Gelato_session_last_error = {
  code?:
    | 'abandoned'
    | 'consent_declined'
    | 'country_not_supported'
    | 'device_not_supported'
    | 'document_expired'
    | 'document_type_not_supported'
    | 'document_unverified_other'
    | 'email_unverified_other'
    | 'email_verification_declined'
    | 'id_number_insufficient_document_data'
    | 'id_number_mismatch'
    | 'id_number_unverified_other'
    | 'phone_unverified_other'
    | 'phone_verification_declined'
    | 'selfie_document_missing_photo'
    | 'selfie_face_mismatch'
    | 'selfie_manipulated'
    | 'selfie_unverified_other'
    | 'under_supported_age'
    | null;
  reason?: string | null;
};

export type Gelato_session_document_options = {
  allowed_types?: ('driving_license' | 'id_card' | 'passport')[];
  require_id_number?: boolean;
  require_live_capture?: boolean;
  require_matching_selfie?: boolean;
};

export type Gelato_session_email_options = {
  require_verification?: boolean;
};

export type Gelato_session_id_number_options = {};

export type Gelato_session_phone_options = {
  require_verification?: boolean;
};

export type Gelato_verification_session_options = {
  document?: Gelato_session_document_options;
  email?: Gelato_session_email_options;
  id_number?: Gelato_session_id_number_options;
  phone?: Gelato_session_phone_options;
};

export type Gelato_provided_details = {
  email?: string;
  phone?: string;
};

export type Verification_session_redaction = {
  status: 'processing' | 'redacted';
};

export type Gelato_data_verified_outputs_date = {
  day?: null | number; // int
  month?: null | number; // int
  year?: null | number; // int
};

export type Gelato_verified_outputs = {
  address?: Address & Partial<Address>;
  dob?: Gelato_data_verified_outputs_date &
    Partial<Gelato_data_verified_outputs_date>;
  email?: string | null;
  first_name?: string | null;
  id_number?: string | null;
  id_number_type?: 'br_cpf' | 'sg_nric' | 'us_ssn' | null;
  last_name?: string | null;
  phone?: string | null;
};

export type Invoice_rendering_template = {
  created: number; // int
  id: string;
  livemode: boolean;
  metadata?: {
    [key: string]: string;
  } | null;
  nickname?: string | null;
  object: 'invoice_rendering_template';
  status: 'active' | 'archived';
  version: number; // int
};

export type Deleted_invoiceitem = {
  deleted: boolean;
  id: string;
  object: 'invoiceitem';
};

export type Payment_method_config_resource_display_preference = {
  overridable?: null | boolean;
  preference: 'none' | 'off' | 'on';
  value: 'off' | 'on';
};

export type Payment_method_config_resource_payment_method_properties = {
  available: boolean;
  display_preference: Payment_method_config_resource_display_preference;
};

export type Payment_method_configuration = {
  acss_debit?: Payment_method_config_resource_payment_method_properties;
  active: boolean;
  affirm?: Payment_method_config_resource_payment_method_properties;
  afterpay_clearpay?: Payment_method_config_resource_payment_method_properties;
  alipay?: Payment_method_config_resource_payment_method_properties;
  amazon_pay?: Payment_method_config_resource_payment_method_properties;
  apple_pay?: Payment_method_config_resource_payment_method_properties;
  application?: string | null;
  au_becs_debit?: Payment_method_config_resource_payment_method_properties;
  bacs_debit?: Payment_method_config_resource_payment_method_properties;
  bancontact?: Payment_method_config_resource_payment_method_properties;
  blik?: Payment_method_config_resource_payment_method_properties;
  boleto?: Payment_method_config_resource_payment_method_properties;
  card?: Payment_method_config_resource_payment_method_properties;
  cartes_bancaires?: Payment_method_config_resource_payment_method_properties;
  cashapp?: Payment_method_config_resource_payment_method_properties;
  customer_balance?: Payment_method_config_resource_payment_method_properties;
  eps?: Payment_method_config_resource_payment_method_properties;
  fpx?: Payment_method_config_resource_payment_method_properties;
  giropay?: Payment_method_config_resource_payment_method_properties;
  google_pay?: Payment_method_config_resource_payment_method_properties;
  grabpay?: Payment_method_config_resource_payment_method_properties;
  id: string;
  ideal?: Payment_method_config_resource_payment_method_properties;
  is_default: boolean;
  jcb?: Payment_method_config_resource_payment_method_properties;
  klarna?: Payment_method_config_resource_payment_method_properties;
  konbini?: Payment_method_config_resource_payment_method_properties;
  link?: Payment_method_config_resource_payment_method_properties;
  livemode: boolean;
  mobilepay?: Payment_method_config_resource_payment_method_properties;
  multibanco?: Payment_method_config_resource_payment_method_properties;
  name: string;
  object: 'payment_method_configuration';
  oxxo?: Payment_method_config_resource_payment_method_properties;
  p24?: Payment_method_config_resource_payment_method_properties;
  parent?: string | null;
  paynow?: Payment_method_config_resource_payment_method_properties;
  paypal?: Payment_method_config_resource_payment_method_properties;
  promptpay?: Payment_method_config_resource_payment_method_properties;
  revolut_pay?: Payment_method_config_resource_payment_method_properties;
  sepa_debit?: Payment_method_config_resource_payment_method_properties;
  sofort?: Payment_method_config_resource_payment_method_properties;
  swish?: Payment_method_config_resource_payment_method_properties;
  twint?: Payment_method_config_resource_payment_method_properties;
  us_bank_account?: Payment_method_config_resource_payment_method_properties;
  wechat_pay?: Payment_method_config_resource_payment_method_properties;
  zip?: Payment_method_config_resource_payment_method_properties;
};

export type Payment_method_domain_resource_payment_method_status_details = {
  error_message: string;
};

export type Payment_method_domain_resource_payment_method_status = {
  status: 'active' | 'inactive';
  status_details?: Payment_method_domain_resource_payment_method_status_details;
};

export type Payment_method_domain = {
  apple_pay: Payment_method_domain_resource_payment_method_status;
  created: number; // int
  domain_name: string;
  enabled: boolean;
  google_pay: Payment_method_domain_resource_payment_method_status;
  id: string;
  link: Payment_method_domain_resource_payment_method_status;
  livemode: boolean;
  object: 'payment_method_domain';
  paypal: Payment_method_domain_resource_payment_method_status;
};

export type Plan_tier = {
  flat_amount?: null | number; // int
  flat_amount_decimal?: string | null; // decimal
  unit_amount?: null | number; // int
  unit_amount_decimal?: string | null; // decimal
  up_to?: null | number; // int
};

export type Transform_usage = {
  divide_by: number; // int
  round: 'down' | 'up';
};

export type Plan = {
  active: boolean;
  aggregate_usage?: 'last_during_period' | 'last_ever' | 'max' | 'sum' | null;
  amount?: null | number; // int
  amount_decimal?: string | null; // decimal
  billing_scheme: 'per_unit' | 'tiered';
  created: number; // int
  currency: string;
  id: string;
  interval: 'day' | 'month' | 'week' | 'year';
  interval_count: number; // int
  livemode: boolean;
  metadata?: {
    [key: string]: string;
  } | null;
  meter?: string | null;
  nickname?: string | null;
  object: 'plan';
  product?: (string | Product | Deleted_product) &
    (Partial<Product> & Partial<Deleted_product>);
  tiers?: Plan_tier[];
  tiers_mode?: 'graduated' | 'volume' | null;
  transform_usage?: Transform_usage & Partial<Transform_usage>;
  trial_period_days?: null | number; // int
  usage_type: 'licensed' | 'metered';
};

export type Deleted_plan = {
  deleted: boolean;
  id: string;
  object: 'plan';
};

export type Product_feature = {
  entitlement_feature: Entitlements_Feature;
  id: string;
  livemode: boolean;
  object: 'product_feature';
};

export type Deleted_product_feature = {
  deleted: boolean;
  id: string;
  object: 'product_feature';
};

export type Financial_reporting_finance_report_run_run_parameters = {
  columns?: string[];
  connected_account?: string;
  currency?: string;
  interval_end?: number; // int
  interval_start?: number; // int
  payout?: string;
  reporting_category?: string;
  timezone?: string;
};

export type Sigma_scheduled_query_run_error = {
  message: string;
};

export type Scheduled_query_run = {
  created: number; // int
  data_load_time: number; // int
  error?: Sigma_scheduled_query_run_error;
  file?: File & Partial<File>;
  id: string;
  livemode: boolean;
  object: 'scheduled_query_run';
  result_available_until: number; // int
  sql: string;
  status: string;
  title: string;
};

export type Source_mandate_notification_acss_debit_data = {
  statement_descriptor?: string;
};

export type Source_mandate_notification_bacs_debit_data = {
  last4?: string;
};

export type Source_mandate_notification_sepa_debit_data = {
  creditor_identifier?: string;
  last4?: string;
  mandate_reference?: string;
};

export type Source_mandate_notification = {
  acss_debit?: Source_mandate_notification_acss_debit_data;
  amount?: null | number; // int
  bacs_debit?: Source_mandate_notification_bacs_debit_data;
  created: number; // int
  id: string;
  livemode: boolean;
  object: 'source_mandate_notification';
  reason: string;
  sepa_debit?: Source_mandate_notification_sepa_debit_data;
  source: Source;
  status: string;
  type: string;
};

export type Source_transaction_ach_credit_transfer_data = {
  customer_data?: string;
  fingerprint?: string;
  last4?: string;
  routing_number?: string;
};

export type Source_transaction_chf_credit_transfer_data = {
  reference?: string;
  sender_address_country?: string;
  sender_address_line1?: string;
  sender_iban?: string;
  sender_name?: string;
};

export type Source_transaction_gbp_credit_transfer_data = {
  fingerprint?: string;
  funding_method?: string;
  last4?: string;
  reference?: string;
  sender_account_number?: string;
  sender_name?: string;
  sender_sort_code?: string;
};

export type Source_transaction_paper_check_data = {
  available_at?: string;
  invoices?: string;
};

export type Source_transaction_sepa_credit_transfer_data = {
  reference?: string;
  sender_iban?: string;
  sender_name?: string;
};

export type Source_transaction = {
  ach_credit_transfer?: Source_transaction_ach_credit_transfer_data;
  amount: number; // int
  chf_credit_transfer?: Source_transaction_chf_credit_transfer_data;
  created: number; // int
  currency: string;
  gbp_credit_transfer?: Source_transaction_gbp_credit_transfer_data;
  id: string;
  livemode: boolean;
  object: 'source_transaction';
  paper_check?: Source_transaction_paper_check_data;
  sepa_credit_transfer?: Source_transaction_sepa_credit_transfer_data;
  source: string;
  status: string;
  type:
    | 'ach_credit_transfer'
    | 'ach_debit'
    | 'alipay'
    | 'bancontact'
    | 'card'
    | 'card_present'
    | 'eps'
    | 'giropay'
    | 'ideal'
    | 'klarna'
    | 'multibanco'
    | 'p24'
    | 'sepa_debit'
    | 'sofort'
    | 'three_d_secure'
    | 'wechat';
};

export type Deleted_subscription_item = {
  deleted: boolean;
  id: string;
  object: 'subscription_item';
};

export type Period = {
  end?: null | number; // int
  start?: null | number; // int
};

export type Usage_record_summary = {
  id: string;
  invoice?: string | null;
  livemode: boolean;
  object: 'usage_record_summary';
  period: Period;
  subscription_item: string;
  total_usage: number; // int
};

export type Usage_record = {
  id: string;
  livemode: boolean;
  object: 'usage_record';
  quantity: number; // int
  subscription_item: string;
  timestamp: number; // int
};

export type Tax_product_resource_postal_address = {
  city?: string | null;
  country: string;
  line1?: string | null;
  line2?: string | null;
  postal_code?: string | null;
  state?: string | null;
};

export type Tax_product_resource_customer_details_resource_tax_id = {
  type:
    | 'ad_nrt'
    | 'ae_trn'
    | 'ar_cuit'
    | 'au_abn'
    | 'au_arn'
    | 'bg_uic'
    | 'bh_vat'
    | 'bo_tin'
    | 'br_cnpj'
    | 'br_cpf'
    | 'ca_bn'
    | 'ca_gst_hst'
    | 'ca_pst_bc'
    | 'ca_pst_mb'
    | 'ca_pst_sk'
    | 'ca_qst'
    | 'ch_uid'
    | 'ch_vat'
    | 'cl_tin'
    | 'cn_tin'
    | 'co_nit'
    | 'cr_tin'
    | 'de_stn'
    | 'do_rcn'
    | 'ec_ruc'
    | 'eg_tin'
    | 'es_cif'
    | 'eu_oss_vat'
    | 'eu_vat'
    | 'gb_vat'
    | 'ge_vat'
    | 'hk_br'
    | 'hr_oib'
    | 'hu_tin'
    | 'id_npwp'
    | 'il_vat'
    | 'in_gst'
    | 'is_vat'
    | 'jp_cn'
    | 'jp_rn'
    | 'jp_trn'
    | 'ke_pin'
    | 'kr_brn'
    | 'kz_bin'
    | 'li_uid'
    | 'mx_rfc'
    | 'my_frp'
    | 'my_itn'
    | 'my_sst'
    | 'ng_tin'
    | 'no_vat'
    | 'no_voec'
    | 'nz_gst'
    | 'om_vat'
    | 'pe_ruc'
    | 'ph_tin'
    | 'ro_tin'
    | 'rs_pib'
    | 'ru_inn'
    | 'ru_kpp'
    | 'sa_vat'
    | 'sg_gst'
    | 'sg_uen'
    | 'si_tin'
    | 'sv_nit'
    | 'th_vat'
    | 'tr_tin'
    | 'tw_vat'
    | 'ua_vat'
    | 'unknown'
    | 'us_ein'
    | 'uy_ruc'
    | 've_rif'
    | 'vn_tin'
    | 'za_vat';
  value: string;
};

export type Tax_product_resource_customer_details = {
  address?: Tax_product_resource_postal_address &
    Partial<Tax_product_resource_postal_address>;
  address_source?: 'billing' | 'shipping' | null;
  ip_address?: string | null;
  tax_ids: Tax_product_resource_customer_details_resource_tax_id[];
  taxability_override: 'customer_exempt' | 'none' | 'reverse_charge';
};

export type Tax_product_resource_jurisdiction = {
  country: string;
  display_name: string;
  level: 'city' | 'country' | 'county' | 'district' | 'state';
  state?: string | null;
};

export type Tax_product_resource_line_item_tax_rate_details = {
  display_name: string;
  percentage_decimal: string;
  tax_type:
    | 'amusement_tax'
    | 'communications_tax'
    | 'gst'
    | 'hst'
    | 'igst'
    | 'jct'
    | 'lease_tax'
    | 'pst'
    | 'qst'
    | 'rst'
    | 'sales_tax'
    | 'vat';
};

export type Tax_product_resource_line_item_tax_breakdown = {
  amount: number; // int
  jurisdiction: Tax_product_resource_jurisdiction;
  sourcing: 'destination' | 'origin';
  tax_rate_details?: Tax_product_resource_line_item_tax_rate_details &
    Partial<Tax_product_resource_line_item_tax_rate_details>;
  taxability_reason:
    | 'customer_exempt'
    | 'not_collecting'
    | 'not_subject_to_tax'
    | 'not_supported'
    | 'portion_product_exempt'
    | 'portion_reduced_rated'
    | 'portion_standard_rated'
    | 'product_exempt'
    | 'product_exempt_holiday'
    | 'proportionally_rated'
    | 'reduced_rated'
    | 'reverse_charge'
    | 'standard_rated'
    | 'taxable_basis_reduced'
    | 'zero_rated';
  taxable_amount: number; // int
};

export type Tax_product_resource_ship_from_details = {
  address: Tax_product_resource_postal_address;
};

export type Tax_product_resource_tax_calculation_shipping_cost = {
  amount: number; // int
  amount_tax: number; // int
  shipping_rate?: string;
  tax_behavior: 'exclusive' | 'inclusive';
  tax_breakdown?: Tax_product_resource_line_item_tax_breakdown[];
  tax_code: string;
};

export type Tax_product_resource_tax_rate_details = {
  country?: string | null;
  percentage_decimal: string;
  state?: string | null;
  tax_type?:
    | 'amusement_tax'
    | 'communications_tax'
    | 'gst'
    | 'hst'
    | 'igst'
    | 'jct'
    | 'lease_tax'
    | 'pst'
    | 'qst'
    | 'rst'
    | 'sales_tax'
    | 'vat'
    | null;
};

export type Tax_product_resource_tax_breakdown = {
  amount: number; // int
  inclusive: boolean;
  tax_rate_details: Tax_product_resource_tax_rate_details;
  taxability_reason:
    | 'customer_exempt'
    | 'not_collecting'
    | 'not_subject_to_tax'
    | 'not_supported'
    | 'portion_product_exempt'
    | 'portion_reduced_rated'
    | 'portion_standard_rated'
    | 'product_exempt'
    | 'product_exempt_holiday'
    | 'proportionally_rated'
    | 'reduced_rated'
    | 'reverse_charge'
    | 'standard_rated'
    | 'taxable_basis_reduced'
    | 'zero_rated';
  taxable_amount: number; // int
};

export type Tax_product_registrations_resource_country_options_default = {
  type: 'standard';
};

export type Tax_product_registrations_resource_country_options_eu_standard = {
  place_of_supply_scheme: 'small_seller' | 'standard';
};

export type Tax_product_registrations_resource_country_options_europe = {
  standard?: Tax_product_registrations_resource_country_options_eu_standard;
  type: 'ioss' | 'oss_non_union' | 'oss_union' | 'standard';
};

export type Tax_product_registrations_resource_country_options_ca_province_standard =
  {
    province: string;
  };

export type Tax_product_registrations_resource_country_options_canada = {
  province_standard?: Tax_product_registrations_resource_country_options_ca_province_standard;
  type: 'province_standard' | 'simplified' | 'standard';
};

export type Tax_product_registrations_resource_country_options_simplified = {
  type: 'simplified';
};

export type Tax_product_registrations_resource_country_options_us_local_amusement_tax =
  {
    jurisdiction: string;
  };

export type Tax_product_registrations_resource_country_options_us_local_lease_tax =
  {
    jurisdiction: string;
  };

export type Tax_product_registrations_resource_country_options_us_state_sales_tax_election =
  {
    jurisdiction?: string;
    type:
      | 'local_use_tax'
      | 'simplified_sellers_use_tax'
      | 'single_local_use_tax';
  };

export type Tax_product_registrations_resource_country_options_us_state_sales_tax =
  {
    elections?: Tax_product_registrations_resource_country_options_us_state_sales_tax_election[];
  };

export type Tax_product_registrations_resource_country_options_united_states = {
  local_amusement_tax?: Tax_product_registrations_resource_country_options_us_local_amusement_tax;
  local_lease_tax?: Tax_product_registrations_resource_country_options_us_local_lease_tax;
  state: string;
  state_sales_tax?: Tax_product_registrations_resource_country_options_us_state_sales_tax;
  type:
    | 'local_amusement_tax'
    | 'local_lease_tax'
    | 'state_communications_tax'
    | 'state_sales_tax';
};

export type Tax_product_registrations_resource_country_options = {
  ae?: Tax_product_registrations_resource_country_options_default;
  at?: Tax_product_registrations_resource_country_options_europe;
  au?: Tax_product_registrations_resource_country_options_default;
  be?: Tax_product_registrations_resource_country_options_europe;
  bg?: Tax_product_registrations_resource_country_options_europe;
  bh?: Tax_product_registrations_resource_country_options_default;
  ca?: Tax_product_registrations_resource_country_options_canada;
  ch?: Tax_product_registrations_resource_country_options_default;
  cl?: Tax_product_registrations_resource_country_options_simplified;
  co?: Tax_product_registrations_resource_country_options_simplified;
  cy?: Tax_product_registrations_resource_country_options_europe;
  cz?: Tax_product_registrations_resource_country_options_europe;
  de?: Tax_product_registrations_resource_country_options_europe;
  dk?: Tax_product_registrations_resource_country_options_europe;
  ee?: Tax_product_registrations_resource_country_options_europe;
  eg?: Tax_product_registrations_resource_country_options_simplified;
  es?: Tax_product_registrations_resource_country_options_europe;
  fi?: Tax_product_registrations_resource_country_options_europe;
  fr?: Tax_product_registrations_resource_country_options_europe;
  gb?: Tax_product_registrations_resource_country_options_default;
  ge?: Tax_product_registrations_resource_country_options_simplified;
  gr?: Tax_product_registrations_resource_country_options_europe;
  hr?: Tax_product_registrations_resource_country_options_europe;
  hu?: Tax_product_registrations_resource_country_options_europe;
  id?: Tax_product_registrations_resource_country_options_simplified;
  ie?: Tax_product_registrations_resource_country_options_europe;
  is?: Tax_product_registrations_resource_country_options_default;
  it?: Tax_product_registrations_resource_country_options_europe;
  jp?: Tax_product_registrations_resource_country_options_default;
  ke?: Tax_product_registrations_resource_country_options_simplified;
  kr?: Tax_product_registrations_resource_country_options_simplified;
  kz?: Tax_product_registrations_resource_country_options_simplified;
  lt?: Tax_product_registrations_resource_country_options_europe;
  lu?: Tax_product_registrations_resource_country_options_europe;
  lv?: Tax_product_registrations_resource_country_options_europe;
  mt?: Tax_product_registrations_resource_country_options_europe;
  mx?: Tax_product_registrations_resource_country_options_simplified;
  my?: Tax_product_registrations_resource_country_options_simplified;
  ng?: Tax_product_registrations_resource_country_options_simplified;
  nl?: Tax_product_registrations_resource_country_options_europe;
  no?: Tax_product_registrations_resource_country_options_default;
  nz?: Tax_product_registrations_resource_country_options_default;
  om?: Tax_product_registrations_resource_country_options_default;
  pl?: Tax_product_registrations_resource_country_options_europe;
  pt?: Tax_product_registrations_resource_country_options_europe;
  ro?: Tax_product_registrations_resource_country_options_europe;
  sa?: Tax_product_registrations_resource_country_options_simplified;
  se?: Tax_product_registrations_resource_country_options_europe;
  sg?: Tax_product_registrations_resource_country_options_default;
  si?: Tax_product_registrations_resource_country_options_europe;
  sk?: Tax_product_registrations_resource_country_options_europe;
  th?: Tax_product_registrations_resource_country_options_simplified;
  tr?: Tax_product_registrations_resource_country_options_simplified;
  us?: Tax_product_registrations_resource_country_options_united_states;
  vn?: Tax_product_registrations_resource_country_options_simplified;
  za?: Tax_product_registrations_resource_country_options_default;
};

export type Tax_product_resource_tax_settings_defaults = {
  tax_behavior?: 'exclusive' | 'inclusive' | 'inferred_by_currency' | null;
  tax_code?: string | null;
};

export type Tax_product_resource_tax_settings_head_office = {
  address: Address;
};

export type Tax_product_resource_tax_settings_status_details_resource_active =
  {};

export type Tax_product_resource_tax_settings_status_details_resource_pending =
  {
    missing_fields?: string[] | null;
  };

export type Tax_product_resource_tax_settings_status_details = {
  active?: Tax_product_resource_tax_settings_status_details_resource_active;
  pending?: Tax_product_resource_tax_settings_status_details_resource_pending;
};

export type Tax_product_resource_tax_transaction_line_item_resource_reversal = {
  original_line_item: string;
};

export type Tax_product_resource_tax_transaction_resource_reversal = {
  original_transaction?: string | null;
};

export type Tax_product_resource_tax_transaction_shipping_cost = {
  amount: number; // int
  amount_tax: number; // int
  shipping_rate?: string;
  tax_behavior: 'exclusive' | 'inclusive';
  tax_code: string;
};

export type Terminal_configuration_configuration_resource_device_type_specific_config =
  {
    splashscreen?: (string | File) & Partial<File>;
  };

export type Terminal_configuration_configuration_resource_offline_config = {
  enabled?: null | boolean;
};

export type Terminal_configuration_configuration_resource_reboot_window = {
  end_hour: number; // int
  start_hour: number; // int
};

export type Terminal_configuration_configuration_resource_currency_specific_config =
  {
    fixed_amounts?: number[] | null; // item: int
    percentages?: number[] | null; // item: int
    smart_tip_threshold?: number; // int
  };

export type Terminal_configuration_configuration_resource_tipping = {
  aud?: Terminal_configuration_configuration_resource_currency_specific_config;
  cad?: Terminal_configuration_configuration_resource_currency_specific_config;
  chf?: Terminal_configuration_configuration_resource_currency_specific_config;
  czk?: Terminal_configuration_configuration_resource_currency_specific_config;
  dkk?: Terminal_configuration_configuration_resource_currency_specific_config;
  eur?: Terminal_configuration_configuration_resource_currency_specific_config;
  gbp?: Terminal_configuration_configuration_resource_currency_specific_config;
  hkd?: Terminal_configuration_configuration_resource_currency_specific_config;
  myr?: Terminal_configuration_configuration_resource_currency_specific_config;
  nok?: Terminal_configuration_configuration_resource_currency_specific_config;
  nzd?: Terminal_configuration_configuration_resource_currency_specific_config;
  sek?: Terminal_configuration_configuration_resource_currency_specific_config;
  sgd?: Terminal_configuration_configuration_resource_currency_specific_config;
  usd?: Terminal_configuration_configuration_resource_currency_specific_config;
};

export type Terminal_reader_reader_resource_tipping_config = {
  amount_eligible?: number; // int
};

export type Terminal_reader_reader_resource_process_config = {
  enable_customer_cancellation?: boolean;
  skip_tipping?: boolean;
  tipping?: Terminal_reader_reader_resource_tipping_config;
};

export type Terminal_reader_reader_resource_process_payment_intent_action = {
  payment_intent: (string | Payment_intent) & Partial<Payment_intent>;
  process_config?: Terminal_reader_reader_resource_process_config;
};

export type Terminal_reader_reader_resource_process_setup_config = {
  enable_customer_cancellation?: boolean;
};

export type Terminal_reader_reader_resource_process_setup_intent_action = {
  generated_card?: string;
  process_config?: Terminal_reader_reader_resource_process_setup_config;
  setup_intent: (string | Setup_intent) & Partial<Setup_intent>;
};

export type Terminal_reader_reader_resource_refund_payment_config = {
  enable_customer_cancellation?: boolean;
};

export type Terminal_reader_reader_resource_refund_payment_action = {
  amount?: number; // int
  charge?: (string | Charge) & Partial<Charge>;
  metadata?: {
    [key: string]: string;
  };
  payment_intent?: (string | Payment_intent) & Partial<Payment_intent>;
  reason?: 'duplicate' | 'fraudulent' | 'requested_by_customer';
  refund?: (string | Refund) & Partial<Refund>;
  refund_application_fee?: boolean;
  refund_payment_config?: Terminal_reader_reader_resource_refund_payment_config;
  reverse_transfer?: boolean;
};

export type Terminal_reader_reader_resource_line_item = {
  amount: number; // int
  description: string;
  quantity: number; // int
};

export type Terminal_reader_reader_resource_cart = {
  currency: string;
  line_items: Terminal_reader_reader_resource_line_item[];
  tax?: null | number; // int
  total: number; // int
};

export type Terminal_reader_reader_resource_set_reader_display_action = {
  cart?: Terminal_reader_reader_resource_cart &
    Partial<Terminal_reader_reader_resource_cart>;
  type: 'cart';
};

export type Terminal_reader_reader_resource_reader_action = {
  failure_code?: string | null;
  failure_message?: string | null;
  process_payment_intent?: Terminal_reader_reader_resource_process_payment_intent_action;
  process_setup_intent?: Terminal_reader_reader_resource_process_setup_intent_action;
  refund_payment?: Terminal_reader_reader_resource_refund_payment_action;
  set_reader_display?: Terminal_reader_reader_resource_set_reader_display_action;
  status: 'failed' | 'in_progress' | 'succeeded';
  type:
    | 'process_payment_intent'
    | 'process_setup_intent'
    | 'refund_payment'
    | 'set_reader_display';
};

export type Treasury_inbound_transfers_resource_failure_details = {
  code:
    | 'account_closed'
    | 'account_frozen'
    | 'bank_account_restricted'
    | 'bank_ownership_changed'
    | 'debit_not_authorized'
    | 'incorrect_account_holder_address'
    | 'incorrect_account_holder_name'
    | 'incorrect_account_holder_tax_id'
    | 'insufficient_funds'
    | 'invalid_account_number'
    | 'invalid_currency'
    | 'no_account'
    | 'other';
};

export type Treasury_inbound_transfers_resource_inbound_transfer_resource_linked_flows =
  {
    received_debit?: string | null;
  };

export type Treasury_shared_resource_billing_details = {
  address: Address;
  email?: string | null;
  name?: string | null;
};

export type Inbound_transfers_payment_method_details_us_bank_account = {
  account_holder_type?: 'company' | 'individual' | null;
  account_type?: 'checking' | 'savings' | null;
  bank_name?: string | null;
  fingerprint?: string | null;
  last4?: string | null;
  mandate?: (string | Mandate) & Partial<Mandate>;
  network: 'ach';
  routing_number?: string | null;
};

export type Inbound_transfers = {
  billing_details: Treasury_shared_resource_billing_details;
  type: 'us_bank_account';
  us_bank_account?: Inbound_transfers_payment_method_details_us_bank_account;
};

export type Treasury_inbound_transfers_resource_inbound_transfer_resource_status_transitions =
  {
    canceled_at?: null | number; // int
    failed_at?: null | number; // int
    succeeded_at?: null | number; // int
  };

export type Treasury_transactions_resource_balance_impact = {
  cash: number; // int
  inbound_pending: number; // int
  outbound_pending: number; // int
};

export type Treasury_received_credits_resource_status_transitions = {
  posted_at?: null | number; // int
};

export type Treasury_received_debits_resource_debit_reversal_linked_flows = {
  issuing_dispute?: string | null;
};

export type Treasury_received_debits_resource_status_transitions = {
  completed_at?: null | number; // int
};

export type Outbound_payments_payment_method_details_financial_account = {
  id: string;
  network: 'stripe';
};

export type Outbound_payments_payment_method_details_us_bank_account = {
  account_holder_type?: 'company' | 'individual' | null;
  account_type?: 'checking' | 'savings' | null;
  bank_name?: string | null;
  fingerprint?: string | null;
  last4?: string | null;
  mandate?: (string | Mandate) & Partial<Mandate>;
  network: 'ach' | 'us_domestic_wire';
  routing_number?: string | null;
};

export type Outbound_payments_payment_method_details = {
  billing_details: Treasury_shared_resource_billing_details;
  financial_account?: Outbound_payments_payment_method_details_financial_account;
  type: 'financial_account' | 'us_bank_account';
  us_bank_account?: Outbound_payments_payment_method_details_us_bank_account;
};

export type Treasury_outbound_payments_resource_outbound_payment_resource_end_user_details =
  {
    ip_address?: string | null;
    present: boolean;
  };

export type Treasury_outbound_payments_resource_returned_status = {
  code:
    | 'account_closed'
    | 'account_frozen'
    | 'bank_account_restricted'
    | 'bank_ownership_changed'
    | 'declined'
    | 'incorrect_account_holder_name'
    | 'invalid_account_number'
    | 'invalid_currency'
    | 'no_account'
    | 'other';
  transaction: (string | Treasury_Transaction) & Partial<Treasury_Transaction>;
};

export type Treasury_outbound_payments_resource_outbound_payment_resource_status_transitions =
  {
    canceled_at?: null | number; // int
    failed_at?: null | number; // int
    posted_at?: null | number; // int
    returned_at?: null | number; // int
  };

export type Treasury_outbound_payments_resource_ach_tracking_details = {
  trace_id: string;
};

export type Treasury_outbound_payments_resource_us_domestic_wire_tracking_details =
  {
    chips?: string | null;
    imad?: string | null;
    omad?: string | null;
  };

export type Treasury_outbound_payments_resource_outbound_payment_resource_tracking_details =
  {
    ach?: Treasury_outbound_payments_resource_ach_tracking_details;
    type: 'ach' | 'us_domestic_wire';
    us_domestic_wire?: Treasury_outbound_payments_resource_us_domestic_wire_tracking_details;
  };

export type Outbound_transfers_payment_method_details_us_bank_account = {
  account_holder_type?: 'company' | 'individual' | null;
  account_type?: 'checking' | 'savings' | null;
  bank_name?: string | null;
  fingerprint?: string | null;
  last4?: string | null;
  mandate?: (string | Mandate) & Partial<Mandate>;
  network: 'ach' | 'us_domestic_wire';
  routing_number?: string | null;
};

export type Outbound_transfers_payment_method_details = {
  billing_details: Treasury_shared_resource_billing_details;
  type: 'us_bank_account';
  us_bank_account?: Outbound_transfers_payment_method_details_us_bank_account;
};

export type Treasury_outbound_transfers_resource_returned_details = {
  code:
    | 'account_closed'
    | 'account_frozen'
    | 'bank_account_restricted'
    | 'bank_ownership_changed'
    | 'declined'
    | 'incorrect_account_holder_name'
    | 'invalid_account_number'
    | 'invalid_currency'
    | 'no_account'
    | 'other';
  transaction: (string | Treasury_Transaction) & Partial<Treasury_Transaction>;
};

export type Treasury_outbound_transfers_resource_status_transitions = {
  canceled_at?: null | number; // int
  failed_at?: null | number; // int
  posted_at?: null | number; // int
  returned_at?: null | number; // int
};

export type Treasury_outbound_transfers_resource_ach_tracking_details = {
  trace_id: string;
};

export type Treasury_outbound_transfers_resource_us_domestic_wire_tracking_details =
  {
    chips?: string | null;
    imad?: string | null;
    omad?: string | null;
  };

export type Treasury_outbound_transfers_resource_outbound_transfer_resource_tracking_details =
  {
    ach?: Treasury_outbound_transfers_resource_ach_tracking_details;
    type: 'ach' | 'us_domestic_wire';
    us_domestic_wire?: Treasury_outbound_transfers_resource_us_domestic_wire_tracking_details;
  };

export type Received_payment_method_details_financial_account = {
  id: string;
  network: 'stripe';
};

export type Treasury_shared_resource_initiating_payment_method_details_us_bank_account =
  {
    bank_name?: string | null;
    last4?: string | null;
    routing_number?: string | null;
  };

export type Treasury_shared_resource_initiating_payment_method_details_initiating_payment_method_details =
  {
    balance?: 'payments';
    billing_details: Treasury_shared_resource_billing_details;
    financial_account?: Received_payment_method_details_financial_account;
    issuing_card?: string;
    type:
      | 'balance'
      | 'financial_account'
      | 'issuing_card'
      | 'stripe'
      | 'us_bank_account';
    us_bank_account?: Treasury_shared_resource_initiating_payment_method_details_us_bank_account;
  };

export type Treasury_received_credits_resource_source_flows_details = {
  credit_reversal?: Treasury_Credit_reversal;
  outbound_payment?: Treasury_Outbound_payment;
  payout?: Payout;
  type: 'credit_reversal' | 'other' | 'outbound_payment' | 'payout';
};

export type Treasury_received_credits_resource_linked_flows = {
  credit_reversal?: string | null;
  issuing_authorization?: string | null;
  issuing_transaction?: string | null;
  source_flow?: string | null;
  source_flow_details?: Treasury_received_credits_resource_source_flows_details &
    Partial<Treasury_received_credits_resource_source_flows_details>;
  source_flow_type?: string | null;
};

export type Treasury_received_credits_resource_reversal_details = {
  deadline?: null | number; // int
  restricted_reason?:
    | 'already_reversed'
    | 'deadline_passed'
    | 'network_restricted'
    | 'other'
    | 'source_flow_restricted'
    | null;
};

export type Treasury_received_debits_resource_linked_flows = {
  debit_reversal?: string | null;
  inbound_transfer?: string | null;
  issuing_authorization?: string | null;
  issuing_transaction?: string | null;
  payout?: string | null;
};

export type Treasury_received_debits_resource_reversal_details = {
  deadline?: null | number; // int
  restricted_reason?:
    | 'already_reversed'
    | 'deadline_passed'
    | 'network_restricted'
    | 'other'
    | 'source_flow_restricted'
    | null;
};

export type Treasury_transactions_resource_flow_details = {
  credit_reversal?: Treasury_Credit_reversal;
  debit_reversal?: Treasury_Debit_reversal;
  inbound_transfer?: Treasury_Inbound_transfer;
  issuing_authorization?: Issuing_Authorization;
  outbound_payment?: Treasury_Outbound_payment;
  outbound_transfer?: Treasury_Outbound_transfer;
  received_credit?: Treasury_Received_credit;
  received_debit?: Treasury_Received_debit;
  type:
    | 'credit_reversal'
    | 'debit_reversal'
    | 'inbound_transfer'
    | 'issuing_authorization'
    | 'other'
    | 'outbound_payment'
    | 'outbound_transfer'
    | 'received_credit'
    | 'received_debit';
};

export type Treasury_transactions_resource_abstract_transaction_resource_status_transitions =
  {
    posted_at?: null | number; // int
    void_at?: null | number; // int
  };

export type Token = {
  bank_account?: Bank_account;
  card?: Card;
  client_ip?: string | null;
  created: number; // int
  id: string;
  livemode: boolean;
  object: 'token';
  type: string;
  used: boolean;
};

export type Treasury_financial_accounts_resource_balance = {
  cash: {
    [key: string]: number; // int
  };
  inbound_pending: {
    [key: string]: number; // int
  };
  outbound_pending: {
    [key: string]: number; // int
  };
};

export type Treasury_financial_accounts_resource_toggles_setting_status_details =
  {
    code:
      | 'activating'
      | 'capability_not_requested'
      | 'financial_account_closed'
      | 'rejected_other'
      | 'rejected_unsupported_business'
      | 'requirements_past_due'
      | 'requirements_pending_verification'
      | 'restricted_by_platform'
      | 'restricted_other';
    resolution?:
      | 'contact_stripe'
      | 'provide_information'
      | 'remove_restriction'
      | null;
    restriction?: 'inbound_flows' | 'outbound_flows';
  };

export type Treasury_financial_accounts_resource_toggle_settings = {
  requested: boolean;
  status: 'active' | 'pending' | 'restricted';
  status_details: Treasury_financial_accounts_resource_toggles_setting_status_details[];
};

export type Treasury_financial_accounts_resource_aba_toggle_settings = {
  requested: boolean;
  status: 'active' | 'pending' | 'restricted';
  status_details: Treasury_financial_accounts_resource_toggles_setting_status_details[];
};

export type Treasury_financial_accounts_resource_financial_addresses_features =
  {
    aba?: Treasury_financial_accounts_resource_aba_toggle_settings;
  };

export type Treasury_financial_accounts_resource_ach_toggle_settings = {
  requested: boolean;
  status: 'active' | 'pending' | 'restricted';
  status_details: Treasury_financial_accounts_resource_toggles_setting_status_details[];
};

export type Treasury_financial_accounts_resource_inbound_transfers = {
  ach?: Treasury_financial_accounts_resource_ach_toggle_settings;
};

export type Treasury_financial_accounts_resource_outbound_payments = {
  ach?: Treasury_financial_accounts_resource_ach_toggle_settings;
  us_domestic_wire?: Treasury_financial_accounts_resource_toggle_settings;
};

export type Treasury_financial_accounts_resource_outbound_transfers = {
  ach?: Treasury_financial_accounts_resource_ach_toggle_settings;
  us_domestic_wire?: Treasury_financial_accounts_resource_toggle_settings;
};

export type Treasury_financial_accounts_resource_aba_record = {
  account_holder_name: string;
  account_number?: string | null;
  account_number_last4: string;
  bank_name: string;
  routing_number: string;
};

export type Treasury_financial_accounts_resource_financial_address = {
  aba?: Treasury_financial_accounts_resource_aba_record;
  supported_networks?: ('ach' | 'us_domestic_wire')[];
  type: 'aba';
};

export type Treasury_financial_accounts_resource_platform_restrictions = {
  inbound_flows?: 'restricted' | 'unrestricted' | null;
  outbound_flows?: 'restricted' | 'unrestricted' | null;
};

export type Treasury_financial_accounts_resource_closed_status_details = {
  reasons: ('account_rejected' | 'closed_by_platform' | 'other')[];
};

export type Treasury_financial_accounts_resource_status_details = {
  closed?: Treasury_financial_accounts_resource_closed_status_details &
    Partial<Treasury_financial_accounts_resource_closed_status_details>;
};

export type Webhook_endpoint = {
  api_version?: string | null;
  application?: string | null;
  created: number; // int
  description?: string | null;
  enabled_events: string[];
  id: string;
  livemode: boolean;
  metadata: {
    [key: string]: string;
  };
  object: 'webhook_endpoint';
  secret?: string;
  status: string;
  url: string;
};

export type Deleted_webhook_endpoint = {
  deleted: boolean;
  id: string;
  object: 'webhook_endpoint';
};
