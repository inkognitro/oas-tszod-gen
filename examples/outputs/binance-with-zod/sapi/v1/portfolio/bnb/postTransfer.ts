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

export const postTransferEndpointSchema = {
  path: '/sapi/v1/portfolio/bnb-transfer',
  method: 'post',
  supportedSecuritySchemas: [{name: 'ApiKeyAuth', scopes: []}],
  queryParamsZodSchema: z.object({
    transferSide: z.enum(['TO_UM', 'FROM_UM']),
    amount: z.number().safe().finite(),
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
            tranId: z.number().int().safe().finite(),
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

export type PostTransferRequest = RequestUnion<
  any,
  any,
  {
    transferSide: 'TO_UM' | 'FROM_UM';
    amount: number;
    recvWindow?: number; // int
    timestamp: number; // int
    signature: string;
  }
>;

export type PostTransferResponse =
  | ResponseUnion<
      200,
      ResponseBodyData<
        'application/json',
        {
          tranId: number; // int
        }
      >
    >
  | ResponseUnion<400, ResponseBodyData<'application/json', Error>>
  | ResponseUnion<401, ResponseBodyData<'application/json', Error>>;

export type PostTransferRequestResult = RequestResult<
  PostTransferRequest,
  PostTransferResponse
>;

export function postTransfer(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<PostTransferRequest, 'queryParams', never>,
  config?: RequestHandlerExecutionConfig
): Promise<PostTransferRequestResult> {
  return requestHandler.execute(
    createRequest(postTransferEndpointSchema, payload),
    config
  );
}
