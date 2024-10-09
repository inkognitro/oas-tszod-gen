import {
  z_Person,
  z_Error,
  Person,
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

export const getAccountsAccountPeopleEndpointSchema = {
  path: '/v1/accounts/{account}/people',
  method: 'get',
  supportedSecuritySchemas: [],
  queryParamsZodSchema: z.object({
    ending_before: z.string().optional(),
    expand: z.array(z.string()).optional(),
    limit: z.number().int().safe().finite().optional(),
    relationship: z
      .object({
        director: z.boolean().optional(),
        executive: z.boolean().optional(),
        legal_guardian: z.boolean().optional(),
        owner: z.boolean().optional(),
        representative: z.boolean().optional(),
      })
      .optional(),
    starting_after: z.string().optional(),
  }),
  pathParamsZodSchema: z.object({
    account: z.string(),
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
            data: z.array(z_Person),
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

export type GetAccountsAccountPeopleRequest = RequestUnion<
  RequestBodyData<'application/x-www-form-urlencoded', {}>,
  {
    account: string;
  },
  {
    ending_before?: string;
    expand?: string[];
    limit?: number; // int
    relationship?: {
      director?: boolean;
      executive?: boolean;
      legal_guardian?: boolean;
      owner?: boolean;
      representative?: boolean;
    };
    starting_after?: string;
  }
>;

export type GetAccountsAccountPeopleResponse =
  | ResponseUnion<
      200,
      ResponseBodyData<
        'application/json',
        {
          data: Person[];
          has_more: boolean;
          object: 'list';
          url: string;
        }
      >
    >
  | ResponseUnion<any, ResponseBodyData<'application/json', Error>>;

export type GetAccountsAccountPeopleRequestResult = RequestResult<
  GetAccountsAccountPeopleRequest,
  GetAccountsAccountPeopleResponse
>;

export function getAccountsAccountPeople(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<
    GetAccountsAccountPeopleRequest,
    'pathParams' | 'contentType' | 'body',
    'queryParams'
  >,
  config?: RequestHandlerExecutionConfig
): Promise<GetAccountsAccountPeopleRequestResult> {
  return requestHandler.execute(
    createRequest(getAccountsAccountPeopleEndpointSchema, payload),
    config
  );
}
