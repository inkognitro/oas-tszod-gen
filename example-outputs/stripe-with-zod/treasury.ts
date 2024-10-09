import {
  Treasury_inbound_transfers_resource_failure_details,
  Treasury_inbound_transfers_resource_inbound_transfer_resource_linked_flows,
  Inbound_transfers,
  Treasury_inbound_transfers_resource_inbound_transfer_resource_status_transitions,
  Treasury_transactions_resource_balance_impact,
  Treasury_transactions_resource_flow_details,
  Treasury_received_credits_resource_status_transitions,
  z_Treasury_received_credits_resource_status_transitions,
  Treasury_received_debits_resource_debit_reversal_linked_flows,
  Treasury_received_debits_resource_status_transitions,
  z_Treasury_received_debits_resource_debit_reversal_linked_flows,
  z_Treasury_received_debits_resource_status_transitions,
  Outbound_payments_payment_method_details,
  Treasury_outbound_payments_resource_outbound_payment_resource_end_user_details,
  Treasury_outbound_payments_resource_returned_status,
  Treasury_outbound_payments_resource_outbound_payment_resource_status_transitions,
  Treasury_outbound_payments_resource_outbound_payment_resource_tracking_details,
  z_Outbound_payments_payment_method_details,
  z_Treasury_outbound_payments_resource_outbound_payment_resource_end_user_details,
  z_Treasury_outbound_payments_resource_returned_status,
  z_Treasury_outbound_payments_resource_outbound_payment_resource_status_transitions,
  z_Treasury_outbound_payments_resource_outbound_payment_resource_tracking_details,
  Outbound_transfers_payment_method_details,
  Treasury_outbound_transfers_resource_returned_details,
  Treasury_outbound_transfers_resource_status_transitions,
  Treasury_outbound_transfers_resource_outbound_transfer_resource_tracking_details,
  z_Outbound_transfers_payment_method_details,
  z_Treasury_outbound_transfers_resource_returned_details,
  z_Treasury_outbound_transfers_resource_status_transitions,
  z_Treasury_outbound_transfers_resource_outbound_transfer_resource_tracking_details,
  Treasury_shared_resource_initiating_payment_method_details_initiating_payment_method_details,
  Treasury_received_credits_resource_linked_flows,
  Treasury_received_credits_resource_reversal_details,
  z_Treasury_shared_resource_initiating_payment_method_details_initiating_payment_method_details,
  z_Treasury_received_credits_resource_linked_flows,
  z_Treasury_received_credits_resource_reversal_details,
  Treasury_received_debits_resource_linked_flows,
  Treasury_received_debits_resource_reversal_details,
  z_Treasury_received_debits_resource_linked_flows,
  z_Treasury_received_debits_resource_reversal_details,
  z_Treasury_transactions_resource_balance_impact,
  z_Treasury_transactions_resource_flow_details,
  Treasury_transactions_resource_abstract_transaction_resource_status_transitions,
  z_Treasury_transactions_resource_abstract_transaction_resource_status_transitions,
  z_Treasury_inbound_transfers_resource_failure_details,
  z_Treasury_inbound_transfers_resource_inbound_transfer_resource_linked_flows,
  z_Inbound_transfers,
  z_Treasury_inbound_transfers_resource_inbound_transfer_resource_status_transitions,
  Treasury_financial_accounts_resource_balance,
  Treasury_financial_accounts_resource_toggle_settings,
  Treasury_financial_accounts_resource_financial_addresses_features,
  Treasury_financial_accounts_resource_inbound_transfers,
  Treasury_financial_accounts_resource_outbound_payments,
  Treasury_financial_accounts_resource_outbound_transfers,
  z_Treasury_financial_accounts_resource_toggle_settings,
  z_Treasury_financial_accounts_resource_financial_addresses_features,
  z_Treasury_financial_accounts_resource_inbound_transfers,
  z_Treasury_financial_accounts_resource_outbound_payments,
  z_Treasury_financial_accounts_resource_outbound_transfers,
  Treasury_financial_accounts_resource_financial_address,
  Treasury_financial_accounts_resource_platform_restrictions,
  Treasury_financial_accounts_resource_status_details,
  z_Treasury_financial_accounts_resource_balance,
  z_Treasury_financial_accounts_resource_financial_address,
  z_Treasury_financial_accounts_resource_platform_restrictions,
  z_Treasury_financial_accounts_resource_status_details,
} from '@example-outputs/stripe-with-zod';
import {z} from 'zod';

