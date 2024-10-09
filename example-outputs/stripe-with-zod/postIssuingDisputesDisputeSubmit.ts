import {
  z_Issuing_Dispute,
  z_Error,
  Issuing_Dispute,
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

export const postIssuingDisputesDisputeSubmitEndpointSchema = {
  path: '/v1/issuing/disputes/{dispute}/submit',
  method: 'post',
  supportedSecuritySchemas: [],
  pathParamsZodSchema: z.object({
    dispute: z.string(),
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
          zodSchema: z_Issuing_Dispute,
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

export type PostIssuingDisputesDisputeSubmitRequest = RequestUnion<
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
    dispute: string;
  }
>;

export type PostIssuingDisputesDisputeSubmitResponse =
  | ResponseUnion<200, ResponseBodyData<'application/json', Issuing_Dispute>>
  | ResponseUnion<any, ResponseBodyData<'application/json', Error>>;

export type PostIssuingDisputesDisputeSubmitRequestResult = RequestResult<
  PostIssuingDisputesDisputeSubmitRequest,
  PostIssuingDisputesDisputeSubmitResponse
>;

export function postIssuingDisputesDisputeSubmit(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<
    PostIssuingDisputesDisputeSubmitRequest,
    'pathParams' | 'contentType' | 'body',
    never
  >,
  config?: RequestHandlerExecutionConfig
): Promise<PostIssuingDisputesDisputeSubmitRequestResult> {
  return requestHandler.execute(
    createRequest(postIssuingDisputesDisputeSubmitEndpointSchema, payload),
    config
  );
}
