import {z} from 'zod';

export type Category = {
  id?: number; // int
  name?: string;
};

export const z_Category = z.object({
  id: z.number().int().safe().finite().optional(),
  name: z.string().optional(),
});

export type Tag = {
  id?: number; // int
  name?: string;
};

export const z_Tag = z.object({
  id: z.number().int().safe().finite().optional(),
  name: z.string().optional(),
});

export type Pet = {
  id?: number; // int
  name: string;
  category?: Category;
  photoUrls: string[];
  tags?: Tag[];
  status?: 'available' | 'pending' | 'sold';
};

export const z_Pet = z.object({
  id: z.number().int().safe().finite().optional(),
  name: z.string(),
  category: z_Category.optional(),
  photoUrls: z.array(z.string()),
  tags: z.array(z_Tag).optional(),
  status: z.enum(['available', 'pending', 'sold']).optional(),
});

export type ApiResponse = {
  code?: number; // int
  type?: string;
  message?: string;
};

export const z_ApiResponse = z.object({
  code: z.number().int().safe().finite().optional(),
  type: z.string().optional(),
  message: z.string().optional(),
});

export type Order = {
  id?: number; // int
  petId?: number; // int
  quantity?: number; // int
  shipDate?: string; // date-time
  status?: 'placed' | 'approved' | 'delivered';
  complete?: boolean;
};

export const z_Order = z.object({
  id: z.number().int().safe().finite().optional(),
  petId: z.number().int().safe().finite().optional(),
  quantity: z.number().int().safe().finite().optional(),
  shipDate: z.string().datetime().optional(), // date-time
  status: z.enum(['placed', 'approved', 'delivered']).optional(),
  complete: z.boolean().optional(),
});

export type User = {
  id?: number; // int
  username?: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  password?: string;
  phone?: string;
  userStatus?: number; // int
};

export const z_User = z.object({
  id: z.number().int().safe().finite().optional(),
  username: z.string().optional(),
  firstName: z.string().optional(),
  lastName: z.string().optional(),
  email: z.string().optional(),
  password: z.string().optional(),
  phone: z.string().optional(),
  userStatus: z.number().int().safe().finite().optional(),
});
