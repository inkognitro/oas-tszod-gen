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

export const getTransferEndpointSchema = {
  path: '/sapi/v1/futures/transfer',
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

export type GetTransferRequest = RequestUnion<
  any,
  any,
  {
    asset: string;
    startTime: number; // int
    endTime?: number; // int
    current?: number; // int
    size?: number; // int
    recvWindow?: number; // int
    timestamp: number; // int
    signature: string;
  }
>;

export type GetTransferResponse =
  | ResponseUnion<
      200,
      ResponseBodyData<
        'application/json',
        {
          rows: {
            asset: string;
            tranId: number; // int
            amount: string;
            type: string;
            timestamp: number; // int
            status: string;
          }[];
          total: number; // int
        }
      >
    >
  | ResponseUnion<400, ResponseBodyData<'application/json', Error>>
  | ResponseUnion<401, ResponseBodyData<'application/json', Error>>;

export type GetTransferRequestResult = RequestResult<
  GetTransferRequest,
  GetTransferResponse
>;

export function getTransfer(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<GetTransferRequest, 'queryParams', never>,
  config?: RequestHandlerExecutionConfig
): Promise<GetTransferRequestResult> {
  return requestHandler.execute(
    createRequest(getTransferEndpointSchema, payload),
    config
  );
}
