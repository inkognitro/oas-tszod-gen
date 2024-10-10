export type Category = {
  id?: number; // int
  name?: string;
};

export type Tag = {
  id?: number; // int
  name?: string;
};

export type Pet = {
  id?: number; // int
  name: string;
  category?: Category;
  photoUrls: string[];
  tags?: Tag[];
  status?: 'available' | 'pending' | 'sold';
};

export type ApiResponse = {
  code?: number; // int
  type?: string;
  message?: string;
};

export type Order = {
  id?: number; // int
  petId?: number; // int
  quantity?: number; // int
  shipDate?: string; // date-time
  status?: 'placed' | 'approved' | 'delivered';
  complete?: boolean;
};

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
