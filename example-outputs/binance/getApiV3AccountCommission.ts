import {Error} from '@example-outputs/binance';
import {
  ResponseBodyData,
  Response,
  RequestResult,
  Request,
  SimpleRequestHandler,
  createRequest,
  RequestHandlerExecutionConfig,
} from '@example-outputs/binance/core';

export const getApiV3AccountCommissionEndpointSchema = {
  path: '/api/v3/account/commission',
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

export type GetApiV3AccountCommissionPayload = {
  queryParams: {
    symbol: string;
    timestamp: number; // int
    signature: string;
  };
};

export type GetApiV3AccountCommissionResponse =
  | Response<
      200,
      ResponseBodyData<
        'application/json',
        {
          symbol: string;
          standardCommission: {
            maker: string;
            taker: string;
            buyer: string;
            seller: string;
          };
          taxCommission: {
            maker: string;
            taker: string;
            buyer: string;
            seller: string;
          };
          discount: {
            enabledForAccount?: boolean;
            enabledForSymbol?: boolean;
            discountAsset?: string;
            discount?: string;
          };
        }
      >
    >
  | Response<400, ResponseBodyData<'application/json', Error>>
  | Response<401, ResponseBodyData<'application/json', Error>>;

export type GetApiV3AccountCommissionRequestResult = RequestResult<
  Request,
  GetApiV3AccountCommissionResponse
>;

export function getApiV3AccountCommission(
  requestHandler: SimpleRequestHandler,
  payload: GetApiV3AccountCommissionPayload,
  config?: RequestHandlerExecutionConfig
): Promise<GetApiV3AccountCommissionRequestResult> {
  return requestHandler.execute(
    createRequest({
      ...payload,
      endpointSchema: getApiV3AccountCommissionEndpointSchema,
    }),
    config
  );
}
