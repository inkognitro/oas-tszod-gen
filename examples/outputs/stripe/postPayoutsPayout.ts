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

export const postPayoutsPayoutEndpointSchema = {
  path: '/v1/payouts/{payout}',
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

export type PostPayoutsPayoutRequest = RequestUnion<
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
    payout: string;
  }
>;

export type PostPayoutsPayoutResponse =
  | ResponseUnion<200, ResponseBodyData<'application/json', Payout>>
  | ResponseUnion<any, ResponseBodyData<'application/json', Error>>;

export type PostPayoutsPayoutRequestResult = RequestResult<
  PostPayoutsPayoutRequest,
  PostPayoutsPayoutResponse
>;

export function postPayoutsPayout(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<
    PostPayoutsPayoutRequest,
    'pathParams' | 'contentType' | 'body',
    never
  >,
  config?: RequestHandlerExecutionConfig
): Promise<PostPayoutsPayoutRequestResult> {
  return requestHandler.execute(
    createRequest(postPayoutsPayoutEndpointSchema, payload),
    config
  );
}
