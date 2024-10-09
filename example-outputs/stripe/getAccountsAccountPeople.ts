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
} from '@example-outputs/stripe/core';
import {Person, Error} from '@example-outputs/stripe';

export const getAccountsAccountPeopleEndpointSchema = {
  path: '/v1/accounts/{account}/people',
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
