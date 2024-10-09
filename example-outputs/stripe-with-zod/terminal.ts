import {
  Terminal_configuration_configuration_resource_device_type_specific_config,
  Terminal_configuration_configuration_resource_offline_config,
  Terminal_configuration_configuration_resource_reboot_window,
  Terminal_configuration_configuration_resource_tipping,
  z_Terminal_configuration_configuration_resource_device_type_specific_config,
  z_Terminal_configuration_configuration_resource_offline_config,
  z_Terminal_configuration_configuration_resource_reboot_window,
  z_Terminal_configuration_configuration_resource_tipping,
  Address,
  z_Address,
  Terminal_reader_reader_resource_reader_action,
  z_Terminal_reader_reader_resource_reader_action,
} from '@example-outputs/stripe-with-zod';
import {z} from 'zod';

export type Terminal_Configuration = {
  bbpos_wisepos_e?: Terminal_configuration_configuration_resource_device_type_specific_config;
  id: string;
  is_account_default?: null | boolean;
  livemode: boolean;
  name?: string | null;
  object: 'terminal.configuration';
  offline?: Terminal_configuration_configuration_resource_offline_config;
  reboot_window?: Terminal_configuration_configuration_resource_reboot_window;
  stripe_s700?: Terminal_configuration_configuration_resource_device_type_specific_config;
  tipping?: Terminal_configuration_configuration_resource_tipping;
  verifone_p400?: Terminal_configuration_configuration_resource_device_type_specific_config;
};

export const z_Terminal_Configuration = z.object({
  bbpos_wisepos_e:
    z_Terminal_configuration_configuration_resource_device_type_specific_config.optional(),
  id: z.string(),
  is_account_default: z.boolean().nullable().optional(),
  livemode: z.boolean(),
  name: z.string().nullable().optional(),
  object: z.enum(['terminal.configuration']),
  offline:
    z_Terminal_configuration_configuration_resource_offline_config.optional(),
  reboot_window:
    z_Terminal_configuration_configuration_resource_reboot_window.optional(),
  stripe_s700:
    z_Terminal_configuration_configuration_resource_device_type_specific_config.optional(),
  tipping: z_Terminal_configuration_configuration_resource_tipping.optional(),
  verifone_p400:
    z_Terminal_configuration_configuration_resource_device_type_specific_config.optional(),
});

export type Terminal_Connection_token = {
  location?: string;
  object: 'terminal.connection_token';
  secret: string;
};

export const z_Terminal_Connection_token = z.object({
  location: z.string().optional(),
  object: z.enum(['terminal.connection_token']),
  secret: z.string(),
});

export type Terminal_Location = {
  address: Address;
  configuration_overrides?: string;
  display_name: string;
  id: string;
  livemode: boolean;
  metadata: {
    [key: string]: string;
  };
  object: 'terminal.location';
};

export const z_Terminal_Location = z.object({
  address: z_Address,
  configuration_overrides: z.string().optional(),
  display_name: z.string(),
  id: z.string(),
  livemode: z.boolean(),
  metadata: z.record(z.string()),
  object: z.enum(['terminal.location']),
});

export type Terminal_Reader = {
  action?: Terminal_reader_reader_resource_reader_action &
    Partial<Terminal_reader_reader_resource_reader_action>;
  device_sw_version?: string | null;
  device_type:
    | 'bbpos_chipper2x'
    | 'bbpos_wisepad3'
    | 'bbpos_wisepos_e'
    | 'mobile_phone_reader'
    | 'simulated_wisepos_e'
    | 'stripe_m2'
    | 'stripe_s700'
    | 'verifone_P400';
  id: string;
  ip_address?: string | null;
  label: string;
  livemode: boolean;
  location?: (string | Terminal_Location) & Partial<Terminal_Location>;
  metadata: {
    [key: string]: string;
  };
  object: 'terminal.reader';
  serial_number: string;
  status?: 'offline' | 'online' | null;
};

export const z_Terminal_Reader = z.object({
  action: z_Terminal_reader_reader_resource_reader_action.optional(),
  device_sw_version: z.string().nullable().optional(),
  device_type: z.enum([
    'bbpos_chipper2x',
    'bbpos_wisepad3',
    'bbpos_wisepos_e',
    'mobile_phone_reader',
    'simulated_wisepos_e',
    'stripe_m2',
    'stripe_s700',
    'verifone_P400',
  ]),
  id: z.string(),
  ip_address: z.string().nullable().optional(),
  label: z.string(),
  livemode: z.boolean(),
  location: z.union([z.string(), z_Terminal_Location]).optional(),
  metadata: z.record(z.string()),
  object: z.enum(['terminal.reader']),
  serial_number: z.string(),
  status: z.enum(['offline', 'online']).nullable().optional(),
});
