import {z} from 'zod';

export type Error = {
'msg'?: string;
'status_code'?: number; // int
}

export const errorZodSchema = z.object({
'msg': z.string().optional(),
'status_code': z.number().int().safe().finite().optional(),
})

export type Authorizations = {
'drs_object_id'?: string;
'supported_types'?: ('None' | 'BasicAuth' | 'BearerAuth' | 'PassportAuth')[];
'passport_auth_issuers'?: (string)[];
'bearer_auth_issuers'?: (string)[];
}

export const authorizationsZodSchema = z.object({
'drs_object_id': z.string().optional(),
'supported_types': z.array(z.union([z.literal('None'),z.literal('BasicAuth'),z.literal('BearerAuth'),z.literal('PassportAuth')])).optional(),
'passport_auth_issuers': z.array(z.string()).optional(),
'bearer_auth_issuers': z.array(z.string()).optional(),
})

export type Checksum = {
'checksum': string;
'type': string;
}

export const checksumZodSchema = z.object({
'checksum': z.string(),
'type': z.string(),
})

export type AccessMethod = {
'type': 's3' | 'gs' | 'ftp' | 'gsiftp' | 'globus' | 'htsget' | 'https' | 'file';
'access_url'?: any;
'access_id'?: string;
'region'?: string;
'authorizations'?: any;
}

export const accessMethodZodSchema = z.object({
'type': z.union([z.literal('s3'),z.literal('gs'),z.literal('ftp'),z.literal('gsiftp'),z.literal('globus'),z.literal('htsget'),z.literal('https'),z.literal('file')]),
'access_url': z.any().optional(),
'access_id': z.string().optional(),
'region': z.string().optional(),
'authorizations': z.any().optional(),
})

export type ContentsObject = {
'name': string;
'id'?: string;
'drs_uri'?: (string)[];
'contents'?: (ContentsObject)[];
}

// @ts-ignore - due to schema recursion
export const contentsObjectZodSchema = z.object({
'name': z.string(),
'id': z.string().optional(),
'drs_uri': z.array(z.string()).optional(),
'contents': z.array(z.lazy(() => contentsObjectZodSchema)).optional(),
})

export type DrsObject = {
'id': string;
'name'?: string;
'self_uri': string;
'size': number; // int
'created_time': string; // date-time
'updated_time'?: string; // date-time
'version'?: string;
'mime_type'?: string;
'checksums': (Checksum)[];
'access_methods'?: (AccessMethod)[];
'contents'?: (ContentsObject)[];
'description'?: string;
'aliases'?: (string)[];
}

export const drsObjectZodSchema = z.object({
'id': z.string(),
'name': z.string().optional(),
'self_uri': z.string(),
'size': z.number().int().safe().finite(),
'created_time': z.string(), // date-time
'updated_time': z.string().optional(), // date-time
'version': z.string().optional(),
'mime_type': z.string().optional(),
'checksums': z.array(checksumZodSchema),
'access_methods': z.array(accessMethodZodSchema).optional(),
'contents': z.array(contentsObjectZodSchema).optional(),
'description': z.string().optional(),
'aliases': z.array(z.string()).optional(),
})

export type BulkObjectId = {
'passports'?: (string)[];
'bulk_object_ids'?: (string)[];
}

export const bulkObjectIdZodSchema = z.object({
'passports': z.array(z.string()).optional(),
'bulk_object_ids': z.array(z.string()).optional(),
})

export type Summary = {
'requested'?: number; // int
'resolved'?: number; // int
'unresolved'?: number; // int
}

export const summaryZodSchema = z.object({
'requested': z.number().int().safe().finite().optional(),
'resolved': z.number().int().safe().finite().optional(),
'unresolved': z.number().int().safe().finite().optional(),
})

export type Unresolved = ({
'error_code'?: number; // int
'object_ids'?: (string)[];
})[]

export const unresolvedZodSchema = z.array(z.object({
'error_code': z.number().int().safe().finite().optional(),
'object_ids': z.array(z.string()).optional(),
}))

export type AccessURL = {
'url': string;
'headers'?: (string)[];
}

export const accessURLZodSchema = z.object({
'url': z.string(),
'headers': z.array(z.string()).optional(),
})

export type BulkObjectAccessId = {
'passports'?: (string)[];
'bulk_object_access_ids'?: ({
'bulk_object_id'?: string;
'bulk_access_ids'?: (string)[];
})[];
}

export const bulkObjectAccessIdZodSchema = z.object({
'passports': z.array(z.string()).optional(),
'bulk_object_access_ids': z.array(z.object({
'bulk_object_id': z.string().optional(),
'bulk_access_ids': z.array(z.string()).optional(),
})).optional(),
})

export type BulkAccessURL = {
'drs_object_id'?: string;
'drs_access_id'?: string;
'url': string;
'headers'?: (string)[];
}

export const bulkAccessURLZodSchema = z.object({
'drs_object_id': z.string().optional(),
'drs_access_id': z.string().optional(),
'url': z.string(),
'headers': z.array(z.string()).optional(),
})