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
import {File, Error} from './schemas';

export const getFilesEndpointSchema = {
  path: '/v1/files',
  method: 'get',
  supportedSecuritySchemas: [],
  bodyByContentType: {
    'application/x-www-form-urlencoded': {},
  },
  responseByStatus: {
    '200': {
      bodyByContentType: {
        'application/json': {},
      },
    },
    default: {
      bodyByContentType: {
        'application/json': {},
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