export type Treasury_Credit_reversal = {
  amount: number; // int
  created: number; // int
  currency: string;
  financial_account: string;
  hosted_regulatory_receipt_url?: string | null;
  id: string;
  livemode: boolean;
  metadata: {
    [key: string]: string;
  };
  network: 'ach' | 'stripe';
  object: 'treasury.credit_reversal';
  received_credit: string;
  status: 'canceled' | 'posted' | 'processing';
  status_transitions: Treasury_received_credits_resource_status_transitions;
  transaction?: (string | Treasury_Transaction) & Partial<Treasury_Transaction>;
};

// @ts-ignore - due to ZodSchema recursion it is required to force the type like so
export const z_Treasury_Credit_reversal: z.ZodType<Treasury_Credit_reversal> =
  z.object({
    amount: z.number().int().safe().finite(),
    created: z.number().int().safe().finite(),
    currency: z.string(),
    financial_account: z.string(),
    hosted_regulatory_receipt_url: z.string().nullable().optional(),
    id: z.string(),
    livemode: z.boolean(),
    metadata: z.record(z.string()),
    network: z.enum(['ach', 'stripe']),
    object: z.enum(['treasury.credit_reversal']),
    received_credit: z.string(),
    status: z.enum(['canceled', 'posted', 'processing']),
    status_transitions: z_Treasury_received_credits_resource_status_transitions,
    transaction: z
      .union([z.string(), z.lazy(() => z_Treasury_Transaction)])
      .optional(),
  });

export type Treasury_Debit_reversal = {
  amount: number; // int
  created: number; // int
  currency: string;
  financial_account?: string | null;
  hosted_regulatory_receipt_url?: string | null;
  id: string;
  linked_flows?: Treasury_received_debits_resource_debit_reversal_linked_flows &
    Partial<Treasury_received_debits_resource_debit_reversal_linked_flows>;
  livemode: boolean;
  metadata: {
    [key: string]: string;
  };
  network: 'ach' | 'card';
  object: 'treasury.debit_reversal';
  received_debit: string;
  status: 'failed' | 'processing' | 'succeeded';
  status_transitions: Treasury_received_debits_resource_status_transitions;
  transaction?: (string | Treasury_Transaction) & Partial<Treasury_Transaction>;
};

// @ts-ignore - due to ZodSchema recursion it is required to force the type like so
export const z_Treasury_Debit_reversal: z.ZodType<Treasury_Debit_reversal> =
  z.object({
    amount: z.number().int().safe().finite(),
    created: z.number().int().safe().finite(),
    currency: z.string(),
    financial_account: z.string().nullable().optional(),
    hosted_regulatory_receipt_url: z.string().nullable().optional(),
    id: z.string(),
    linked_flows:
      z_Treasury_received_debits_resource_debit_reversal_linked_flows.optional(),
    livemode: z.boolean(),
    metadata: z.record(z.string()),
    network: z.enum(['ach', 'card']),
    object: z.enum(['treasury.debit_reversal']),
    received_debit: z.string(),
    status: z.enum(['failed', 'processing', 'succeeded']),
    status_transitions: z_Treasury_received_debits_resource_status_transitions,
    transaction: z
      .union([z.string(), z.lazy(() => z_Treasury_Transaction)])
      .optional(),
  });

