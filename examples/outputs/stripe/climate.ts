import {
  Climate_removals_beneficiary,
  Climate_removals_order_deliveries,
  Climate_removals_location,
  Climate_removals_products_price,
} from './schemas';

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
