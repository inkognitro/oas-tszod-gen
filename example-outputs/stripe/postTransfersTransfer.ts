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
import {Transfer, Error} from '@example-outputs/stripe';

export const postTransfersTransferEndpointSchema = {
  path: '/v1/transfers/{transfer}',
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

export type PostTransfersTransferRequest = RequestUnion<
  RequestBodyData<
    'application/x-www-form-urlencoded',
    {
      description?: string;
      expand?: string[];
      metadata?:
        | {
            [key: string]: string;
          }
        | '';
    }
  >,
  {
    transfer: string;
  }
>;

export type PostTransfersTransferResponse =
  | ResponseUnion<200, ResponseBodyData<'application/json', Transfer>>
  | ResponseUnion<any, ResponseBodyData<'application/json', Error>>;

export type PostTransfersTransferRequestResult = RequestResult<
  PostTransfersTransferRequest,
  PostTransfersTransferResponse
>;

export function postTransfersTransfer(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<
    PostTransfersTransferRequest,
    'pathParams' | 'contentType' | 'body',
    never
  >,
  config?: RequestHandlerExecutionConfig
): Promise<PostTransfersTransferRequestResult> {
  return requestHandler.execute(
    createRequest(postTransfersTransferEndpointSchema, payload),
    config
  );
}
