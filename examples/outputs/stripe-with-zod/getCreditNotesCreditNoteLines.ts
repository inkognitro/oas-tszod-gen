import {
  z_Credit_note_line_item,
  z_Error,
  Credit_note_line_item,
  Error,
} from './schemas';
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

export const getCreditNotesCreditNoteLinesEndpointSchema = {
  path: '/v1/credit_notes/{credit_note}/lines',
  method: 'get',
  supportedSecuritySchemas: [],
  queryParamsZodSchema: z.object({
    ending_before: z.string().optional(),
    expand: z.array(z.string()).optional(),
    limit: z.number().int().safe().finite().optional(),
    starting_after: z.string().optional(),
  }),
  pathParamsZodSchema: z.object({
    credit_note: z.string(),
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
            data: z.array(z_Credit_note_line_item),
            has_more: z.boolean(),
            object: z.enum(['list']),
            url: z.string(),
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

export type GetCreditNotesCreditNoteLinesRequest = RequestUnion<
  RequestBodyData<'application/x-www-form-urlencoded', {}>,
  {
    credit_note: string;
  },
  {
    ending_before?: string;
    expand?: string[];
    limit?: number; // int
    starting_after?: string;
  }
>;

export type GetCreditNotesCreditNoteLinesResponse =
  | ResponseUnion<
      200,
      ResponseBodyData<
        'application/json',
        {
          data: Credit_note_line_item[];
          has_more: boolean;
          object: 'list';
          url: string;
        }
      >
    >
  | ResponseUnion<any, ResponseBodyData<'application/json', Error>>;

export type GetCreditNotesCreditNoteLinesRequestResult = RequestResult<
  GetCreditNotesCreditNoteLinesRequest,
  GetCreditNotesCreditNoteLinesResponse
>;

export function getCreditNotesCreditNoteLines(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<
    GetCreditNotesCreditNoteLinesRequest,
    'pathParams' | 'contentType' | 'body',
    'queryParams'
  >,
  config?: RequestHandlerExecutionConfig
): Promise<GetCreditNotesCreditNoteLinesRequestResult> {
  return requestHandler.execute(
    createRequest(getCreditNotesCreditNoteLinesEndpointSchema, payload),
    config
  );
}
