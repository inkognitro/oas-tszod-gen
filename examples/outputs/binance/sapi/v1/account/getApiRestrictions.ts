import {
  RequestUnion,
  ResponseBodyData,
  ResponseUnion,
  RequestResult,
  SimpleRequestHandler,
  createRequest,
  RequestHandlerExecutionConfig,
  RequestPayload,
} from '../../../core';
import {Error} from '../../../';

export const getApiRestrictionsEndpointSchema = {
  path: '/sapi/v1/account/apiRestrictions',
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

export type GetApiRestrictionsRequest = RequestUnion<
  any,
  any,
  {
    recvWindow?: number; // int
    timestamp: number; // int
    signature: string;
  }
>;

export type GetApiRestrictionsResponse =
  | ResponseUnion<
      200,
      ResponseBodyData<
        'application/json',
        {
          ipRestrict: boolean;
          createTime: number; // int
          enableInternalTransfer: boolean;
          enableFutures: boolean;
          enablePortfolioMarginTrading?: boolean;
          enableVanillaOptions: boolean;
          permitsUniversalTransfer: boolean;
          enableReading: boolean;
          enableSpotAndMarginTrading: boolean;
          enableWithdrawals: boolean;
          enableMargin: boolean;
          tradingAuthorityExpirationTime: number; // int
        }
      >
    >
  | ResponseUnion<400, ResponseBodyData<'application/json', Error>>
  | ResponseUnion<401, ResponseBodyData<'application/json', Error>>;

export type GetApiRestrictionsRequestResult = RequestResult<
  GetApiRestrictionsRequest,
  GetApiRestrictionsResponse
>;

export function getApiRestrictions(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<GetApiRestrictionsRequest, 'queryParams', never>,
  config?: RequestHandlerExecutionConfig
): Promise<GetApiRestrictionsRequestResult> {
  return requestHandler.execute(
    createRequest(getApiRestrictionsEndpointSchema, payload),
    config
  );
}
