import {z} from 'zod';

export type BulkObjectId = {
  passports?: string[];
  bulk_object_ids?: string[];
};

export const z_BulkObjectId = z.object({
  passports: z.array(z.string()).optional(),
  bulk_object_ids: z.array(z.string()).optional(),
});

export type BulkObjectAccessId = {
  passports?: string[];
  bulk_object_access_ids?: {
    bulk_object_id?: string;
    bulk_access_ids?: string[];
  }[];
};

export const z_BulkObjectAccessId = z.object({
  passports: z.array(z.string()).optional(),
  bulk_object_access_ids: z
    .array(
      z.object({
        bulk_object_id: z.string().optional(),
        bulk_access_ids: z.array(z.string()).optional(),
      })
    )
    .optional(),
});
