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
import {Refund, Error} from './schemas';

export const getChargesChargeRefundsRefundEndpointSchema = {
  path: '/v1/charges/{charge}/refunds/{refund}',
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

export type GetChargesChargeRefundsRefundRequest = RequestUnion<
  RequestBodyData<'application/x-www-form-urlencoded', {}>,
  {
    charge: string;
    refund: string;
  },
  {
    expand?: string[];
  }
>;

export type GetChargesChargeRefundsRefundResponse =
  | ResponseUnion<200, ResponseBodyData<'application/json', Refund>>
  | ResponseUnion<any, ResponseBodyData<'application/json', Error>>;

export type GetChargesChargeRefundsRefundRequestResult = RequestResult<
  GetChargesChargeRefundsRefundRequest,
  GetChargesChargeRefundsRefundResponse
>;

export function getChargesChargeRefundsRefund(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<
    GetChargesChargeRefundsRefundRequest,
    'pathParams' | 'contentType' | 'body',
    'queryParams'
  >,
  config?: RequestHandlerExecutionConfig
): Promise<GetChargesChargeRefundsRefundRequestResult> {
  return requestHandler.execute(
    createRequest(getChargesChargeRefundsRefundEndpointSchema, payload),
    config
  );
}
