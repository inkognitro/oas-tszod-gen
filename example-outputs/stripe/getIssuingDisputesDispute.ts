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
import {Issuing_Dispute, Error} from '@example-outputs/stripe';

export const getIssuingDisputesDisputeEndpointSchema = {
  path: '/v1/issuing/disputes/{dispute}',
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

export type GetIssuingDisputesDisputeRequest = RequestUnion<
  RequestBodyData<'application/x-www-form-urlencoded', {}>,
  {
    dispute: string;
  },
  {
    expand?: string[];
  }
>;

export type GetIssuingDisputesDisputeResponse =
  | ResponseUnion<200, ResponseBodyData<'application/json', Issuing_Dispute>>
  | ResponseUnion<any, ResponseBodyData<'application/json', Error>>;

export type GetIssuingDisputesDisputeRequestResult = RequestResult<
  GetIssuingDisputesDisputeRequest,
  GetIssuingDisputesDisputeResponse
>;

export function getIssuingDisputesDispute(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<
    GetIssuingDisputesDisputeRequest,
    'pathParams' | 'contentType' | 'body',
    'queryParams'
  >,
  config?: RequestHandlerExecutionConfig
): Promise<GetIssuingDisputesDisputeRequestResult> {
  return requestHandler.execute(
    createRequest(getIssuingDisputesDisputeEndpointSchema, payload),
    config
  );
}
