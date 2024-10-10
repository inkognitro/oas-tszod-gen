import {z_Error, Error} from '../../../../../../';
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
} from '../../../../../../core';

export const getDetailsEndpointSchema = {
  path: '/sapi/v1/mining/hash-transfer/profit/details',
  method: 'get',
  supportedSecuritySchemas: [{name: 'ApiKeyAuth', scopes: []}],
  queryParamsZodSchema: z.object({
    configId: z.string(),
    userName: z.string(),
    pageIndex: z.number().int().safe().finite().optional(),
    pageSize: z.string().optional(),
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
            code: z.number().int().safe().finite(),
            msg: z.string(),
            data: z.object({
              profitTransferDetails: z.array(
                z.object({
                  poolUsername: z.string(),
                  toPoolUsername: z.string(),
                  algoName: z.string(),
                  hashRate: z.number().int().safe().finite(),
                  day: z.number().int().safe().finite(),
                  amount: z.number().safe().finite(),
                  coinName: z.string(),
                })
              ),
              totalNum: z.number().int().safe().finite(),
              pageSize: z.number().int().safe().finite(),
            }),
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

export type GetDetailsRequest = RequestUnion<
  any,
  any,
  {
    configId: string;
    userName: string;
    pageIndex?: number; // int
    pageSize?: string;
    recvWindow?: number; // int
    timestamp: number; // int
    signature: string;
  }
>;

export type GetDetailsResponse =
  | ResponseUnion<
      200,
      ResponseBodyData<
        'application/json',
        {
          code: number; // int
          msg: string;
          data: {
            profitTransferDetails: {
              poolUsername: string;
              toPoolUsername: string;
              algoName: string;
              hashRate: number; // int
              day: number; // int
              amount: number;
              coinName: string;
            }[];
            totalNum: number; // int
            pageSize: number; // int
          };
        }
      >
    >
  | ResponseUnion<400, ResponseBodyData<'application/json', Error>>
  | ResponseUnion<401, ResponseBodyData<'application/json', Error>>;

export type GetDetailsRequestResult = RequestResult<
  GetDetailsRequest,
  GetDetailsResponse
>;

export function getDetails(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<GetDetailsRequest, 'queryParams', never>,
  config?: RequestHandlerExecutionConfig
): Promise<GetDetailsRequestResult> {
  return requestHandler.execute(
    createRequest(getDetailsEndpointSchema, payload),
    config
  );
}
