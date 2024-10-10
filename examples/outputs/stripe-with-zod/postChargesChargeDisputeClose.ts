import {z_Dispute, z_Error, Dispute, Error} from './schemas';
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

export const postChargesChargeDisputeCloseEndpointSchema = {
  path: '/v1/charges/{charge}/dispute/close',
  method: 'post',
  supportedSecuritySchemas: [],
  pathParamsZodSchema: z.object({
    charge: z.string(),
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
          zodSchema: z_Dispute,
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

export type PostChargesChargeDisputeCloseRequest = RequestUnion<
  RequestBodyData<
    'application/x-www-form-urlencoded',
    {
      expand?: string[];
    }
  >,
  {
    charge: string;
  }
>;

export type PostChargesChargeDisputeCloseResponse =
  | ResponseUnion<200, ResponseBodyData<'application/json', Dispute>>
  | ResponseUnion<any, ResponseBodyData<'application/json', Error>>;

export type PostChargesChargeDisputeCloseRequestResult = RequestResult<
  PostChargesChargeDisputeCloseRequest,
  PostChargesChargeDisputeCloseResponse
>;

export function postChargesChargeDisputeClose(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<
    PostChargesChargeDisputeCloseRequest,
    'pathParams' | 'contentType' | 'body',
    never
  >,
  config?: RequestHandlerExecutionConfig
): Promise<PostChargesChargeDisputeCloseRequestResult> {
  return requestHandler.execute(
    createRequest(postChargesChargeDisputeCloseEndpointSchema, payload),
    config
  );
}
