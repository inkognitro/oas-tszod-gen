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

export const postChargesChargeRefundsRefundEndpointSchema = {
  path: '/v1/charges/{charge}/refunds/{refund}',
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

export type PostChargesChargeRefundsRefundRequest = RequestUnion<
  RequestBodyData<
    'application/x-www-form-urlencoded',
    {
      expand?: string[];
      metadata?:
        | {
            [key: string]: string;
          }
        | '';
    }
  >,
  {
    charge: string;
    refund: string;
  }
>;

export type PostChargesChargeRefundsRefundResponse =
  | ResponseUnion<200, ResponseBodyData<'application/json', Refund>>
  | ResponseUnion<any, ResponseBodyData<'application/json', Error>>;

export type PostChargesChargeRefundsRefundRequestResult = RequestResult<
  PostChargesChargeRefundsRefundRequest,
  PostChargesChargeRefundsRefundResponse
>;

export function postChargesChargeRefundsRefund(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<
    PostChargesChargeRefundsRefundRequest,
    'pathParams' | 'contentType' | 'body',
    never
  >,
  config?: RequestHandlerExecutionConfig
): Promise<PostChargesChargeRefundsRefundRequestResult> {
  return requestHandler.execute(
    createRequest(postChargesChargeRefundsRefundEndpointSchema, payload),
    config
  );
}
