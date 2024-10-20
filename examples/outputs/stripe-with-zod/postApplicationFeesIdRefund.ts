import {z_Application_fee, z_Error, Application_fee, Error} from './schemas';
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

export const postApplicationFeesIdRefundEndpointSchema = {
  path: '/v1/application_fees/{id}/refund',
  method: 'post',
  supportedSecuritySchemas: [],
  pathParamsZodSchema: z.object({
    id: z.string(),
  }),
  bodyByContentType: {
    'application/x-www-form-urlencoded': {
      zodSchema: z.object({
        amount: z.number().int().safe().finite().optional(),
        directive: z.string().optional(),
        expand: z.array(z.string()).optional(),
      }),
    },
  },
  responseByStatus: {
    '200': {
      bodyByContentType: {
        'application/json': {
          zodSchema: z_Application_fee,
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

export type PostApplicationFeesIdRefundRequest = RequestUnion<
  RequestBodyData<
    'application/x-www-form-urlencoded',
    {
      amount?: number; // int
      directive?: string;
      expand?: string[];
    }
  >,
  {
    id: string;
  }
>;

export type PostApplicationFeesIdRefundResponse =
  | ResponseUnion<200, ResponseBodyData<'application/json', Application_fee>>
  | ResponseUnion<any, ResponseBodyData<'application/json', Error>>;

export type PostApplicationFeesIdRefundRequestResult = RequestResult<
  PostApplicationFeesIdRefundRequest,
  PostApplicationFeesIdRefundResponse
>;

export function postApplicationFeesIdRefund(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<
    PostApplicationFeesIdRefundRequest,
    'pathParams' | 'contentType' | 'body',
    never
  >,
  config?: RequestHandlerExecutionConfig
): Promise<PostApplicationFeesIdRefundRequestResult> {
  return requestHandler.execute(
    createRequest(postApplicationFeesIdRefundEndpointSchema, payload),
    config
  );
}
