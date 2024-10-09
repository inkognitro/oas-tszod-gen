import {
  Bank_connections_resource_accountholder,
  Bank_connections_resource_balance,
  Bank_connections_resource_balance_refresh,
  Bank_connections_resource_ownership_refresh,
  Bank_connections_resource_transaction_refresh,
  z_Bank_connections_resource_accountholder,
  z_Bank_connections_resource_balance,
  z_Bank_connections_resource_balance_refresh,
  z_Bank_connections_resource_ownership_refresh,
  z_Bank_connections_resource_transaction_refresh,
  Bank_connections_resource_link_account_session_filters,
  z_Bank_connections_resource_link_account_session_filters,
  Bank_connections_resource_transaction_resource_status_transitions,
  z_Bank_connections_resource_transaction_resource_status_transitions,
} from '@example-outputs/stripe-with-zod';
import {z} from 'zod';

export type Financial_connections_Account_owner = {
  email?: string | null;
  id: string;
  name: string;
  object: 'financial_connections.account_owner';
  ownership: string;
  phone?: string | null;
  raw_address?: string | null;
  refreshed_at?: null | number; // int
};

export const z_Financial_connections_Account_owner = z.object({
  email: z.string().nullable().optional(),
  id: z.string(),
  name: z.string(),
  object: z.enum(['financial_connections.account_owner']),
  ownership: z.string(),
  phone: z.string().nullable().optional(),
  raw_address: z.string().nullable().optional(),
  refreshed_at: z.number().int().safe().finite().nullable().optional(),
});

export type Financial_connections_Account_ownership = {
  created: number; // int
  id: string;
  object: 'financial_connections.account_ownership';
  owners: {
    data: Financial_connections_Account_owner[];
    has_more: boolean;
    object: 'list';
    url: string;
  };
};

export const z_Financial_connections_Account_ownership = z.object({
  created: z.number().int().safe().finite(),
  id: z.string(),
  object: z.enum(['financial_connections.account_ownership']),
  owners: z.object({
    data: z.array(z_Financial_connections_Account_owner),
    has_more: z.boolean(),
    object: z.enum(['list']),
    url: z.string(),
  }),
});

export type Financial_connections_Account = {
  account_holder?: Bank_connections_resource_accountholder &
    Partial<Bank_connections_resource_accountholder>;
  balance?: Bank_connections_resource_balance &
    Partial<Bank_connections_resource_balance>;
  balance_refresh?: Bank_connections_resource_balance_refresh &
    Partial<Bank_connections_resource_balance_refresh>;
  category: 'cash' | 'credit' | 'investment' | 'other';
  created: number; // int
  display_name?: string | null;
  id: string;
  institution_name: string;
  last4?: string | null;
  livemode: boolean;
  object: 'financial_connections.account';
  ownership?: (string | Financial_connections_Account_ownership) &
    Partial<Financial_connections_Account_ownership>;
  ownership_refresh?: Bank_connections_resource_ownership_refresh &
    Partial<Bank_connections_resource_ownership_refresh>;
  permissions?:
    | ('balances' | 'ownership' | 'payment_method' | 'transactions')[]
    | null;
  status: 'active' | 'disconnected' | 'inactive';
  subcategory:
    | 'checking'
    | 'credit_card'
    | 'line_of_credit'
    | 'mortgage'
    | 'other'
    | 'savings';
  subscriptions?: 'transactions'[] | null;
  supported_payment_method_types: ('link' | 'us_bank_account')[];
  transaction_refresh?: Bank_connections_resource_transaction_refresh &
    Partial<Bank_connections_resource_transaction_refresh>;
};

export const z_Financial_connections_Account = z.object({
  account_holder: z_Bank_connections_resource_accountholder.optional(),
  balance: z_Bank_connections_resource_balance.optional(),
  balance_refresh: z_Bank_connections_resource_balance_refresh.optional(),
  category: z.enum(['cash', 'credit', 'investment', 'other']),
  created: z.number().int().safe().finite(),
  display_name: z.string().nullable().optional(),
  id: z.string(),
  institution_name: z.string(),
  last4: z.string().nullable().optional(),
  livemode: z.boolean(),
  object: z.enum(['financial_connections.account']),
  ownership: z
    .union([z.string(), z_Financial_connections_Account_ownership])
    .optional(),
  ownership_refresh: z_Bank_connections_resource_ownership_refresh.optional(),
  permissions: z
    .array(z.enum(['balances', 'ownership', 'payment_method', 'transactions']))
    .nullable()
    .optional(),
  status: z.enum(['active', 'disconnected', 'inactive']),
  subcategory: z.enum([
    'checking',
    'credit_card',
    'line_of_credit',
    'mortgage',
    'other',
    'savings',
  ]),
  subscriptions: z
    .array(z.enum(['transactions']))
    .nullable()
    .optional(),
  supported_payment_method_types: z.array(z.enum(['link', 'us_bank_account'])),
  transaction_refresh:
    z_Bank_connections_resource_transaction_refresh.optional(),
});

export type Financial_connections_Session = {
  account_holder?: Bank_connections_resource_accountholder &
    Partial<Bank_connections_resource_accountholder>;
  accounts: {
    data: Financial_connections_Account[];
    has_more: boolean;
    object: 'list';
    url: string;
  };
  client_secret: string;
  filters?: Bank_connections_resource_link_account_session_filters;
  id: string;
  livemode: boolean;
  object: 'financial_connections.session';
  permissions: ('balances' | 'ownership' | 'payment_method' | 'transactions')[];
  prefetch?: ('balances' | 'ownership' | 'transactions')[] | null;
  return_url?: string;
};

export const z_Financial_connections_Session = z.object({
  account_holder: z_Bank_connections_resource_accountholder.optional(),
  accounts: z.object({
    data: z.array(z_Financial_connections_Account),
    has_more: z.boolean(),
    object: z.enum(['list']),
    url: z.string().regex(/\^\/v1\/financial_connections\/accounts/),
  }),
  client_secret: z.string(),
  filters: z_Bank_connections_resource_link_account_session_filters.optional(),
  id: z.string(),
  livemode: z.boolean(),
  object: z.enum(['financial_connections.session']),
  permissions: z.array(
    z.enum(['balances', 'ownership', 'payment_method', 'transactions'])
  ),
  prefetch: z
    .array(z.enum(['balances', 'ownership', 'transactions']))
    .nullable()
    .optional(),
  return_url: z.string().optional(),
});

export type Financial_connections_Transaction = {
  account: string;
  amount: number; // int
  currency: string;
  description: string;
  id: string;
  livemode: boolean;
  object: 'financial_connections.transaction';
  status: 'pending' | 'posted' | 'void';
  status_transitions: Bank_connections_resource_transaction_resource_status_transitions;
  transacted_at: number; // int
  transaction_refresh: string;
  updated: number; // int
};

export const z_Financial_connections_Transaction = z.object({
  account: z.string(),
  amount: z.number().int().safe().finite(),
  currency: z.string(),
  description: z.string(),
  id: z.string(),
  livemode: z.boolean(),
  object: z.enum(['financial_connections.transaction']),
  status: z.enum(['pending', 'posted', 'void']),
  status_transitions:
    z_Bank_connections_resource_transaction_resource_status_transitions,
  transacted_at: z.number().int().safe().finite(),
  transaction_refresh: z.string(),
  updated: z.number().int().safe().finite(),
});
