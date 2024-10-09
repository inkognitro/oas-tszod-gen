import {Charge, Payment_intent} from '@example-outputs/stripe';

export type Radar_Early_fraud_warning = {
  actionable: boolean;
  charge: (string | Charge) & Partial<Charge>;
  created: number; // int
  fraud_type: string;
  id: string;
  livemode: boolean;
  object: 'radar.early_fraud_warning';
  payment_intent?: (string | Payment_intent) & Partial<Payment_intent>;
};

export type Radar_Value_list_item = {
  created: number; // int
  created_by: string;
  id: string;
  livemode: boolean;
  object: 'radar.value_list_item';
  value: string;
  value_list: string;
};

export type Radar_Value_list = {
  alias: string;
  created: number; // int
  created_by: string;
  id: string;
  item_type:
    | 'card_bin'
    | 'card_fingerprint'
    | 'case_sensitive_string'
    | 'country'
    | 'customer_id'
    | 'email'
    | 'ip_address'
    | 'sepa_debit_fingerprint'
    | 'string'
    | 'us_bank_account_fingerprint';
  list_items: {
    data: Radar_Value_list_item[];
    has_more: boolean;
    object: 'list';
    url: string;
  };
  livemode: boolean;
  metadata: {
    [key: string]: string;
  };
  name: string;
  object: 'radar.value_list';
};
