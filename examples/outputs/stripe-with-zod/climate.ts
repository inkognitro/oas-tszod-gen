import {
  Climate_removals_beneficiary,
  Climate_removals_order_deliveries,
  Climate_removals_location,
  z_Climate_removals_location,
  Climate_removals_products_price,
  z_Climate_removals_products_price,
  z_Climate_removals_beneficiary,
  z_Climate_removals_order_deliveries,
} from './schemas';
import {z} from 'zod';

export type Climate_Supplier = {
  id: string;
  info_url: string;
  livemode: boolean;
  locations: Climate_removals_location[];
  name: string;
  object: 'climate.supplier';
  removal_pathway:
    | 'biomass_carbon_removal_and_storage'
    | 'direct_air_capture'
    | 'enhanced_weathering';
};

export const z_Climate_Supplier = z.object({
  id: z.string(),
  info_url: z.string(),
  livemode: z.boolean(),
  locations: z.array(z_Climate_removals_location),
  name: z.string(),
  object: z.enum(['climate.supplier']),
  removal_pathway: z.enum([
    'biomass_carbon_removal_and_storage',
    'direct_air_capture',
    'enhanced_weathering',
  ]),
});

export type Climate_Product = {
  created: number; // int
  current_prices_per_metric_ton: {
    [key: string]: Climate_removals_products_price;
  };
  delivery_year?: null | number; // int
  id: string;
  livemode: boolean;
  metric_tons_available: string; // decimal
  name: string;
  object: 'climate.product';
  suppliers: Climate_Supplier[];
};

export const z_Climate_Product = z.object({
  created: z.number().int().safe().finite(),
  current_prices_per_metric_ton: z.record(z_Climate_removals_products_price),
  delivery_year: z.number().int().safe().finite().nullable().optional(),
  id: z.string(),
  livemode: z.boolean(),
  metric_tons_available: z.string(),
  name: z.string(),
  object: z.enum(['climate.product']),
  suppliers: z.array(z_Climate_Supplier),
});

export type Climate_Order = {
  amount_fees: number; // int
  amount_subtotal: number; // int
  amount_total: number; // int
  beneficiary?: Climate_removals_beneficiary;
  canceled_at?: null | number; // int
  cancellation_reason?: 'expired' | 'product_unavailable' | 'requested' | null;
  certificate?: string | null;
  confirmed_at?: null | number; // int
  created: number; // int
  currency: string;
  delayed_at?: null | number; // int
  delivered_at?: null | number; // int
  delivery_details: Climate_removals_order_deliveries[];
  expected_delivery_year: number; // int
  id: string;
  livemode: boolean;
  metadata: {
    [key: string]: string;
  };
  metric_tons: string; // decimal
  object: 'climate.order';
  product: (string | Climate_Product) & Partial<Climate_Product>;
  product_substituted_at?: null | number; // int
  status: 'awaiting_funds' | 'canceled' | 'confirmed' | 'delivered' | 'open';
};

export const z_Climate_Order = z.object({
  amount_fees: z.number().int().safe().finite(),
  amount_subtotal: z.number().int().safe().finite(),
  amount_total: z.number().int().safe().finite(),
  beneficiary: z_Climate_removals_beneficiary.optional(),
  canceled_at: z.number().int().safe().finite().nullable().optional(),
  cancellation_reason: z
    .enum(['expired', 'product_unavailable', 'requested'])
    .nullable()
    .optional(),
  certificate: z.string().nullable().optional(),
  confirmed_at: z.number().int().safe().finite().nullable().optional(),
  created: z.number().int().safe().finite(),
  currency: z.string(),
  delayed_at: z.number().int().safe().finite().nullable().optional(),
  delivered_at: z.number().int().safe().finite().nullable().optional(),
  delivery_details: z.array(z_Climate_removals_order_deliveries),
  expected_delivery_year: z.number().int().safe().finite(),
  id: z.string(),
  livemode: z.boolean(),
  metadata: z.record(z.string()),
  metric_tons: z.string(),
  object: z.enum(['climate.order']),
  product: z.union([z.string(), z_Climate_Product]),
  product_substituted_at: z
    .number()
    .int()
    .safe()
    .finite()
    .nullable()
    .optional(),
  status: z.enum([
    'awaiting_funds',
    'canceled',
    'confirmed',
    'delivered',
    'open',
  ]),
});
