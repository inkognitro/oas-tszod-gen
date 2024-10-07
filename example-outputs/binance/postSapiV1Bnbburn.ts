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

export const postSapiV1BnbburnEndpointSchema = {
  path: '/sapi/v1/bnbBurn',
  method: 'post',
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

export type PostSapiV1BnbburnRequest = RequestUnion<
  any,
  any,
  {
    spotBNBBurn?: 'true' | 'false';
    interestBNBBurn?: 'true' | 'false';
    recvWindow?: number; // int
    timestamp: number; // int
    signature: string;
  }
>;

export type PostSapiV1BnbburnResponse =
  | ResponseUnion<200, ResponseBodyData<'application/json', BnbBurnStatus>>
  | ResponseUnion<400, ResponseBodyData<'application/json', Error>>
  | ResponseUnion<401, ResponseBodyData<'application/json', Error>>;

export type PostSapiV1BnbburnRequestResult = RequestResult<
  PostSapiV1BnbburnRequest,
  PostSapiV1BnbburnResponse
>;

export function postSapiV1Bnbburn(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<PostSapiV1BnbburnRequest, 'queryParams', never>,
  config?: RequestHandlerExecutionConfig
): Promise<PostSapiV1BnbburnRequestResult> {
  return requestHandler.execute(
    createRequest(postSapiV1BnbburnEndpointSchema, payload),
    config
  );
}
