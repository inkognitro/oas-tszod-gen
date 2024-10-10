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
import {Dispute, Error} from './schemas';

export const postDisputesDisputeCloseEndpointSchema = {
  path: '/v1/disputes/{dispute}/close',
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

export type PostDisputesDisputeCloseRequest = RequestUnion<
  RequestBodyData<
    'application/x-www-form-urlencoded',
    {
      expand?: string[];
    }
  >,
  {
    dispute: string;
  }
>;

export type PostDisputesDisputeCloseResponse =
  | ResponseUnion<200, ResponseBodyData<'application/json', Dispute>>
  | ResponseUnion<any, ResponseBodyData<'application/json', Error>>;

export type PostDisputesDisputeCloseRequestResult = RequestResult<
  PostDisputesDisputeCloseRequest,
  PostDisputesDisputeCloseResponse
>;

export function postDisputesDisputeClose(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<
    PostDisputesDisputeCloseRequest,
    'pathParams' | 'contentType' | 'body',
    never
  >,
  config?: RequestHandlerExecutionConfig
): Promise<PostDisputesDisputeCloseRequestResult> {
  return requestHandler.execute(
    createRequest(postDisputesDisputeCloseEndpointSchema, payload),
    config
  );
}
