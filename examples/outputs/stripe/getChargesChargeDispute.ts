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
import {Dispute, Error} from './schemas';

export const getChargesChargeDisputeEndpointSchema = {
  path: '/v1/charges/{charge}/dispute',
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

export type GetChargesChargeDisputeRequest = RequestUnion<
  RequestBodyData<'application/x-www-form-urlencoded', {}>,
  {
    charge: string;
  },
  {
    expand?: string[];
  }
>;

export type GetChargesChargeDisputeResponse =
  | ResponseUnion<200, ResponseBodyData<'application/json', Dispute>>
  | ResponseUnion<any, ResponseBodyData<'application/json', Error>>;

export type GetChargesChargeDisputeRequestResult = RequestResult<
  GetChargesChargeDisputeRequest,
  GetChargesChargeDisputeResponse
>;

export function getChargesChargeDispute(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<
    GetChargesChargeDisputeRequest,
    'pathParams' | 'contentType' | 'body',
    'queryParams'
  >,
  config?: RequestHandlerExecutionConfig
): Promise<GetChargesChargeDisputeRequestResult> {
  return requestHandler.execute(
    createRequest(getChargesChargeDisputeEndpointSchema, payload),
    config
  );
}
