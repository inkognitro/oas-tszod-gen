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
import {Fee_refund, Error} from '@example-outputs/stripe';

export const getApplicationFeesFeeRefundsIdEndpointSchema = {
  path: '/v1/application_fees/{fee}/refunds/{id}',
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

export type GetApplicationFeesFeeRefundsIdRequest = RequestUnion<
  RequestBodyData<'application/x-www-form-urlencoded', {}>,
  {
    fee: string;
    id: string;
  },
  {
    expand?: string[];
  }
>;

export type GetApplicationFeesFeeRefundsIdResponse =
  | ResponseUnion<200, ResponseBodyData<'application/json', Fee_refund>>
  | ResponseUnion<any, ResponseBodyData<'application/json', Error>>;

export type GetApplicationFeesFeeRefundsIdRequestResult = RequestResult<
  GetApplicationFeesFeeRefundsIdRequest,
  GetApplicationFeesFeeRefundsIdResponse
>;

export function getApplicationFeesFeeRefundsId(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<
    GetApplicationFeesFeeRefundsIdRequest,
    'pathParams' | 'contentType' | 'body',
    'queryParams'
  >,
  config?: RequestHandlerExecutionConfig
): Promise<GetApplicationFeesFeeRefundsIdRequestResult> {
  return requestHandler.execute(
    createRequest(getApplicationFeesFeeRefundsIdEndpointSchema, payload),
    config
  );
}