export type Treasury_Outbound_payment = {
  amount: number; // int
  cancelable: boolean;
  created: number; // int
  currency: string;
  customer?: string | null;
  description?: string | null;
  destination_payment_method?: string | null;
  destination_payment_method_details?: Outbound_payments_payment_method_details &
    Partial<Outbound_payments_payment_method_details>;
  end_user_details?: Treasury_outbound_payments_resource_outbound_payment_resource_end_user_details &
    Partial<Treasury_outbound_payments_resource_outbound_payment_resource_end_user_details>;
  expected_arrival_date: number; // int
  financial_account: string;
  hosted_regulatory_receipt_url?: string | null;
  id: string;
  livemode: boolean;
  metadata: {
    [key: string]: string;
  };
  object: 'treasury.outbound_payment';
  returned_details?: Treasury_outbound_payments_resource_returned_status &
    Partial<Treasury_outbound_payments_resource_returned_status>;
  statement_descriptor: string;
  status: 'canceled' | 'failed' | 'posted' | 'processing' | 'returned';
  status_transitions: Treasury_outbound_payments_resource_outbound_payment_resource_status_transitions;
  tracking_details?: Treasury_outbound_payments_resource_outbound_payment_resource_tracking_details &
    Partial<Treasury_outbound_payments_resource_outbound_payment_resource_tracking_details>;
  transaction: (string | Treasury_Transaction) & Partial<Treasury_Transaction>;
};

// @ts-ignore - due to ZodSchema recursion it is required to force the type like so
export const z_Treasury_Outbound_payment: z.ZodType<Treasury_Outbound_payment> =
  z.object({
    amount: z.number().int().safe().finite(),
    cancelable: z.boolean(),
    created: z.number().int().safe().finite(),
    currency: z.string(),
    customer: z.string().nullable().optional(),
    description: z.string().nullable().optional(),
    destination_payment_method: z.string().nullable().optional(),
    destination_payment_method_details:
      z_Outbound_payments_payment_method_details.optional(),
    end_user_details:
      z_Treasury_outbound_payments_resource_outbound_payment_resource_end_user_details.optional(),
    expected_arrival_date: z.number().int().safe().finite(),
    financial_account: z.string(),
    hosted_regulatory_receipt_url: z.string().nullable().optional(),
    id: z.string(),
    livemode: z.boolean(),
    metadata: z.record(z.string()),
    object: z.enum(['treasury.outbound_payment']),
    returned_details:
      z_Treasury_outbound_payments_resource_returned_status.optional(),
    statement_descriptor: z.string(),
    status: z.enum(['canceled', 'failed', 'posted', 'processing', 'returned']),
    status_transitions:
      z_Treasury_outbound_payments_resource_outbound_payment_resource_status_transitions,
    tracking_details:
      z_Treasury_outbound_payments_resource_outbound_payment_resource_tracking_details.optional(),
    transaction: z.union([z.string(), z.lazy(() => z_Treasury_Transaction)]),
  });

export type Treasury_Outbound_transfer = {
  amount: number; // int
  cancelable: boolean;
  created: number; // int
  currency: string;
  description?: string | null;
  destination_payment_method?: string | null;
  destination_payment_method_details: Outbound_transfers_payment_method_details;
  expected_arrival_date: number; // int
  financial_account: string;
  hosted_regulatory_receipt_url?: string | null;
  id: string;
  livemode: boolean;
  metadata: {
    [key: string]: string;
  };
  object: 'treasury.outbound_transfer';
  returned_details?: Treasury_outbound_transfers_resource_returned_details &
    Partial<Treasury_outbound_transfers_resource_returned_details>;
  statement_descriptor: string;
  status: 'canceled' | 'failed' | 'posted' | 'processing' | 'returned';
  status_transitions: Treasury_outbound_transfers_resource_status_transitions;
  tracking_details?: Treasury_outbound_transfers_resource_outbound_transfer_resource_tracking_details &
    Partial<Treasury_outbound_transfers_resource_outbound_transfer_resource_tracking_details>;
  transaction: (string | Treasury_Transaction) & Partial<Treasury_Transaction>;
};

