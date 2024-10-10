import {
  RequestUnion,
  ResponseBodyData,
  ResponseUnion,
  RequestResult,
  SimpleRequestHandler,
  createRequest,
  RequestHandlerExecutionConfig,
  RequestPayload,
} from '../../../../core';
import {Error} from '../../../../';

export const getAccountsEndpointSchema = {
  path: '/sapi/v1/dci/product/accounts',
  method: 'get',
  supportedSecuritySchemas: [{name: 'ApiKeyAuth', scopes: []}],
  bodyByContentType: {},
  responseByStatus: {
    '200': {
      bodyByContentType: {
        'application/json': {},
      },
    },
    '400': {
      bodyByContentType: {
        'application/json': {},
      },
    },
    '401': {
      bodyByContentType: {
        'application/json': {},
      },
    },
  },
};

export type GetAccountsRequest = RequestUnion<
  any,
  any,
  {
    recvWindow?: number; // int
    timestamp: number; // int
    signature: string;
  }
>;

export type GetAccountsResponse =
  | ResponseUnion<
      200,
      ResponseBodyData<
        'application/json',
        {
          totalAmountInBTC: string;
          totalAmountInUSDT: string;
        }
      >
    >
  | ResponseUnion<400, ResponseBodyData<'application/json', Error>>
  | ResponseUnion<401, ResponseBodyData<'application/json', Error>>;

export type GetAccountsRequestResult = RequestResult<
  GetAccountsRequest,
  GetAccountsResponse
>;

export function getAccounts(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<GetAccountsRequest, 'queryParams', never>,
  config?: RequestHandlerExecutionConfig
): Promise<GetAccountsRequestResult> {
  return requestHandler.execute(
    createRequest(getAccountsEndpointSchema, payload),
    config
  );
}
