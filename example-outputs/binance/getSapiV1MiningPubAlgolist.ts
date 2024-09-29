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

export const getSapiV1MiningPubAlgolistEndpointSchema = {
  path: '/sapi/v1/mining/pub/algoList',
  method: 'get',
  supportedSecuritySchemas: [{name: 'ApiKeyAuth', requiredPermissions: []}],
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

export type GetSapiV1MiningPubAlgolistResponse =
  | Response<
      200,
      ResponseBodyData<
        'application/json',
        {
          code: number; // int
          msg: string;
          data: {
            algoName: string;
            algoId: number; // int
            poolIndex: number; // int
            unit: string;
          }[];
        }
      >
    >
  | Response<400, ResponseBodyData<'application/json', Error>>;

export type GetSapiV1MiningPubAlgolistRequestResult = RequestResult<
  Request,
  GetSapiV1MiningPubAlgolistResponse
>;

export function getSapiV1MiningPubAlgolist(
  requestHandler: SimpleRequestHandler,
  config?: RequestHandlerExecutionConfig
): Promise<GetSapiV1MiningPubAlgolistRequestResult> {
  return requestHandler.execute(
    createRequest({endpointSchema: getSapiV1MiningPubAlgolistEndpointSchema}),
    config
  );
}
