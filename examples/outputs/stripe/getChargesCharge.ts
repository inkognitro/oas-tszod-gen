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
import {Charge, Error} from './schemas';

export const getChargesChargeEndpointSchema = {
  path: '/v1/charges/{charge}',
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

export type GetChargesChargeRequest = RequestUnion<
  RequestBodyData<'application/x-www-form-urlencoded', {}>,
  {
    charge: string;
  },
  {
    expand?: string[];
  }
>;

export type GetChargesChargeResponse =
  | ResponseUnion<200, ResponseBodyData<'application/json', Charge>>
  | ResponseUnion<any, ResponseBodyData<'application/json', Error>>;

export type GetChargesChargeRequestResult = RequestResult<
  GetChargesChargeRequest,
  GetChargesChargeResponse
>;

export function getChargesCharge(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<
    GetChargesChargeRequest,
    'pathParams' | 'contentType' | 'body',
    'queryParams'
  >,
  config?: RequestHandlerExecutionConfig
): Promise<GetChargesChargeRequestResult> {
  return requestHandler.execute(
    createRequest(getChargesChargeEndpointSchema, payload),
    config
  );
}
