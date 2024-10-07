import {z_Error, Error} from '@example-outputs/binance-with-zod';
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
} from '@example-outputs/binance-with-zod/core';

export const getSapiV1MarginInteresthistoryEndpointSchema = {
  path: '/sapi/v1/margin/interestHistory',
  method: 'get',
  supportedSecuritySchemas: [{name: 'ApiKeyAuth', scopes: []}],
  queryParamsZodSchema: z.object({
    asset: z.string().optional(),
    isolatedSymbol: z.string().optional(),
    startTime: z.number().int().safe().finite().optional(),
    endTime: z.number().int().safe().finite().optional(),
    current: z.number().int().safe().finite().optional(),
    size: z.number().int().safe().finite().optional(),
    archived: z.string().optional(),
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
                isolatedSymbol: z.string(),
                asset: z.string(),
                interest: z.string(),
                interestAccuredTime: z.number().int().safe().finite(),
                interestRate: z.string(),
                principal: z.string(),
                type: z.string(),
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

export type GetSapiV1MarginInteresthistoryRequest = RequestUnion<
  any,
  any,
  {
    asset?: string;
    isolatedSymbol?: string;
    startTime?: number; // int
    endTime?: number; // int
    current?: number; // int
    size?: number; // int
    archived?: string;
    recvWindow?: number; // int
    timestamp: number; // int
    signature: string;
  }
>;

export type GetSapiV1MarginInteresthistoryResponse =
  | ResponseUnion<
      200,
      ResponseBodyData<
        'application/json',
        {
          rows: {
            isolatedSymbol: string;
            asset: string;
            interest: string;
            interestAccuredTime: number; // int
            interestRate: string;
            principal: string;
            type: string;
          }[];
          total: number; // int
        }
      >
    >
  | ResponseUnion<400, ResponseBodyData<'application/json', Error>>
  | ResponseUnion<401, ResponseBodyData<'application/json', Error>>;

export type GetSapiV1MarginInteresthistoryRequestResult = RequestResult<
  GetSapiV1MarginInteresthistoryRequest,
  GetSapiV1MarginInteresthistoryResponse
>;

export function getSapiV1MarginInteresthistory(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<GetSapiV1MarginInteresthistoryRequest, 'queryParams'>,
  config?: RequestHandlerExecutionConfig
): Promise<GetSapiV1MarginInteresthistoryRequestResult> {
  return requestHandler.execute(
    createRequest(getSapiV1MarginInteresthistoryEndpointSchema, payload),
    config
  );
}
