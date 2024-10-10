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

export const getMaxTransferableEndpointSchema = {
  path: '/sapi/v1/margin/maxTransferable',
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

export type GetMaxTransferableRequest = RequestUnion<
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

export type GetMaxTransferableResponse =
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

export type GetMaxTransferableRequestResult = RequestResult<
  GetMaxTransferableRequest,
  GetMaxTransferableResponse
>;

export function getMaxTransferable(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<GetMaxTransferableRequest, 'queryParams', never>,
  config?: RequestHandlerExecutionConfig
): Promise<GetMaxTransferableRequestResult> {
  return requestHandler.execute(
    createRequest(getMaxTransferableEndpointSchema, payload),
    config
  );
}
