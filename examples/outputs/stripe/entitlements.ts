export type Entitlements_Feature = {
  active: boolean;
  id: string;
  livemode: boolean;
  lookup_key: string;
  metadata: {
    [key: string]: string;
  };
  name: string;
  object: 'entitlements.feature';
};

export type Entitlements_Active_entitlement = {
  feature: (string | Entitlements_Feature) & Partial<Entitlements_Feature>;
  id: string;
  livemode: boolean;
  lookup_key: string;
  object: 'entitlements.active_entitlement';
};
