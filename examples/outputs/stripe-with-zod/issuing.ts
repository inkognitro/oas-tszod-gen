import {
  Issuing_authorization_amount_details,
  Balance_transaction,
  Issuing_cardholder_address,
  Issuing_cardholder_company,
  Issuing_cardholder_individual,
  Issuing_cardholder_requirements,
  Issuing_cardholder_authorization_controls,
  z_Issuing_cardholder_address,
  z_Issuing_cardholder_company,
  z_Issuing_cardholder_individual,
  z_Issuing_cardholder_requirements,
  z_Issuing_cardholder_authorization_controls,
  File,
  Issuing_personalization_design_carrier_text,
  Issuing_physical_bundle_features,
  z_Issuing_physical_bundle_features,
  Issuing_personalization_design_preferences,
  Issuing_personalization_design_rejection_reasons,
  z_File,
  z_Issuing_personalization_design_carrier_text,
  z_Issuing_personalization_design_preferences,
  z_Issuing_personalization_design_rejection_reasons,
  Issuing_card_shipping,
  Issuing_card_authorization_controls,
  Issuing_card_wallets,
  z_Issuing_card_shipping,
  z_Issuing_card_authorization_controls,
  z_Issuing_card_wallets,
  Issuing_authorization_fleet_data,
  Issuing_authorization_fuel_data,
  Issuing_authorization_merchant_data,
  Issuing_authorization_network_data,
  Issuing_authorization_pending_request,
  Issuing_authorization_request,
  Issuing_network_token_network_data,
  z_Issuing_network_token_network_data,
  Issuing_transaction_amount_details,
  Issuing_dispute_evidence,
  Issuing_dispute_treasury,
  z_Balance_transaction,
  z_Issuing_dispute_evidence,
  z_Issuing_dispute_treasury,
  Issuing_transaction_network_data,
  Issuing_transaction_purchase_details,
  Issuing_transaction_treasury,
  z_Issuing_transaction_amount_details,
  z_Issuing_authorization_merchant_data,
  z_Issuing_transaction_network_data,
  z_Issuing_transaction_purchase_details,
  z_Issuing_transaction_treasury,
  Issuing_authorization_treasury,
  Issuing_authorization_verification_data,
  z_Issuing_authorization_amount_details,
  z_Issuing_authorization_fleet_data,
  z_Issuing_authorization_fuel_data,
  z_Issuing_authorization_network_data,
  z_Issuing_authorization_pending_request,
  z_Issuing_authorization_request,
  z_Issuing_authorization_treasury,
  z_Issuing_authorization_verification_data,
} from './schemas';
import {z} from 'zod';

export type Issuing_Cardholder = {
  billing: Issuing_cardholder_address;
  company?: Issuing_cardholder_company & Partial<Issuing_cardholder_company>;
  created: number; // int
  email?: string | null;
  id: string;
  individual?: Issuing_cardholder_individual &
    Partial<Issuing_cardholder_individual>;
  livemode: boolean;
  metadata: {
    [key: string]: string;
  };
  name: string;
  object: 'issuing.cardholder';
  phone_number?: string | null;
  preferred_locales?: ('de' | 'en' | 'es' | 'fr' | 'it')[] | null;
  requirements: Issuing_cardholder_requirements;
  spending_controls?: Issuing_cardholder_authorization_controls &
    Partial<Issuing_cardholder_authorization_controls>;
  status: 'active' | 'blocked' | 'inactive';
  type: 'company' | 'individual';
};

export const z_Issuing_Cardholder = z.object({
  billing: z_Issuing_cardholder_address,
  company: z_Issuing_cardholder_company.optional(),
  created: z.number().int().safe().finite(),
  email: z.string().nullable().optional(),
  id: z.string(),
  individual: z_Issuing_cardholder_individual.optional(),
  livemode: z.boolean(),
  metadata: z.record(z.string()),
  name: z.string(),
  object: z.enum(['issuing.cardholder']),
  phone_number: z.string().nullable().optional(),
  preferred_locales: z
    .array(z.enum(['de', 'en', 'es', 'fr', 'it']))
    .nullable()
    .optional(),
  requirements: z_Issuing_cardholder_requirements,
  spending_controls: z_Issuing_cardholder_authorization_controls.optional(),
  status: z.enum(['active', 'blocked', 'inactive']),
  type: z.enum(['company', 'individual']),
});

