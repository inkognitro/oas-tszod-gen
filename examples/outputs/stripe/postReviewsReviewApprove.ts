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
import {Review, Error} from './schemas';

export const postReviewsReviewApproveEndpointSchema = {
  path: '/v1/reviews/{review}/approve',
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

export type PostReviewsReviewApproveRequest = RequestUnion<
  RequestBodyData<
    'application/x-www-form-urlencoded',
    {
      expand?: string[];
    }
  >,
  {
    review: string;
  }
>;

export type PostReviewsReviewApproveResponse =
  | ResponseUnion<200, ResponseBodyData<'application/json', Review>>
  | ResponseUnion<any, ResponseBodyData<'application/json', Error>>;

export type PostReviewsReviewApproveRequestResult = RequestResult<
  PostReviewsReviewApproveRequest,
  PostReviewsReviewApproveResponse
>;

export function postReviewsReviewApprove(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<
    PostReviewsReviewApproveRequest,
    'pathParams' | 'contentType' | 'body',
    never
  >,
  config?: RequestHandlerExecutionConfig
): Promise<PostReviewsReviewApproveRequestResult> {
  return requestHandler.execute(
    createRequest(postReviewsReviewApproveEndpointSchema, payload),
    config
  );
}
