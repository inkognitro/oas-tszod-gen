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
import {Payout, Error} from './schemas';

export const getPayoutsPayoutEndpointSchema = {
  path: '/v1/payouts/{payout}',
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

export type GetPayoutsPayoutRequest = RequestUnion<
  RequestBodyData<'application/x-www-form-urlencoded', {}>,
  {
    payout: string;
  },
  {
    expand?: string[];
  }
>;

export type GetPayoutsPayoutResponse =
  | ResponseUnion<200, ResponseBodyData<'application/json', Payout>>
  | ResponseUnion<any, ResponseBodyData<'application/json', Error>>;

export type GetPayoutsPayoutRequestResult = RequestResult<
  GetPayoutsPayoutRequest,
  GetPayoutsPayoutResponse
>;

export function getPayoutsPayout(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<
    GetPayoutsPayoutRequest,
    'pathParams' | 'contentType' | 'body',
    'queryParams'
  >,
  config?: RequestHandlerExecutionConfig
): Promise<GetPayoutsPayoutRequestResult> {
  return requestHandler.execute(
    createRequest(getPayoutsPayoutEndpointSchema, payload),
    config
  );
}
