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
import {Mandate, Error} from '@example-outputs/stripe';

export const getMandatesMandateEndpointSchema = {
  path: '/v1/mandates/{mandate}',
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

export type GetMandatesMandateRequest = RequestUnion<
  RequestBodyData<'application/x-www-form-urlencoded', {}>,
  {
    mandate: string;
  },
  {
    expand?: string[];
  }
>;

export type GetMandatesMandateResponse =
  | ResponseUnion<200, ResponseBodyData<'application/json', Mandate>>
  | ResponseUnion<any, ResponseBodyData<'application/json', Error>>;

export type GetMandatesMandateRequestResult = RequestResult<
  GetMandatesMandateRequest,
  GetMandatesMandateResponse
>;

export function getMandatesMandate(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<
    GetMandatesMandateRequest,
    'pathParams' | 'contentType' | 'body',
    'queryParams'
  >,
  config?: RequestHandlerExecutionConfig
): Promise<GetMandatesMandateRequestResult> {
  return requestHandler.execute(
    createRequest(getMandatesMandateEndpointSchema, payload),
    config
  );
}
