import {
  Financial_reporting_finance_report_run_run_parameters,
  File,
} from './schemas';

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
