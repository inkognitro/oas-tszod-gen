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

export const getDribbletEndpointSchema = {
  path: '/sapi/v1/asset/dribblet',
  method: 'get',
  supportedSecuritySchemas: [{name: 'ApiKeyAuth', scopes: []}],
  queryParamsZodSchema: z.object({
    accountType: z.enum(['SPOT', 'MARGIN']).optional(),
    startTime: z.number().int().safe().finite().optional(),
    endTime: z.number().int().safe().finite().optional(),
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
            total: z.number().int().safe().finite(),
            userAssetDribblets: z.array(
              z.object({
                operateTime: z.number().int().safe().finite(),
                totalTransferedAmount: z.string(),
                totalServiceChargeAmount: z.string(),
                transId: z.number().int().safe().finite(),
                userAssetDribbletDetails: z.array(
                  z.object({
                    transId: z.number().int().safe().finite(),
                    serviceChargeAmount: z.string(),
                    amount: z.string(),
                    operateTime: z.number().int().safe().finite(),
                    transferedAmount: z.string(),
                    fromAsset: z.string(),
                  })
                ),
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

export type GetDribbletRequest = RequestUnion<
  any,
  any,
  {
    accountType?: 'SPOT' | 'MARGIN';
    startTime?: number; // int
    endTime?: number; // int
    recvWindow?: number; // int
    timestamp: number; // int
    signature: string;
  }
>;

export type GetDribbletResponse =
  | ResponseUnion<
      200,
      ResponseBodyData<
        'application/json',
        {
          total: number; // int
          userAssetDribblets: {
            operateTime: number; // int
            totalTransferedAmount: string;
            totalServiceChargeAmount: string;
            transId: number; // int
            userAssetDribbletDetails: {
              transId: number; // int
              serviceChargeAmount: string;
              amount: string;
              operateTime: number; // int
              transferedAmount: string;
              fromAsset: string;
            }[];
          }[];
        }
      >
    >
  | ResponseUnion<400, ResponseBodyData<'application/json', Error>>
  | ResponseUnion<401, ResponseBodyData<'application/json', Error>>;

export type GetDribbletRequestResult = RequestResult<
  GetDribbletRequest,
  GetDribbletResponse
>;

export function getDribblet(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<GetDribbletRequest, 'queryParams', never>,
  config?: RequestHandlerExecutionConfig
): Promise<GetDribbletRequestResult> {
  return requestHandler.execute(
    createRequest(getDribbletEndpointSchema, payload),
    config
  );
}
