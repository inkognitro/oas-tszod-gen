import {
  Charge,
  Payment_intent,
  z_Charge,
  z_Payment_intent,
} from '@example-outputs/stripe-with-zod';
import {z} from 'zod';

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

export const z_Radar_Early_fraud_warning = z.object({
  actionable: z.boolean(),
  charge: z.union([z.string(), z_Charge]),
  created: z.number().int().safe().finite(),
  fraud_type: z.string(),
  id: z.string(),
  livemode: z.boolean(),
  object: z.enum(['radar.early_fraud_warning']),
  payment_intent: z.union([z.string(), z_Payment_intent]).optional(),
});

export type Radar_Value_list_item = {
  created: number; // int
  created_by: string;
  id: string;
  livemode: boolean;
  object: 'radar.value_list_item';
  value: string;
  value_list: string;
};

export const z_Radar_Value_list_item = z.object({
  created: z.number().int().safe().finite(),
  created_by: z.string(),
  id: z.string(),
  livemode: z.boolean(),
  object: z.enum(['radar.value_list_item']),
  value: z.string(),
  value_list: z.string(),
});

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

export const z_Radar_Value_list = z.object({
  alias: z.string(),
  created: z.number().int().safe().finite(),
  created_by: z.string(),
  id: z.string(),
  item_type: z.enum([
    'card_bin',
    'card_fingerprint',
    'case_sensitive_string',
    'country',
    'customer_id',
    'email',
    'ip_address',
    'sepa_debit_fingerprint',
    'string',
    'us_bank_account_fingerprint',
  ]),
  list_items: z.object({
    data: z.array(z_Radar_Value_list_item),
    has_more: z.boolean(),
    object: z.enum(['list']),
    url: z.string(),
  }),
  livemode: z.boolean(),
  metadata: z.record(z.string()),
  name: z.string(),
  object: z.enum(['radar.value_list']),
});
