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
import {Account, Error} from './schemas';

export const postAccountsAccountRejectEndpointSchema = {
  path: '/v1/accounts/{account}/reject',
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
