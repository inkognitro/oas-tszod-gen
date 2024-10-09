import {z_File, z_Error, File, Error} from '@example-outputs/stripe-with-zod';
import {z} from 'zod';
import {
  RequestUnion,
  RequestBodyData,
  ResponseBodyData,
  ResponseUnion,
  RequestResult,
  SimpleRequestHandler,
  createRequest,
  RequestHandlerExecutionConfig,
  RequestPayload,
} from '@example-outputs/stripe-with-zod/core';

export const getFilesEndpointSchema = {
  path: '/v1/files',
  method: 'get',
  supportedSecuritySchemas: [],
  queryParamsZodSchema: z.object({
    created: z
      .union([
        z.object({
          gt: z.number().int().safe().finite().optional(),
          gte: z.number().int().safe().finite().optional(),
          lt: z.number().int().safe().finite().optional(),
          lte: z.number().int().safe().finite().optional(),
        }),
        z.number().int().safe().finite(),
      ])
      .optional(),
    ending_before: z.string().optional(),
    expand: z.array(z.string()).optional(),
    limit: z.number().int().safe().finite().optional(),
    purpose: z
      .enum([
        'account_requirement',
        'additional_verification',
        'business_icon',
        'business_logo',
        'customer_signature',
        'dispute_evidence',
        'document_provider_identity_document',
        'finance_report_run',
        'identity_document',
        'identity_document_downloadable',
        'issuing_regulatory_reporting',
        'pci_document',
        'selfie',
        'sigma_scheduled_query',
        'tax_document_user_upload',
        'terminal_reader_splashscreen',
      ])
      .optional(),
    starting_after: z.string().optional(),
  }),
  bodyByContentType: {
    'application/x-www-form-urlencoded': {
      zodSchema: z.object({}),
    },
  },
  responseByStatus: {
    '200': {
      bodyByContentType: {
        'application/json': {
          zodSchema: z.object({
            data: z.array(z_File),
            has_more: z.boolean(),
            object: z.enum(['list']),
            url: z.string().regex(/\^\/v1\/files/),
          }),
        },
      },
    },
    default: {
      bodyByContentType: {
        'application/json': {
          zodSchema: z_Error,
        },
      },
    },
  },
};

export type GetFilesRequest = RequestUnion<
  RequestBodyData<'application/x-www-form-urlencoded', {}>,
  any,
  {
    created?: (
      | {
          gt?: number; // int
          gte?: number; // int
          lt?: number; // int
          lte?: number; // int
        }
      | number
    ) &
      Partial<{
        gt?: number; // int
        gte?: number; // int
        lt?: number; // int
        lte?: number; // int
      }>;
    ending_before?: string;
    expand?: string[];
    limit?: number; // int
    purpose?:
      | 'account_requirement'
      | 'additional_verification'
      | 'business_icon'
      | 'business_logo'
      | 'customer_signature'
      | 'dispute_evidence'
      | 'document_provider_identity_document'
      | 'finance_report_run'
      | 'identity_document'
      | 'identity_document_downloadable'
      | 'issuing_regulatory_reporting'
      | 'pci_document'
      | 'selfie'
      | 'sigma_scheduled_query'
      | 'tax_document_user_upload'
      | 'terminal_reader_splashscreen';
    starting_after?: string;
  }
>;

export type GetFilesResponse =
  | ResponseUnion<
      200,
      ResponseBodyData<
        'application/json',
        {
          data: File[];
          has_more: boolean;
          object: 'list';
          url: string;
        }
      >
    >
  | ResponseUnion<any, ResponseBodyData<'application/json', Error>>;

export type GetFilesRequestResult = RequestResult<
  GetFilesRequest,
  GetFilesResponse
>;

export function getFiles(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<
    GetFilesRequest,
    'contentType' | 'body',
    'queryParams'
  >,
  config?: RequestHandlerExecutionConfig
): Promise<GetFilesRequestResult> {
  return requestHandler.execute(
    createRequest(getFilesEndpointSchema, payload),
    config
  );
}
