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

export const getApiRestrictionsEndpointSchema = {
  path: '/sapi/v1/account/apiRestrictions',
  method: 'get',
  supportedSecuritySchemas: [{name: 'ApiKeyAuth', scopes: []}],
  queryParamsZodSchema: z.object({
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
            ipRestrict: z.boolean(),
            createTime: z.number().int().safe().finite(),
            enableInternalTransfer: z.boolean(),
            enableFutures: z.boolean(),
            enablePortfolioMarginTrading: z.boolean().optional(),
            enableVanillaOptions: z.boolean(),
            permitsUniversalTransfer: z.boolean(),
            enableReading: z.boolean(),
            enableSpotAndMarginTrading: z.boolean(),
            enableWithdrawals: z.boolean(),
            enableMargin: z.boolean(),
            tradingAuthorityExpirationTime: z.number().int().safe().finite(),
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

export type GetApiRestrictionsRequest = RequestUnion<
  any,
  any,
  {
    recvWindow?: number; // int
    timestamp: number; // int
    signature: string;
  }
>;

export type GetApiRestrictionsResponse =
  | ResponseUnion<
      200,
      ResponseBodyData<
        'application/json',
        {
          ipRestrict: boolean;
          createTime: number; // int
          enableInternalTransfer: boolean;
          enableFutures: boolean;
          enablePortfolioMarginTrading?: boolean;
          enableVanillaOptions: boolean;
          permitsUniversalTransfer: boolean;
          enableReading: boolean;
          enableSpotAndMarginTrading: boolean;
          enableWithdrawals: boolean;
          enableMargin: boolean;
          tradingAuthorityExpirationTime: number; // int
        }
      >
    >
  | ResponseUnion<400, ResponseBodyData<'application/json', Error>>
  | ResponseUnion<401, ResponseBodyData<'application/json', Error>>;

export type GetApiRestrictionsRequestResult = RequestResult<
  GetApiRestrictionsRequest,
  GetApiRestrictionsResponse
>;

export function getApiRestrictions(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<GetApiRestrictionsRequest, 'queryParams', never>,
  config?: RequestHandlerExecutionConfig
): Promise<GetApiRestrictionsRequestResult> {
  return requestHandler.execute(
    createRequest(getApiRestrictionsEndpointSchema, payload),
    config
  );
}
