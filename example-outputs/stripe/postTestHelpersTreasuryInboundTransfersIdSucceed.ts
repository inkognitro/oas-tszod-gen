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
import {Treasury_Inbound_transfer, Error} from '@example-outputs/stripe';

export const postTestHelpersTreasuryInboundTransfersIdSucceedEndpointSchema = {
  path: '/v1/test_helpers/treasury/inbound_transfers/{id}/succeed',
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

export type PostTestHelpersTreasuryInboundTransfersIdSucceedRequest =
  RequestUnion<
    RequestBodyData<
      'application/x-www-form-urlencoded',
      {
        expand?: string[];
      }
    >,
    {
      id: string;
    }
  >;

export type PostTestHelpersTreasuryInboundTransfersIdSucceedResponse =
  | ResponseUnion<
      200,
      ResponseBodyData<'application/json', Treasury_Inbound_transfer>
    >
  | ResponseUnion<any, ResponseBodyData<'application/json', Error>>;

export type PostTestHelpersTreasuryInboundTransfersIdSucceedRequestResult =
  RequestResult<
    PostTestHelpersTreasuryInboundTransfersIdSucceedRequest,
    PostTestHelpersTreasuryInboundTransfersIdSucceedResponse
  >;

export function postTestHelpersTreasuryInboundTransfersIdSucceed(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<
    PostTestHelpersTreasuryInboundTransfersIdSucceedRequest,
    'pathParams' | 'contentType' | 'body',
    never
  >,
  config?: RequestHandlerExecutionConfig
): Promise<PostTestHelpersTreasuryInboundTransfersIdSucceedRequestResult> {
  return requestHandler.execute(
    createRequest(
      postTestHelpersTreasuryInboundTransfersIdSucceedEndpointSchema,
      payload
    ),
    config
  );
}
