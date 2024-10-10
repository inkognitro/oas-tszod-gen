import {z_Issuing_Settlement, Issuing_Settlement} from './issuing';
import {z_Error, Error} from './schemas';
import {z} from 'zod';
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

export const postTestHelpersIssuingSettlementsEndpointSchema = {
  path: '/v1/test_helpers/issuing/settlements',
  method: 'post',
  supportedSecuritySchemas: [],
  bodyByContentType: {
    'application/x-www-form-urlencoded': {
      zodSchema: z.object({
        bin: z.string(),
        clearing_date: z.number().int().safe().finite(),
        currency: z.string(),
        expand: z.array(z.string()).optional(),
        interchange_fees: z.number().int().safe().finite().optional(),
        net_total: z.number().int().safe().finite(),
        network_settlement_identifier: z.string().optional(),
        transaction_count: z.number().int().safe().finite().optional(),
        transaction_volume: z.number().int().safe().finite().optional(),
      }),
    },
  },
  responseByStatus: {
    '200': {
      bodyByContentType: {
        'application/json': {
          zodSchema: z_Issuing_Settlement,
        },
      },
    },
    default: {
      bodyByContentType: {
        'application/json': {
          zodSchema: z_Error,
        },
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
