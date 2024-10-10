import {z_File, z_Error, File, Error} from './schemas';
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
} from './core';

export const postFilesEndpointSchema = {
  path: '/v1/files',
  method: 'post',
  supportedSecuritySchemas: [],
  bodyByContentType: {
    'multipart/form-data': {
      zodSchema: z.object({
        expand: z.array(z.string()).optional(),
        file: z.any(),
        file_link_data: z
          .object({
            create: z.boolean(),
            expires_at: z.number().int().safe().finite().optional(),
            metadata: z.union([z.record(z.string()), z.enum([''])]).optional(),
          })
          .optional(),
        purpose: z.enum([
          'account_requirement',
          'additional_verification',
          'business_icon',
          'business_logo',
          'customer_signature',
          'dispute_evidence',
          'identity_document',
          'issuing_regulatory_reporting',
          'pci_document',
          'tax_document_user_upload',
          'terminal_reader_splashscreen',
        ]),
      }),
    },
  },
  responseByStatus: {
    '200': {
      bodyByContentType: {
        'application/json': {
          zodSchema: z_File,
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

export interface PostFiles_Request6b3a7814_FormData extends FormData {
  append(name: 'expand', value: string): void;
  append(name: 'file_link_data', value: string): void;
  append(name: 'purpose', value: string): void;
  append(name: 'file', value: Blob, fileName?: string): void;
}

export type PostFilesRequest = RequestUnion<
  RequestBodyData<
    'multipart/form-data',
    | PostFiles_Request6b3a7814_FormData
    | {
        expand?: string[];
        file: Blob | any; // binary
        file_link_data?: {
          create: boolean;
          expires_at?: number; // int
          metadata?:
            | {
                [key: string]: string;
              }
            | '';
        };
        purpose:
          | 'account_requirement'
          | 'additional_verification'
          | 'business_icon'
          | 'business_logo'
          | 'customer_signature'
          | 'dispute_evidence'
          | 'identity_document'
          | 'issuing_regulatory_reporting'
          | 'pci_document'
          | 'tax_document_user_upload'
          | 'terminal_reader_splashscreen';
      }
  >
>;

export type PostFilesResponse =
  | ResponseUnion<200, ResponseBodyData<'application/json', File>>
  | ResponseUnion<any, ResponseBodyData<'application/json', Error>>;

export type PostFilesRequestResult = RequestResult<
  PostFilesRequest,
  PostFilesResponse
>;

export function postFiles(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<PostFilesRequest, 'contentType' | 'body', never>,
  config?: RequestHandlerExecutionConfig
): Promise<PostFilesRequestResult> {
  return requestHandler.execute(
    createRequest(postFilesEndpointSchema, payload),
    config
  );
}
