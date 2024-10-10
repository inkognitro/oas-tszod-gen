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
import {Treasury_Outbound_transfer} from './treasury';
import {Error} from './schemas';

export const postTreasuryOutboundTransfersEndpointSchema = {
  path: '/v1/treasury/outbound_transfers',
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

export type PostTreasuryOutboundTransfersRequest = RequestUnion<
  RequestBodyData<
    'application/x-www-form-urlencoded',
    {
      amount: number; // int
      currency: string;
      description?: string;
      destination_payment_method?: string;
      destination_payment_method_options?: {
        us_bank_account?: (
          | {
              network?: 'ach' | 'us_domestic_wire';
            }
          | ''
        ) &
          Partial<{
            network?: 'ach' | 'us_domestic_wire';
          }>;
      };
      expand?: string[];
      financial_account: string;
      metadata?: {
        [key: string]: string;
      };
      statement_descriptor?: string;
    }
  >
>;

export type PostTreasuryOutboundTransfersResponse =
  | ResponseUnion<
      200,
      ResponseBodyData<'application/json', Treasury_Outbound_transfer>
    >
  | ResponseUnion<any, ResponseBodyData<'application/json', Error>>;

export type PostTreasuryOutboundTransfersRequestResult = RequestResult<
  PostTreasuryOutboundTransfersRequest,
  PostTreasuryOutboundTransfersResponse
>;

export function postTreasuryOutboundTransfers(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<
    PostTreasuryOutboundTransfersRequest,
    'contentType' | 'body',
    never
  >,
  config?: RequestHandlerExecutionConfig
): Promise<PostTreasuryOutboundTransfersRequestResult> {
  return requestHandler.execute(
    createRequest(postTreasuryOutboundTransfersEndpointSchema, payload),
    config
  );
}