// @ts-ignore - due to ZodSchema recursion it is required to force the type like so
export const z_Treasury_Outbound_transfer: z.ZodType<Treasury_Outbound_transfer> =
  z.object({
    amount: z.number().int().safe().finite(),
    cancelable: z.boolean(),
    created: z.number().int().safe().finite(),
    currency: z.string(),
    description: z.string().nullable().optional(),
    destination_payment_method: z.string().nullable().optional(),
    destination_payment_method_details:
      z_Outbound_transfers_payment_method_details,
    expected_arrival_date: z.number().int().safe().finite(),
    financial_account: z.string(),
    hosted_regulatory_receipt_url: z.string().nullable().optional(),
    id: z.string(),
    livemode: z.boolean(),
    metadata: z.record(z.string()),
    object: z.enum(['treasury.outbound_transfer']),
    returned_details:
      z_Treasury_outbound_transfers_resource_returned_details.optional(),
    statement_descriptor: z.string(),
    status: z.enum(['canceled', 'failed', 'posted', 'processing', 'returned']),
    status_transitions:
      z_Treasury_outbound_transfers_resource_status_transitions,
    tracking_details:
      z_Treasury_outbound_transfers_resource_outbound_transfer_resource_tracking_details.optional(),
    transaction: z.union([z.string(), z.lazy(() => z_Treasury_Transaction)]),
  });

export type Treasury_Received_credit = {
  amount: number; // int
  created: number; // int
  currency: string;
  description: string;
  failure_code?: 'account_closed' | 'account_frozen' | 'other' | null;
  financial_account?: string | null;
  hosted_regulatory_receipt_url?: string | null;
  id: string;
  initiating_payment_method_details: Treasury_shared_resource_initiating_payment_method_details_initiating_payment_method_details;
  linked_flows: Treasury_received_credits_resource_linked_flows;
  livemode: boolean;
  network: 'ach' | 'card' | 'stripe' | 'us_domestic_wire';
  object: 'treasury.received_credit';
  reversal_details?: Treasury_received_credits_resource_reversal_details &
    Partial<Treasury_received_credits_resource_reversal_details>;
  status: 'failed' | 'succeeded';
  transaction?: (string | Treasury_Transaction) & Partial<Treasury_Transaction>;
};

// @ts-ignore - due to ZodSchema recursion it is required to force the type like so
export const z_Treasury_Received_credit: z.ZodType<Treasury_Received_credit> =
  z.object({
    amount: z.number().int().safe().finite(),
    created: z.number().int().safe().finite(),
    currency: z.string(),
    description: z.string(),
    failure_code: z
      .enum(['account_closed', 'account_frozen', 'other'])
      .nullable()
      .optional(),
    financial_account: z.string().nullable().optional(),
    hosted_regulatory_receipt_url: z.string().nullable().optional(),
    id: z.string(),
    initiating_payment_method_details:
      z_Treasury_shared_resource_initiating_payment_method_details_initiating_payment_method_details,
    linked_flows: z_Treasury_received_credits_resource_linked_flows,
    livemode: z.boolean(),
    network: z.enum(['ach', 'card', 'stripe', 'us_domestic_wire']),
    object: z.enum(['treasury.received_credit']),
    reversal_details:
      z_Treasury_received_credits_resource_reversal_details.optional(),
    status: z.enum(['failed', 'succeeded']),
    transaction: z
      .union([z.string(), z.lazy(() => z_Treasury_Transaction)])
      .optional(),
  });