export type Issuing_Physical_bundle = {
  features: Issuing_physical_bundle_features;
  id: string;
  livemode: boolean;
  name: string;
  object: 'issuing.physical_bundle';
  status: 'active' | 'inactive' | 'review';
  type: 'custom' | 'standard';
};

export const z_Issuing_Physical_bundle = z.object({
  features: z_Issuing_physical_bundle_features,
  id: z.string(),
  livemode: z.boolean(),
  name: z.string(),
  object: z.enum(['issuing.physical_bundle']),
  status: z.enum(['active', 'inactive', 'review']),
  type: z.enum(['custom', 'standard']),
});

export type Issuing_Personalization_design = {
  card_logo?: (string | File) & Partial<File>;
  carrier_text?: Issuing_personalization_design_carrier_text &
    Partial<Issuing_personalization_design_carrier_text>;
  created: number; // int
  id: string;
  livemode: boolean;
  lookup_key?: string | null;
  metadata: {
    [key: string]: string;
  };
  name?: string | null;
  object: 'issuing.personalization_design';
  physical_bundle: (string | Issuing_Physical_bundle) &
    Partial<Issuing_Physical_bundle>;
  preferences: Issuing_personalization_design_preferences;
  rejection_reasons: Issuing_personalization_design_rejection_reasons;
  status: 'active' | 'inactive' | 'rejected' | 'review';
};

export const z_Issuing_Personalization_design = z.object({
  card_logo: z.union([z.string(), z_File]).optional(),
  carrier_text: z_Issuing_personalization_design_carrier_text.optional(),
  created: z.number().int().safe().finite(),
  id: z.string(),
  livemode: z.boolean(),
  lookup_key: z.string().nullable().optional(),
  metadata: z.record(z.string()),
  name: z.string().nullable().optional(),
  object: z.enum(['issuing.personalization_design']),
  physical_bundle: z.union([z.string(), z_Issuing_Physical_bundle]),
  preferences: z_Issuing_personalization_design_preferences,
  rejection_reasons: z_Issuing_personalization_design_rejection_reasons,
  status: z.enum(['active', 'inactive', 'rejected', 'review']),
});

export type Issuing_Card = {
  brand: string;
  cancellation_reason?: 'design_rejected' | 'lost' | 'stolen' | null;
  cardholder: Issuing_Cardholder;
  created: number; // int
  currency: string;
  cvc?: string;
  exp_month: number; // int
  exp_year: number; // int
  financial_account?: string | null;
  id: string;
  last4: string;
  livemode: boolean;
  metadata: {
    [key: string]: string;
  };
  number?: string;
  object: 'issuing.card';
  personalization_design?: (string | Issuing_Personalization_design) &
    Partial<Issuing_Personalization_design>;
  replaced_by?: (string | Issuing_Card) & Partial<Issuing_Card>;
  replacement_for?: (string | Issuing_Card) & Partial<Issuing_Card>;
  replacement_reason?: 'damaged' | 'expired' | 'lost' | 'stolen' | null;
  shipping?: Issuing_card_shipping & Partial<Issuing_card_shipping>;
  spending_controls: Issuing_card_authorization_controls;
  status: 'active' | 'canceled' | 'inactive';
  type: 'physical' | 'virtual';
  wallets?: Issuing_card_wallets & Partial<Issuing_card_wallets>;
};

// @ts-ignore - due to ZodSchema recursion it is required to force the type like so
export const z_Issuing_Card: z.ZodType<Issuing_Card> = z.object({
  brand: z.string(),
  cancellation_reason: z
    .enum(['design_rejected', 'lost', 'stolen'])
    .nullable()
    .optional(),
  cardholder: z_Issuing_Cardholder,
  created: z.number().int().safe().finite(),
  currency: z.string(),
  cvc: z.string().optional(),
  exp_month: z.number().int().safe().finite(),
  exp_year: z.number().int().safe().finite(),
  financial_account: z.string().nullable().optional(),
  id: z.string(),
  last4: z.string(),
  livemode: z.boolean(),
  metadata: z.record(z.string()),
  number: z.string().optional(),
  object: z.enum(['issuing.card']),
  personalization_design: z
    .union([z.string(), z_Issuing_Personalization_design])
    .optional(),
  replaced_by: z.union([z.string(), z.lazy(() => z_Issuing_Card)]).optional(),
  replacement_for: z
    .union([z.string(), z.lazy(() => z_Issuing_Card)])
    .optional(),
  replacement_reason: z
    .enum(['damaged', 'expired', 'lost', 'stolen'])
    .nullable()
    .optional(),
  shipping: z_Issuing_card_shipping.optional(),
  spending_controls: z_Issuing_card_authorization_controls,
  status: z.enum(['active', 'canceled', 'inactive']),
  type: z.enum(['physical', 'virtual']),
  wallets: z_Issuing_card_wallets.optional(),
});

