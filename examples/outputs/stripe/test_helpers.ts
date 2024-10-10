import {Billing_clocks_resource_status_details_status_details} from './schemas';

export type Test_helpers_Test_clock = {
  created: number; // int
  deletes_after: number; // int
  frozen_time: number; // int
  id: string;
  livemode: boolean;
  name?: string | null;
  object: 'test_helpers.test_clock';
  status: 'advancing' | 'internal_failure' | 'ready';
  status_details: Billing_clocks_resource_status_details_status_details;
};
