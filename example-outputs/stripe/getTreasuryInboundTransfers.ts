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

export const getTreasuryInboundTransfersEndpointSchema = {
  path: '/v1/treasury/inbound_transfers',
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

export type GetTreasuryInboundTransfersRequest = RequestUnion<
  RequestBodyData<'application/x-www-form-urlencoded', {}>,
  any,
  {
    ending_before?: string;
    expand?: string[];
    financial_account: string;
    limit?: number; // int
    starting_after?: string;
    status?: 'canceled' | 'failed' | 'processing' | 'succeeded';
  }
>;

export type GetTreasuryInboundTransfersResponse =
  | ResponseUnion<
      200,
      ResponseBodyData<
        'application/json',
        {
          data: Treasury_Inbound_transfer[];
          has_more: boolean;
          object: 'list';
          url: string;
        }
      >
    >
  | ResponseUnion<any, ResponseBodyData<'application/json', Error>>;

export type GetTreasuryInboundTransfersRequestResult = RequestResult<
  GetTreasuryInboundTransfersRequest,
  GetTreasuryInboundTransfersResponse
>;

export function getTreasuryInboundTransfers(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<
    GetTreasuryInboundTransfersRequest,
    'queryParams' | 'contentType' | 'body',
    never
  >,
  config?: RequestHandlerExecutionConfig
): Promise<GetTreasuryInboundTransfersRequestResult> {
  return requestHandler.execute(
    createRequest(getTreasuryInboundTransfersEndpointSchema, payload),
    config
  );
}
