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

export const postTransfersEndpointSchema = {
  path: '/v1/transfers',
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

export type PostTransfersRequest = RequestUnion<
  RequestBodyData<
    'application/x-www-form-urlencoded',
    {
      amount?: number; // int
      currency: string;
      description?: string;
      destination: string;
      expand?: string[];
      metadata?: {
        [key: string]: string;
      };
      source_transaction?: string;
      source_type?: 'bank_account' | 'card' | 'fpx';
      transfer_group?: string;
    }
  >
>;

export type PostTransfersResponse =
  | ResponseUnion<200, ResponseBodyData<'application/json', Transfer>>
  | ResponseUnion<any, ResponseBodyData<'application/json', Error>>;

export type PostTransfersRequestResult = RequestResult<
  PostTransfersRequest,
  PostTransfersResponse
>;

export function postTransfers(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<PostTransfersRequest, 'contentType' | 'body', never>,
  config?: RequestHandlerExecutionConfig
): Promise<PostTransfersRequestResult> {
  return requestHandler.execute(
    createRequest(postTransfersEndpointSchema, payload),
    config
  );
}