export type Treasury_Received_debit = {
  amount: number; // int
  created: number; // int
  currency: string;
  description: string;
  failure_code?:
    | 'account_closed'
    | 'account_frozen'
    | 'insufficient_funds'
    | 'international_transaction'
    | 'other'
    | null;
  financial_account?: string | null;
  hosted_regulatory_receipt_url?: string | null;
  id: string;
  initiating_payment_method_details?: Treasury_shared_resource_initiating_payment_method_details_initiating_payment_method_details;
  linked_flows: Treasury_received_debits_resource_linked_flows;
  livemode: boolean;
  network: 'ach' | 'card' | 'stripe';
  object: 'treasury.received_debit';
  reversal_details?: Treasury_received_debits_resource_reversal_details &
    Partial<Treasury_received_debits_resource_reversal_details>;
  status: 'failed' | 'succeeded';
  transaction?: (string | Treasury_Transaction) & Partial<Treasury_Transaction>;
};

// @ts-ignore - due to ZodSchema recursion it is required to force the type like so
export const z_Treasury_Received_debit: z.ZodType<Treasury_Received_debit> =
  z.object({
    amount: z.number().int().safe().finite(),
    created: z.number().int().safe().finite(),
    currency: z.string(),
    description: z.string(),
    failure_code: z
      .enum([
        'account_closed',
        'account_frozen',
        'insufficient_funds',
        'international_transaction',
        'other',
      ])
      .nullable()
      .optional(),
    financial_account: z.string().nullable().optional(),
    hosted_regulatory_receipt_url: z.string().nullable().optional(),
    id: z.string(),
    initiating_payment_method_details:
      z_Treasury_shared_resource_initiating_payment_method_details_initiating_payment_method_details.optional(),
    linked_flows: z_Treasury_received_debits_resource_linked_flows,
    livemode: z.boolean(),
    network: z.enum(['ach', 'card', 'stripe']),
    object: z.enum(['treasury.received_debit']),
    reversal_details:
      z_Treasury_received_debits_resource_reversal_details.optional(),
    status: z.enum(['failed', 'succeeded']),
    transaction: z
      .union([z.string(), z.lazy(() => z_Treasury_Transaction)])
      .optional(),
  });

export type Treasury_Transaction_entry = {
  balance_impact: Treasury_transactions_resource_balance_impact;
  created: number; // int
  currency: string;
  effective_at: number; // int
  financial_account: string;
  flow?: string | null;
  flow_details?: Treasury_transactions_resource_flow_details &
    Partial<Treasury_transactions_resource_flow_details>;
  flow_type:
    | 'credit_reversal'
    | 'debit_reversal'
    | 'inbound_transfer'
    | 'issuing_authorization'
    | 'other'
    | 'outbound_payment'
    | 'outbound_transfer'
    | 'received_credit'
    | 'received_debit';
  id: string;
  livemode: boolean;
  object: 'treasury.transaction_entry';
  transaction: (string | Treasury_Transaction) & Partial<Treasury_Transaction>;
  type:
    | 'credit_reversal'
    | 'credit_reversal_posting'
    | 'debit_reversal'
    | 'inbound_transfer'
    | 'inbound_transfer_return'
    | 'issuing_authorization_hold'
    | 'issuing_authorization_release'
    | 'other'
    | 'outbound_payment'
    | 'outbound_payment_cancellation'
    | 'outbound_payment_failure'
    | 'outbound_payment_posting'
    | 'outbound_payment_return'
    | 'outbound_transfer'
    | 'outbound_transfer_cancellation'
    | 'outbound_transfer_failure'
    | 'outbound_transfer_posting'
    | 'outbound_transfer_return'
    | 'received_credit'
    | 'received_debit';
};

