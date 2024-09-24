import {BnbBurnStatus, Error} from '@example-outputs/binance';
import {
  ResponseBodyData,
  ResponseData,
  Response,
  RequestResult,
  Request,
  RequestHandler,
  createRequest,
  RequestHandlerExecutionConfig,
} from '@example-outputs/binance/core';

export const postSapiV1BnbburnEndpointSchema = {
  path: '/sapi/v1/bnbBurn',
  method: 'post',
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
    '401': {
      bodyByContentType: {
        'application/json': {},
      },
    },
  },
};

export type PostSapiV1BnbburnPayload = {
  queryParams: {
    spotBNBBurn?: 'true' | 'false';
    interestBNBBurn?: 'true' | 'false';
    recvWindow?: number; // int
    timestamp: number; // int
    signature: string;
  };
};

export type PostSapiV1BnbburnResponse =
  | Response<
      200,
      ResponseData<ResponseBodyData<'application/json', BnbBurnStatus>>
    >
  | Response<400, ResponseData<ResponseBodyData<'application/json', Error>>>
  | Response<401, ResponseData<ResponseBodyData<'application/json', Error>>>;

export type PostSapiV1BnbburnRequestResult = RequestResult<
  Request,
  PostSapiV1BnbburnResponse
>;

export function postSapiV1Bnbburn(
  requestHandler: RequestHandler,
  payload: PostSapiV1BnbburnPayload,
  config?: RequestHandlerExecutionConfig
): Promise<PostSapiV1BnbburnRequestResult> {
  return requestHandler.execute(
    createRequest({
      ...payload,
      endpointSchema: postSapiV1BnbburnEndpointSchema,
    }),
    config
  );
}
