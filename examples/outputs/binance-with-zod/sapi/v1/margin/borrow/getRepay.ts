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

export const getRepayEndpointSchema = {
  path: '/sapi/v1/margin/borrow-repay',
  method: 'get',
  supportedSecuritySchemas: [{name: 'ApiKeyAuth', scopes: []}],
  queryParamsZodSchema: z.object({
    asset: z.string(),
    isolatedSymbol: z.string().optional(),
    txId: z.number().int().safe().finite().optional(),
    startTime: z.number().int().safe().finite().optional(),
    endTime: z.number().int().safe().finite().optional(),
    current: z.number().int().safe().finite().optional(),
    size: z.number().int().safe().finite().optional(),
    type: z.string(),
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
                isolatedSymbol: z.string().optional(),
                amount: z.string().optional(),
                asset: z.string(),
                interest: z.string().optional(),
                principal: z.string(),
                status: z.string(),
                timestamp: z.number().int().safe().finite(),
                txId: z.number().int().safe().finite(),
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
  },
};

export type GetRepayRequest = RequestUnion<
  any,
  any,
  {
    asset: string;
    isolatedSymbol?: string;
    txId?: number; // int
    startTime?: number; // int
    endTime?: number; // int
    current?: number; // int
    size?: number; // int
    type: string;
    recvWindow?: number; // int
    timestamp: number; // int
    signature: string;
  }
>;

export type GetRepayResponse =
  | ResponseUnion<
      200,
      ResponseBodyData<
        'application/json',
        {
          rows: {
            isolatedSymbol?: string;
            amount?: string;
            asset: string;
            interest?: string;
            principal: string;
            status: string;
            timestamp: number; // int
            txId: number; // int
          }[];
          total: number; // int
        }
      >
    >
  | ResponseUnion<400, ResponseBodyData<'application/json', Error>>;

export type GetRepayRequestResult = RequestResult<
  GetRepayRequest,
  GetRepayResponse
>;

export function getRepay(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<GetRepayRequest, 'queryParams', never>,
  config?: RequestHandlerExecutionConfig
): Promise<GetRepayRequestResult> {
  return requestHandler.execute(
    createRequest(getRepayEndpointSchema, payload),
    config
  );
}
