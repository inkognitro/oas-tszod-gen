import {z_Payout, z_Error, Payout, Error} from './schemas';
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

export const getPayoutsPayoutEndpointSchema = {
  path: '/v1/payouts/{payout}',
  method: 'get',
  supportedSecuritySchemas: [],
  queryParamsZodSchema: z.object({
    expand: z.array(z.string()).optional(),
  }),
  pathParamsZodSchema: z.object({
    payout: z.string(),
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
          zodSchema: z_Payout,
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

export type GetPayoutsPayoutRequest = RequestUnion<
  RequestBodyData<'application/x-www-form-urlencoded', {}>,
  {
    payout: string;
  },
  {
    expand?: string[];
  }
>;

export type GetPayoutsPayoutResponse =
  | ResponseUnion<200, ResponseBodyData<'application/json', Payout>>
  | ResponseUnion<any, ResponseBodyData<'application/json', Error>>;

export type GetPayoutsPayoutRequestResult = RequestResult<
  GetPayoutsPayoutRequest,
  GetPayoutsPayoutResponse
>;

export function getPayoutsPayout(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<
    GetPayoutsPayoutRequest,
    'pathParams' | 'contentType' | 'body',
    'queryParams'
  >,
  config?: RequestHandlerExecutionConfig
): Promise<GetPayoutsPayoutRequestResult> {
  return requestHandler.execute(
    createRequest(getPayoutsPayoutEndpointSchema, payload),
    config
  );
}
