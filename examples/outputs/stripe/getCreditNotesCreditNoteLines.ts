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
import {Credit_note_line_item, Error} from './schemas';

export const getCreditNotesCreditNoteLinesEndpointSchema = {
  path: '/v1/credit_notes/{credit_note}/lines',
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
