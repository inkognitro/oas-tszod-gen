import {
  Thresholds_resource_alert_filter,
  Thresholds_resource_usage_threshold_config,
  Billing_meter_resource_customer_mapping_settings,
  Billing_meter_resource_aggregation_settings,
  Billing_meter_resource_billing_meter_status_transitions,
  Billing_meter_resource_billing_meter_value,
  z_Billing_meter_resource_customer_mapping_settings,
  z_Billing_meter_resource_aggregation_settings,
  z_Billing_meter_resource_billing_meter_status_transitions,
  z_Billing_meter_resource_billing_meter_value,
  z_Thresholds_resource_alert_filter,
  z_Thresholds_resource_usage_threshold_config,
  Billing_meter_resource_billing_meter_event_adjustment_cancel,
  z_Billing_meter_resource_billing_meter_event_adjustment_cancel,
} from '@example-outputs/stripe-with-zod';
import {z} from 'zod';

export type Billing_Meter = {
  created: number; // int
  customer_mapping: Billing_meter_resource_customer_mapping_settings;
  default_aggregation: Billing_meter_resource_aggregation_settings;
  display_name: string;
  event_name: string;
  event_time_window?: 'day' | 'hour' | null;
  id: string;
  livemode: boolean;
  object: 'billing.meter';
  status: 'active' | 'inactive';
  status_transitions: Billing_meter_resource_billing_meter_status_transitions;
  updated: number; // int
  value_settings: Billing_meter_resource_billing_meter_value;
};

export const z_Billing_Meter = z.object({
  created: z.number().int().safe().finite(),
  customer_mapping: z_Billing_meter_resource_customer_mapping_settings,
  default_aggregation: z_Billing_meter_resource_aggregation_settings,
  display_name: z.string(),
  event_name: z.string(),
  event_time_window: z.enum(['day', 'hour']).nullable().optional(),
  id: z.string(),
  livemode: z.boolean(),
  object: z.enum(['billing.meter']),
  status: z.enum(['active', 'inactive']),
  status_transitions: z_Billing_meter_resource_billing_meter_status_transitions,
  updated: z.number().int().safe().finite(),
  value_settings: z_Billing_meter_resource_billing_meter_value,
});

export type Billing_Alert = {
  alert_type: 'usage_threshold';
  filter?: Thresholds_resource_alert_filter &
    Partial<Thresholds_resource_alert_filter>;
  id: string;
  livemode: boolean;
  object: 'billing.alert';
  status?: 'active' | 'archived' | 'inactive' | null;
  title: string;
  usage_threshold_config?: Thresholds_resource_usage_threshold_config &
    Partial<Thresholds_resource_usage_threshold_config>;
};

export const z_Billing_Alert = z.object({
  alert_type: z.enum(['usage_threshold']),
  filter: z_Thresholds_resource_alert_filter.optional(),
  id: z.string(),
  livemode: z.boolean(),
  object: z.enum(['billing.alert']),
  status: z.enum(['active', 'archived', 'inactive']).nullable().optional(),
  title: z.string(),
  usage_threshold_config:
    z_Thresholds_resource_usage_threshold_config.optional(),
});

export type Billing_Meter_event_adjustment = {
  cancel?: Billing_meter_resource_billing_meter_event_adjustment_cancel &
    Partial<Billing_meter_resource_billing_meter_event_adjustment_cancel>;
  event_name: string;
  livemode: boolean;
  object: 'billing.meter_event_adjustment';
  status: 'complete' | 'pending';
  type: 'cancel';
};

export const z_Billing_Meter_event_adjustment = z.object({
  cancel:
    z_Billing_meter_resource_billing_meter_event_adjustment_cancel.optional(),
  event_name: z.string(),
  livemode: z.boolean(),
  object: z.enum(['billing.meter_event_adjustment']),
  status: z.enum(['complete', 'pending']),
  type: z.enum(['cancel']),
});

export type Billing_Meter_event = {
  created: number; // int
  event_name: string;
  identifier: string;
  livemode: boolean;
  object: 'billing.meter_event';
  payload: {
    [key: string]: string;
  };
  timestamp: number; // int
};

export const z_Billing_Meter_event = z.object({
  created: z.number().int().safe().finite(),
  event_name: z.string(),
  identifier: z.string(),
  livemode: z.boolean(),
  object: z.enum(['billing.meter_event']),
  payload: z.record(z.string()),
  timestamp: z.number().int().safe().finite(),
});

export type Billing_Meter_event_summary = {
  aggregated_value: number;
  end_time: number; // int
  id: string;
  livemode: boolean;
  meter: string;
  object: 'billing.meter_event_summary';
  start_time: number; // int
};

export const z_Billing_Meter_event_summary = z.object({
  aggregated_value: z.number().safe().finite(),
  end_time: z.number().int().safe().finite(),
  id: z.string(),
  livemode: z.boolean(),
  meter: z.string(),
  object: z.enum(['billing.meter_event_summary']),
  start_time: z.number().int().safe().finite(),
});