// @ts-ignore - due to ZodSchema recursion it is required to force the type like so
export const z_Treasury_Transaction_entry: z.ZodType<Treasury_Transaction_entry> =
  z.object({
    balance_impact: z_Treasury_transactions_resource_balance_impact,
    created: z.number().int().safe().finite(),
    currency: z.string(),
    effective_at: z.number().int().safe().finite(),
    financial_account: z.string(),
    flow: z.string().nullable().optional(),
    flow_details: z_Treasury_transactions_resource_flow_details.optional(),
    flow_type: z.enum([
      'credit_reversal',
      'debit_reversal',
      'inbound_transfer',
      'issuing_authorization',
      'other',
      'outbound_payment',
      'outbound_transfer',
      'received_credit',
      'received_debit',
    ]),
    id: z.string(),
    livemode: z.boolean(),
    object: z.enum(['treasury.transaction_entry']),
    transaction: z.union([z.string(), z.lazy(() => z_Treasury_Transaction)]),
    type: z.enum([
      'credit_reversal',
      'credit_reversal_posting',
      'debit_reversal',
      'inbound_transfer',
      'inbound_transfer_return',
      'issuing_authorization_hold',
      'issuing_authorization_release',
      'other',
      'outbound_payment',
      'outbound_payment_cancellation',
      'outbound_payment_failure',
      'outbound_payment_posting',
      'outbound_payment_return',
      'outbound_transfer',
      'outbound_transfer_cancellation',
      'outbound_transfer_failure',
      'outbound_transfer_posting',
      'outbound_transfer_return',
      'received_credit',
      'received_debit',
    ]),
  });

export type Treasury_Transaction = {
  amount: number; // int
  balance_impact: Treasury_transactions_resource_balance_impact;
  created: number; // int
  currency: string;
  description: string;
  entries?: {
    data: Treasury_Transaction_entry[];
    has_more: boolean;
    object: 'list';
    url: string;
  } | null;
  financial_account: string;
  flow?: string | null;
  flow_details?: Treasury_transactions_resource_flow_details &
    Partial<Treasury_transactions_resource_flow_details>;
  flow_type:
    | 'credit_reversal'
    | 'debit_reversal'
    | 'inbound_transfer'
    | 'issuing_authorization'
    | 'other'
    | 'outbound_payment'
    | 'outbound_transfer'
    | 'received_credit'
    | 'received_debit';
  id: string;
  livemode: boolean;
  object: 'treasury.transaction';
  status: 'open' | 'posted' | 'void';
  status_transitions: Treasury_transactions_resource_abstract_transaction_resource_status_transitions;
};

export const z_Treasury_Transaction = z.object({
  amount: z.number().int().safe().finite(),
  balance_impact: z_Treasury_transactions_resource_balance_impact,
  created: z.number().int().safe().finite(),
  currency: z.string(),
  description: z.string(),
  entries: z
    .object({
      data: z.array(z_Treasury_Transaction_entry),
      has_more: z.boolean(),
      object: z.enum(['list']),
      url: z.string().regex(/\^\/v1\/treasury\/transaction_entries/),
    })
    .nullable()
    .optional(),
  financial_account: z.string(),
  flow: z.string().nullable().optional(),
  flow_details: z_Treasury_transactions_resource_flow_details.optional(),
  flow_type: z.enum([
    'credit_reversal',
    'debit_reversal',
    'inbound_transfer',
    'issuing_authorization',
    'other',
    'outbound_payment',
    'outbound_transfer',
    'received_credit',
    'received_debit',
  ]),
  id: z.string(),
  livemode: z.boolean(),
  object: z.enum(['treasury.transaction']),
  status: z.enum(['open', 'posted', 'void']),
  status_transitions:
    z_Treasury_transactions_resource_abstract_transaction_resource_status_transitions,
});

