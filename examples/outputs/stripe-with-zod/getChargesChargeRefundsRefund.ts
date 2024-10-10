import {z_Refund, z_Error, Refund, Error} from './schemas';
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

export const getChargesChargeRefundsRefundEndpointSchema = {
  path: '/v1/charges/{charge}/refunds/{refund}',
  method: 'get',
  supportedSecuritySchemas: [],
  queryParamsZodSchema: z.object({
    expand: z.array(z.string()).optional(),
  }),
  pathParamsZodSchema: z.object({
    charge: z.string(),
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

export type GetChargesChargeRefundsRefundRequest = RequestUnion<
  RequestBodyData<'application/x-www-form-urlencoded', {}>,
  {
    charge: string;
    refund: string;
  },
  {
    expand?: string[];
  }
>;

export type GetChargesChargeRefundsRefundResponse =
  | ResponseUnion<200, ResponseBodyData<'application/json', Refund>>
  | ResponseUnion<any, ResponseBodyData<'application/json', Error>>;

export type GetChargesChargeRefundsRefundRequestResult = RequestResult<
  GetChargesChargeRefundsRefundRequest,
  GetChargesChargeRefundsRefundResponse
>;

export function getChargesChargeRefundsRefund(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<
    GetChargesChargeRefundsRefundRequest,
    'pathParams' | 'contentType' | 'body',
    'queryParams'
  >,
  config?: RequestHandlerExecutionConfig
): Promise<GetChargesChargeRefundsRefundRequestResult> {
  return requestHandler.execute(
    createRequest(getChargesChargeRefundsRefundEndpointSchema, payload),
    config
  );
}
