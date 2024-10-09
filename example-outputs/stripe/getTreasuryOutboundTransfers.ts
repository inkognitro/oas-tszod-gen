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
import {Treasury_Outbound_transfer, Error} from '@example-outputs/stripe';

export const getTreasuryOutboundTransfersEndpointSchema = {
  path: '/v1/treasury/outbound_transfers',
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

export type GetTreasuryOutboundTransfersRequest = RequestUnion<
  RequestBodyData<'application/x-www-form-urlencoded', {}>,
  any,
  {
    ending_before?: string;
    expand?: string[];
    financial_account: string;
    limit?: number; // int
    starting_after?: string;
    status?: 'canceled' | 'failed' | 'posted' | 'processing' | 'returned';
  }
>;

export type GetTreasuryOutboundTransfersResponse =
  | ResponseUnion<
      200,
      ResponseBodyData<
        'application/json',
        {
          data: Treasury_Outbound_transfer[];
          has_more: boolean;
          object: 'list';
          url: string;
        }
      >
    >
  | ResponseUnion<any, ResponseBodyData<'application/json', Error>>;

export type GetTreasuryOutboundTransfersRequestResult = RequestResult<
  GetTreasuryOutboundTransfersRequest,
  GetTreasuryOutboundTransfersResponse
>;

export function getTreasuryOutboundTransfers(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<
    GetTreasuryOutboundTransfersRequest,
    'queryParams' | 'contentType' | 'body',
    never
  >,
  config?: RequestHandlerExecutionConfig
): Promise<GetTreasuryOutboundTransfersRequestResult> {
  return requestHandler.execute(
    createRequest(getTreasuryOutboundTransfersEndpointSchema, payload),
    config
  );
}
