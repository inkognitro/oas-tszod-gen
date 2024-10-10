import {RequestBodyData} from './core';
import {z} from 'zod';

export type PostObjectBodyRequestBody = RequestBodyData<
  'application/json',
  {
    expand?: boolean;
    passports?: string[];
  }
>;

export const postObjectBodyRequestBodySchema = {
  'application/json': {
    zodSchema: z.object({
      expand: z.boolean().optional(),
      passports: z.array(z.string()).optional(),
    }),
  },
};

export type PassportsRequestBody = RequestBodyData<
  'application/json',
  {
    passports?: string[];
  }
>;

export const passportsRequestBodySchema = {
  'application/json': {
    zodSchema: z.object({
      passports: z.array(z.string()).optional(),
    }),
  },
};
