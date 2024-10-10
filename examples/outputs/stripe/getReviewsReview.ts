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

export const getReviewsReviewEndpointSchema = {
  path: '/v1/reviews/{review}',
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

export type GetReviewsReviewRequest = RequestUnion<
  RequestBodyData<'application/x-www-form-urlencoded', {}>,
  {
    review: string;
  },
  {
    expand?: string[];
  }
>;

export type GetReviewsReviewResponse =
  | ResponseUnion<200, ResponseBodyData<'application/json', Review>>
  | ResponseUnion<any, ResponseBodyData<'application/json', Error>>;

export type GetReviewsReviewRequestResult = RequestResult<
  GetReviewsReviewRequest,
  GetReviewsReviewResponse
>;

export function getReviewsReview(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<
    GetReviewsReviewRequest,
    'pathParams' | 'contentType' | 'body',
    'queryParams'
  >,
  config?: RequestHandlerExecutionConfig
): Promise<GetReviewsReviewRequestResult> {
  return requestHandler.execute(
    createRequest(getReviewsReviewEndpointSchema, payload),
    config
  );
}
