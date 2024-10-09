import {
  Application,
  Deleted_application,
  Portal_business_profile,
  Portal_features,
  Portal_login_page,
  z_Application,
  z_Deleted_application,
  z_Portal_business_profile,
  z_Portal_features,
  z_Portal_login_page,
  Portal_flows_flow,
  z_Portal_flows_flow,
} from '@example-outputs/stripe-with-zod';
import {z} from 'zod';

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

export const z_Billing_portal_Configuration = z.object({
  active: z.boolean(),
  application: z
    .union([z.string(), z_Application, z_Deleted_application])
    .optional(),
  business_profile: z_Portal_business_profile,
  created: z.number().int().safe().finite(),
  default_return_url: z.string().nullable().optional(),
  features: z_Portal_features,
  id: z.string(),
  is_default: z.boolean(),
  livemode: z.boolean(),
  login_page: z_Portal_login_page,
  metadata: z.record(z.string()).nullable().optional(),
  object: z.enum(['billing_portal.configuration']),
  updated: z.number().int().safe().finite(),
});

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

export const z_Billing_portal_Session = z.object({
  configuration: z.union([z.string(), z_Billing_portal_Configuration]),
  created: z.number().int().safe().finite(),
  customer: z.string(),
  flow: z_Portal_flows_flow.optional(),
  id: z.string(),
  livemode: z.boolean(),
  locale: z
    .enum([
      'auto',
      'bg',
      'cs',
      'da',
      'de',
      'el',
      'en',
      'en-AU',
      'en-CA',
      'en-GB',
      'en-IE',
      'en-IN',
      'en-NZ',
      'en-SG',
      'es',
      'es-419',
      'et',
      'fi',
      'fil',
      'fr',
      'fr-CA',
      'hr',
      'hu',
      'id',
      'it',
      'ja',
      'ko',
      'lt',
      'lv',
      'ms',
      'mt',
      'nb',
      'nl',
      'pl',
      'pt',
      'pt-BR',
      'ro',
      'ru',
      'sk',
      'sl',
      'sv',
      'th',
      'tr',
      'vi',
      'zh',
      'zh-HK',
      'zh-TW',
    ])
    .nullable()
    .optional(),
  object: z.enum(['billing_portal.session']),
  on_behalf_of: z.string().nullable().optional(),
  return_url: z.string().nullable().optional(),
  url: z.string(),
});
