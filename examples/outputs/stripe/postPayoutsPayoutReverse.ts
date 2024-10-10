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

export const postPayoutsPayoutReverseEndpointSchema = {
  path: '/v1/payouts/{payout}/reverse',
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

export type PostPayoutsPayoutReverseRequest = RequestUnion<
  RequestBodyData<
    'application/x-www-form-urlencoded',
    {
      expand?: string[];
      metadata?: {
        [key: string]: string;
      };
    }
  >,
  {
    payout: string;
  }
>;

export type PostPayoutsPayoutReverseResponse =
  | ResponseUnion<200, ResponseBodyData<'application/json', Payout>>
  | ResponseUnion<any, ResponseBodyData<'application/json', Error>>;

export type PostPayoutsPayoutReverseRequestResult = RequestResult<
  PostPayoutsPayoutReverseRequest,
  PostPayoutsPayoutReverseResponse
>;

export function postPayoutsPayoutReverse(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<
    PostPayoutsPayoutReverseRequest,
    'pathParams' | 'contentType' | 'body',
    never
  >,
  config?: RequestHandlerExecutionConfig
): Promise<PostPayoutsPayoutReverseRequestResult> {
  return requestHandler.execute(
    createRequest(postPayoutsPayoutReverseEndpointSchema, payload),
    config
  );
}
