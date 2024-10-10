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

export const getCreditNotesIdEndpointSchema = {
  path: '/v1/credit_notes/{id}',
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

export type GetCreditNotesIdRequest = RequestUnion<
  RequestBodyData<'application/x-www-form-urlencoded', {}>,
  {
    id: string;
  },
  {
    expand?: string[];
  }
>;

export type GetCreditNotesIdResponse =
  | ResponseUnion<200, ResponseBodyData<'application/json', Credit_note>>
  | ResponseUnion<any, ResponseBodyData<'application/json', Error>>;

export type GetCreditNotesIdRequestResult = RequestResult<
  GetCreditNotesIdRequest,
  GetCreditNotesIdResponse
>;

export function getCreditNotesId(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<
    GetCreditNotesIdRequest,
    'pathParams' | 'contentType' | 'body',
    'queryParams'
  >,
  config?: RequestHandlerExecutionConfig
): Promise<GetCreditNotesIdRequestResult> {
  return requestHandler.execute(
    createRequest(getCreditNotesIdEndpointSchema, payload),
    config
  );
}
