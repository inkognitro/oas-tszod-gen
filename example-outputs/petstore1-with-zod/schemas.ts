import {z} from 'zod';

export type ServiceType = {
  group: string;
  artifact: string;
  version: string;
};

export const serviceTypeZodSchema = z.object({
  group: z.string(),
  artifact: z.string(),
  version: z.string(),
});

export type Service = {
  id: string;
  name: string;
  type: ServiceType;
  description?: string;
  organization: {
    name: string;
    url: string; // uri
  };
  contactUrl?: string; // uri
  documentationUrl?: string; // uri
  createdAt?: string; // date-time
  updatedAt?: string; // date-time
  environment?: string;
  version: string;
};

export const serviceZodSchema = z.object({
  id: z.string(),
  name: z.string(),
  type: serviceTypeZodSchema,
  description: z.string().optional(),
  organization: z.object({
    name: z.string(),
    url: z.string(), // uri
  }),
  contactUrl: z.string().optional(), // uri
  documentationUrl: z.string().optional(), // uri
  createdAt: z.string().datetime().optional(), // date-time
  updatedAt: z.string().datetime().optional(), // date-time
  environment: z.string().optional(),
  version: z.string(),
});

export type DrsService = {
  maxBulkRequestLength: number; // int
  type: {
    artifact: 'drs';
  };
};

export const drsServiceZodSchema = z.object({
  maxBulkRequestLength: z.number().int().safe().finite(),
  type: z.object({
    artifact: z.enum(['drs']),
  }),
});

export type Error = {
  msg?: string;
  status_code?: number; // int
};

export const errorZodSchema = z.object({
  msg: z.string().optional(),
  status_code: z.number().int().safe().finite().optional(),
});

export type Authorizations = {
  drs_object_id?: string;
  supported_types?: ('None' | 'BasicAuth' | 'BearerAuth' | 'PassportAuth')[];
  passport_auth_issuers?: string[];
  bearer_auth_issuers?: string[];
};

export const authorizationsZodSchema = z.object({
  drs_object_id: z.string().optional(),
  supported_types: z
    .array(z.enum(['None', 'BasicAuth', 'BearerAuth', 'PassportAuth']))
    .optional(),
  passport_auth_issuers: z.array(z.string()).optional(),
  bearer_auth_issuers: z.array(z.string()).optional(),
});

export type Checksum = {
  checksum: string;
  type: string;
};

export const checksumZodSchema = z.object({
  checksum: z.string(),
  type: z.string(),
});

export type AccessURL = {
  url: string;
  headers?: string[];
};

export const accessURLZodSchema = z.object({
  url: z.string(),
  headers: z.array(z.string()).optional(),
});

export type AccessMethod = {
  type: 's3' | 'gs' | 'ftp' | 'gsiftp' | 'globus' | 'htsget' | 'https' | 'file';
  access_url?: AccessURL;
  access_id?: string;
  region?: string;
  authorizations?: Authorizations;
};

export const accessMethodZodSchema = z.object({
  type: z.enum([
    's3',
    'gs',
    'ftp',
    'gsiftp',
    'globus',
    'htsget',
    'https',
    'file',
  ]),
  access_url: accessURLZodSchema.optional(),
  access_id: z.string().optional(),
  region: z.string().optional(),
  authorizations: authorizationsZodSchema.optional(),
});

export type ContentsObject = {
  name: string;
  id?: string;
  drs_uri?: string[];
  contents?: ContentsObject[];
};

// @ts-ignore - due to schema recursion
export const contentsObjectZodSchema = z.object({
  name: z.string(),
  id: z.string().optional(),
  drs_uri: z.array(z.string()).optional(),
  contents: z.array(z.lazy(() => contentsObjectZodSchema)).optional(),
});

export type DrsObject = {
  id: string;
  name?: string;
  self_uri: string;
  size: number; // int
  created_time: string; // date-time
  updated_time?: string; // date-time
  version?: string;
  mime_type?: string;
  checksums: Checksum[];
  access_methods?: AccessMethod[];
  contents?: ContentsObject[];
  description?: string;
  aliases?: string[];
};

export const drsObjectZodSchema = z.object({
  id: z.string(),
  name: z.string().optional(),
  self_uri: z.string(),
  size: z.number().int().safe().finite(),
  created_time: z.string().datetime(), // date-time
  updated_time: z.string().datetime().optional(), // date-time
  version: z.string().optional(),
  mime_type: z.string().optional(),
  checksums: z.array(checksumZodSchema).min(1),
  access_methods: z.array(accessMethodZodSchema).min(1).optional(),
  contents: z.array(contentsObjectZodSchema).optional(),
  description: z.string().optional(),
  aliases: z.array(z.string()).optional(),
});

export type BulkObjectId = {
  passports?: string[];
  bulk_object_ids?: string[];
};

export const bulkObjectIdZodSchema = z.object({
  passports: z.array(z.string()).optional(),
  bulk_object_ids: z.array(z.string()).optional(),
});

export type Summary = {
  requested?: number; // int
  resolved?: number; // int
  unresolved?: number; // int
};

export const summaryZodSchema = z.object({
  requested: z.number().int().safe().finite().optional(),
  resolved: z.number().int().safe().finite().optional(),
  unresolved: z.number().int().safe().finite().optional(),
});

export type Unresolved = {
  error_code?: number; // int
  object_ids?: string[];
}[];

export const unresolvedZodSchema = z.array(
  z.object({
    error_code: z.number().int().safe().finite().optional(),
    object_ids: z.array(z.string()).optional(),
  })
);

export type BulkObjectAccessId = {
  passports?: string[];
  bulk_object_access_ids?: {
    bulk_object_id?: string;
    bulk_access_ids?: string[];
  }[];
};

export const bulkObjectAccessIdZodSchema = z.object({
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

export type BulkAccessURL = {
  drs_object_id?: string;
  drs_access_id?: string;
  url: string;
  headers?: string[];
};

export const bulkAccessURLZodSchema = z.object({
  drs_object_id: z.string().optional(),
  drs_access_id: z.string().optional(),
  url: z.string(),
  headers: z.array(z.string()).optional(),
});
