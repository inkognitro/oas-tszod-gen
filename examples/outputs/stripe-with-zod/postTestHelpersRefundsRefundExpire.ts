import {z_Refund, z_Error, Refund, Error} from './schemas';
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

export const postTestHelpersRefundsRefundExpireEndpointSchema = {
  path: '/v1/test_helpers/refunds/{refund}/expire',
  method: 'post',
  supportedSecuritySchemas: [],
  pathParamsZodSchema: z.object({
    refund: z.string(),
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
          zodSchema: z_Refund,
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

export type PostTestHelpersRefundsRefundExpireRequest = RequestUnion<
  RequestBodyData<
    'application/x-www-form-urlencoded',
    {
      expand?: string[];
    }
  >,
  {
    refund: string;
  }
>;

export type PostTestHelpersRefundsRefundExpireResponse =
  | ResponseUnion<200, ResponseBodyData<'application/json', Refund>>
  | ResponseUnion<any, ResponseBodyData<'application/json', Error>>;

export type PostTestHelpersRefundsRefundExpireRequestResult = RequestResult<
  PostTestHelpersRefundsRefundExpireRequest,
  PostTestHelpersRefundsRefundExpireResponse
>;

export function postTestHelpersRefundsRefundExpire(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<
    PostTestHelpersRefundsRefundExpireRequest,
    'pathParams' | 'contentType' | 'body',
    never
  >,
  config?: RequestHandlerExecutionConfig
): Promise<PostTestHelpersRefundsRefundExpireRequestResult> {
  return requestHandler.execute(
    createRequest(postTestHelpersRefundsRefundExpireEndpointSchema, payload),
    config
  );
}
