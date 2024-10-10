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

export const getQueryTransLogForTradeParentEndpointSchema = {
  path: '/sapi/v1/managed-subaccount/queryTransLogForTradeParent',
  method: 'get',
  supportedSecuritySchemas: [{name: 'ApiKeyAuth', scopes: []}],
  queryParamsZodSchema: z.object({
    email: z.string(),
    startTime: z.number().int().safe().finite().optional(),
    endTime: z.number().int().safe().finite().optional(),
    page: z.number().int().safe().finite().optional(),
    limit: z.number().int().safe().finite().optional(),
    transfers: z.string().optional(),
    transferFunctionAccountType: z.string().optional(),
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
            count: z.number().int().safe().finite(),
            managerSubTransferHistoryVos: z.array(
              z.object({
                fromEmail: z.string(),
                fromAccountType: z.string(),
                toEmail: z.string(),
                toAccountType: z.string(),
                asset: z.string(),
                amount: z.string(),
                scheduledData: z.number().int().safe().finite(),
                createTime: z.number().int().safe().finite(),
                status: z.string(),
                tranId: z.number().int().safe().finite(),
              })
            ),
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

export type GetQueryTransLogForTradeParentRequest = RequestUnion<
  any,
  any,
  {
    email: string;
    startTime?: number; // int
    endTime?: number; // int
    page?: number; // int
    limit?: number; // int
    transfers?: string;
    transferFunctionAccountType?: string;
    recvWindow?: number; // int
    timestamp: number; // int
    signature: string;
  }
>;

export type GetQueryTransLogForTradeParentResponse =
  | ResponseUnion<
      200,
      ResponseBodyData<
        'application/json',
        {
          count: number; // int
          managerSubTransferHistoryVos: {
            fromEmail: string;
            fromAccountType: string;
            toEmail: string;
            toAccountType: string;
            asset: string;
            amount: string;
            scheduledData: number; // int
            createTime: number; // int
            status: string;
            tranId: number; // int
          }[];
        }
      >
    >
  | ResponseUnion<400, ResponseBodyData<'application/json', Error>>
  | ResponseUnion<401, ResponseBodyData<'application/json', Error>>;

export type GetQueryTransLogForTradeParentRequestResult = RequestResult<
  GetQueryTransLogForTradeParentRequest,
  GetQueryTransLogForTradeParentResponse
>;

export function getQueryTransLogForTradeParent(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<
    GetQueryTransLogForTradeParentRequest,
    'queryParams',
    never
  >,
  config?: RequestHandlerExecutionConfig
): Promise<GetQueryTransLogForTradeParentRequestResult> {
  return requestHandler.execute(
    createRequest(getQueryTransLogForTradeParentEndpointSchema, payload),
    config
  );
}
