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

export const postDepositEndpointSchema = {
  path: '/sapi/v1/managed-subaccount/deposit',
  method: 'post',
  supportedSecuritySchemas: [{name: 'ApiKeyAuth', scopes: []}],
  queryParamsZodSchema: z.object({
    toEmail: z.string(),
    asset: z.string(),
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

export type PostDepositRequest = RequestUnion<
  any,
  any,
  {
    toEmail: string;
    asset: string;
    amount: number;
    recvWindow?: number; // int
    timestamp: number; // int
    signature: string;
  }
>;

export type PostDepositResponse =
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

export type PostDepositRequestResult = RequestResult<
  PostDepositRequest,
  PostDepositResponse
>;

export function postDeposit(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<PostDepositRequest, 'queryParams', never>,
  config?: RequestHandlerExecutionConfig
): Promise<PostDepositRequestResult> {
  return requestHandler.execute(
    createRequest(postDepositEndpointSchema, payload),
    config
  );
}
