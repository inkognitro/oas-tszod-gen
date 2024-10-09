import {z} from 'zod';

export type Deleted_test_helpers_Test_clock = {
  deleted: boolean;
  id: string;
  object: 'test_helpers.test_clock';
};

export const z_Deleted_test_helpers_Test_clock = z.object({
  deleted: z.boolean(),
  id: z.string(),
  object: z.enum(['test_helpers.test_clock']),
});