export type Treasury_Inbound_transfer = {
  amount: number; // int
  cancelable: boolean;
  created: number; // int
  currency: string;
  description?: string | null;
  failure_details?: Treasury_inbound_transfers_resource_failure_details &
    Partial<Treasury_inbound_transfers_resource_failure_details>;
  financial_account: string;
  hosted_regulatory_receipt_url?: string | null;
  id: string;
  linked_flows: Treasury_inbound_transfers_resource_inbound_transfer_resource_linked_flows;
  livemode: boolean;
  metadata: {
    [key: string]: string;
  };
  object: 'treasury.inbound_transfer';
  origin_payment_method: string;
  origin_payment_method_details?: Inbound_transfers &
    Partial<Inbound_transfers>;
  returned?: null | boolean;
  statement_descriptor: string;
  status: 'canceled' | 'failed' | 'processing' | 'succeeded';
  status_transitions: Treasury_inbound_transfers_resource_inbound_transfer_resource_status_transitions;
  transaction?: (string | Treasury_Transaction) & Partial<Treasury_Transaction>;
};

export const z_Treasury_Inbound_transfer = z.object({
  amount: z.number().int().safe().finite(),
  cancelable: z.boolean(),
  created: z.number().int().safe().finite(),
  currency: z.string(),
  description: z.string().nullable().optional(),
  failure_details:
    z_Treasury_inbound_transfers_resource_failure_details.optional(),
  financial_account: z.string(),
  hosted_regulatory_receipt_url: z.string().nullable().optional(),
  id: z.string(),
  linked_flows:
    z_Treasury_inbound_transfers_resource_inbound_transfer_resource_linked_flows,
  livemode: z.boolean(),
  metadata: z.record(z.string()),
  object: z.enum(['treasury.inbound_transfer']),
  origin_payment_method: z.string(),
  origin_payment_method_details: z_Inbound_transfers.optional(),
  returned: z.boolean().nullable().optional(),
  statement_descriptor: z.string(),
  status: z.enum(['canceled', 'failed', 'processing', 'succeeded']),
  status_transitions:
    z_Treasury_inbound_transfers_resource_inbound_transfer_resource_status_transitions,
  transaction: z.union([z.string(), z_Treasury_Transaction]).optional(),
});

export type Treasury_Financial_account_features = {
  card_issuing?: Treasury_financial_accounts_resource_toggle_settings;
  deposit_insurance?: Treasury_financial_accounts_resource_toggle_settings;
  financial_addresses?: Treasury_financial_accounts_resource_financial_addresses_features;
  inbound_transfers?: Treasury_financial_accounts_resource_inbound_transfers;
  intra_stripe_flows?: Treasury_financial_accounts_resource_toggle_settings;
  object: 'treasury.financial_account_features';
  outbound_payments?: Treasury_financial_accounts_resource_outbound_payments;
  outbound_transfers?: Treasury_financial_accounts_resource_outbound_transfers;
};

export const z_Treasury_Financial_account_features = z.object({
  card_issuing:
    z_Treasury_financial_accounts_resource_toggle_settings.optional(),
  deposit_insurance:
    z_Treasury_financial_accounts_resource_toggle_settings.optional(),
  financial_addresses:
    z_Treasury_financial_accounts_resource_financial_addresses_features.optional(),
  inbound_transfers:
    z_Treasury_financial_accounts_resource_inbound_transfers.optional(),
  intra_stripe_flows:
    z_Treasury_financial_accounts_resource_toggle_settings.optional(),
  object: z.enum(['treasury.financial_account_features']),
  outbound_payments:
    z_Treasury_financial_accounts_resource_outbound_payments.optional(),
  outbound_transfers:
    z_Treasury_financial_accounts_resource_outbound_transfers.optional(),
});

