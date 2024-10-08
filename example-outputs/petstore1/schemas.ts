export type ServiceType = {
  group: string;
  artifact: string;
  version: string;
};

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

export type DrsService = {
  maxBulkRequestLength: number; // int
  type: {
    artifact: 'drs';
  };
};

export type Error = {
  msg?: string;
  status_code?: number; // int
};

export type Authorizations = {
  drs_object_id?: string;
  supported_types?: ('None' | 'BasicAuth' | 'BearerAuth' | 'PassportAuth')[];
  passport_auth_issuers?: string[];
  bearer_auth_issuers?: string[];
};

export type Checksum = {
  checksum: string;
  type: string;
};

export type AccessURL = {
  url: string;
  headers?: string[];
};

export type AccessMethod = {
  type: 's3' | 'gs' | 'ftp' | 'gsiftp' | 'globus' | 'htsget' | 'https' | 'file';
  access_url?: AccessURL;
  access_id?: string;
  region?: string;
  authorizations?: Authorizations;
};

export type ContentsObject = {
  name: string;
  id?: string;
  drs_uri?: string[];
  contents?: ContentsObject[];
};

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

export type Summary = {
  requested?: number; // int
  resolved?: number; // int
  unresolved?: number; // int
};

export type Unresolved = {
  error_code?: number; // int
  object_ids?: string[];
}[];

export type BulkObjectId = {
  passports?: string[];
  bulk_object_ids?: string[];
};

export type BulkAccessURL = {
  drs_object_id?: string;
  drs_access_id?: string;
  url: string;
  headers?: string[];
};

export type BulkObjectAccessId = {
  passports?: string[];
  bulk_object_access_ids?: {
    bulk_object_id?: string;
    bulk_access_ids?: string[];
  }[];
};
