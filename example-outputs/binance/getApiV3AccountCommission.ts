import {
  RequestUnion,
  ResponseBodyData,
  ResponseUnion,
  RequestResult,
  SimpleRequestHandler,
  createRequest,
  RequestHandlerExecutionConfig,
  RequestPayload,
} from '@example-outputs/binance/core';
import {Error} from '@example-outputs/binance';

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

export type GetApiV3AccountCommissionRequest = RequestUnion<
  any,
  any,
  {
    symbol: string;
    timestamp: number; // int
    signature: string;
  }
>;

export type GetApiV3AccountCommissionResponse =
  | ResponseUnion<
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
  | ResponseUnion<400, ResponseBodyData<'application/json', Error>>
  | ResponseUnion<401, ResponseBodyData<'application/json', Error>>;

export type GetApiV3AccountCommissionRequestResult = RequestResult<
  GetApiV3AccountCommissionRequest,
  GetApiV3AccountCommissionResponse
>;

export function getApiV3AccountCommission(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<GetApiV3AccountCommissionRequest, 'queryParams'>,
  config?: RequestHandlerExecutionConfig
): Promise<GetApiV3AccountCommissionRequestResult> {
  return requestHandler.execute(
    createRequest(getApiV3AccountCommissionEndpointSchema, payload),
    config
  );
}