export type Issuing_Token = {
  card: (string | Issuing_Card) & Partial<Issuing_Card>;
  created: number; // int
  device_fingerprint?: string | null;
  id: string;
  last4?: string;
  livemode: boolean;
  network: 'mastercard' | 'visa';
  network_data?: Issuing_network_token_network_data;
  network_updated_at: number; // int
  object: 'issuing.token';
  status: 'active' | 'deleted' | 'requested' | 'suspended';
  wallet_provider?: 'apple_pay' | 'google_pay' | 'samsung_pay';
};

export const z_Issuing_Token = z.object({
  card: z.union([z.string(), z_Issuing_Card]),
  created: z.number().int().safe().finite(),
  device_fingerprint: z.string().nullable().optional(),
  id: z.string(),
  last4: z.string().optional(),
  livemode: z.boolean(),
  network: z.enum(['mastercard', 'visa']),
  network_data: z_Issuing_network_token_network_data.optional(),
  network_updated_at: z.number().int().safe().finite(),
  object: z.enum(['issuing.token']),
  status: z.enum(['active', 'deleted', 'requested', 'suspended']),
  wallet_provider: z
    .enum(['apple_pay', 'google_pay', 'samsung_pay'])
    .optional(),
});

export type Issuing_Dispute = {
  amount: number; // int
  balance_transactions?: Balance_transaction[] | null;
  created: number; // int
  currency: string;
  evidence: Issuing_dispute_evidence;
  id: string;
  livemode: boolean;
  loss_reason?:
    | 'cardholder_authentication_issuer_liability'
    | 'eci5_token_transaction_with_tavv'
    | 'excess_disputes_in_timeframe'
    | 'has_not_met_the_minimum_dispute_amount_requirements'
    | 'invalid_duplicate_dispute'
    | 'invalid_incorrect_amount_dispute'
    | 'invalid_no_authorization'
    | 'invalid_use_of_disputes'
    | 'merchandise_delivered_or_shipped'
    | 'merchandise_or_service_as_described'
    | 'not_cancelled'
    | 'other'
    | 'refund_issued'
    | 'submitted_beyond_allowable_time_limit'
    | 'transaction_3ds_required'
    | 'transaction_approved_after_prior_fraud_dispute'
    | 'transaction_authorized'
    | 'transaction_electronically_read'
    | 'transaction_qualifies_for_visa_easy_payment_service'
    | 'transaction_unattended';
  metadata: {
    [key: string]: string;
  };
  object: 'issuing.dispute';
  status: 'expired' | 'lost' | 'submitted' | 'unsubmitted' | 'won';
  transaction: (string | Issuing_Transaction) & Partial<Issuing_Transaction>;
  treasury?: Issuing_dispute_treasury & Partial<Issuing_dispute_treasury>;
};

