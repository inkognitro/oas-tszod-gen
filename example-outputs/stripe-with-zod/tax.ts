import {
  Tax_product_resource_customer_details,
  Tax_product_resource_line_item_tax_breakdown,
  z_Tax_product_resource_line_item_tax_breakdown,
  Tax_product_resource_ship_from_details,
  Tax_product_resource_tax_calculation_shipping_cost,
  Tax_product_resource_tax_breakdown,
  z_Tax_product_resource_customer_details,
  z_Tax_product_resource_ship_from_details,
  z_Tax_product_resource_tax_calculation_shipping_cost,
  z_Tax_product_resource_tax_breakdown,
  Tax_product_registrations_resource_country_options,
  z_Tax_product_registrations_resource_country_options,
  Tax_product_resource_tax_settings_defaults,
  Tax_product_resource_tax_settings_head_office,
  Tax_product_resource_tax_settings_status_details,
  z_Tax_product_resource_tax_settings_defaults,
  z_Tax_product_resource_tax_settings_head_office,
  z_Tax_product_resource_tax_settings_status_details,
  Tax_product_resource_tax_transaction_line_item_resource_reversal,
  z_Tax_product_resource_tax_transaction_line_item_resource_reversal,
  Tax_product_resource_tax_transaction_resource_reversal,
  Tax_product_resource_tax_transaction_shipping_cost,
  z_Tax_product_resource_tax_transaction_resource_reversal,
  z_Tax_product_resource_tax_transaction_shipping_cost,
} from '@example-outputs/stripe-with-zod';
import {z} from 'zod';

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

export const z_Tax_Calculation_line_item = z.object({
  amount: z.number().int().safe().finite(),
  amount_tax: z.number().int().safe().finite(),
  id: z.string(),
  livemode: z.boolean(),
  object: z.enum(['tax.calculation_line_item']),
  product: z.string().nullable().optional(),
  quantity: z.number().int().safe().finite(),
  reference: z.string().nullable().optional(),
  tax_behavior: z.enum(['exclusive', 'inclusive']),
  tax_breakdown: z
    .array(z_Tax_product_resource_line_item_tax_breakdown)
    .nullable()
    .optional(),
  tax_code: z.string(),
});

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

export const z_Tax_Calculation = z.object({
  amount_total: z.number().int().safe().finite(),
  currency: z.string(),
  customer: z.string().nullable().optional(),
  customer_details: z_Tax_product_resource_customer_details,
  expires_at: z.number().int().safe().finite().nullable().optional(),
  id: z.string().nullable().optional(),
  line_items: z
    .object({
      data: z.array(z_Tax_Calculation_line_item),
      has_more: z.boolean(),
      object: z.enum(['list']),
      url: z
        .string()
        .regex(/\^\/v1\/tax\/calculations\/\[\^\/\]\+\/line_items/),
    })
    .nullable()
    .optional(),
  livemode: z.boolean(),
  object: z.enum(['tax.calculation']),
  ship_from_details: z_Tax_product_resource_ship_from_details.optional(),
  shipping_cost:
    z_Tax_product_resource_tax_calculation_shipping_cost.optional(),
  tax_amount_exclusive: z.number().int().safe().finite(),
  tax_amount_inclusive: z.number().int().safe().finite(),
  tax_breakdown: z.array(z_Tax_product_resource_tax_breakdown),
  tax_date: z.number().int().safe().finite(),
});

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

export const z_Tax_Registration = z.object({
  active_from: z.number().int().safe().finite(),
  country: z.string(),
  country_options: z_Tax_product_registrations_resource_country_options,
  created: z.number().int().safe().finite(),
  expires_at: z.number().int().safe().finite().nullable().optional(),
  id: z.string(),
  livemode: z.boolean(),
  object: z.enum(['tax.registration']),
  status: z.enum(['active', 'expired', 'scheduled']),
});

export type Tax_Settings = {
  defaults: Tax_product_resource_tax_settings_defaults;
  head_office?: Tax_product_resource_tax_settings_head_office &
    Partial<Tax_product_resource_tax_settings_head_office>;
  livemode: boolean;
  object: 'tax.settings';
  status: 'active' | 'pending';
  status_details: Tax_product_resource_tax_settings_status_details;
};

export const z_Tax_Settings = z.object({
  defaults: z_Tax_product_resource_tax_settings_defaults,
  head_office: z_Tax_product_resource_tax_settings_head_office.optional(),
  livemode: z.boolean(),
  object: z.enum(['tax.settings']),
  status: z.enum(['active', 'pending']),
  status_details: z_Tax_product_resource_tax_settings_status_details,
});

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

export const z_Tax_Transaction_line_item = z.object({
  amount: z.number().int().safe().finite(),
  amount_tax: z.number().int().safe().finite(),
  id: z.string(),
  livemode: z.boolean(),
  metadata: z.record(z.string()).nullable().optional(),
  object: z.enum(['tax.transaction_line_item']),
  product: z.string().nullable().optional(),
  quantity: z.number().int().safe().finite(),
  reference: z.string(),
  reversal:
    z_Tax_product_resource_tax_transaction_line_item_resource_reversal.optional(),
  tax_behavior: z.enum(['exclusive', 'inclusive']),
  tax_code: z.string(),
  type: z.enum(['reversal', 'transaction']),
});

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

export const z_Tax_Transaction = z.object({
  created: z.number().int().safe().finite(),
  currency: z.string(),
  customer: z.string().nullable().optional(),
  customer_details: z_Tax_product_resource_customer_details,
  id: z.string(),
  line_items: z
    .object({
      data: z.array(z_Tax_Transaction_line_item),
      has_more: z.boolean(),
      object: z.enum(['list']),
      url: z
        .string()
        .regex(/\^\/v1\/tax\/transactions\/\[\^\/\]\+\/line_items/),
    })
    .nullable()
    .optional(),
  livemode: z.boolean(),
  metadata: z.record(z.string()).nullable().optional(),
  object: z.enum(['tax.transaction']),
  posted_at: z.number().int().safe().finite(),
  reference: z.string(),
  reversal: z_Tax_product_resource_tax_transaction_resource_reversal.optional(),
  ship_from_details: z_Tax_product_resource_ship_from_details.optional(),
  shipping_cost:
    z_Tax_product_resource_tax_transaction_shipping_cost.optional(),
  tax_date: z.number().int().safe().finite(),
  type: z.enum(['reversal', 'transaction']),
});
