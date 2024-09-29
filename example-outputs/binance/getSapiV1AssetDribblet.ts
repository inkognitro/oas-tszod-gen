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

export type GetSapiV1AssetDribbletPayload = {
  queryParams: {
    accountType?: 'SPOT' | 'MARGIN';
    startTime?: number; // int
    endTime?: number; // int
    recvWindow?: number; // int
    timestamp: number; // int
    signature: string;
  };
};

export type GetSapiV1AssetDribbletResponse =
  | Response<
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
  | Response<400, ResponseBodyData<'application/json', Error>>
  | Response<401, ResponseBodyData<'application/json', Error>>;

export type GetSapiV1AssetDribbletRequestResult = RequestResult<
  Request,
  GetSapiV1AssetDribbletResponse
>;

export function getSapiV1AssetDribblet(
  requestHandler: SimpleRequestHandler,
  payload: GetSapiV1AssetDribbletPayload,
  config?: RequestHandlerExecutionConfig
): Promise<GetSapiV1AssetDribbletRequestResult> {
  return requestHandler.execute(
    createRequest({
      ...payload,
      endpointSchema: getSapiV1AssetDribbletEndpointSchema,
    }),
    config
  );
}
