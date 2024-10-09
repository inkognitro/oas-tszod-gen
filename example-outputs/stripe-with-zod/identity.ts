import {
  Gelato_document_report,
  Gelato_email_report,
  Gelato_id_number_report,
  Gelato_verification_report_options,
  Gelato_phone_report,
  Gelato_selfie_report,
  z_Gelato_document_report,
  z_Gelato_email_report,
  z_Gelato_id_number_report,
  z_Gelato_verification_report_options,
  z_Gelato_phone_report,
  z_Gelato_selfie_report,
  Gelato_session_last_error,
  Gelato_verification_session_options,
  Gelato_provided_details,
  Verification_session_redaction,
  Gelato_verified_outputs,
  z_Gelato_session_last_error,
  z_Gelato_verification_session_options,
  z_Gelato_provided_details,
  z_Verification_session_redaction,
  z_Gelato_verified_outputs,
} from '@example-outputs/stripe-with-zod';
import {z} from 'zod';

export type Identity_Verification_report = {
  client_reference_id?: string | null;
  created: number; // int
  document?: Gelato_document_report;
  email?: Gelato_email_report;
  id: string;
  id_number?: Gelato_id_number_report;
  livemode: boolean;
  object: 'identity.verification_report';
  options?: Gelato_verification_report_options;
  phone?: Gelato_phone_report;
  selfie?: Gelato_selfie_report;
  type: 'document' | 'id_number' | 'verification_flow';
  verification_flow?: string;
  verification_session?: string | null;
};

export const z_Identity_Verification_report = z.object({
  client_reference_id: z.string().nullable().optional(),
  created: z.number().int().safe().finite(),
  document: z_Gelato_document_report.optional(),
  email: z_Gelato_email_report.optional(),
  id: z.string(),
  id_number: z_Gelato_id_number_report.optional(),
  livemode: z.boolean(),
  object: z.enum(['identity.verification_report']),
  options: z_Gelato_verification_report_options.optional(),
  phone: z_Gelato_phone_report.optional(),
  selfie: z_Gelato_selfie_report.optional(),
  type: z.enum(['document', 'id_number', 'verification_flow']),
  verification_flow: z.string().optional(),
  verification_session: z.string().nullable().optional(),
});

export type Identity_Verification_session = {
  client_reference_id?: string | null;
  client_secret?: string | null;
  created: number; // int
  id: string;
  last_error?: Gelato_session_last_error & Partial<Gelato_session_last_error>;
  last_verification_report?: (string | Identity_Verification_report) &
    Partial<Identity_Verification_report>;
  livemode: boolean;
  metadata: {
    [key: string]: string;
  };
  object: 'identity.verification_session';
  options?: Gelato_verification_session_options &
    Partial<Gelato_verification_session_options>;
  provided_details?: Gelato_provided_details & Partial<Gelato_provided_details>;
  redaction?: Verification_session_redaction &
    Partial<Verification_session_redaction>;
  related_customer?: string | null;
  status: 'canceled' | 'processing' | 'requires_input' | 'verified';
  type: 'document' | 'id_number' | 'verification_flow';
  url?: string | null;
  verification_flow?: string;
  verified_outputs?: Gelato_verified_outputs & Partial<Gelato_verified_outputs>;
};

export const z_Identity_Verification_session = z.object({
  client_reference_id: z.string().nullable().optional(),
  client_secret: z.string().nullable().optional(),
  created: z.number().int().safe().finite(),
  id: z.string(),
  last_error: z_Gelato_session_last_error.optional(),
  last_verification_report: z
    .union([z.string(), z_Identity_Verification_report])
    .optional(),
  livemode: z.boolean(),
  metadata: z.record(z.string()),
  object: z.enum(['identity.verification_session']),
  options: z_Gelato_verification_session_options.optional(),
  provided_details: z_Gelato_provided_details.optional(),
  redaction: z_Verification_session_redaction.optional(),
  related_customer: z.string().nullable().optional(),
  status: z.enum(['canceled', 'processing', 'requires_input', 'verified']),
  type: z.enum(['document', 'id_number', 'verification_flow']),
  url: z.string().nullable().optional(),
  verification_flow: z.string().optional(),
  verified_outputs: z_Gelato_verified_outputs.optional(),
});
