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

export const getUserLimitEndpointSchema = {
  path: '/sapi/v1/blvt/userLimit',
  method: 'get',
  supportedSecuritySchemas: [{name: 'ApiKeyAuth', scopes: []}],
  queryParamsZodSchema: z.object({
    tokenName: z.string().optional(),
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
              tokenName: z.string(),
              userDailyTotalPurchaseLimit: z.string(),
              userDailyTotalRedeemLimit: z.string(),
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

export type GetUserLimitRequest = RequestUnion<
  any,
  any,
  {
    tokenName?: string;
    recvWindow?: number; // int
    timestamp: number; // int
    signature: string;
  }
>;

export type GetUserLimitResponse =
  | ResponseUnion<
      200,
      ResponseBodyData<
        'application/json',
        {
          tokenName: string;
          userDailyTotalPurchaseLimit: string;
          userDailyTotalRedeemLimit: string;
        }[]
      >
    >
  | ResponseUnion<400, ResponseBodyData<'application/json', Error>>
  | ResponseUnion<401, ResponseBodyData<'application/json', Error>>;

export type GetUserLimitRequestResult = RequestResult<
  GetUserLimitRequest,
  GetUserLimitResponse
>;

export function getUserLimit(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<GetUserLimitRequest, 'queryParams', never>,
  config?: RequestHandlerExecutionConfig
): Promise<GetUserLimitRequestResult> {
  return requestHandler.execute(
    createRequest(getUserLimitEndpointSchema, payload),
    config
  );
}
