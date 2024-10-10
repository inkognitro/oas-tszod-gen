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
import {Transfer_reversal, Error} from './schemas';

export const getTransfersTransferReversalsIdEndpointSchema = {
  path: '/v1/transfers/{transfer}/reversals/{id}',
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

export type GetTransfersTransferReversalsIdRequest = RequestUnion<
  RequestBodyData<'application/x-www-form-urlencoded', {}>,
  {
    id: string;
    transfer: string;
  },
  {
    expand?: string[];
  }
>;

export type GetTransfersTransferReversalsIdResponse =
  | ResponseUnion<200, ResponseBodyData<'application/json', Transfer_reversal>>
  | ResponseUnion<any, ResponseBodyData<'application/json', Error>>;

export type GetTransfersTransferReversalsIdRequestResult = RequestResult<
  GetTransfersTransferReversalsIdRequest,
  GetTransfersTransferReversalsIdResponse
>;

export function getTransfersTransferReversalsId(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<
    GetTransfersTransferReversalsIdRequest,
    'pathParams' | 'contentType' | 'body',
    'queryParams'
  >,
  config?: RequestHandlerExecutionConfig
): Promise<GetTransfersTransferReversalsIdRequestResult> {
  return requestHandler.execute(
    createRequest(getTransfersTransferReversalsIdEndpointSchema, payload),
    config
  );
}
