import {
  z_Financial_connections_Account,
  Financial_connections_Account,
} from './financial_connections';
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

export const getLinkedAccountsEndpointSchema = {
  path: '/v1/linked_accounts',
  method: 'get',
  supportedSecuritySchemas: [],
  queryParamsZodSchema: z.object({
    account_holder: z
      .object({
        account: z.string().optional(),
        customer: z.string().optional(),
      })
      .optional(),
    ending_before: z.string().optional(),
    expand: z.array(z.string()).optional(),
    limit: z.number().int().safe().finite().optional(),
    session: z.string().optional(),
    starting_after: z.string().optional(),
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
            data: z.array(z_Financial_connections_Account),
            has_more: z.boolean(),
            object: z.enum(['list']),
            url: z.string().regex(/\^\/v1\/financial_connections\/accounts/),
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

export type GetLinkedAccountsRequest = RequestUnion<
  RequestBodyData<'application/x-www-form-urlencoded', {}>,
  any,
  {
    account_holder?: {
      account?: string;
      customer?: string;
    };
    ending_before?: string;
    expand?: string[];
    limit?: number; // int
    session?: string;
    starting_after?: string;
  }
>;

export type GetLinkedAccountsResponse =
  | ResponseUnion<
      200,
      ResponseBodyData<
        'application/json',
        {
          data: Financial_connections_Account[];
          has_more: boolean;
          object: 'list';
          url: string;
        }
      >
    >
  | ResponseUnion<any, ResponseBodyData<'application/json', Error>>;

export type GetLinkedAccountsRequestResult = RequestResult<
  GetLinkedAccountsRequest,
  GetLinkedAccountsResponse
>;

export function getLinkedAccounts(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<
    GetLinkedAccountsRequest,
    'contentType' | 'body',
    'queryParams'
  >,
  config?: RequestHandlerExecutionConfig
): Promise<GetLinkedAccountsRequestResult> {
  return requestHandler.execute(
    createRequest(getLinkedAccountsEndpointSchema, payload),
    config
  );
}
