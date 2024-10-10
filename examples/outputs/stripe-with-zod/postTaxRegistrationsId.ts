import {z_Tax_Registration, Tax_Registration} from './tax';
import {z_Error, Error} from './schemas';
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

export const postTaxRegistrationsIdEndpointSchema = {
  path: '/v1/tax/registrations/{id}',
  method: 'post',
  supportedSecuritySchemas: [],
  pathParamsZodSchema: z.object({
    id: z.string(),
  }),
  bodyByContentType: {
    'application/x-www-form-urlencoded': {
      zodSchema: z.object({
        active_from: z
          .union([z.enum(['now']), z.number().int().safe().finite()])
          .optional(),
        expand: z.array(z.string()).optional(),
        expires_at: z
          .union([
            z.enum(['now']),
            z.number().int().safe().finite(),
            z.enum(['']),
          ])
          .optional(),
      }),
    },
  },
  responseByStatus: {
    '200': {
      bodyByContentType: {
        'application/json': {
          zodSchema: z_Tax_Registration,
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

export type PostTaxRegistrationsIdRequest = RequestUnion<
  RequestBodyData<
    'application/x-www-form-urlencoded',
    {
      active_from?: 'now' | number;
      expand?: string[];
      expires_at?: 'now' | number | '';
    }
  >,
  {
    id: string;
  }
>;

export type PostTaxRegistrationsIdResponse =
  | ResponseUnion<200, ResponseBodyData<'application/json', Tax_Registration>>
  | ResponseUnion<any, ResponseBodyData<'application/json', Error>>;

export type PostTaxRegistrationsIdRequestResult = RequestResult<
  PostTaxRegistrationsIdRequest,
  PostTaxRegistrationsIdResponse
>;

export function postTaxRegistrationsId(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<
    PostTaxRegistrationsIdRequest,
    'pathParams' | 'contentType' | 'body',
    never
  >,
  config?: RequestHandlerExecutionConfig
): Promise<PostTaxRegistrationsIdRequestResult> {
  return requestHandler.execute(
    createRequest(postTaxRegistrationsIdEndpointSchema, payload),
    config
  );
}
