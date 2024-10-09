import {
  z_Refund,
  z_Error,
  Refund,
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

export const getRefundsRefundEndpointSchema = {
  path: '/v1/refunds/{refund}',
  method: 'get',
  supportedSecuritySchemas: [],
  queryParamsZodSchema: z.object({
    expand: z.array(z.string()).optional(),
  }),
  pathParamsZodSchema: z.object({
    refund: z.string(),
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
          zodSchema: z_Refund,
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

export type GetRefundsRefundRequest = RequestUnion<
  RequestBodyData<'application/x-www-form-urlencoded', {}>,
  {
    refund: string;
  },
  {
    expand?: string[];
  }
>;

export type GetRefundsRefundResponse =
  | ResponseUnion<200, ResponseBodyData<'application/json', Refund>>
  | ResponseUnion<any, ResponseBodyData<'application/json', Error>>;

export type GetRefundsRefundRequestResult = RequestResult<
  GetRefundsRefundRequest,
  GetRefundsRefundResponse
>;

export function getRefundsRefund(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<
    GetRefundsRefundRequest,
    'pathParams' | 'contentType' | 'body',
    'queryParams'
  >,
  config?: RequestHandlerExecutionConfig
): Promise<GetRefundsRefundRequestResult> {
  return requestHandler.execute(
    createRequest(getRefundsRefundEndpointSchema, payload),
    config
  );
}