export type Treasury_Financial_account = {
  active_features?: (
    | 'card_issuing'
    | 'deposit_insurance'
    | 'financial_addresses.aba'
    | 'financial_addresses.aba.forwarding'
    | 'inbound_transfers.ach'
    | 'intra_stripe_flows'
    | 'outbound_payments.ach'
    | 'outbound_payments.us_domestic_wire'
    | 'outbound_transfers.ach'
    | 'outbound_transfers.us_domestic_wire'
    | 'remote_deposit_capture'
  )[];
  balance: Treasury_financial_accounts_resource_balance;
  country: string;
  created: number; // int
  features?: Treasury_Financial_account_features;
  financial_addresses: Treasury_financial_accounts_resource_financial_address[];
  id: string;
  livemode: boolean;
  metadata?: {
    [key: string]: string;
  } | null;
  object: 'treasury.financial_account';
  pending_features?: (
    | 'card_issuing'
    | 'deposit_insurance'
    | 'financial_addresses.aba'
    | 'financial_addresses.aba.forwarding'
    | 'inbound_transfers.ach'
    | 'intra_stripe_flows'
    | 'outbound_payments.ach'
    | 'outbound_payments.us_domestic_wire'
    | 'outbound_transfers.ach'
    | 'outbound_transfers.us_domestic_wire'
    | 'remote_deposit_capture'
  )[];
  platform_restrictions?: Treasury_financial_accounts_resource_platform_restrictions &
    Partial<Treasury_financial_accounts_resource_platform_restrictions>;
  restricted_features?: (
    | 'card_issuing'
    | 'deposit_insurance'
    | 'financial_addresses.aba'
    | 'financial_addresses.aba.forwarding'
    | 'inbound_transfers.ach'
    | 'intra_stripe_flows'
    | 'outbound_payments.ach'
    | 'outbound_payments.us_domestic_wire'
    | 'outbound_transfers.ach'
    | 'outbound_transfers.us_domestic_wire'
    | 'remote_deposit_capture'
  )[];
  status: 'closed' | 'open';
  status_details: Treasury_financial_accounts_resource_status_details;
  supported_currencies: string[];
};

export const z_Treasury_Financial_account = z.object({
  active_features: z
    .array(
      z.enum([
        'card_issuing',
        'deposit_insurance',
        'financial_addresses.aba',
        'financial_addresses.aba.forwarding',
        'inbound_transfers.ach',
        'intra_stripe_flows',
        'outbound_payments.ach',
        'outbound_payments.us_domestic_wire',
        'outbound_transfers.ach',
        'outbound_transfers.us_domestic_wire',
        'remote_deposit_capture',
      ])
    )
    .optional(),
  balance: z_Treasury_financial_accounts_resource_balance,
  country: z.string(),
  created: z.number().int().safe().finite(),
  features: z_Treasury_Financial_account_features.optional(),
  financial_addresses: z.array(
    z_Treasury_financial_accounts_resource_financial_address
  ),
  id: z.string(),
  livemode: z.boolean(),
  metadata: z.record(z.string()).nullable().optional(),
  object: z.enum(['treasury.financial_account']),
  pending_features: z
    .array(
      z.enum([
        'card_issuing',
        'deposit_insurance',
        'financial_addresses.aba',
        'financial_addresses.aba.forwarding',
        'inbound_transfers.ach',
        'intra_stripe_flows',
        'outbound_payments.ach',
        'outbound_payments.us_domestic_wire',
        'outbound_transfers.ach',
        'outbound_transfers.us_domestic_wire',
        'remote_deposit_capture',
      ])
    )
    .optional(),
  platform_restrictions:
    z_Treasury_financial_accounts_resource_platform_restrictions.optional(),
  restricted_features: z
    .array(
      z.enum([
        'card_issuing',
        'deposit_insurance',
        'financial_addresses.aba',
        'financial_addresses.aba.forwarding',
        'inbound_transfers.ach',
        'intra_stripe_flows',
        'outbound_payments.ach',
        'outbound_payments.us_domestic_wire',
        'outbound_transfers.ach',
        'outbound_transfers.us_domestic_wire',
        'remote_deposit_capture',
      ])
    )
    .optional(),
  status: z.enum(['closed', 'open']),
  status_details: z_Treasury_financial_accounts_resource_status_details,
  supported_currencies: z.array(z.string()),
});
