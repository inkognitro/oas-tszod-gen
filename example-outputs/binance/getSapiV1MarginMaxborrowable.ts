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

export const getSapiV1MarginMaxborrowableEndpointSchema = {
  path: '/sapi/v1/margin/maxBorrowable',
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

export type GetSapiV1MarginMaxborrowableRequest = RequestUnion<
  any,
  any,
  {
    asset: string;
    isolatedSymbol?: string;
    recvWindow?: number; // int
    timestamp: number; // int
    signature: string;
  }
>;

export type GetSapiV1MarginMaxborrowableResponse =
  | ResponseUnion<
      200,
      ResponseBodyData<
        'application/json',
        {
          amount: string;
          borrowLimit: string;
        }
      >
    >
  | ResponseUnion<400, ResponseBodyData<'application/json', Error>>
  | ResponseUnion<401, ResponseBodyData<'application/json', Error>>;

export type GetSapiV1MarginMaxborrowableRequestResult = RequestResult<
  GetSapiV1MarginMaxborrowableRequest,
  GetSapiV1MarginMaxborrowableResponse
>;

export function getSapiV1MarginMaxborrowable(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<GetSapiV1MarginMaxborrowableRequest, 'queryParams'>,
  config?: RequestHandlerExecutionConfig
): Promise<GetSapiV1MarginMaxborrowableRequestResult> {
  return requestHandler.execute(
    createRequest(getSapiV1MarginMaxborrowableEndpointSchema, payload),
    config
  );
}
