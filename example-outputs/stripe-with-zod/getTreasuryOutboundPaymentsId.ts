import {
  z_Treasury_Outbound_payment,
  z_Error,
  Treasury_Outbound_payment,
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

export const getTreasuryOutboundPaymentsIdEndpointSchema = {
  path: '/v1/treasury/outbound_payments/{id}',
  method: 'get',
  supportedSecuritySchemas: [],
  queryParamsZodSchema: z.object({
    expand: z.array(z.string()).optional(),
  }),
  pathParamsZodSchema: z.object({
    id: z.string(),
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
          zodSchema: z_Treasury_Outbound_payment,
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

export type GetTreasuryOutboundPaymentsIdRequest = RequestUnion<
  RequestBodyData<'application/x-www-form-urlencoded', {}>,
  {
    id: string;
  },
  {
    expand?: string[];
  }
>;

export type GetTreasuryOutboundPaymentsIdResponse =
  | ResponseUnion<
      200,
      ResponseBodyData<'application/json', Treasury_Outbound_payment>
    >
  | ResponseUnion<any, ResponseBodyData<'application/json', Error>>;

export type GetTreasuryOutboundPaymentsIdRequestResult = RequestResult<
  GetTreasuryOutboundPaymentsIdRequest,
  GetTreasuryOutboundPaymentsIdResponse
>;

export function getTreasuryOutboundPaymentsId(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<
    GetTreasuryOutboundPaymentsIdRequest,
    'pathParams' | 'contentType' | 'body',
    'queryParams'
  >,
  config?: RequestHandlerExecutionConfig
): Promise<GetTreasuryOutboundPaymentsIdRequestResult> {
  return requestHandler.execute(
    createRequest(getTreasuryOutboundPaymentsIdEndpointSchema, payload),
    config
  );
}
