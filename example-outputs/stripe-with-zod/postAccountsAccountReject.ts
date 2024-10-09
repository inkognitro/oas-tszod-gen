import {
  z_Account,
  z_Error,
  Account,
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

export const postAccountsAccountRejectEndpointSchema = {
  path: '/v1/accounts/{account}/reject',
  method: 'post',
  supportedSecuritySchemas: [],
  pathParamsZodSchema: z.object({
    account: z.string(),
  }),
  bodyByContentType: {
    'application/x-www-form-urlencoded': {
      zodSchema: z.object({
        expand: z.array(z.string()).optional(),
        reason: z.string(),
      }),
    },
  },
  responseByStatus: {
    '200': {
      bodyByContentType: {
        'application/json': {
          zodSchema: z_Account,
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

export type PostAccountsAccountRejectRequest = RequestUnion<
  RequestBodyData<
    'application/x-www-form-urlencoded',
    {
      expand?: string[];
      reason: string;
    }
  >,
  {
    account: string;
  }
>;

export type PostAccountsAccountRejectResponse =
  | ResponseUnion<200, ResponseBodyData<'application/json', Account>>
  | ResponseUnion<any, ResponseBodyData<'application/json', Error>>;

export type PostAccountsAccountRejectRequestResult = RequestResult<
  PostAccountsAccountRejectRequest,
  PostAccountsAccountRejectResponse
>;

export function postAccountsAccountReject(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<
    PostAccountsAccountRejectRequest,
    'pathParams' | 'contentType' | 'body',
    never
  >,
  config?: RequestHandlerExecutionConfig
): Promise<PostAccountsAccountRejectRequestResult> {
  return requestHandler.execute(
    createRequest(postAccountsAccountRejectEndpointSchema, payload),
    config
  );
}
