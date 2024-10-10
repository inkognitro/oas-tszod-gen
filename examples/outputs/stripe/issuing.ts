import {
  Issuing_authorization_amount_details,
  Balance_transaction,
  Issuing_cardholder_address,
  Issuing_cardholder_company,
  Issuing_cardholder_individual,
  Issuing_cardholder_requirements,
  Issuing_cardholder_authorization_controls,
  File,
  Issuing_personalization_design_carrier_text,
  Issuing_physical_bundle_features,
  Issuing_personalization_design_preferences,
  Issuing_personalization_design_rejection_reasons,
  Issuing_card_shipping,
  Issuing_card_authorization_controls,
  Issuing_card_wallets,
  Issuing_authorization_fleet_data,
  Issuing_authorization_fuel_data,
  Issuing_authorization_merchant_data,
  Issuing_authorization_network_data,
  Issuing_authorization_pending_request,
  Issuing_authorization_request,
  Issuing_network_token_network_data,
  Issuing_transaction_amount_details,
  Issuing_dispute_evidence,
  Issuing_dispute_treasury,
  Issuing_transaction_network_data,
  Issuing_transaction_purchase_details,
  Issuing_transaction_treasury,
  Issuing_authorization_treasury,
  Issuing_authorization_verification_data,
} from './schemas';

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

export type Issuing_Physical_bundle = {
  features: Issuing_physical_bundle_features;
  id: string;
  livemode: boolean;
  name: string;
  object: 'issuing.physical_bundle';
  status: 'active' | 'inactive' | 'review';
  type: 'custom' | 'standard';
};

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
