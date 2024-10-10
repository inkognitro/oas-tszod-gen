import {z_Fee_refund, z_Error, Fee_refund, Error} from './schemas';
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

export const getApplicationFeesFeeRefundsIdEndpointSchema = {
  path: '/v1/application_fees/{fee}/refunds/{id}',
  method: 'get',
  supportedSecuritySchemas: [],
  queryParamsZodSchema: z.object({
    expand: z.array(z.string()).optional(),
  }),
  pathParamsZodSchema: z.object({
    fee: z.string(),
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
          zodSchema: z_Fee_refund,
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

export type GetApplicationFeesFeeRefundsIdRequest = RequestUnion<
  RequestBodyData<'application/x-www-form-urlencoded', {}>,
  {
    fee: string;
    id: string;
  },
  {
    expand?: string[];
  }
>;

export type GetApplicationFeesFeeRefundsIdResponse =
  | ResponseUnion<200, ResponseBodyData<'application/json', Fee_refund>>
  | ResponseUnion<any, ResponseBodyData<'application/json', Error>>;

export type GetApplicationFeesFeeRefundsIdRequestResult = RequestResult<
  GetApplicationFeesFeeRefundsIdRequest,
  GetApplicationFeesFeeRefundsIdResponse
>;

export function getApplicationFeesFeeRefundsId(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<
    GetApplicationFeesFeeRefundsIdRequest,
    'pathParams' | 'contentType' | 'body',
    'queryParams'
  >,
  config?: RequestHandlerExecutionConfig
): Promise<GetApplicationFeesFeeRefundsIdRequestResult> {
  return requestHandler.execute(
    createRequest(getApplicationFeesFeeRefundsIdEndpointSchema, payload),
    config
  );
}
