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

export const getDisputesDisputeEndpointSchema = {
  path: '/v1/disputes/{dispute}',
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

export type GetDisputesDisputeRequest = RequestUnion<
  RequestBodyData<'application/x-www-form-urlencoded', {}>,
  {
    dispute: string;
  },
  {
    expand?: string[];
  }
>;

export type GetDisputesDisputeResponse =
  | ResponseUnion<200, ResponseBodyData<'application/json', Dispute>>
  | ResponseUnion<any, ResponseBodyData<'application/json', Error>>;

export type GetDisputesDisputeRequestResult = RequestResult<
  GetDisputesDisputeRequest,
  GetDisputesDisputeResponse
>;

export function getDisputesDispute(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<
    GetDisputesDisputeRequest,
    'pathParams' | 'contentType' | 'body',
    'queryParams'
  >,
  config?: RequestHandlerExecutionConfig
): Promise<GetDisputesDisputeRequestResult> {
  return requestHandler.execute(
    createRequest(getDisputesDisputeEndpointSchema, payload),
    config
  );
}
