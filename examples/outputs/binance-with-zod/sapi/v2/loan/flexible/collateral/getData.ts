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

export const getDataEndpointSchema = {
  path: '/sapi/v2/loan/flexible/collateral/data',
  method: 'get',
  supportedSecuritySchemas: [{name: 'ApiKeyAuth', scopes: []}],
  queryParamsZodSchema: z.object({
    collateralCoin: z.string().optional(),
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
