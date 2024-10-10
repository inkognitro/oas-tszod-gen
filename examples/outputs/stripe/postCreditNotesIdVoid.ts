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

export const postCreditNotesIdVoidEndpointSchema = {
  path: '/v1/credit_notes/{id}/void',
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

export type PostCreditNotesIdVoidRequest = RequestUnion<
  RequestBodyData<
    'application/x-www-form-urlencoded',
    {
      expand?: string[];
    }
  >,
  {
    id: string;
  }
>;

export type PostCreditNotesIdVoidResponse =
  | ResponseUnion<200, ResponseBodyData<'application/json', Credit_note>>
  | ResponseUnion<any, ResponseBodyData<'application/json', Error>>;

export type PostCreditNotesIdVoidRequestResult = RequestResult<
  PostCreditNotesIdVoidRequest,
  PostCreditNotesIdVoidResponse
>;

export function postCreditNotesIdVoid(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<
    PostCreditNotesIdVoidRequest,
    'pathParams' | 'contentType' | 'body',
    never
  >,
  config?: RequestHandlerExecutionConfig
): Promise<PostCreditNotesIdVoidRequestResult> {
  return requestHandler.execute(
    createRequest(postCreditNotesIdVoidEndpointSchema, payload),
    config
  );
}
