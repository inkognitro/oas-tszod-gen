import {
  Tax_product_resource_customer_details,
  Tax_product_resource_line_item_tax_breakdown,
  Tax_product_resource_ship_from_details,
  Tax_product_resource_tax_calculation_shipping_cost,
  Tax_product_resource_tax_breakdown,
  Tax_product_registrations_resource_country_options,
  Tax_product_resource_tax_settings_defaults,
  Tax_product_resource_tax_settings_head_office,
  Tax_product_resource_tax_settings_status_details,
  Tax_product_resource_tax_transaction_line_item_resource_reversal,
  Tax_product_resource_tax_transaction_resource_reversal,
  Tax_product_resource_tax_transaction_shipping_cost,
} from './schemas';

export type Tax_Calculation_line_item = {
  amount: number; // int
  amount_tax: number; // int
  id: string;
  livemode: boolean;
  object: 'tax.calculation_line_item';
  product?: string | null;
  quantity: number; // int
  reference?: string | null;
  tax_behavior: 'exclusive' | 'inclusive';
  tax_breakdown?: Tax_product_resource_line_item_tax_breakdown[] | null;
  tax_code: string;
};

export type Tax_Calculation = {
  amount_total: number; // int
  currency: string;
  customer?: string | null;
  customer_details: Tax_product_resource_customer_details;
  expires_at?: null | number; // int
  id?: string | null;
  line_items?: {
    data: Tax_Calculation_line_item[];
    has_more: boolean;
    object: 'list';
    url: string;
  } | null;
  livemode: boolean;
  object: 'tax.calculation';
  ship_from_details?: Tax_product_resource_ship_from_details &
    Partial<Tax_product_resource_ship_from_details>;
  shipping_cost?: Tax_product_resource_tax_calculation_shipping_cost &
    Partial<Tax_product_resource_tax_calculation_shipping_cost>;
  tax_amount_exclusive: number; // int
  tax_amount_inclusive: number; // int
  tax_breakdown: Tax_product_resource_tax_breakdown[];
  tax_date: number; // int
};

export type Tax_Registration = {
  active_from: number; // int
  country: string;
  country_options: Tax_product_registrations_resource_country_options;
  created: number; // int
  expires_at?: null | number; // int
  id: string;
  livemode: boolean;
  object: 'tax.registration';
  status: 'active' | 'expired' | 'scheduled';
};

export type Tax_Settings = {
  defaults: Tax_product_resource_tax_settings_defaults;
  head_office?: Tax_product_resource_tax_settings_head_office &
    Partial<Tax_product_resource_tax_settings_head_office>;
  livemode: boolean;
  object: 'tax.settings';
  status: 'active' | 'pending';
  status_details: Tax_product_resource_tax_settings_status_details;
};

export type Tax_Transaction_line_item = {
  amount: number; // int
  amount_tax: number; // int
  id: string;
  livemode: boolean;
  metadata?: {
    [key: string]: string;
  } | null;
  object: 'tax.transaction_line_item';
  product?: string | null;
  quantity: number; // int
  reference: string;
  reversal?: Tax_product_resource_tax_transaction_line_item_resource_reversal &
    Partial<Tax_product_resource_tax_transaction_line_item_resource_reversal>;
  tax_behavior: 'exclusive' | 'inclusive';
  tax_code: string;
  type: 'reversal' | 'transaction';
};

export type Tax_Transaction = {
  created: number; // int
  currency: string;
  customer?: string | null;
  customer_details: Tax_product_resource_customer_details;
  id: string;
  line_items?: {
    data: Tax_Transaction_line_item[];
    has_more: boolean;
    object: 'list';
    url: string;
  } | null;
  livemode: boolean;
  metadata?: {
    [key: string]: string;
  } | null;
  object: 'tax.transaction';
  posted_at: number; // int
  reference: string;
  reversal?: Tax_product_resource_tax_transaction_resource_reversal &
    Partial<Tax_product_resource_tax_transaction_resource_reversal>;
  ship_from_details?: Tax_product_resource_ship_from_details &
    Partial<Tax_product_resource_ship_from_details>;
  shipping_cost?: Tax_product_resource_tax_transaction_shipping_cost &
    Partial<Tax_product_resource_tax_transaction_shipping_cost>;
  tax_date: number; // int
  type: 'reversal' | 'transaction';
};
