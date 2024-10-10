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

export const getTaxQueryEndpointSchema = {
  path: '/sapi/v1/rebate/taxQuery',
  method: 'get',
  supportedSecuritySchemas: [{name: 'ApiKeyAuth', scopes: []}],
  queryParamsZodSchema: z.object({
    startTime: z.number().int().safe().finite().optional(),
    endTime: z.number().int().safe().finite().optional(),
    page: z.number().int().safe().finite().optional(),
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
            status: z.string(),
            type: z.string(),
            code: z.string(),
            data: z.object({
              page: z.number().int().safe().finite(),
              totalRecords: z.number().int().safe().finite(),
              totalPageNum: z.number().int().safe().finite(),
              data: z.array(
                z.object({
                  asset: z.string(),
                  type: z.number().int().safe().finite(),
                  amount: z.string(),
                  updateTime: z.number().int().safe().finite(),
                })
              ),
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

export type GetTaxQueryRequest = RequestUnion<
  any,
  any,
  {
    startTime?: number; // int
    endTime?: number; // int
    page?: number; // int
    recvWindow?: number; // int
    timestamp: number; // int
    signature: string;
  }
>;

export type GetTaxQueryResponse =
  | ResponseUnion<
      200,
      ResponseBodyData<
        'application/json',
        {
          status: string;
          type: string;
          code: string;
          data: {
            page: number; // int
            totalRecords: number; // int
            totalPageNum: number; // int
            data: {
              asset: string;
              type: number; // int
              amount: string;
              updateTime: number; // int
            }[];
          };
        }
      >
    >
  | ResponseUnion<400, ResponseBodyData<'application/json', Error>>
  | ResponseUnion<401, ResponseBodyData<'application/json', Error>>;

export type GetTaxQueryRequestResult = RequestResult<
  GetTaxQueryRequest,
  GetTaxQueryResponse
>;

export function getTaxQuery(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<GetTaxQueryRequest, 'queryParams', never>,
  config?: RequestHandlerExecutionConfig
): Promise<GetTaxQueryRequestResult> {
  return requestHandler.execute(
    createRequest(getTaxQueryEndpointSchema, payload),
    config
  );
}
