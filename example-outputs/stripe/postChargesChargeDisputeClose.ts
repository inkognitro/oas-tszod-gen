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
import {Dispute, Error} from '@example-outputs/stripe';

export const postChargesChargeDisputeCloseEndpointSchema = {
  path: '/v1/charges/{charge}/dispute/close',
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

export type PostChargesChargeDisputeCloseRequest = RequestUnion<
  RequestBodyData<
    'application/x-www-form-urlencoded',
    {
      expand?: string[];
    }
  >,
  {
    charge: string;
  }
>;

export type PostChargesChargeDisputeCloseResponse =
  | ResponseUnion<200, ResponseBodyData<'application/json', Dispute>>
  | ResponseUnion<any, ResponseBodyData<'application/json', Error>>;

export type PostChargesChargeDisputeCloseRequestResult = RequestResult<
  PostChargesChargeDisputeCloseRequest,
  PostChargesChargeDisputeCloseResponse
>;

export function postChargesChargeDisputeClose(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<
    PostChargesChargeDisputeCloseRequest,
    'pathParams' | 'contentType' | 'body',
    never
  >,
  config?: RequestHandlerExecutionConfig
): Promise<PostChargesChargeDisputeCloseRequestResult> {
  return requestHandler.execute(
    createRequest(postChargesChargeDisputeCloseEndpointSchema, payload),
    config
  );
}
