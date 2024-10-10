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

export const getInternalTransferEndpointSchema = {
  path: '/sapi/v1/sub-account/futures/internalTransfer',
  method: 'get',
  supportedSecuritySchemas: [{name: 'ApiKeyAuth', scopes: []}],
  queryParamsZodSchema: z.object({
    email: z.string(),
    futuresType: z.number().int().safe().finite(),
    startTime: z.number().int().safe().finite().optional(),
    endTime: z.number().int().safe().finite().optional(),
    page: z.number().int().safe().finite().optional(),
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
          zodSchema: z.object({
            success: z.boolean(),
            futuresType: z.number().int().safe().finite(),
            transfers: z.array(
              z.object({
                from: z.string(),
                to: z.string(),
                asset: z.string(),
                qty: z.string(),
                tranId: z.number().int().safe().finite(),
                time: z.number().int().safe().finite(),
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

export type GetInternalTransferRequest = RequestUnion<
  any,
  any,
  {
    email: string;
    futuresType: number; // int
    startTime?: number; // int
    endTime?: number; // int
    page?: number; // int
    limit?: number; // int
    recvWindow?: number; // int
    timestamp: number; // int
    signature: string;
  }
>;

export type GetInternalTransferResponse =
  | ResponseUnion<
      200,
      ResponseBodyData<
        'application/json',
        {
          success: boolean;
          futuresType: number; // int
          transfers: {
            from: string;
            to: string;
            asset: string;
            qty: string;
            tranId: number; // int
            time: number; // int
          }[];
        }
      >
    >
  | ResponseUnion<400, ResponseBodyData<'application/json', Error>>
  | ResponseUnion<401, ResponseBodyData<'application/json', Error>>;

export type GetInternalTransferRequestResult = RequestResult<
  GetInternalTransferRequest,
  GetInternalTransferResponse
>;

export function getInternalTransfer(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<GetInternalTransferRequest, 'queryParams', never>,
  config?: RequestHandlerExecutionConfig
): Promise<GetInternalTransferRequestResult> {
  return requestHandler.execute(
    createRequest(getInternalTransferEndpointSchema, payload),
    config
  );
}
