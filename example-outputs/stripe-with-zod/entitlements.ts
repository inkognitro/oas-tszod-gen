import {z} from 'zod';

export type Entitlements_Feature = {
  active: boolean;
  id: string;
  livemode: boolean;
  lookup_key: string;
  metadata: {
    [key: string]: string;
  };
  name: string;
  object: 'entitlements.feature';
};

export const z_Entitlements_Feature = z.object({
  active: z.boolean(),
  id: z.string(),
  livemode: z.boolean(),
  lookup_key: z.string(),
  metadata: z.record(z.string()),
  name: z.string(),
  object: z.enum(['entitlements.feature']),
});

export type Entitlements_Active_entitlement = {
  feature: (string | Entitlements_Feature) & Partial<Entitlements_Feature>;
  id: string;
  livemode: boolean;
  lookup_key: string;
  object: 'entitlements.active_entitlement';
};

export const z_Entitlements_Active_entitlement = z.object({
  feature: z.union([z.string(), z_Entitlements_Feature]),
  id: z.string(),
  livemode: z.boolean(),
  lookup_key: z.string(),
  object: z.enum(['entitlements.active_entitlement']),
});
