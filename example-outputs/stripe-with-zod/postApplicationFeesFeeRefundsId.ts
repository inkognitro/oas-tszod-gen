import {
  z_Fee_refund,
  z_Error,
  Fee_refund,
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

export const postApplicationFeesFeeRefundsIdEndpointSchema = {
  path: '/v1/application_fees/{fee}/refunds/{id}',
  method: 'post',
  supportedSecuritySchemas: [],
  pathParamsZodSchema: z.object({
    fee: z.string(),
    id: z.string(),
  }),
  bodyByContentType: {
    'application/x-www-form-urlencoded': {
      zodSchema: z.object({
        expand: z.array(z.string()).optional(),
        metadata: z.union([z.record(z.string()), z.enum([''])]).optional(),
      }),
    },
  },
  responseByStatus: {
    '200': {
      bodyByContentType: {
        'application/json': {
          zodSchema: z_Fee_refund,
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

export type PostApplicationFeesFeeRefundsIdRequest = RequestUnion<
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
    fee: string;
    id: string;
  }
>;

export type PostApplicationFeesFeeRefundsIdResponse =
  | ResponseUnion<200, ResponseBodyData<'application/json', Fee_refund>>
  | ResponseUnion<any, ResponseBodyData<'application/json', Error>>;

export type PostApplicationFeesFeeRefundsIdRequestResult = RequestResult<
  PostApplicationFeesFeeRefundsIdRequest,
  PostApplicationFeesFeeRefundsIdResponse
>;

export function postApplicationFeesFeeRefundsId(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<
    PostApplicationFeesFeeRefundsIdRequest,
    'pathParams' | 'contentType' | 'body',
    never
  >,
  config?: RequestHandlerExecutionConfig
): Promise<PostApplicationFeesFeeRefundsIdRequestResult> {
  return requestHandler.execute(
    createRequest(postApplicationFeesFeeRefundsIdEndpointSchema, payload),
    config
  );
}
