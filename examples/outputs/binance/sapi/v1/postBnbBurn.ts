import {
  RequestUnion,
  ResponseBodyData,
  ResponseUnion,
  RequestResult,
  SimpleRequestHandler,
  createRequest,
  RequestHandlerExecutionConfig,
  RequestPayload,
} from '../../core';
import {BnbBurnStatus, Error} from '../../';

export const postBnbBurnEndpointSchema = {
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

export type PostBnbBurnRequest = RequestUnion<
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

export type PostBnbBurnResponse =
  | ResponseUnion<200, ResponseBodyData<'application/json', BnbBurnStatus>>
  | ResponseUnion<400, ResponseBodyData<'application/json', Error>>
  | ResponseUnion<401, ResponseBodyData<'application/json', Error>>;

export type PostBnbBurnRequestResult = RequestResult<
  PostBnbBurnRequest,
  PostBnbBurnResponse
>;

export function postBnbBurn(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<PostBnbBurnRequest, 'queryParams', never>,
  config?: RequestHandlerExecutionConfig
): Promise<PostBnbBurnRequestResult> {
  return requestHandler.execute(
    createRequest(postBnbBurnEndpointSchema, payload),
    config
  );
}
