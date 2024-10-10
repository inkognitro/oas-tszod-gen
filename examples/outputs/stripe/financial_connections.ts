import {
  Bank_connections_resource_accountholder,
  Bank_connections_resource_balance,
  Bank_connections_resource_balance_refresh,
  Bank_connections_resource_ownership_refresh,
  Bank_connections_resource_transaction_refresh,
  Bank_connections_resource_link_account_session_filters,
  Bank_connections_resource_transaction_resource_status_transitions,
} from './schemas';

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
