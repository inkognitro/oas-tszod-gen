import {
  z_Review,
  z_Error,
  Review,
  Error,
} from '@example-outputs/stripe-with-zod';
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
} from '@example-outputs/stripe-with-zod/core';

export const postReviewsReviewApproveEndpointSchema = {
  path: '/v1/reviews/{review}/approve',
  method: 'post',
  supportedSecuritySchemas: [],
  pathParamsZodSchema: z.object({
    review: z.string(),
  }),
  bodyByContentType: {
    'application/x-www-form-urlencoded': {
      zodSchema: z.object({
        expand: z.array(z.string()).optional(),
      }),
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
