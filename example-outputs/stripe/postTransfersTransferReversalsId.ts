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
} from '@example-outputs/stripe/core';
import {Transfer_reversal, Error} from '@example-outputs/stripe';

export const postTransfersTransferReversalsIdEndpointSchema = {
  path: '/v1/transfers/{transfer}/reversals/{id}',
  method: 'post',
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

export type PostTransfersTransferReversalsIdRequest = RequestUnion<
  RequestBodyData<
    'application/x-www-form-urlencoded',
    {
      expand?: string[];
      metadata?:
        | {
            [key: string]: string;
          }
        | '';
    }
  >,
  {
    id: string;
    transfer: string;
  }
>;

export type PostTransfersTransferReversalsIdResponse =
  | ResponseUnion<200, ResponseBodyData<'application/json', Transfer_reversal>>
  | ResponseUnion<any, ResponseBodyData<'application/json', Error>>;

export type PostTransfersTransferReversalsIdRequestResult = RequestResult<
  PostTransfersTransferReversalsIdRequest,
  PostTransfersTransferReversalsIdResponse
>;

export function postTransfersTransferReversalsId(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<
    PostTransfersTransferReversalsIdRequest,
    'pathParams' | 'contentType' | 'body',
    never
  >,
  config?: RequestHandlerExecutionConfig
): Promise<PostTransfersTransferReversalsIdRequestResult> {
  return requestHandler.execute(
    createRequest(postTransfersTransferReversalsIdEndpointSchema, payload),
    config
  );
}
