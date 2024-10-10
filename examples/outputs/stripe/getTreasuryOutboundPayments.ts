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
import {Treasury_Outbound_payment} from './treasury';
import {Error} from './schemas';

export const getTreasuryOutboundPaymentsEndpointSchema = {
  path: '/v1/treasury/outbound_payments',
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

export type GetTreasuryOutboundPaymentsRequest = RequestUnion<
  RequestBodyData<'application/x-www-form-urlencoded', {}>,
  any,
  {
    created?: (
      | {
          gt?: number; // int
          gte?: number; // int
          lt?: number; // int
          lte?: number; // int
        }
      | number
    ) &
      Partial<{
        gt?: number; // int
        gte?: number; // int
        lt?: number; // int
        lte?: number; // int
      }>;
    customer?: string;
    ending_before?: string;
    expand?: string[];
    financial_account: string;
    limit?: number; // int
    starting_after?: string;
    status?: 'canceled' | 'failed' | 'posted' | 'processing' | 'returned';
  }
>;

export type GetTreasuryOutboundPaymentsResponse =
  | ResponseUnion<
      200,
      ResponseBodyData<
        'application/json',
        {
          data: Treasury_Outbound_payment[];
          has_more: boolean;
          object: 'list';
          url: string;
        }
      >
    >
  | ResponseUnion<any, ResponseBodyData<'application/json', Error>>;

export type GetTreasuryOutboundPaymentsRequestResult = RequestResult<
  GetTreasuryOutboundPaymentsRequest,
  GetTreasuryOutboundPaymentsResponse
>;

export function getTreasuryOutboundPayments(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<
    GetTreasuryOutboundPaymentsRequest,
    'queryParams' | 'contentType' | 'body',
    never
  >,
  config?: RequestHandlerExecutionConfig
): Promise<GetTreasuryOutboundPaymentsRequestResult> {
  return requestHandler.execute(
    createRequest(getTreasuryOutboundPaymentsEndpointSchema, payload),
    config
  );
}
