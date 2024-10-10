import {
  Financial_reporting_finance_report_run_run_parameters,
  File,
  z_Financial_reporting_finance_report_run_run_parameters,
  z_File,
} from './schemas';
import {z} from 'zod';

export type Reporting_Report_run = {
  created: number; // int
  error?: string | null;
  id: string;
  livemode: boolean;
  object: 'reporting.report_run';
  parameters: Financial_reporting_finance_report_run_run_parameters;
  report_type: string;
  result?: File & Partial<File>;
  status: string;
  succeeded_at?: null | number; // int
};

export const z_Reporting_Report_run = z.object({
  created: z.number().int().safe().finite(),
  error: z.string().nullable().optional(),
  id: z.string(),
  livemode: z.boolean(),
  object: z.enum(['reporting.report_run']),
  parameters: z_Financial_reporting_finance_report_run_run_parameters,
  report_type: z.string(),
  result: z_File.optional(),
  status: z.string(),
  succeeded_at: z.number().int().safe().finite().nullable().optional(),
});

export type Reporting_Report_type = {
  data_available_end: number; // int
  data_available_start: number; // int
  default_columns?: string[] | null;
  id: string;
  livemode: boolean;
  name: string;
  object: 'reporting.report_type';
  updated: number; // int
  version: number; // int
};

export const z_Reporting_Report_type = z.object({
  data_available_end: z.number().int().safe().finite(),
  data_available_start: z.number().int().safe().finite(),
  default_columns: z.array(z.string()).nullable().optional(),
  id: z.string(),
  livemode: z.boolean(),
  name: z.string(),
  object: z.enum(['reporting.report_type']),
  updated: z.number().int().safe().finite(),
  version: z.number().int().safe().finite(),
});
