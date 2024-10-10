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

export const postTreasuryInboundTransfersEndpointSchema = {
  path: '/v1/treasury/inbound_transfers',
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

export type PostTreasuryInboundTransfersRequest = RequestUnion<
  RequestBodyData<
    'application/x-www-form-urlencoded',
    {
      amount: number; // int
      currency: string;
      description?: string;
      expand?: string[];
      financial_account: string;
      metadata?: {
        [key: string]: string;
      };
      origin_payment_method: string;
      statement_descriptor?: string;
    }
  >
>;

export type PostTreasuryInboundTransfersResponse =
  | ResponseUnion<
      200,
      ResponseBodyData<'application/json', Treasury_Inbound_transfer>
    >
  | ResponseUnion<any, ResponseBodyData<'application/json', Error>>;

export type PostTreasuryInboundTransfersRequestResult = RequestResult<
  PostTreasuryInboundTransfersRequest,
  PostTreasuryInboundTransfersResponse
>;

export function postTreasuryInboundTransfers(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<
    PostTreasuryInboundTransfersRequest,
    'contentType' | 'body',
    never
  >,
  config?: RequestHandlerExecutionConfig
): Promise<PostTreasuryInboundTransfersRequestResult> {
  return requestHandler.execute(
    createRequest(postTreasuryInboundTransfersEndpointSchema, payload),
    config
  );
}
