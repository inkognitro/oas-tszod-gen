import {
  Terminal_configuration_configuration_resource_device_type_specific_config,
  Terminal_configuration_configuration_resource_offline_config,
  Terminal_configuration_configuration_resource_reboot_window,
  Terminal_configuration_configuration_resource_tipping,
  Address,
  Terminal_reader_reader_resource_reader_action,
} from './schemas';

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

export type Terminal_Connection_token = {
  location?: string;
  object: 'terminal.connection_token';
  secret: string;
};

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
