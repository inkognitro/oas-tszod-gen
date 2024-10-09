import {
  z_Credit_note,
  z_Error,
  Credit_note,
  Error,
} from '@example-outputs/stripe-with-zod';
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

export const postCreditNotesIdEndpointSchema = {
  path: '/v1/credit_notes/{id}',
  method: 'post',
  supportedSecuritySchemas: [],
  pathParamsZodSchema: z.object({
    id: z.string(),
  }),
  bodyByContentType: {
    'application/x-www-form-urlencoded': {
      zodSchema: z.object({
        expand: z.array(z.string()).optional(),
        memo: z.string().optional(),
        metadata: z.record(z.string()).optional(),
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
