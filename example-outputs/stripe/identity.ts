import {
  Gelato_document_report,
  Gelato_email_report,
  Gelato_id_number_report,
  Gelato_verification_report_options,
  Gelato_phone_report,
  Gelato_selfie_report,
  Gelato_session_last_error,
  Gelato_verification_session_options,
  Gelato_provided_details,
  Verification_session_redaction,
  Gelato_verified_outputs,
} from '@example-outputs/stripe';

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
