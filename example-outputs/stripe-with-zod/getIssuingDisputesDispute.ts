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

export const getIssuingDisputesDisputeEndpointSchema = {
  path: '/v1/issuing/disputes/{dispute}',
  method: 'get',
  supportedSecuritySchemas: [],
  queryParamsZodSchema: z.object({
    expand: z.array(z.string()).optional(),
  }),
  pathParamsZodSchema: z.object({
    dispute: z.string(),
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

export type GetIssuingDisputesDisputeRequest = RequestUnion<
  RequestBodyData<'application/x-www-form-urlencoded', {}>,
  {
    dispute: string;
  },
  {
    expand?: string[];
  }
>;

export type GetIssuingDisputesDisputeResponse =
  | ResponseUnion<200, ResponseBodyData<'application/json', Issuing_Dispute>>
  | ResponseUnion<any, ResponseBodyData<'application/json', Error>>;

export type GetIssuingDisputesDisputeRequestResult = RequestResult<
  GetIssuingDisputesDisputeRequest,
  GetIssuingDisputesDisputeResponse
>;

export function getIssuingDisputesDispute(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<
    GetIssuingDisputesDisputeRequest,
    'pathParams' | 'contentType' | 'body',
    'queryParams'
  >,
  config?: RequestHandlerExecutionConfig
): Promise<GetIssuingDisputesDisputeRequestResult> {
  return requestHandler.execute(
    createRequest(getIssuingDisputesDisputeEndpointSchema, payload),
    config
  );
}
