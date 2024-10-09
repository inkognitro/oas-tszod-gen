import {
  z_Dispute,
  z_Error,
  Dispute,
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

export const getChargesChargeDisputeEndpointSchema = {
  path: '/v1/charges/{charge}/dispute',
  method: 'get',
  supportedSecuritySchemas: [],
  queryParamsZodSchema: z.object({
    expand: z.array(z.string()).optional(),
  }),
  pathParamsZodSchema: z.object({
    charge: z.string(),
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

export type GetChargesChargeDisputeRequest = RequestUnion<
  RequestBodyData<'application/x-www-form-urlencoded', {}>,
  {
    charge: string;
  },
  {
    expand?: string[];
  }
>;

export type GetChargesChargeDisputeResponse =
  | ResponseUnion<200, ResponseBodyData<'application/json', Dispute>>
  | ResponseUnion<any, ResponseBodyData<'application/json', Error>>;

export type GetChargesChargeDisputeRequestResult = RequestResult<
  GetChargesChargeDisputeRequest,
  GetChargesChargeDisputeResponse
>;

export function getChargesChargeDispute(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<
    GetChargesChargeDisputeRequest,
    'pathParams' | 'contentType' | 'body',
    'queryParams'
  >,
  config?: RequestHandlerExecutionConfig
): Promise<GetChargesChargeDisputeRequestResult> {
  return requestHandler.execute(
    createRequest(getChargesChargeDisputeEndpointSchema, payload),
    config
  );
}
