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
import {BnbBurnStatus, Error} from '@example-outputs/binance';

export const getSapiV1BnbburnEndpointSchema = {
  path: '/sapi/v1/bnbBurn',
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

export type GetSapiV1BnbburnRequest = RequestUnion<
  any,
  any,
  {
    recvWindow?: number; // int
    timestamp: number; // int
    signature: string;
  }
>;

export type GetSapiV1BnbburnResponse =
  | ResponseUnion<200, ResponseBodyData<'application/json', BnbBurnStatus>>
  | ResponseUnion<400, ResponseBodyData<'application/json', Error>>
  | ResponseUnion<401, ResponseBodyData<'application/json', Error>>;

export type GetSapiV1BnbburnRequestResult = RequestResult<
  GetSapiV1BnbburnRequest,
  GetSapiV1BnbburnResponse
>;

export function getSapiV1Bnbburn(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<GetSapiV1BnbburnRequest, 'queryParams', never>,
  config?: RequestHandlerExecutionConfig
): Promise<GetSapiV1BnbburnRequestResult> {
  return requestHandler.execute(
    createRequest(getSapiV1BnbburnEndpointSchema, payload),
    config
  );
}
