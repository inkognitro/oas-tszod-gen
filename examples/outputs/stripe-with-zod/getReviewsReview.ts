import {z_Review, z_Error, Review, Error} from './schemas';
import {z} from 'zod';
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

export const getReviewsReviewEndpointSchema = {
  path: '/v1/reviews/{review}',
  method: 'get',
  supportedSecuritySchemas: [],
  queryParamsZodSchema: z.object({
    expand: z.array(z.string()).optional(),
  }),
  pathParamsZodSchema: z.object({
    review: z.string(),
  }),
  bodyByContentType: {
    'application/x-www-form-urlencoded': {
      zodSchema: z.object({}),
    },
  },
  responseByStatus: {
    '200': {
      bodyByContentType: {
        'application/json': {
          zodSchema: z_Review,
        },
      },
    },
    default: {
      bodyByContentType: {
        'application/json': {
          zodSchema: z_Error,
        },
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