// @ts-ignore - due to ZodSchema recursion it is required to force the type like so
export const z_Issuing_Dispute: z.ZodType<Issuing_Dispute> = z.object({
  amount: z.number().int().safe().finite(),
  balance_transactions: z
    .array(z.lazy(() => z_Balance_transaction))
    .nullable()
    .optional(),
  created: z.number().int().safe().finite(),
  currency: z.string(),
  evidence: z_Issuing_dispute_evidence,
  id: z.string(),
  livemode: z.boolean(),
  loss_reason: z
    .enum([
      'cardholder_authentication_issuer_liability',
      'eci5_token_transaction_with_tavv',
      'excess_disputes_in_timeframe',
      'has_not_met_the_minimum_dispute_amount_requirements',
      'invalid_duplicate_dispute',
      'invalid_incorrect_amount_dispute',
      'invalid_no_authorization',
      'invalid_use_of_disputes',
      'merchandise_delivered_or_shipped',
      'merchandise_or_service_as_described',
      'not_cancelled',
      'other',
      'refund_issued',
      'submitted_beyond_allowable_time_limit',
      'transaction_3ds_required',
      'transaction_approved_after_prior_fraud_dispute',
      'transaction_authorized',
      'transaction_electronically_read',
      'transaction_qualifies_for_visa_easy_payment_service',
      'transaction_unattended',
    ])
    .optional(),
  metadata: z.record(z.string()),
  object: z.enum(['issuing.dispute']),
  status: z.enum(['expired', 'lost', 'submitted', 'unsubmitted', 'won']),
  transaction: z.union([z.string(), z.lazy(() => z_Issuing_Transaction)]),
  treasury: z_Issuing_dispute_treasury.optional(),
});

export type Issuing_Transaction = {
  amount: number; // int
  amount_details?: Issuing_transaction_amount_details &
    Partial<Issuing_transaction_amount_details>;
  authorization?: (string | Issuing_Authorization) &
    Partial<Issuing_Authorization>;
  balance_transaction?: (string | Balance_transaction) &
    Partial<Balance_transaction>;
  card: (string | Issuing_Card) & Partial<Issuing_Card>;
  cardholder?: (string | Issuing_Cardholder) & Partial<Issuing_Cardholder>;
  created: number; // int
  currency: string;
  dispute?: (string | Issuing_Dispute) & Partial<Issuing_Dispute>;
  id: string;
  livemode: boolean;
  merchant_amount: number; // int
  merchant_currency: string;
  merchant_data: Issuing_authorization_merchant_data;
  metadata: {
    [key: string]: string;
  };
  network_data?: Issuing_transaction_network_data &
    Partial<Issuing_transaction_network_data>;
  object: 'issuing.transaction';
  purchase_details?: Issuing_transaction_purchase_details &
    Partial<Issuing_transaction_purchase_details>;
  token?: (string | Issuing_Token) & Partial<Issuing_Token>;
  treasury?: Issuing_transaction_treasury &
    Partial<Issuing_transaction_treasury>;
  type: 'capture' | 'refund';
  wallet?: 'apple_pay' | 'google_pay' | 'samsung_pay' | null;
};

// @ts-ignore - due to ZodSchema recursion it is required to force the type like so
export const z_Issuing_Transaction: z.ZodType<Issuing_Transaction> = z.object({
  amount: z.number().int().safe().finite(),
  amount_details: z_Issuing_transaction_amount_details.optional(),
  authorization: z
    .union([z.string(), z.lazy(() => z_Issuing_Authorization)])
    .optional(),
  balance_transaction: z
    .union([z.string(), z.lazy(() => z_Balance_transaction)])
    .optional(),
  card: z.union([z.string(), z_Issuing_Card]),
  cardholder: z.union([z.string(), z_Issuing_Cardholder]).optional(),
  created: z.number().int().safe().finite(),
  currency: z.string(),
  dispute: z.union([z.string(), z_Issuing_Dispute]).optional(),
  id: z.string(),
  livemode: z.boolean(),
  merchant_amount: z.number().int().safe().finite(),
  merchant_currency: z.string(),
  merchant_data: z_Issuing_authorization_merchant_data,
  metadata: z.record(z.string()),
  network_data: z_Issuing_transaction_network_data.optional(),
  object: z.enum(['issuing.transaction']),
  purchase_details: z_Issuing_transaction_purchase_details.optional(),
  token: z.union([z.string(), z_Issuing_Token]).optional(),
  treasury: z_Issuing_transaction_treasury.optional(),
  type: z.enum(['capture', 'refund']),
  wallet: z
    .enum(['apple_pay', 'google_pay', 'samsung_pay'])
    .nullable()
    .optional(),
});

