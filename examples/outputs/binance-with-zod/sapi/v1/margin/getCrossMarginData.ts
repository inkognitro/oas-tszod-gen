import {z_Error, Error} from '../../../';
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
} from '../../../core';

export const getCrossMarginDataEndpointSchema = {
  path: '/sapi/v1/margin/crossMarginData',
  method: 'get',
  supportedSecuritySchemas: [{name: 'ApiKeyAuth', scopes: []}],
  queryParamsZodSchema: z.object({
    vipLevel: z.number().int().safe().finite().optional(),
    coin: z.string().optional(),
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
              vipLevel: z.number().int().safe().finite(),
              coin: z.string(),
              transferIn: z.boolean(),
              borrowable: z.boolean(),
              dailyInterest: z.string(),
              yearlyInterest: z.string(),
              borrowLimit: z.string(),
              marginablePairs: z.array(z.string()),
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

export type GetCrossMarginDataRequest = RequestUnion<
  any,
  any,
  {
    vipLevel?: number; // int
    coin?: string;
    recvWindow?: number; // int
    timestamp: number; // int
    signature: string;
  }
>;

export type GetCrossMarginDataResponse =
  | ResponseUnion<
      200,
      ResponseBodyData<
        'application/json',
        {
          vipLevel: number; // int
          coin: string;
          transferIn: boolean;
          borrowable: boolean;
          dailyInterest: string;
          yearlyInterest: string;
          borrowLimit: string;
          marginablePairs: string[];
        }[]
      >
    >
  | ResponseUnion<400, ResponseBodyData<'application/json', Error>>
  | ResponseUnion<401, ResponseBodyData<'application/json', Error>>;

export type GetCrossMarginDataRequestResult = RequestResult<
  GetCrossMarginDataRequest,
  GetCrossMarginDataResponse
>;

export function getCrossMarginData(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<GetCrossMarginDataRequest, 'queryParams', never>,
  config?: RequestHandlerExecutionConfig
): Promise<GetCrossMarginDataRequestResult> {
  return requestHandler.execute(
    createRequest(getCrossMarginDataEndpointSchema, payload),
    config
  );
}
