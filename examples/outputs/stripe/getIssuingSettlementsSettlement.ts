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
import {Issuing_Settlement} from './issuing';
import {Error} from './schemas';

export const getIssuingSettlementsSettlementEndpointSchema = {
  path: '/v1/issuing/settlements/{settlement}',
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

export type GetIssuingSettlementsSettlementRequest = RequestUnion<
  RequestBodyData<'application/x-www-form-urlencoded', {}>,
  {
    settlement: string;
  },
  {
    expand?: string[];
  }
>;

export type GetIssuingSettlementsSettlementResponse =
  | ResponseUnion<200, ResponseBodyData<'application/json', Issuing_Settlement>>
  | ResponseUnion<any, ResponseBodyData<'application/json', Error>>;

export type GetIssuingSettlementsSettlementRequestResult = RequestResult<
  GetIssuingSettlementsSettlementRequest,
  GetIssuingSettlementsSettlementResponse
>;

export function getIssuingSettlementsSettlement(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<
    GetIssuingSettlementsSettlementRequest,
    'pathParams' | 'contentType' | 'body',
    'queryParams'
  >,
  config?: RequestHandlerExecutionConfig
): Promise<GetIssuingSettlementsSettlementRequestResult> {
  return requestHandler.execute(
    createRequest(getIssuingSettlementsSettlementEndpointSchema, payload),
    config
  );
}
