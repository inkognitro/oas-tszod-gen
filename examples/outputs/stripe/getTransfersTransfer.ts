import {
  RequestUnion,
  RequestBodyData,
  ResponseBodyData,
  ResponseUnion,
  RequestResult,
  SimpleRequestHandler,
  createRequest,
  RequestHandlerExecutionConfig,
  RequestPayload,
} from './core';
import {Transfer, Error} from './schemas';

export const getTransfersTransferEndpointSchema = {
  path: '/v1/transfers/{transfer}',
  method: 'get',
  supportedSecuritySchemas: [],
  bodyByContentType: {
    'application/x-www-form-urlencoded': {},
  },
  responseByStatus: {
    '200': {
      bodyByContentType: {
        'application/json': {},
      },
    },
    default: {
      bodyByContentType: {
        'application/json': {},
      },
    },
  },
};

export type GetTransfersTransferRequest = RequestUnion<
  RequestBodyData<'application/x-www-form-urlencoded', {}>,
  {
    transfer: string;
  },
  {
    expand?: string[];
  }
>;

export type GetTransfersTransferResponse =
  | ResponseUnion<200, ResponseBodyData<'application/json', Transfer>>
  | ResponseUnion<any, ResponseBodyData<'application/json', Error>>;

export type GetTransfersTransferRequestResult = RequestResult<
  GetTransfersTransferRequest,
  GetTransfersTransferResponse
>;

export function getTransfersTransfer(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<
    GetTransfersTransferRequest,
    'pathParams' | 'contentType' | 'body',
    'queryParams'
  >,
  config?: RequestHandlerExecutionConfig
): Promise<GetTransfersTransferRequestResult> {
  return requestHandler.execute(
    createRequest(getTransfersTransferEndpointSchema, payload),
    config
  );
}
