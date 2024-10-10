import {z_Error, Error} from '../../../../';
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
} from '../../../../core';

export const getDataEndpointSchema = {
  path: '/sapi/v1/loan/loanable/data',
  method: 'get',
  supportedSecuritySchemas: [{name: 'ApiKeyAuth', scopes: []}],
  queryParamsZodSchema: z.object({
    loanCoin: z.string().optional(),
    vipLevel: z.number().int().safe().finite().optional(),
    recvWindow: z.number().int().safe().finite().optional(),
    timestamp: z.number().int().safe().finite(),
    signature: z.string(),
  }),
  bodyByContentType: {},
  responseByStatus: {
    '200': {
      bodyByContentType: {
        'application/json': {
          zodSchema: z.object({
            rows: z.array(
              z.object({
                loanCoin: z.string(),
                _7dHourlyInterestRate: z.string(),
                _7dDailyInterestRate: z.string(),
                _14dHourlyInterestRate: z.string(),
                _14dDailyInterestRate: z.string(),
                _30dHourlyInterestRate: z.string(),
                _30dDailyInterestRate: z.string(),
                _90dHourlyInterestRate: z.string(),
                _90dDailyInterestRate: z.string(),
                _180dHourlyInterestRate: z.string(),
                _180dDailyInterestRate: z.string(),
                minLimit: z.string(),
                maxLimit: z.string(),
                vipLevel: z.number().int().safe().finite(),
              })
            ),
            total: z.number().int().safe().finite(),
          }),
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

export type GetDataRequest = RequestUnion<
  any,
  any,
  {
    loanCoin?: string;
    vipLevel?: number; // int
    recvWindow?: number; // int
    timestamp: number; // int
    signature: string;
  }
>;

export type GetDataResponse =
  | ResponseUnion<
      200,
      ResponseBodyData<
        'application/json',
        {
          rows: {
            loanCoin: string;
            _7dHourlyInterestRate: string;
            _7dDailyInterestRate: string;
            _14dHourlyInterestRate: string;
            _14dDailyInterestRate: string;
            _30dHourlyInterestRate: string;
            _30dDailyInterestRate: string;
            _90dHourlyInterestRate: string;
            _90dDailyInterestRate: string;
            _180dHourlyInterestRate: string;
            _180dDailyInterestRate: string;
            minLimit: string;
            maxLimit: string;
            vipLevel: number; // int
          }[];
          total: number; // int
        }
      >
    >
  | ResponseUnion<400, ResponseBodyData<'application/json', Error>>
  | ResponseUnion<401, ResponseBodyData<'application/json', Error>>;

export type GetDataRequestResult = RequestResult<
  GetDataRequest,
  GetDataResponse
>;

export function getData(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<GetDataRequest, 'queryParams', never>,
  config?: RequestHandlerExecutionConfig
): Promise<GetDataRequestResult> {
  return requestHandler.execute(
    createRequest(getDataEndpointSchema, payload),
    config
  );
}
