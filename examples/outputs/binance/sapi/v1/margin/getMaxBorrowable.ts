import {
  RequestUnion,
  ResponseBodyData,
  ResponseUnion,
  RequestResult,
  SimpleRequestHandler,
  createRequest,
  RequestHandlerExecutionConfig,
  RequestPayload,
} from '../../../core';
import {Error} from '../../../';

export const getMaxBorrowableEndpointSchema = {
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

export type GetMaxBorrowableRequest = RequestUnion<
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

export type GetMaxBorrowableResponse =
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

export type GetMaxBorrowableRequestResult = RequestResult<
  GetMaxBorrowableRequest,
  GetMaxBorrowableResponse
>;

export function getMaxBorrowable(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<GetMaxBorrowableRequest, 'queryParams', never>,
  config?: RequestHandlerExecutionConfig
): Promise<GetMaxBorrowableRequestResult> {
  return requestHandler.execute(
    createRequest(getMaxBorrowableEndpointSchema, payload),
    config
  );
}
