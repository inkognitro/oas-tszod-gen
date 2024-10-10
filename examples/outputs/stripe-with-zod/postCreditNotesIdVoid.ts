import {z_Credit_note, z_Error, Credit_note, Error} from './schemas';
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

export const postCreditNotesIdVoidEndpointSchema = {
  path: '/v1/credit_notes/{id}/void',
  method: 'post',
  supportedSecuritySchemas: [],
  pathParamsZodSchema: z.object({
    id: z.string(),
  }),
  bodyByContentType: {
    'application/x-www-form-urlencoded': {
      zodSchema: z.object({
        expand: z.array(z.string()).optional(),
      }),
    },
  },
  responseByStatus: {
    '200': {
      bodyByContentType: {
        'application/json': {
          zodSchema: z_Credit_note,
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
