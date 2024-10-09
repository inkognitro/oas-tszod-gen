import {z} from 'zod';

export type Deleted_radar_Value_list_item = {
  deleted: boolean;
  id: string;
  object: 'radar.value_list_item';
};

export const z_Deleted_radar_Value_list_item = z.object({
  deleted: z.boolean(),
  id: z.string(),
  object: z.enum(['radar.value_list_item']),
});

export type Deleted_radar_Value_list = {
  deleted: boolean;
  id: string;
  object: 'radar.value_list';
};

export const z_Deleted_radar_Value_list = z.object({
  deleted: z.boolean(),
  id: z.string(),
  object: z.enum(['radar.value_list']),
});
