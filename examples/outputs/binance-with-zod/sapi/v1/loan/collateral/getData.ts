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
  path: '/sapi/v1/loan/collateral/data',
  method: 'get',
  supportedSecuritySchemas: [{name: 'ApiKeyAuth', scopes: []}],
  queryParamsZodSchema: z.object({
    collateralCoin: z.string().optional(),
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
                collateralCoin: z.string(),
                initialLTV: z.string(),
                marginCallLTV: z.string(),
                liquidationLTV: z.string(),
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
    collateralCoin?: string;
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
            collateralCoin: string;
            initialLTV: string;
            marginCallLTV: string;
            liquidationLTV: string;
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
