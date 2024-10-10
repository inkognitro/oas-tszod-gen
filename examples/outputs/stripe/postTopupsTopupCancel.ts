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
import {Topup, Error} from './schemas';

export const postTopupsTopupCancelEndpointSchema = {
  path: '/v1/topups/{topup}/cancel',
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

export type PostTopupsTopupCancelRequest = RequestUnion<
  RequestBodyData<
    'application/x-www-form-urlencoded',
    {
      expand?: string[];
    }
  >,
  {
    topup: string;
  }
>;

export type PostTopupsTopupCancelResponse =
  | ResponseUnion<200, ResponseBodyData<'application/json', Topup>>
  | ResponseUnion<any, ResponseBodyData<'application/json', Error>>;

export type PostTopupsTopupCancelRequestResult = RequestResult<
  PostTopupsTopupCancelRequest,
  PostTopupsTopupCancelResponse
>;

export function postTopupsTopupCancel(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<
    PostTopupsTopupCancelRequest,
    'pathParams' | 'contentType' | 'body',
    never
  >,
  config?: RequestHandlerExecutionConfig
): Promise<PostTopupsTopupCancelRequestResult> {
  return requestHandler.execute(
    createRequest(postTopupsTopupCancelEndpointSchema, payload),
    config
  );
}
