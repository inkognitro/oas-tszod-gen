import {
  Secret_service_resource_scope,
  z_Secret_service_resource_scope,
} from './schemas';
import {z} from 'zod';

export type Apps_Secret = {
  created: number; // int
  deleted?: boolean;
  expires_at?: null | number; // int
  id: string;
  livemode: boolean;
  name: string;
  object: 'apps.secret';
  payload?: string | null;
  scope: Secret_service_resource_scope;
};

export const z_Apps_Secret = z.object({
  created: z.number().int().safe().finite(),
  deleted: z.boolean().optional(),
  expires_at: z.number().int().safe().finite().nullable().optional(),
  id: z.string(),
  livemode: z.boolean(),
  name: z.string(),
  object: z.enum(['apps.secret']),
  payload: z.string().nullable().optional(),
  scope: z_Secret_service_resource_scope,
});
