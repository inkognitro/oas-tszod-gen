import {z} from 'zod';

export type ServiceType = {
  group: string;
  artifact: string;
  version: string;
};

export const z_ServiceType = z.object({
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

export const z_Service = z.object({
  id: z.string(),
  name: z.string(),
  type: z_ServiceType,
  description: z.string().optional(),
  organization: z.object({
    name: z.string(),
    url: z.string(),
  }),
  contactUrl: z.string().optional(),
  documentationUrl: z.string().optional(),
  createdAt: z.string().datetime().optional(),
  updatedAt: z.string().datetime().optional(),
  environment: z.string().optional(),
  version: z.string(),
});

export type DrsService = {
  maxBulkRequestLength: number; // int
  type: {
    artifact: 'drs';
  };
};

export const z_DrsService = z.object({
  maxBulkRequestLength: z.number().int().safe().finite(),
  type: z.object({
    artifact: z.enum(['drs']),
  }),
});

export type Error = {
  msg?: string;
  status_code?: number; // int
};

export const z_Error = z.object({
  msg: z.string().optional(),
  status_code: z.number().int().safe().finite().optional(),
});

export type Authorizations = {
  drs_object_id?: string;
  supported_types?: ('None' | 'BasicAuth' | 'BearerAuth' | 'PassportAuth')[];
  passport_auth_issuers?: string[];
  bearer_auth_issuers?: string[];
};

export const z_Authorizations = z.object({
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

export const z_Checksum = z.object({
  checksum: z.string(),
  type: z.string(),
});

export type AccessURL = {
  url: string;
  headers?: string[];
};

export const z_AccessURL = z.object({
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

export const z_AccessMethod = z.object({
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
  access_url: z_AccessURL.optional(),
  access_id: z.string().optional(),
  region: z.string().optional(),
  authorizations: z_Authorizations.optional(),
});

export type ContentsObject = {
  name: string;
  id?: string;
  drs_uri?: string[];
  contents?: ContentsObject[];
};

// @ts-ignore - due to ZodSchema recursion it is required to force the type like so
export const z_ContentsObject: z.ZodType<ContentsObject> = z.object({
  name: z.string(),
  id: z.string().optional(),
  drs_uri: z.array(z.string()).optional(),
  contents: z.array(z.lazy(() => z_ContentsObject)).optional(),
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

export const z_DrsObject = z.object({
  id: z.string(),
  name: z.string().optional(),
  self_uri: z.string(),
  size: z.number().int().safe().finite(),
  created_time: z.string().datetime(),
  updated_time: z.string().datetime().optional(),
  version: z.string().optional(),
  mime_type: z.string().optional(),
  checksums: z.array(z_Checksum).min(1),
  access_methods: z.array(z_AccessMethod).min(1).optional(),
  contents: z.array(z_ContentsObject).optional(),
  description: z.string().optional(),
  aliases: z.array(z.string()).optional(),
});

export type BulkObjectId = {
  passports?: string[];
  bulk_object_ids?: string[];
};

export const z_BulkObjectId = z.object({
  passports: z.array(z.string()).optional(),
  bulk_object_ids: z.array(z.string()).optional(),
});

export type Summary = {
  requested?: number; // int
  resolved?: number; // int
  unresolved?: number; // int
};

export const z_Summary = z.object({
  requested: z.number().int().safe().finite().optional(),
  resolved: z.number().int().safe().finite().optional(),
  unresolved: z.number().int().safe().finite().optional(),
});

export type Unresolved = {
  error_code?: number; // int
  object_ids?: string[];
}[];

export const z_Unresolved = z.array(
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

export type BulkAccessURL = {
  drs_object_id?: string;
  drs_access_id?: string;
  url: string;
  headers?: string[];
};

export const z_BulkAccessURL = z.object({
  drs_object_id: z.string().optional(),
  drs_access_id: z.string().optional(),
  url: z.string(),
  headers: z.array(z.string()).optional(),
});
