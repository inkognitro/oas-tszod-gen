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
import {Credit_note, Error} from './schemas';

export const postCreditNotesIdEndpointSchema = {
  path: '/v1/credit_notes/{id}',
  method: 'post',
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

export type PostCreditNotesIdRequest = RequestUnion<
  RequestBodyData<
    'application/x-www-form-urlencoded',
    {
      expand?: string[];
      memo?: string;
      metadata?: {
        [key: string]: string;
      };
    }
  >,
  {
    id: string;
  }
>;

export type PostCreditNotesIdResponse =
  | ResponseUnion<200, ResponseBodyData<'application/json', Credit_note>>
  | ResponseUnion<any, ResponseBodyData<'application/json', Error>>;

export type PostCreditNotesIdRequestResult = RequestResult<
  PostCreditNotesIdRequest,
  PostCreditNotesIdResponse
>;

export function postCreditNotesId(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<
    PostCreditNotesIdRequest,
    'pathParams' | 'contentType' | 'body',
    never
  >,
  config?: RequestHandlerExecutionConfig
): Promise<PostCreditNotesIdRequestResult> {
  return requestHandler.execute(
    createRequest(postCreditNotesIdEndpointSchema, payload),
    config
  );
}
