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

export const getRecordEndpointSchema = {
  path: '/sapi/v1/blvt/redeem/record',
  method: 'get',
  supportedSecuritySchemas: [{name: 'ApiKeyAuth', scopes: []}],
  queryParamsZodSchema: z.object({
    tokenName: z.string().optional(),
    id: z.number().int().safe().finite().optional(),
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
              id: z.number().int().safe().finite(),
              tokenName: z.string(),
              amount: z.string(),
              nav: z.string(),
              fee: z.string(),
              netProceed: z.string(),
              timestamp: z.number().int().safe().finite(),
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

export type GetRecordRequest = RequestUnion<
  any,
  any,
  {
    tokenName?: string;
    id?: number; // int
    startTime?: number; // int
    endTime?: number; // int
    limit?: number; // int
    recvWindow?: number; // int
    timestamp: number; // int
    signature: string;
  }
>;

export type GetRecordResponse =
  | ResponseUnion<
      200,
      ResponseBodyData<
        'application/json',
        {
          id: number; // int
          tokenName: string;
          amount: string;
          nav: string;
          fee: string;
          netProceed: string;
          timestamp: number; // int
        }[]
      >
    >
  | ResponseUnion<400, ResponseBodyData<'application/json', Error>>
  | ResponseUnion<401, ResponseBodyData<'application/json', Error>>;

export type GetRecordRequestResult = RequestResult<
  GetRecordRequest,
  GetRecordResponse
>;

export function getRecord(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<GetRecordRequest, 'queryParams', never>,
  config?: RequestHandlerExecutionConfig
): Promise<GetRecordRequestResult> {
  return requestHandler.execute(
    createRequest(getRecordEndpointSchema, payload),
    config
  );
}
