import {z} from 'zod';

export type Deleted_terminal_Configuration = {
  deleted: boolean;
  id: string;
  object: 'terminal.configuration';
};

export const z_Deleted_terminal_Configuration = z.object({
  deleted: z.boolean(),
  id: z.string(),
  object: z.enum(['terminal.configuration']),
});

export type Deleted_terminal_Location = {
  deleted: boolean;
  id: string;
  object: 'terminal.location';
};

export const z_Deleted_terminal_Location = z.object({
  deleted: z.boolean(),
  id: z.string(),
  object: z.enum(['terminal.location']),
});

export type Deleted_terminal_Reader = {
  deleted: boolean;
  id: string;
  object: 'terminal.reader';
};

export const z_Deleted_terminal_Reader = z.object({
  deleted: z.boolean(),
  id: z.string(),
  object: z.enum(['terminal.reader']),
});
