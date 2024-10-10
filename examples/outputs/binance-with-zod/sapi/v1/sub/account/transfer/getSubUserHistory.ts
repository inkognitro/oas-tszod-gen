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

export const getSubUserHistoryEndpointSchema = {
  path: '/sapi/v1/sub-account/transfer/subUserHistory',
  method: 'get',
  supportedSecuritySchemas: [{name: 'ApiKeyAuth', scopes: []}],
  queryParamsZodSchema: z.object({
    asset: z.string().optional(),
    type: z.number().int().safe().finite().optional(),
    startTime: z.number().int().safe().finite().optional(),
    endTime: z.number().int().safe().finite().optional(),
    limit: z.number().int().safe().finite().optional(),
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
              counterParty: z.string(),
              email: z.string(),
              type: z.number().int().safe().finite(),
              asset: z.string(),
              qty: z.string(),
              fromAccountType: z.string(),
              toAccountType: z.string(),
              status: z.string(),
              tranId: z.number().int().safe().finite(),
              time: z.number().int().safe().finite(),
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

export type GetSubUserHistoryRequest = RequestUnion<
  any,
  any,
  {
    asset?: string;
    type?: number; // int
    startTime?: number; // int
    endTime?: number; // int
    limit?: number; // int
    recvWindow?: number; // int
    timestamp: number; // int
    signature: string;
  }
>;

export type GetSubUserHistoryResponse =
  | ResponseUnion<
      200,
      ResponseBodyData<
        'application/json',
        {
          counterParty: string;
          email: string;
          type: number; // int
          asset: string;
          qty: string;
          fromAccountType: string;
          toAccountType: string;
          status: string;
          tranId: number; // int
          time: number; // int
        }[]
      >
    >
  | ResponseUnion<400, ResponseBodyData<'application/json', Error>>
  | ResponseUnion<401, ResponseBodyData<'application/json', Error>>;

export type GetSubUserHistoryRequestResult = RequestResult<
  GetSubUserHistoryRequest,
  GetSubUserHistoryResponse
>;

export function getSubUserHistory(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<GetSubUserHistoryRequest, 'queryParams', never>,
  config?: RequestHandlerExecutionConfig
): Promise<GetSubUserHistoryRequestResult> {
  return requestHandler.execute(
    createRequest(getSubUserHistoryEndpointSchema, payload),
    config
  );
}
