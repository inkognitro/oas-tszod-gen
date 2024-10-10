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
import {Person, Error} from './schemas';

export const getAccountsAccountPersonsEndpointSchema = {
  path: '/v1/accounts/{account}/persons',
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

export type GetAccountsAccountPersonsRequest = RequestUnion<
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

export type GetAccountsAccountPersonsResponse =
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

export type GetAccountsAccountPersonsRequestResult = RequestResult<
  GetAccountsAccountPersonsRequest,
  GetAccountsAccountPersonsResponse
>;

export function getAccountsAccountPersons(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<
    GetAccountsAccountPersonsRequest,
    'pathParams' | 'contentType' | 'body',
    'queryParams'
  >,
  config?: RequestHandlerExecutionConfig
): Promise<GetAccountsAccountPersonsRequestResult> {
  return requestHandler.execute(
    createRequest(getAccountsAccountPersonsEndpointSchema, payload),
    config
  );
}
