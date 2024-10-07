export type BulkObjectId = {
  passports?: string[];
  bulk_object_ids?: string[];
};

export type BulkObjectAccessId = {
  passports?: string[];
  bulk_object_access_ids?: {
    bulk_object_id?: string;
    bulk_access_ids?: string[];
  }[];
};
