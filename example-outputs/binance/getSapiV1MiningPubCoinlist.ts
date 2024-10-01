import {Error} from '@example-outputs/binance';
import {
  ResponseBodyData,
  ResponseUnion,
  RequestResult,
  Request,
  SimpleRequestHandler,
  createRequest,
  RequestHandlerExecutionConfig,
} from '@example-outputs/binance/core';

export const getSapiV1MiningPubCoinlistEndpointSchema = {
  path: '/sapi/v1/mining/pub/coinList',
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
  },
};

export type GetSapiV1MiningPubCoinlistResponse =
  | ResponseUnion<
      200,
      ResponseBodyData<
        'application/json',
        {
          code: number; // int
          msg: string;
          data: {
            coinName: string;
            coinId: number; // int
            poolIndex: number; // int
            algoId: number; // int
            algoName: string;
          }[];
        }
      >
    >
  | ResponseUnion<400, ResponseBodyData<'application/json', Error>>;

export type GetSapiV1MiningPubCoinlistRequestResult = RequestResult<
  Request,
  GetSapiV1MiningPubCoinlistResponse
>;

export function getSapiV1MiningPubCoinlist(
  requestHandler: SimpleRequestHandler,
  config?: RequestHandlerExecutionConfig
): Promise<GetSapiV1MiningPubCoinlistRequestResult> {
  return requestHandler.execute(
    createRequest({endpointSchema: getSapiV1MiningPubCoinlistEndpointSchema}),
    config
  );
}
