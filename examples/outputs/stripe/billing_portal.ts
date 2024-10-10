import {
  Application,
  Deleted_application,
  Portal_business_profile,
  Portal_features,
  Portal_login_page,
  Portal_flows_flow,
} from './schemas';

export type Billing_portal_Configuration = {
  active: boolean;
  application?: (string | Application | Deleted_application) &
    (Partial<Application> & Partial<Deleted_application>);
  business_profile: Portal_business_profile;
  created: number; // int
  default_return_url?: string | null;
  features: Portal_features;
  id: string;
  is_default: boolean;
  livemode: boolean;
  login_page: Portal_login_page;
  metadata?: {
    [key: string]: string;
  } | null;
  object: 'billing_portal.configuration';
  updated: number; // int
};

export type Billing_portal_Session = {
  configuration: (string | Billing_portal_Configuration) &
    Partial<Billing_portal_Configuration>;
  created: number; // int
  customer: string;
  flow?: Portal_flows_flow & Partial<Portal_flows_flow>;
  id: string;
  livemode: boolean;
  locale?:
    | 'auto'
    | 'bg'
    | 'cs'
    | 'da'
    | 'de'
    | 'el'
    | 'en'
    | 'en-AU'
    | 'en-CA'
    | 'en-GB'
    | 'en-IE'
    | 'en-IN'
    | 'en-NZ'
    | 'en-SG'
    | 'es'
    | 'es-419'
    | 'et'
    | 'fi'
    | 'fil'
    | 'fr'
    | 'fr-CA'
    | 'hr'
    | 'hu'
    | 'id'
    | 'it'
    | 'ja'
    | 'ko'
    | 'lt'
    | 'lv'
    | 'ms'
    | 'mt'
    | 'nb'
    | 'nl'
    | 'pl'
    | 'pt'
    | 'pt-BR'
    | 'ro'
    | 'ru'
    | 'sk'
    | 'sl'
    | 'sv'
    | 'th'
    | 'tr'
    | 'vi'
    | 'zh'
    | 'zh-HK'
    | 'zh-TW'
    | null;
  object: 'billing_portal.session';
  on_behalf_of?: string | null;
  return_url?: string | null;
  url: string;
};
