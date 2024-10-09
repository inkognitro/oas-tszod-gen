import {
  z_Issuing_Settlement,
  z_Error,
  Issuing_Settlement,
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

export const postIssuingSettlementsSettlementEndpointSchema = {
  path: '/v1/issuing/settlements/{settlement}',
  method: 'post',
  supportedSecuritySchemas: [],
  pathParamsZodSchema: z.object({
    settlement: z.string(),
  }),
  bodyByContentType: {
    'application/x-www-form-urlencoded': {
      zodSchema: z.object({
        expand: z.array(z.string()).optional(),
        metadata: z.record(z.string()).optional(),
      }),
    },
  },
  responseByStatus: {
    '200': {
      bodyByContentType: {
        'application/json': {
          zodSchema: z_Issuing_Settlement,
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

export type PostIssuingSettlementsSettlementRequest = RequestUnion<
  RequestBodyData<
    'application/x-www-form-urlencoded',
    {
      expand?: string[];
      metadata?: {
        [key: string]: string;
      };
    }
  >,
  {
    settlement: string;
  }
>;

export type PostIssuingSettlementsSettlementResponse =
  | ResponseUnion<200, ResponseBodyData<'application/json', Issuing_Settlement>>
  | ResponseUnion<any, ResponseBodyData<'application/json', Error>>;

export type PostIssuingSettlementsSettlementRequestResult = RequestResult<
  PostIssuingSettlementsSettlementRequest,
  PostIssuingSettlementsSettlementResponse
>;

export function postIssuingSettlementsSettlement(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<
    PostIssuingSettlementsSettlementRequest,
    'pathParams' | 'contentType' | 'body',
    never
  >,
  config?: RequestHandlerExecutionConfig
): Promise<PostIssuingSettlementsSettlementRequestResult> {
  return requestHandler.execute(
    createRequest(postIssuingSettlementsSettlementEndpointSchema, payload),
    config
  );
}
