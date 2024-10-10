import {z_Error, Error} from '../../../../../';
import {z} from 'zod';
import {
  RequestUnion,
  ResponseBodyData,
  ResponseUnion,
  RequestResult,
  SimpleRequestHandler,
  createRequest,
  RequestHandlerExecutionConfig,
  RequestPayload,
} from '../../../../../core';

export const getInterestRateEndpointSchema = {
  path: '/sapi/v1/loan/vip/request/interestRate',
  method: 'get',
  supportedSecuritySchemas: [{name: 'ApiKeyAuth', scopes: []}],
  queryParamsZodSchema: z.object({
    loanCoin: z.string().optional(),
    recvWindow: z.number().int().safe().finite().optional(),
    timestamp: z.number().int().safe().finite(),
    signature: z.string(),
  }),
  bodyByContentType: {},
  responseByStatus: {
    '200': {
      bodyByContentType: {
        'application/json': {
          zodSchema: z.array(
            z.object({
              asset: z.string(),
              flexibleDailyInterestRate: z.string(),
              flexibleYearlyInterestRate: z.string(),
              time: z.number().int().safe().finite(),
            })
          ),
        },
      },
    },
    '400': {
      bodyByContentType: {
        'application/json': {
          zodSchema: z_Error,
        },
      },
    },
    '401': {
      bodyByContentType: {
        'application/json': {
          zodSchema: z_Error,
        },
      },
    },
  },
};

export type GetInterestRateRequest = RequestUnion<
  any,
  any,
  {
    loanCoin?: string;
    recvWindow?: number; // int
    timestamp: number; // int
    signature: string;
  }
>;

export type GetInterestRateResponse =
  | ResponseUnion<
      200,
      ResponseBodyData<
        'application/json',
        {
          asset: string;
          flexibleDailyInterestRate: string;
          flexibleYearlyInterestRate: string;
          time: number; // int
        }[]
      >
    >
  | ResponseUnion<400, ResponseBodyData<'application/json', Error>>
  | ResponseUnion<401, ResponseBodyData<'application/json', Error>>;

export type GetInterestRateRequestResult = RequestResult<
  GetInterestRateRequest,
  GetInterestRateResponse
>;

export function getInterestRate(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<GetInterestRateRequest, 'queryParams', never>,
  config?: RequestHandlerExecutionConfig
): Promise<GetInterestRateRequestResult> {
  return requestHandler.execute(
    createRequest(getInterestRateEndpointSchema, payload),
    config
  );
}
