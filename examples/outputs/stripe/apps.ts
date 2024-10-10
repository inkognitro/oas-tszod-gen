import {Secret_service_resource_scope} from './schemas';

export type Apps_Secret = {
  created: number; // int
  deleted?: boolean;
  expires_at?: null | number; // int
  id: string;
  livemode: boolean;
  name: string;
  object: 'apps.secret';
  payload?: string | null;
  scope: Secret_service_resource_scope;
};
