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

export const postIssuingSettlementsSettlementEndpointSchema = {
  path: '/v1/issuing/settlements/{settlement}',
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

export type PostIssuingSettlementsSettlementRequest = RequestUnion<
  RequestBodyData<
    'application/x-www-form-urlencoded',
    {
      expand?: string[];
      metadata?: {
        [key: string]: string;
      };
    }
  >,
  {
    settlement: string;
  }
>;

export type PostIssuingSettlementsSettlementResponse =
  | ResponseUnion<200, ResponseBodyData<'application/json', Issuing_Settlement>>
  | ResponseUnion<any, ResponseBodyData<'application/json', Error>>;

export type PostIssuingSettlementsSettlementRequestResult = RequestResult<
  PostIssuingSettlementsSettlementRequest,
  PostIssuingSettlementsSettlementResponse
>;

export function postIssuingSettlementsSettlement(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<
    PostIssuingSettlementsSettlementRequest,
    'pathParams' | 'contentType' | 'body',
    never
  >,
  config?: RequestHandlerExecutionConfig
): Promise<PostIssuingSettlementsSettlementRequestResult> {
  return requestHandler.execute(
    createRequest(postIssuingSettlementsSettlementEndpointSchema, payload),
    config
  );
}
