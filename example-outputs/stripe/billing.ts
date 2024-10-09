import {
  Thresholds_resource_alert_filter,
  Thresholds_resource_usage_threshold_config,
  Billing_meter_resource_customer_mapping_settings,
  Billing_meter_resource_aggregation_settings,
  Billing_meter_resource_billing_meter_status_transitions,
  Billing_meter_resource_billing_meter_value,
  Billing_meter_resource_billing_meter_event_adjustment_cancel,
} from '@example-outputs/stripe';

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

export type Billing_Meter_event_adjustment = {
  cancel?: Billing_meter_resource_billing_meter_event_adjustment_cancel &
    Partial<Billing_meter_resource_billing_meter_event_adjustment_cancel>;
  event_name: string;
  livemode: boolean;
  object: 'billing.meter_event_adjustment';
  status: 'complete' | 'pending';
  type: 'cancel';
};

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

export type Billing_Meter_event_summary = {
  aggregated_value: number;
  end_time: number; // int
  id: string;
  livemode: boolean;
  meter: string;
  object: 'billing.meter_event_summary';
  start_time: number; // int
};
