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
import {Billing_Meter} from './billing';
import {Error} from './schemas';

export const getBillingMetersIdEndpointSchema = {
  path: '/v1/billing/meters/{id}',
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

export type GetBillingMetersIdRequest = RequestUnion<
  RequestBodyData<'application/x-www-form-urlencoded', {}>,
  {
    id: string;
  },
  {
    expand?: string[];
  }
>;

export type GetBillingMetersIdResponse =
  | ResponseUnion<200, ResponseBodyData<'application/json', Billing_Meter>>
  | ResponseUnion<any, ResponseBodyData<'application/json', Error>>;

export type GetBillingMetersIdRequestResult = RequestResult<
  GetBillingMetersIdRequest,
  GetBillingMetersIdResponse
>;

export function getBillingMetersId(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<
    GetBillingMetersIdRequest,
    'pathParams' | 'contentType' | 'body',
    'queryParams'
  >,
  config?: RequestHandlerExecutionConfig
): Promise<GetBillingMetersIdRequestResult> {
  return requestHandler.execute(
    createRequest(getBillingMetersIdEndpointSchema, payload),
    config
  );
}