export type Issuing_Authorization = {
  amount: number; // int
  amount_details?: Issuing_authorization_amount_details &
    Partial<Issuing_authorization_amount_details>;
  approved: boolean;
  authorization_method:
    | 'chip'
    | 'contactless'
    | 'keyed_in'
    | 'online'
    | 'swipe';
  balance_transactions: Balance_transaction[];
  card: Issuing_Card;
  cardholder?: (string | Issuing_Cardholder) & Partial<Issuing_Cardholder>;
  created: number; // int
  currency: string;
  fleet?: Issuing_authorization_fleet_data &
    Partial<Issuing_authorization_fleet_data>;
  fuel?: Issuing_authorization_fuel_data &
    Partial<Issuing_authorization_fuel_data>;
  id: string;
  livemode: boolean;
  merchant_amount: number; // int
  merchant_currency: string;
  merchant_data: Issuing_authorization_merchant_data;
  metadata: {
    [key: string]: string;
  };
  network_data?: Issuing_authorization_network_data &
    Partial<Issuing_authorization_network_data>;
  object: 'issuing.authorization';
  pending_request?: Issuing_authorization_pending_request &
    Partial<Issuing_authorization_pending_request>;
  request_history: Issuing_authorization_request[];
  status: 'closed' | 'pending' | 'reversed';
  token?: (string | Issuing_Token) & Partial<Issuing_Token>;
  transactions: Issuing_Transaction[];
  treasury?: Issuing_authorization_treasury &
    Partial<Issuing_authorization_treasury>;
  verification_data: Issuing_authorization_verification_data;
  wallet?: string | null;
};

// @ts-ignore - due to ZodSchema recursion it is required to force the type like so
export const z_Issuing_Authorization: z.ZodType<Issuing_Authorization> =
  z.object({
    amount: z.number().int().safe().finite(),
    amount_details: z_Issuing_authorization_amount_details.optional(),
    approved: z.boolean(),
    authorization_method: z.enum([
      'chip',
      'contactless',
      'keyed_in',
      'online',
      'swipe',
    ]),
    balance_transactions: z.array(z.lazy(() => z_Balance_transaction)),
    card: z_Issuing_Card,
    cardholder: z.union([z.string(), z_Issuing_Cardholder]).optional(),
    created: z.number().int().safe().finite(),
    currency: z.string(),
    fleet: z_Issuing_authorization_fleet_data.optional(),
    fuel: z_Issuing_authorization_fuel_data.optional(),
    id: z.string(),
    livemode: z.boolean(),
    merchant_amount: z.number().int().safe().finite(),
    merchant_currency: z.string(),
    merchant_data: z_Issuing_authorization_merchant_data,
    metadata: z.record(z.string()),
    network_data: z_Issuing_authorization_network_data.optional(),
    object: z.enum(['issuing.authorization']),
    pending_request: z_Issuing_authorization_pending_request.optional(),
    request_history: z.array(z_Issuing_authorization_request),
    status: z.enum(['closed', 'pending', 'reversed']),
    token: z.union([z.string(), z_Issuing_Token]).optional(),
    transactions: z.array(z_Issuing_Transaction),
    treasury: z_Issuing_authorization_treasury.optional(),
    verification_data: z_Issuing_authorization_verification_data,
    wallet: z.string().nullable().optional(),
  });

export type Issuing_Settlement = {
  bin: string;
  clearing_date: number; // int
  created: number; // int
  currency: string;
  id: string;
  interchange_fees: number; // int
  livemode: boolean;
  metadata: {
    [key: string]: string;
  };
  net_total: number; // int
  network: 'maestro' | 'visa';
  network_fees: number; // int
  network_settlement_identifier: string;
  object: 'issuing.settlement';
  settlement_service: string;
  status: 'complete' | 'pending';
  transaction_count: number; // int
  transaction_volume: number; // int
};

export const z_Issuing_Settlement = z.object({
  bin: z.string(),
  clearing_date: z.number().int().safe().finite(),
  created: z.number().int().safe().finite(),
  currency: z.string(),
  id: z.string(),
  interchange_fees: z.number().int().safe().finite(),
  livemode: z.boolean(),
  metadata: z.record(z.string()),
  net_total: z.number().int().safe().finite(),
  network: z.enum(['maestro', 'visa']),
  network_fees: z.number().int().safe().finite(),
  network_settlement_identifier: z.string(),
  object: z.enum(['issuing.settlement']),
  settlement_service: z.string(),
  status: z.enum(['complete', 'pending']),
  transaction_count: z.number().int().safe().finite(),
  transaction_volume: z.number().int().safe().finite(),
});
