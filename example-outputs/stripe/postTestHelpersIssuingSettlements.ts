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
import {Issuing_Settlement, Error} from '@example-outputs/stripe';

export const postTestHelpersIssuingSettlementsEndpointSchema = {
  path: '/v1/test_helpers/issuing/settlements',
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

export type PostTestHelpersIssuingSettlementsRequest = RequestUnion<
  RequestBodyData<
    'application/x-www-form-urlencoded',
    {
      bin: string;
      clearing_date: number; // int
      currency: string;
      expand?: string[];
      interchange_fees?: number; // int
      net_total: number; // int
      network_settlement_identifier?: string;
      transaction_count?: number; // int
      transaction_volume?: number; // int
    }
  >
>;

export type PostTestHelpersIssuingSettlementsResponse =
  | ResponseUnion<200, ResponseBodyData<'application/json', Issuing_Settlement>>
  | ResponseUnion<any, ResponseBodyData<'application/json', Error>>;

export type PostTestHelpersIssuingSettlementsRequestResult = RequestResult<
  PostTestHelpersIssuingSettlementsRequest,
  PostTestHelpersIssuingSettlementsResponse
>;

export function postTestHelpersIssuingSettlements(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<
    PostTestHelpersIssuingSettlementsRequest,
    'contentType' | 'body',
    never
  >,
  config?: RequestHandlerExecutionConfig
): Promise<PostTestHelpersIssuingSettlementsRequestResult> {
  return requestHandler.execute(
    createRequest(postTestHelpersIssuingSettlementsEndpointSchema, payload),
    config
  );
}
