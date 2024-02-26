export type SchemaType = 'object' | 'string' | 'boolean';

export type GenericSchema<T extends SchemaType, P extends object = {}> = P & {
  type: T;
};
