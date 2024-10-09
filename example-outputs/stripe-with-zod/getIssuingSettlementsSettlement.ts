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

export const getIssuingSettlementsSettlementEndpointSchema = {
  path: '/v1/issuing/settlements/{settlement}',
  method: 'get',
  supportedSecuritySchemas: [],
  queryParamsZodSchema: z.object({
    expand: z.array(z.string()).optional(),
  }),
  pathParamsZodSchema: z.object({
    settlement: z.string(),
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

export type GetIssuingSettlementsSettlementRequest = RequestUnion<
  RequestBodyData<'application/x-www-form-urlencoded', {}>,
  {
    settlement: string;
  },
  {
    expand?: string[];
  }
>;

export type GetIssuingSettlementsSettlementResponse =
  | ResponseUnion<200, ResponseBodyData<'application/json', Issuing_Settlement>>
  | ResponseUnion<any, ResponseBodyData<'application/json', Error>>;

export type GetIssuingSettlementsSettlementRequestResult = RequestResult<
  GetIssuingSettlementsSettlementRequest,
  GetIssuingSettlementsSettlementResponse
>;

export function getIssuingSettlementsSettlement(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<
    GetIssuingSettlementsSettlementRequest,
    'pathParams' | 'contentType' | 'body',
    'queryParams'
  >,
  config?: RequestHandlerExecutionConfig
): Promise<GetIssuingSettlementsSettlementRequestResult> {
  return requestHandler.execute(
    createRequest(getIssuingSettlementsSettlementEndpointSchema, payload),
    config
  );
}
