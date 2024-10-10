import {
  Billing_clocks_resource_status_details_status_details,
  z_Billing_clocks_resource_status_details_status_details,
} from './schemas';
import {z} from 'zod';

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

export const z_Test_helpers_Test_clock = z.object({
  created: z.number().int().safe().finite(),
  deletes_after: z.number().int().safe().finite(),
  frozen_time: z.number().int().safe().finite(),
  id: z.string(),
  livemode: z.boolean(),
  name: z.string().nullable().optional(),
  object: z.enum(['test_helpers.test_clock']),
  status: z.enum(['advancing', 'internal_failure', 'ready']),
  status_details: z_Billing_clocks_resource_status_details_status_details,
});
