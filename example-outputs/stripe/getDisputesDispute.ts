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

export const getDisputesDisputeEndpointSchema = {
  path: '/v1/disputes/{dispute}',
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

export type GetDisputesDisputeRequest = RequestUnion<
  RequestBodyData<'application/x-www-form-urlencoded', {}>,
  {
    dispute: string;
  },
  {
    expand?: string[];
  }
>;

export type GetDisputesDisputeResponse =
  | ResponseUnion<200, ResponseBodyData<'application/json', Dispute>>
  | ResponseUnion<any, ResponseBodyData<'application/json', Error>>;

export type GetDisputesDisputeRequestResult = RequestResult<
  GetDisputesDisputeRequest,
  GetDisputesDisputeResponse
>;

export function getDisputesDispute(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<
    GetDisputesDisputeRequest,
    'pathParams' | 'contentType' | 'body',
    'queryParams'
  >,
  config?: RequestHandlerExecutionConfig
): Promise<GetDisputesDisputeRequestResult> {
  return requestHandler.execute(
    createRequest(getDisputesDisputeEndpointSchema, payload),
    config
  );
}
