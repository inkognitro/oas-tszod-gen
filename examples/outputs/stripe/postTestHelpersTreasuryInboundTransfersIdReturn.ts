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
import {Treasury_Inbound_transfer} from './treasury';
import {Error} from './schemas';

export const postTestHelpersTreasuryInboundTransfersIdReturnEndpointSchema = {
  path: '/v1/test_helpers/treasury/inbound_transfers/{id}/return',
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

export type PostTestHelpersTreasuryInboundTransfersIdReturnRequest =
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

export type PostTestHelpersTreasuryInboundTransfersIdReturnResponse =
  | ResponseUnion<
      200,
      ResponseBodyData<'application/json', Treasury_Inbound_transfer>
    >
  | ResponseUnion<any, ResponseBodyData<'application/json', Error>>;

export type PostTestHelpersTreasuryInboundTransfersIdReturnRequestResult =
  RequestResult<
    PostTestHelpersTreasuryInboundTransfersIdReturnRequest,
    PostTestHelpersTreasuryInboundTransfersIdReturnResponse
  >;

export function postTestHelpersTreasuryInboundTransfersIdReturn(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<
    PostTestHelpersTreasuryInboundTransfersIdReturnRequest,
    'pathParams' | 'contentType' | 'body',
    never
  >,
  config?: RequestHandlerExecutionConfig
): Promise<PostTestHelpersTreasuryInboundTransfersIdReturnRequestResult> {
  return requestHandler.execute(
    createRequest(
      postTestHelpersTreasuryInboundTransfersIdReturnEndpointSchema,
      payload
    ),
    config
  );
}
