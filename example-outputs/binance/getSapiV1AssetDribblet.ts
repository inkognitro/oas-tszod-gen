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

export const getSapiV1AssetDribbletEndpointSchema = {
  path: '/sapi/v1/asset/dribblet',
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

export type GetSapiV1AssetDribbletRequest = RequestUnion<
  any,
  any,
  {
    accountType?: 'SPOT' | 'MARGIN';
    startTime?: number; // int
    endTime?: number; // int
    recvWindow?: number; // int
    timestamp: number; // int
    signature: string;
  }
>;

export type GetSapiV1AssetDribbletResponse =
  | ResponseUnion<
      200,
      ResponseBodyData<
        'application/json',
        {
          total: number; // int
          userAssetDribblets: {
            operateTime: number; // int
            totalTransferedAmount: string;
            totalServiceChargeAmount: string;
            transId: number; // int
            userAssetDribbletDetails: {
              transId: number; // int
              serviceChargeAmount: string;
              amount: string;
              operateTime: number; // int
              transferedAmount: string;
              fromAsset: string;
            }[];
          }[];
        }
      >
    >
  | ResponseUnion<400, ResponseBodyData<'application/json', Error>>
  | ResponseUnion<401, ResponseBodyData<'application/json', Error>>;

export type GetSapiV1AssetDribbletRequestResult = RequestResult<
  GetSapiV1AssetDribbletRequest,
  GetSapiV1AssetDribbletResponse
>;

export function getSapiV1AssetDribblet(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<GetSapiV1AssetDribbletRequest, 'queryParams', never>,
  config?: RequestHandlerExecutionConfig
): Promise<GetSapiV1AssetDribbletRequestResult> {
  return requestHandler.execute(
    createRequest(getSapiV1AssetDribbletEndpointSchema, payload),
    config
  );
}
