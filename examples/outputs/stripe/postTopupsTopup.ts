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

export const postTopupsTopupEndpointSchema = {
  path: '/v1/topups/{topup}',
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

export type PostTopupsTopupRequest = RequestUnion<
  RequestBodyData<
    'application/x-www-form-urlencoded',
    {
      description?: string;
      expand?: string[];
      metadata?:
        | {
            [key: string]: string;
          }
        | '';
    }
  >,
  {
    topup: string;
  }
>;

export type PostTopupsTopupResponse =
  | ResponseUnion<200, ResponseBodyData<'application/json', Topup>>
  | ResponseUnion<any, ResponseBodyData<'application/json', Error>>;

export type PostTopupsTopupRequestResult = RequestResult<
  PostTopupsTopupRequest,
  PostTopupsTopupResponse
>;

export function postTopupsTopup(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<
    PostTopupsTopupRequest,
    'pathParams' | 'contentType' | 'body',
    never
  >,
  config?: RequestHandlerExecutionConfig
): Promise<PostTopupsTopupRequestResult> {
  return requestHandler.execute(
    createRequest(postTopupsTopupEndpointSchema, payload),
    config
  );
}
